import { HttpService } from '@nestjs/axios';
import { ConflictException, HttpException, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Auth0Organization, Auth0TokenService, BaseWorker, CacheService, DarklyService, MqttService, PrismaService, S3Service, Tags } from '@coldpbc/nest';
import { filter, first, kebabCase, merge, omit, pick, set } from 'lodash';
import { AxiosRequestConfig } from 'axios';
import { CreateOrganizationDto } from './dto/organization.dto';
import { organizations } from '@prisma/client';
import { IntegrationsService } from '../integrations/integrations.service';
import { BroadcastEventService } from '../../../utilities/events/broadcast.event.service';

@Span()
@Injectable()
export class OrganizationService extends BaseWorker {
  options: AxiosRequestConfig<any>;
  httpService: HttpService;
  test_orgs: Array<{ id: string; name: string; display_name: string }>;

  constructor(
    readonly cache: CacheService,
    readonly utilService: Auth0TokenService,
    readonly darkly: DarklyService,
    readonly events: BroadcastEventService,
    readonly integrations: IntegrationsService,
    readonly s3: S3Service,
    readonly mqtt: MqttService,
    readonly prisma: PrismaService,
  ) {
    super('OrganizationService');
    this.httpService = new HttpService();
  }

  override async onModuleInit() {
    await this.getOrganizations(true);

    this.darkly.subscribeToJsonFlagChanges('dynamic-org-white-list', value => {
      this.test_orgs = value;
    });

    this.options = await this.utilService.init();
  }

  /***
   * Get all connections from Auth0
   */
  async getConnections(): Promise<any> {
    let cons = await this.cache.get('auth0:connections');

    if (!cons) {
      this.options = await this.utilService.init(); // get auth0 token

      const response = await this.httpService.axiosRef.get(`/connections`, this.options);

      if (response.data) {
        cons = response.data;
        await this.cache.set('auth0:connections', response.data, {
          ttl: 0,
          update: true,
        });
      }
    }

    return cons;
  }

  /***
   * Get all organizations from Auth0
   * If proper filter is supplied it returns an Auth0Organization
   * If no filter is supplied it returns an array of Auth0Organizations
   */
  async getOrganizations(
    updateCache = false,
    filters?: {
      id?: string;
      name?: string;
    } | null,
  ): Promise<Auth0Organization | Array<Auth0Organization> | Error> {
    try {
      // if supplied, check filter has required properties
      if (filters && !filters.id && !filters.name) {
        this.logger.warn('invalid filter supplied, function will return array of organizations', filters);

        filters = null;
      }

      let orgs: Array<Auth0Organization> | undefined;

      if (!updateCache) {
        orgs = (await this.cache.get('organizations')) as Array<Auth0Organization>;
      }

      // No orgs found in cache, so get latest list from Auth0
      if (!orgs) {
        this.options = await this.utilService.init();

        const response = await this.httpService.axiosRef.get(`/organizations`, this.options);

        if (!response.data) {
          return new NotFoundException(`No Organizations found`);
        }

        orgs = response.data;

        this.cache.set('organizations', response.data, {
          update: true,
          wildcard: true,
        });
      }

      if (!orgs) {
        throw new NotFoundException(`No Organizations found`);
      }

      // if filter was supplied return org matching filter
      if (filters && Array.isArray(orgs)) {
        const found = first(filter(orgs, filters)) as Auth0Organization;
        const org: Auth0Organization | undefined = found ? found : undefined; //only one should be returned by filter, however if more are returned only return the first

        //no org matches filter
        if (!org) {
          throw new NotFoundException(`Organization not found`);
        }

        this.cache.set(`organizations:${org.id}`, org, { ttl: 1000 * 60 * 60 * 24 * 7, update: true, wildcard: true });
        this.cache.set(`organizations:${org.name}`, org, {
          ttl: 1000 * 60 * 60 * 24 * 7,
          update: true,
          wildcard: true,
        });

        return org;
      }

      // return all orgs
      return orgs;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /***
   * Get Organization by name or id
   * @param nameOrId
   * @param user
   * @param bypassCache
   */
  async getOrganization(nameOrId: string, req: any, bypassCache = false): Promise<Auth0Organization> {
    const { user } = req;
    try {
      if (!nameOrId || nameOrId === ':name' || nameOrId === ':orgId') throw new UnprocessableEntityException(`Organization 'name' or 'id' is required`);

      let cached;
      if (!bypassCache) {
        cached = await this.cache.get(`organizations:${nameOrId}`);
      }

      if (cached) {
        return cached;
      } else {
        const filter = nameOrId.startsWith('org_') ? { id: nameOrId } : { name: nameOrId };

        let org = (await this.prisma.organizations.findUnique({
          where: filter,
        })) as unknown as Auth0Organization;

        if (org) {
          await this.cache.set(`organizations:${org.id}`, org, { ttl: 1000 * 60 * 60 * 24, update: true });

          if (!user.isColdAdmin && org.id !== user.coldclimate_claims.org_id) {
            throw new UnauthorizedException('You are not permitted to perform actions on this organization');
          }
        } else {
          // if org not found in db, get from auth0

          this.options = await this.utilService.init();

          const response = await this.httpService.axiosRef.get(`/organizations/${nameOrId.startsWith('org_') ? nameOrId : 'name/' + nameOrId}`, this.options);

          if (!response.data) {
            throw new NotFoundException(`No Organizations found`);
          }

          org = response.data;
        }

        return org;
      }
    } catch (e) {
      this.logger.error(e, { nameOrId, user, bypassCache });
      if (e.response.status === 404) {
        throw new NotFoundException(`Organization ${nameOrId} not found`);
      } else {
        throw new HttpException(e.message, e.status);
      }
    }
  }

  /***
   * Create an organization in Auth0
   * @param org
   * @param user
   */
  async createOrganization(org: Partial<CreateOrganizationDto>, req: any): Promise<Auth0Organization> {
    const { user, url } = req;
    try {
      this.logger.info('creating organization', { org, user });
      this.options = await this.utilService.init();

      const saved = await this.httpService.axiosRef.post(`/organizations`, org, this.options);

      // update org cache by name
      await this.cache.set(`organizations:${saved.data.name}`, saved.data, {
        update: true,
        ttl: 1000 * 60 * 60,
      });
      // update org cache by id
      await this.cache.set(`organizations:${saved.data.id}`, saved.data, {
        update: true,
        ttl: 1000 * 60 * 60,
      });

      // update org list cache
      await this.getOrganizations(true);

      this.mqtt.publishMQTT('cold', {
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          organization: saved.data,
        },
      });

      return saved.data;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /***
   * Create a new Cold Organization
   * @param org
   * @param user
   * @param bypassCache
   * @param impersonatedOrg
   */
  async createColdOrg(org: Partial<CreateOrganizationDto>, req: any): Promise<Partial<organizations>> {
    const { user, url } = req;
    // Name should be kebabCased
    const orgName = kebabCase(org.display_name);

    const tags: Tags = {
      org_name: orgName,
      user: user.coldclimate_claims,
      ...this.tags,
    };

    try {
      if (orgName != org.name) {
        org.name = orgName;
      }

      let existing: any | null;

      // search for existing organization by name
      await this.prisma.organizations.findUnique({
        where: { name: org.name },
      });

      if (existing) {
        throw new ConflictException(`organization ${existing.name} already exists in db`);
      }

      try {
        // search Auth0 for existing organization by name
        existing = (await this.getOrganization(<string>org.name, req, true)) as Auth0Organization;
      } catch (e) {
        // if org not found in Auth0, continue
        if (e.status !== 404) {
          throw e;
        }
      }
      // update cache just in case
      if (existing) {
        await this.cache.set(`organizations:${existing?.id}`, existing, {
          ttl: 0,
          update: true,
        });
        await this.cache.set(`organizations:${existing?.name}`, existing, { ttl: 1000 * 60 * 60, update: true });

        throw new ConflictException(`organization ${existing.name} already exists`);
      }

      // create new organization in Auth0
      const conResponse = await this.getConnections();

      //Set enabled auth0 connections
      set(
        org,
        'enabled_connections',
        conResponse.map(con => {
          return {
            connection_id: con.id,
            assign_membership_on_login: false,
          };
        }),
      );

      const auth0Org = await this.createOrganization(pick(org, ['name', 'display_name', 'enabled_connections', 'branding']), req);

      set(org, 'id', auth0Org.id);

      this.logger.log(`organization (${org.display_name}) created`, auth0Org);

      if (auth0Org.id) {
        tags.org_id = auth0Org.id;
        // create organization in database
        org.created_at = new Date();

        existing = await this.prisma.organizations.create({
          data: org as any,
        });

        if (org.street_address && org.city && org.state && org.zip) {
          const location = await this.prisma.organization_locations.create({
            data: {
              name: 'Default',
              organization_id: existing.id,
              address: org.street_address,
              city: org.city,
              state: org.state,
              postal_code: org.zip,
              country: 'US',
            },
          });

          await this.cache.set(`organizations:${existing.id}:locations`, location, {
            ttl: 60 * 60 * 24 * 7,
            update: true,
          });
        }

        await this.cache.set(`organizations:${auth0Org.id}`, auth0Org, {
          update: true,
        });
        await this.cache.set(`organizations:${auth0Org.name}`, auth0Org, {
          update: true,
        });

        this.logger.info(`persisted organization (${auth0Org.display_name}) in DB`, auth0Org);
      }

      this.metrics.increment('cold.api.organizations.create', tags);

      this.mqtt.publishMQTT('cold', {
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          organization: auth0Org,
        },
      });

      return (await this.prisma.organizations.findUnique({
        where: {
          id: existing.id,
        },
        include: {
          locations: true,
          integrations: true,
        },
      })) as organizations;
    } catch (e) {
      tags.status = 'failed';

      this.metrics.event(`New organization creation failed`, `${user.coldclimate_claims.email}'s request to create a new organization for ${org.display_name} failed`, tags);

      this.tracer.getTracer().dogstatsd.increment('cold.api.organizations.create', 1, tags);

      this.logger.error(e, { org, e });

      this.mqtt.publishMQTT('cold', {
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          error: e.message,
        },
      });

      throw new UnprocessableEntityException(e.message, e);
    }
  }

  /***
   * Delete an organization in Auth0
   * @param orgId
   * @param user
   * @param updateCache
   */
  async deleteOrganization(orgId: string, req: any) {
    const { user, url } = req;
    // get org by id or name
    let org;
    try {
      try {
        org = (await this.getOrganization(orgId, req, false)) as Auth0Organization;
      } catch (e) {
        if (e.status !== 404) {
          throw e;
        }
      }

      this.tags = merge(this.tags, {
        organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']),
        user: user.coldclimate_claims,
        status: 'started',
      });

      if (!orgId?.includes('org_')) {
        throw new UnprocessableEntityException(`${orgId} is not a valid organization id`);
      }

      // don't del cold-climate
      if (org?.name?.includes('cold-climate')) {
        throw new HttpException('cannot delete cold-climate org', 422);
      }

      // if org not found in db and the function was called with an org name throw error
      if (!orgId.includes('org_') && !org?.id) {
        // org not found in db

        throw new HttpException(
          `Unable to find org name: ${orgId} in the database.  To insure this gets deleted from auth0, you must call this route again with the org id instead of name`,
          404,
        );
      }

      // Use id returned from db if orgId is not an id
      if (!orgId.includes('org_')) {
        orgId = org.id;
      }

      // delete org from auth0
      try {
        this.options = await this.utilService.init();
        await this.httpService.axiosRef.delete(`/organizations/${orgId}`, this.options);

        this.logger.info(`organization ${orgId} deleted from auth0`);
      } catch (e) {
        if (e.response.status !== 404) {
          set(this.tags, 'status', 'failed');

          this.metrics.event(
            `Delete organization failed`,
            `${user.coldclimate_claims.email}'s request to delete organization for ${org.display_name} failed`,
            {
              alert_type: 'error',
              date_happened: new Date(),
              priority: 'normal',
            },
            this.tags,
          );

          this.metrics.increment('cold.api.organizations.delete');

          this.logger.error(e, { ...e.response?.data });
          throw new UnprocessableEntityException(e.message, e.response?.data);
        } else {
          throw new NotFoundException(`Organization ${orgId} not found`);
        }
      }

      // delete org from db
      if (org) {
        try {
          await this.prisma.organizations.delete({
            where: {
              id: orgId,
            },
          });

          this.logger.info(`organization ${orgId} deleted from db`);
        } catch (e) {
          if (!e.message.includes('Record to delete does not exist')) {
            this.logger.error(e.message, { ...e.response?.data });
          }
          this.logger.info(`organization ${orgId} not found in db`);
        }
      }

      await this.cache.delete(`organizations:${orgId}:members`);
      await this.cache.delete(`organizations:${orgId}:invitations`);

      this.mqtt.publishMQTT('cold', {
        swr_key: url,
        action: 'delete',
        status: 'complete',
      });
    } catch (e) {
      this.logger.error(e.message, { ...e.response?.data });
      this.mqtt.publishMQTT('cold', {
        swr_key: url,
        action: 'delete',
        status: 'failed',
        data: {
          error: e.message,
        },
      });
    }
    await this.getOrganizations(true);

    set(this.tags, 'status', 'completed');

    this.metrics.increment('cold.api.organizations.delete', this.tags);
    throw new HttpException(`Organization ${orgId} deleted`, 204);
  }
}
