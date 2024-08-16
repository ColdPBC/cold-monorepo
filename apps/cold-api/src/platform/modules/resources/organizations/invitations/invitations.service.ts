import { ConflictException, HttpException, Injectable, NotFoundException, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { Auth0TokenService, BaseWorker, CacheService, DarklyService, IRequest, MqttService, PrismaService, Tags } from '@coldpbc/nest';
import { AxiosResponse, isAxiosError } from 'axios';
import { RoleService } from '../../auth0/roles/role.service';
import { HttpService } from '@nestjs/axios';
import { find, merge, omit } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { organizations } from '@prisma/client';
import { OrganizationHelper } from '../helpers/organization.helper';

@Injectable()
export class InvitationsService extends BaseWorker implements OnModuleInit {
  options: any;
  test_orgs: Array<{ id: string; name: string; display_name: string }>;

  constructor(
    readonly prisma: PrismaService,
    readonly config: ConfigService,
    readonly roleService: RoleService,
    readonly cache: CacheService,
    readonly helper: OrganizationHelper,
    readonly utilService: Auth0TokenService,
    readonly darkly: DarklyService,
    readonly httpService: HttpService,
    readonly mqtt: MqttService,
  ) {
    super(InvitationsService.name);
  }

  override async onModuleInit() {
    await this.darkly.onModuleInit();
    this.darkly.subscribeToJsonFlagChanges('dynamic-org-white-list', value => {
      this.test_orgs = value;
    });

    this.options = await this.utilService.init();
  }

  async getOrgInvites(orgId: string, req: IRequest, updateCache = false) {
    const { user } = req;
    try {
      // make sure org exists
      const org = await this.helper.getOrganizationById(orgId, user, false);

      orgId = org.id;

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
   * Invite a user to an organization
   * @param orgId
   * @param user_email
   * @param inviter_name
   * @param roleId
   * @param suppressEmail
   * @param req
   * @param bpc
   */
  async inviteUser(orgId: string, user_email: string, inviter_name: string, roleId: string | string[], suppressEmail = false, req: IRequest, bpc = true) {
    const { user, url } = req;
    const data = {};
    try {
      if (user.coldclimate_claims.org_id !== orgId && !user.isColdAdmin) {
        throw new HttpException('You do not have permission to perform this action', 403);
      }

      console.log(suppressEmail);

      const org: organizations = await this.helper.getOrganizationById(orgId, user, bpc);

      const tags: Tags = {
        user: user.coldclimate_claims,
        organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']),
        ...this.tags,
      };

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
          client_id: this.config.get('AUTH0_UI_CLIENT_ID'),
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

      this.mqtt.publishMQTT('ui', {
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          invitation: invitation.data,
        },
      });

      return invitation.data;
    } catch (e) {
      this.mqtt.publishMQTT('ui', {
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
   * Delete an organization in Auth0
   * @param orgId
   * @param invId
   * @param req
   */
  async deleteInvitation(orgId: string, invId: string, req: IRequest) {
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

      await this.getOrgInvites(orgId, req, true);
      this.mqtt.publishMQTT('ui', {
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'delete',
        status: 'complete',
        data: {},
      });
    } catch (e) {
      this.mqtt.publishMQTT('ui', {
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'delete',
        status: 'failed',
        data: {
          error: e.message,
        },
      });
      if (isAxiosError(e)) {
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
}
