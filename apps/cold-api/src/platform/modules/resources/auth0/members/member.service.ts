import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Span } from 'nestjs-ddtrace';
import { Auth0TokenService, BaseWorker, CacheService, MqttService } from '@coldpbc/nest';
import { filter } from 'lodash';
import { AxiosRequestConfig } from 'axios';

@Span()
@Injectable()
export class MemberService extends BaseWorker {
  options: AxiosRequestConfig<any>;

  private httpService: HttpService;

  constructor(readonly utilService: Auth0TokenService, readonly cacheService: CacheService, readonly mqtt: MqttService) {
    super('MemberService');
    this.httpService = new HttpService();
  }

  /***
   * Get members by email from Auth0
   * @param email
   * @param user
   * @param bpc
   */
  async getMemberByEmail(email: string, req: any, bpc?: boolean, force?: boolean) {
    const { user } = req;
    if (!force && !user.isColdAdmin && user.coldclimate_claims.email !== email) {
      throw new UnauthorizedException(`You are not authorized to get this user: ${email}`);
    }

    try {
      if (!bpc) {
        const cached = await this.cacheService.get(`auth0:members:${email}`);
        if (cached) {
          return cached;
        }
      }

      this.options = await this.utilService.init();

      email = email.replace('+', '%2B');

      const results = await this.httpService.axiosRef.get(`/users-by-email?email=${email}`, this.options);
      if (!results?.data || results.data.length < 1) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      await this.cacheService.delete(`organizations:${user.coldclimate_claims.org_id}:members:${email}`);
      await this.cacheService.delete(`organizations:${user.coldclimate_claims.org_id}:members`);

      await this.cacheService.set(`organizations:${user.coldclimate_claims.org_id}:members:${email}`, results.data[0], {
        ttl: 1000 * 60 * 60 * 24 * 7,
        update: true,
      });

      return results.data[0];
    } catch (e) {
      if (e.statusCode === 404 || e.response.statusCode === 404) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      if (e.response?.data) {
        this.logger.error(e.response.data, { error: e, email, user, bpc });
        if (e.response.data.statusCode === 404) {
          throw new NotFoundException(`User with email ${email} not found`);
        }

        throw new UnprocessableEntityException(e.response.data);
      } else {
        this.logger.error(e.message, { error: e, email, user, bpc });
        throw new UnprocessableEntityException(e);
      }
    }
  }

  /***
   * Get all members from Auth0
   */
  async getMembers() {
    try {
      this.options = await this.utilService.init();

      const response = await this.httpService.axiosRef.get(`/users`, this.options);
      return response.data;
    } catch (e) {
      this.logger.error(e.response.data);
      return e.response.data;
    }
  }

  /***
   * Update member Roles in Auth0
   * @param roleName
   * @param members
   */
  async updateUserRoles(roleName: string, members: string[]) {
    try {
      this.options = await this.utilService.init();

      this.logger.info('updating user roles', { roleName, members });
      const role = await this.resolveRoleByName(roleName);
      const response = await this.httpService.axiosRef.post(`/roles/${role.id}/users`, { users: members }, this.options);

      return response.data;
    } catch (e) {
      this.logger.error(e.response.data);
      return e.response.data;
    }
  }

  /***
   * Get list of roles from Auth0
   */
  async getRoles() {
    try {
      this.logger.log('getting roles');
      this.options = await this.utilService.init();

      const roles = await this.httpService.axiosRef.get(`/roles`, this.utilService.options);
      return roles.data;
    } catch (e) {
      this.logger.error(e.response.data);
      return e.response.data;
    }
  }

  /***
   * Create member in Auth0
   */
  async deleteUser(userId: string) {
    try {
      this.options = await this.utilService.init();

      const member = await this.httpService.axiosRef.delete(`/users/${userId}`, this.utilService.options);
      return member.data;
    } catch (e) {
      this.logger.error(e.response.data);
      return e.response.data;
    }
  }

  /***
   * Get list of roles from Auth0
   */
  async resolveRoleByName(roleName: string) {
    try {
      this.logger.log('getting roles');

      this.options = await this.utilService.init();

      const roles = await this.httpService.axiosRef.get(`/roles`, this.utilService.options);

      const role = filter(roles.data, { name: roleName });

      return role[0];
    } catch (e) {
      this.logger.error(e.response.data);
      return e.response.data;
    }
  }

  /***
   * Create member in Auth0
   */
  async createMember(
    req: any,
    user: {
      email_verified?: boolean;
      given_name?: string;
      picture?: string;
      password?: string;
      blocked?: boolean;
      name?: string;
      nickname?: string;
      connection?: string;
      family_name?: string;
      verify_email?: boolean;
      email: string;
    },
  ) {
    const { url } = req;
    try {
      this.options = await this.utilService.init();

      const member = await this.httpService.axiosRef.post(`/users`, user, this.utilService.options);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          user,
        },
      });

      return member.data;
    } catch (e) {
      this.logger.error(e.response.data);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          error: e.message,
          user,
        },
      });
      throw e.response.data;
    }
  }

  /***
   * Create member in Auth0
   */
  async updateUser(
    req: any,
    email: string,
    payload: {
      picture: string;
      password: string;
      connection: string;
      family_name: string;
      given_name: string;
    },
  ) {
    const { user, url } = req;
    try {
      if (!user.isColdAdmin && user.coldclimate_claims.email !== email) {
        throw new UnauthorizedException(`You are not authorized to update this user: ${email}`);
      }

      this.options = await this.utilService.init();

      const found = await this.getMemberByEmail(email, { user }, true);
      if (!found) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      if (!user.isColdAdmin && user.sub !== found.user_id) {
        throw new UnauthorizedException('You are not authorized to update this user');
      }

      const member = await this.httpService.axiosRef.patch(`/users/${found.user_id}`, payload, this.utilService.options);
      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'update',
        status: 'complete',
        data: {
          ...payload,
        },
      });
      return member.data;
    } catch (e) {
      this.logger.error(e.message, e);

      this.mqtt.publishMQTT('ui', {
        org_id: user.coldclimate_claims.org_id,
        user: user,
        swr_key: url,
        action: 'update',
        status: 'failed',
        data: {
          error: e.message,
          ...payload,
        },
      });

      throw e.message;
    }
  }

  /***
   * Send Verification Email to User in Auth0
   * @param email
   */
  async sendVerificationEmail(email: string) {
    this.options = await this.utilService.init();
    this.logger.log('sending verification email', email);
  }

  /***
   * Send Password Reset Email to User in Auth0
   * @param email
   */
  async sendPasswordResetEmail(email: string) {
    this.options = await this.utilService.init();
    this.logger.log('sending password reset email', email);
  }
}
