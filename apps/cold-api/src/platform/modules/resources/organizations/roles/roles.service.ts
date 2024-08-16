import { HttpException, Injectable, OnModuleInit, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { Auth0TokenService, BaseWorker, CacheService, ColdRabbitService, IRequest, MqttService } from '@coldpbc/nest';
import { merge } from 'lodash';
import { RoleService } from '../../auth0/roles/role.service';
import { HttpService } from '@nestjs/axios';
import { isAxiosError } from 'axios';

@Injectable()
export class OrgRolesService extends BaseWorker implements OnModuleInit {
  options: any;

  constructor(
    readonly roleService: RoleService,
    readonly coldRabbit: ColdRabbitService,
    readonly cache: CacheService,
    readonly utilService: Auth0TokenService,
    readonly httpService: HttpService,
    readonly mqtt: MqttService,
  ) {
    super(OrgRolesService.name);
  }

  async OnModuleInit() {
    this.options = await this.utilService.init();
  }

  /***
   * Get Organization User Roles in Auth0
   * @param orgId
   * @param userId
   * @param req
   * @param bpc
   */
  async getOrgUserRoles(orgId: string, userId: string, req: IRequest, bpc = false) {
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
   * @param req
   * @param roleName
   * @param updateCache
   */
  async updateOrgUserRoles(orgId: string, userId: string, req: IRequest, roleName: string, updateCache = false) {
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

      const members = await this.coldRabbit.request('rpc.api.organizations.members', {
        from: 'api.organizations.roles',
        method: 'getOrganizationMembers',
        event: 'user_roles_updated',
        data: { orgId, req, bpc: true },
      });

      this.mqtt.publishMQTT('ui', {
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
      this.mqtt.publishMQTT('ui', {
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

      if (isAxiosError(e)) {
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
