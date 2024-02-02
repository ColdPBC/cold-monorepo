import { HttpService } from '@nestjs/axios';
import { ConflictException, HttpException, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Auth0Organization, Auth0TokenService, BaseWorker, CacheService, DarklyService, MqttService, PrismaService, S3Service, Tags } from '@coldpbc/nest';
import { filter, find, first, kebabCase, map, merge, omit, pick, set } from 'lodash';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { MemberService } from '../auth0/members/member.service';
import { RoleService } from '../auth0/roles/role.service';
import { CreateOrganizationDto } from './dto/organization.dto';
import { organizations } from '@prisma/client';
import { IntegrationsService } from '../integrations/integrations.service';
import { BroadcastEventService } from '../../../utilities/events/broadcast.event.service';

@Span()
@Injectable()
export class OrganizationService extends BaseWorker {
  options: AxiosRequestConfig<any>;
  httpService: HttpService;
  prisma: PrismaService;
  test_orgs: Array<{ id: string; name: string; display_name: string }>;

  constructor(
    readonly cache: CacheService,
    readonly utilService: Auth0TokenService,
    readonly roleService: RoleService,
    readonly memberService: MemberService,
    readonly darkly: DarklyService,
    readonly events: BroadcastEventService,
    readonly integrations: IntegrationsService,
    readonly s3: S3Service,
    readonly mqtt: MqttService,
  ) {
    super('OrganizationService');
    this.httpService = new HttpService();
    this.prisma = new PrismaService();
  }

  override async onModuleInit() {
    await this.getOrganizations(true);

    this.darkly.subscribeToJsonFlagChanges('dynamic-org-white-list', value => {
      this.test_orgs = value;
    });
  }

  /***
   * Invite a user to an organization
   * @param orgId
   * @param user_email
   * @param inviter_name
   * @param roleId
   * @param suppressEmail
   * @param user
   * @param updateCache
   */
  async inviteUser(orgId: string, user_email: string, inviter_name: string, roleId: string | string[], suppressEmail = false, req: any, updateCache = true) {
    const { user, url } = req;
    const data = {};
    try {
      if (user.coldclimate_claims.org_id !== orgId && !user.isColdAdmin) {
        throw new HttpException('You do not have permission to perform this action', 403);
      }

      console.log(suppressEmail);
      const org = await this.getOrganization(orgId, user, updateCache);

      const tags: Tags = {
        user: user.coldclimate_claims,
        organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']),
        ...this.tags,
      };

      if (!org) {
        throw new NotFoundException(`organization ${orgId} not found`);
      }

      this.cache.delete(`organizations:${org.id}:invitations`);

      this.options = await this.utilService.init();

      // store as array
      roleId = await this.roleService.convertRoleNamesToIds(Array.isArray(roleId) ? roleId : [roleId]);

      const data = {
        mimeType: 'application/json',
        text: {
          inviter: {
            name: inviter_name,
          },
          client_id: process.env['AUTH0_UI_CLIENT_ID'],
          invitee: {
            email: user_email,
          },
          roles: roleId,
          send_invitation_email: true,
        },
      };

      this.logger.info('sending invitation', data);

      const invitation = await this.httpService.axiosRef.post(`/organizations/${org.id}/invitations`, { ...data.text }, this.options);

      this.logger.info(`invitation sent to ${data.text.invitee.email} for org ${org.id}`, data);

      // increment invitation counter
      if (!find(this.test_orgs, { id: orgId })) {
        tags.status = 'completed';

        this.metrics.increment('cold.api.invitations.sent', tags);
      }

      this.mqtt.publishToUI({
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          invitation,
        },
      });

      return invitation.data;
    } catch (e) {
      this.mqtt.publishToUI({
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          error: e.message,
        },
      });
      switch (e.response.status) {
        case 404:
          this.logger.error(e.response?.data ? e.response.data : e.response, data);
          throw new NotFoundException(e);
        case 400:
          this.logger.error(e.response?.data ? e.response.data : e.response, data);
          throw new UnprocessableEntityException(e);
        case 409:
          this.logger.error(e.response?.data ? e.response.data : e.response, data);
          throw new ConflictException(e);
        default:
          this.logger.error(e.response?.data ? e.response.data : e.response, data);
          throw new HttpException(e.response?.data ? e.response.data : e.response, e.response.status);
      }
    }
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
      this.cache.set(`organizations:${org.name}`, org, { ttl: 1000 * 60 * 60 * 24 * 7, update: true, wildcard: true });

      return org;
    }

    // return all orgs
    return orgs;
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
   * Transforms invitee data to match the user data
   * @param item
   */
  async transformInvitee<item>(item: any) {
    item.email = item.invitee.email;
    item.invited_at = item.created_at;

    if (Array.isArray(item.roles) && item.roles.length > 0) {
      for (const role in item.roles) {
        if (item.roles[role].includes('rol_')) {
          const roleName = await this.roleService.resolveRoleNameById(item.roles[role]);
          item.roles[role] = roleName;
        }
      }
    } else {
      if (item.roles.includes('rol_')) {
        const roleName = await this.roleService.resolveRoleNameById(item.roles);
        item.roles = roleName;
      }
    }

    return item;
  }

  /***
   * Get Organization members by org ID
   * @param orgId
   * @param user
   * @param bypassCache
   */
  async getOrganizationMembers(orgId: string, req: any, bypassCache = false) {
    const { user } = req;
    try {
      if (orgId !== user.coldclimate_claims.org_id && !user.isColdAdmin) {
        throw new HttpException('You do not have permission to perform this action', 403);
      }

      const org = await this.getOrganization(orgId, user, bypassCache);

      if (!bypassCache) {
        const cached = await this.cache.get(`organizations:${orgId}:members`);
        if (cached) {
          return cached;
        }
      }

      this.options = await this.utilService.init();

      let members: any[] = [];
      try {
        members = (await this.httpService.axiosRef.get(`/organizations/${orgId}/members`, this.options)).data;
      } catch (e) {
        if (e.response.status !== 404) {
          throw new NotFoundException(`Organization ${orgId} not found`);
        } else {
          this.logger.error(e.message, { error: e, orgId, user, bypassCache });
        }
      }

      if (members.length > 0) {
        for (const member of members) {
          if (member.user_id) {
            const fullMember = await this.memberService.getMemberByEmail(member.email, user, bypassCache, true);
            fullMember.image = fullMember.picture;

            const roles = await this.getOrgUserRoles(orgId, member.user_id, user, bypassCache);
            fullMember.roles = map(roles, role => {
              return role.name;
            });
            if (roles.length > 0) {
              fullMember.role = roles[0].name;
            }
            await this.cache.set(`organizations:${orgId}:members:${member.user_id}`, fullMember, {
              ttl: 1000 * 60 * 60 * 24 * 7,
              update: true,
            });
            merge(member, fullMember);
          }
        }
      }

      const invitees = await this.getOrgInvites(orgId, user, bypassCache);

      if (Array.isArray(invitees.data)) {
        for (const item of invitees.data) {
          members.push(await this.transformInvitee(item));
        }
      } else if (invitees.data) {
        members.push(await this.transformInvitee(invitees.data));
      }

      set(org, 'members', members);

      this.logger.info(`retrieved ${members.length} organization members which includes ${invitees.data.length} invitees`, org);

      await this.cache.set(`organizations:${orgId}:members`, org, {
        ttl: 1000 * 60 * 60 * 7,
        update: true,
      });

      return org;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        this.logger.error(e.response?.data.message, e.response?.data);
        throw e.response;
      } else {
        if (e.status === 404) {
          throw new NotFoundException(`Organization ${orgId} not found`);
        } else {
          this.logger.error(e.message, e);
          throw new UnprocessableEntityException(e.message, e);
        }
      }
    }
  }

  private async getOrgInvites(orgId: string, req: any, updateCache = false) {
    const { user } = req;
    try {
      // make sure org exists
      const org = await this.getOrganization(orgId, user, updateCache);

      if (!user.isColdAdmin && orgId !== user.coldclimate_claims.org_id) {
        throw new HttpException('You do not have permission to perform this action', 403);
      }

      if (org?.id) {
        orgId = org.id;
      } else {
        throw new NotFoundException(`unable to find org by name ${orgId}`);
      }

      let invitees: AxiosResponse;

      // if cache is current, return cached data
      if (!updateCache) {
        invitees = (await this.cache.get(`auth0:organization:${orgId}:invitations`)) as AxiosResponse;

        if (invitees) {
          return invitees;
        }
      } else {
        await this.cache.delete(`organizations:${orgId}:members`);
        await this.cache.delete(`organizations:${orgId}:invitations`);
      }

      // Get invitees from auth0
      invitees = await this.httpService.axiosRef.get(`/organizations/${orgId}/invitations`, this.options);

      await this.cache.set(`organizations:${orgId}:invitations`, invitees.data, { ttl: 1000 * 60 * 60, update: true });

      return invitees;
    } catch (e) {
      this.logger.error(e);
      throw e;
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

      this.mqtt.publishSystemCold({
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
        existing = (await this.getOrganization(<string>org.name, user, true)) as Auth0Organization;
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

      const auth0Org = await this.createOrganization(pick(org, ['name', 'display_name', 'enabled_connections', 'branding']), user);

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

      this.mqtt.publishSystemCold({
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

      this.mqtt.publishSystemCold({
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
        org = (await this.getOrganization(orgId, user, false)) as Auth0Organization;
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

      this.mqtt.publishSystemCold({
        swr_key: url,
        action: 'delete',
        status: 'complete',
      });
    } catch (e) {
      this.logger.error(e.message, { ...e.response?.data });
      this.mqtt.publishSystemCold({
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

  /***
   * Delete an organization in Auth0
   * @param orgId
   * @param invId
   * @param user
   * @param updateCache
   * @param impersonatedOrg
   */
  async deleteInvitation(orgId: string, invId: string, req: any) {
    const { user, url } = req;

    this.tags = merge(this.tags, {
      org_id: orgId,
      inv_id: invId,
      user: user.coldclimate_claims,
    });

    if (!user.isColdAdmin && orgId !== user.coldclimate_claims.org_id) {
      throw new HttpException('You do not have permission to perform this action', 403);
    }

    this.logger.info('deleting organization', { ...this.tags });
    this.options = await this.utilService.init();

    try {
      // Delete invitees from auth0
      await this.httpService.axiosRef.delete(`/organizations/${orgId}/invitations/${invId}`, this.options);

      await this.getOrgInvites(orgId, user, true);
      this.mqtt.publishToUI({
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'delete',
        status: 'complete',
        data: {},
      });
    } catch (e) {
      this.mqtt.publishToUI({
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'delete',
        status: 'failed',
        data: {
          error: e.message,
        },
      });
      if (axios.isAxiosError(e)) {
        this.metrics.event(
          'Attempt to remove user invitation failed',
          `Organization (${user.coldclimate_claims.org_id}) member (${user.coldclimate_claims.email}) attempted to remove the following invitation to ${orgId}: ${invId}.  The request failed with the following meesage: ${e.response?.data?.message}`,
          {
            alert_type: 'error',
            date_happened: new Date(),
            priority: 'normal',
          },
          this.tags,
        );
        this.logger.error(e.response?.data?.message, { data: e.response?.data });
      } else {
        this.logger.error(e.message, { ...e });
        this.metrics.event(
          'Attempt to remove user failed',
          `Organization (${user.coldclimate_claims.org_id}) member (${user.coldclimate_claims.email}) attempted to remove the following invitation to ${orgId}: ${invId}.  The request failed with the following meesage: ${e.message}`,
          {
            alert_type: 'error',
            date_happened: new Date(),
            priority: 'normal',
          },
          this.tags,
        );
        throw new UnprocessableEntityException(e.message, e);
      }
    }

    return `Invitation ${invId} deleted`;
  }

  /***
   * Add User to Organization in Auth0
   * @param orgId
   * @param userId
   * @param connection
   * @param roleName (ie: 'company:member', 'company:admin')
   * @param user
   * @param bypassCache
   *
   */
  async addUserToOrganization(orgId: string, userId: string, req: any, roleName: string, bypassCache = false) {
    const { user, url } = req;
    this.tags = merge(this.tags, {
      org_id: orgId,
      role_name: roleName,
      user_id: userId,
      bpc: bypassCache,
      user: user.coldclimate_claims,
    });

    try {
      if (!user.isColdAdmin && orgId !== user.coldclimate_claims.org_id) {
        throw new HttpException('You do not have permission to perform this action', 403);
      }

      const org = await this.getOrganization(orgId, user, bypassCache);

      set(this.tags, 'org', org);

      this.options = await this.utilService.init();

      this.logger.log(`associating user (${userId}) to organization (${org.id}) in Auth0`, { ...this.tags });

      await this.httpService.axiosRef.post(`/organizations/${org.id}/members`, { members: [`${userId}`] }, this.options);

      this.logger.log(`user (${userId}) added to organization (${org.id}) in Auth0`, { ...this.tags });

      this.mqtt.publishToUI({
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          user: userId,
          organization: { id: orgId },
        },
      });
      //refresh cache and return members
      return await this.getOrganizationMembers(orgId, user, true);
    } catch (e) {
      this.mqtt.publishToUI({
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          error: e.message,
          user: userId,
          organization: { id: orgId },
        },
      });
      if (axios.isAxiosError(e)) {
        this.metrics.event(
          'Attempt to add user to organization failed',
          `Organization (${user.coldclimate_claims.org_id}) member (${user.coldclimate_claims.email}) attempted to add the following user to ${orgId}: ${userId}.  The request failed with the following meesage: ${e.response?.data?.message}`,
          {
            alert_type: 'error',
            date_happened: new Date(),
            priority: 'normal',
          },
          this.tags,
        );
        throw new UnprocessableEntityException(e.response?.data.message, e?.response?.data);
      } else {
        this.logger.error(e.message, { ...e, ...this.tags });
        this.metrics.event(
          'Attempt to add user to organization failed',
          `Organization (${user.coldclimate_claims.org_id}) member (${user.coldclimate_claims.email}) attempted to add the following members to ${orgId}: ${userId}.  The request failed with the following meesage: ${e.message}`,
          {
            alert_type: 'error',
            date_happened: new Date(),
            priority: 'normal',
          },
          this.tags,
        );
        throw new UnprocessableEntityException(e.message, e);
      }
    }
  }

  /***
   * Remove User from Organization in Auth0
   * @param orgId
   * @param body
   * @param user
   * @param updateCache
   */
  async removeUserFromOrganization(orgId: string, body: { members: string[] }, req: any) {
    const { user, url } = req;
    this.tags = merge(this.tags, {
      org_id: orgId,
      members: body?.members,
      user: user.coldclimate_claims,
    });

    if (orgId !== user.coldclimate_claims.org_id && !user.isColdAdmin) {
      throw new HttpException('You do not have permission to perform this action', 403);
    }

    this.options = await this.utilService.init();

    this.logger.info(`removing users from organization (${orgId}) in Auth0`, { data: body, ...this.tags });

    try {
      for (const id of body.members) {
        await this.httpService.axiosRef.delete(`/users/${id}`, this.options);
      }
      const deleted = await this.httpService.axiosRef.delete(`/organizations/${orgId}/members`, Object.assign({}, this.options, { data: body }));

      // update cache entries
      this.getOrganizationMembers(orgId, user, true);

      this.mqtt.publishToUI({
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'delete',
        status: 'complete',
        data: {
          body,
          organization: { id: orgId },
        },
      });

      throw new HttpException(`Users removed from organization ${orgId}: ${JSON.parse(deleted.config.data).members}`, 204);
    } catch (e) {
      this.mqtt.publishToUI({
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'delete',
        status: 'failed',
        data: {
          error: e.message,
          body,
          organization: { id: orgId },
        },
      });
      if (e.status === 204) {
        throw e;
      }
      if (axios.isAxiosError(e)) {
        this.metrics.event(
          'Attempt to remove user failed',
          `Organization (${user.coldclimate_claims.org_id}) member (${
            user.coldclimate_claims.email
          }) attempted to remove the following members from ${orgId}: ${body.members.toString()}.  The request failed with the following meesage: ${e.response?.data?.message}`,
          {
            alert_type: 'error',
            date_happened: new Date(),
            priority: 'normal',
          },
          this.tags,
        );
        this.logger.error(e.response?.data?.message, { data: e.response?.data, ...this.tags });
        if (e.response?.data.statusCode === 404) {
          throw new NotFoundException(e.response?.data.message, e.response?.data);
        }

        throw new UnprocessableEntityException(e.response?.data);
      } else {
        this.logger.error(e.message, { ...e, ...this.tags });
        this.metrics.event(
          'Attempt to remove user failed',
          `Organization (${user.coldclimate_claims.org_id}) member (${
            user.coldclimate_claims.email
          }) attempted to remove the following members from ${orgId}: ${body.members.toString()}.  The request failed with the following meesage: ${e.message}`,
          {
            alert_type: 'error',
            date_happened: new Date(),
            priority: 'normal',
          },
          this.tags,
        );
        throw new UnprocessableEntityException(e.message, e);
      }
    }
  }

  /***
   * Get Organization User Roles in Auth0
   * @param orgId
   * @param userId
   * @param roleName
   * @param user
   * @param updateCache
   * @param impersonatedOrg
   */
  async getOrgUserRoles(orgId: string, userId: string, req: any, bpc = false) {
    const { user } = req;
    if (orgId !== user.coldclimate_claims.org_id && !user.isColdAdmin) {
      throw new HttpException('You do not have permission to perform this action', 403);
    }

    this.tags = merge(this.tags, {
      org_id: orgId,
      user_id: userId,
      user: user.coldclimate_claims,
      bpc,
    });

    try {
      this.options = await this.utilService.init();

      const response = await this.httpService.axiosRef.get(`/organizations/${orgId}/members/${userId}/roles`, this.options);

      return response.data;
    } catch (e) {
      this.logger.error(e, { ...this.tags });
      return e.response.data;
    }
  }

  /***
   * Update Organization User Roles in Auth0
   * @param orgId
   * @param userId
   * @param roleName
   * @param user
   * @param connection
   * @param updateCache
   */
  async updateOrgUserRoles(orgId: string, userId: string, req: any, roleName: string, updateCache = false) {
    const { user, url } = req;
    this.logger.tags = merge(this.tags, {
      org_id: orgId,
      user_id: userId,
      user: user.coldclimate_claims,
      bpc: updateCache,
    });

    try {
      if (orgId !== user.coldclimate_claims.org_id && !user.isColdAdmin) {
        throw new UnauthorizedException('You do not have permission to perform this action');
      }

      if (roleName.includes('cold') && !user.isColdAdmin) {
        this.logger.error(`User: ${user.coldclimate_claims.email} in ${user.coldclimate_claims.org_id} attempted to update role ${roleName} for ${userId} in ${orgId}`);
        throw new UnauthorizedException('You do not have permission to perform this action');
      }
      const org = await this.cache.get(`organizations:${orgId}`);

      if (!org) {
        throw new Error(`org ${orgId} not found`);
      }

      this.options = await this.utilService.init();

      this.logger.log('updating organization user roles', { ...this.tags });

      const role = await this.roleService.resolveRoleIdByName(roleName);

      await this.httpService.axiosRef.post(`/organizations/${orgId}/members/${userId}/roles`, { roles: [role] }, this.options);

      const members = await this.getOrganizationMembers(orgId, user, true);

      this.mqtt.publishToUI({
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'update',
        status: 'complete',
        data: {
          user: userId,
          organization: { id: orgId },
        },
      });

      return members;
    } catch (e) {
      this.mqtt.publishToUI({
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'update',
        status: 'failed',
        data: {
          error: e.message,
          user: userId,
          organization: { id: orgId },
        },
      });

      if (axios.isAxiosError(e)) {
        this.metrics.event(
          'Attempt to update user role failed',
          `Organization (${user.coldclimate_claims.org_id}) member (${user.coldclimate_claims.email}) attempted to add ${userId} to ${roleName}.  The request failed with the following meesage: ${e.response?.data?.message}`,
          {
            alert_type: 'error',
            date_happened: new Date(),
            priority: 'normal',
          },
          this.tags,
        );
        this.logger.error(e.response?.data?.message, { data: e.response?.data, ...this.tags });
      } else {
        this.logger.error(e.message, { ...e, ...this.tags });
        throw new UnprocessableEntityException(e.message, e);
      }
    }
  }
}
