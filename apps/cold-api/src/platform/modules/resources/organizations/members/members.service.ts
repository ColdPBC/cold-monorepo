import { HttpException, Injectable, NotFoundException, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { Auth0TokenService, BaseWorker, CacheService, IRequest, MqttService } from '@coldpbc/nest';
import { map, merge, set } from 'lodash';
import axios from 'axios';
import { RoleService } from '../../auth0/roles/role.service';
import { HttpService } from '@nestjs/axios';
import { MemberService } from '../../auth0/members/member.service';
import { OrgRolesService } from '../roles/roles.service';
import { InvitationsService } from '../invitations/invitations.service';
import { OrganizationHelper } from '../helpers/organization.helper';

@Injectable()
export class MembersService extends BaseWorker implements OnModuleInit {
  options: any;

  constructor(
    readonly cache: CacheService,
    readonly utilService: Auth0TokenService,
    readonly httpService: HttpService,
    readonly helper: OrganizationHelper,
    readonly mqtt: MqttService,
    readonly roleService: RoleService,
    readonly memberService: MemberService,
    readonly orgRoles: OrgRolesService,
    readonly invitations: InvitationsService,
  ) {
    super(MembersService.name);
  }

  async OnModuleInit() {
    this.options = await this.utilService.init();
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
   * @param req
   * @param bypassCache
   */
  async getOrganizationMembers(orgId: string, req: IRequest, bypassCache = false) {
    const { user } = req;
    try {
      const org = await this.helper.getOrganizationById(orgId, user, bypassCache);

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
            const fullMember = await this.memberService.getMemberByEmail(member.email, req, bypassCache, true);
            fullMember.image = fullMember.picture;

            const roles = await this.orgRoles.getOrgUserRoles(orgId, member.user_id, req, bypassCache);
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

      const invitees = await this.invitations.getOrgInvites(orgId, req, bypassCache);

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

  /***
   * Add User to Organization in Auth0
   * @param orgId
   * @param userId
   * @param req
   * @param roleName (ie: 'company:member', 'company:admin')
   * @param bypassCache
   *
   */
  async addUserToOrganization(orgId: string, userId: string, req: IRequest, roleName: string, bypassCache = false) {
    const { user, url } = req;
    this.tags = merge(this.tags, {
      org_id: orgId,
      role_name: roleName,
      user_id: userId,
      bpc: bypassCache,
      user: user.coldclimate_claims,
    });

    try {
      const org = await this.helper.getOrganizationById(orgId, user, bypassCache);

      set(this.tags, 'org', org);

      this.options = await this.utilService.init();

      this.logger.log(`associating user (${userId}) to organization (${org.id}) in Auth0`, { ...this.tags });

      await this.httpService.axiosRef.post(`/organizations/${org.id}/members`, { members: [`${userId}`] }, this.options);

      this.logger.log(`user (${userId}) added to organization (${org.id}) in Auth0`, { ...this.tags });

      this.mqtt.publishMQTT('ui', {
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
      return await this.getOrganizationMembers(orgId, req, true);
    } catch (e) {
      this.mqtt.publishMQTT('ui', {
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
   * @param req
   */
  async removeUserFromOrganization(orgId: string, body: { members: string[] }, req: IRequest) {
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
      this.getOrganizationMembers(orgId, req, true);

      this.mqtt.publishMQTT('ui', {
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
      this.mqtt.publishMQTT('ui', {
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
}
