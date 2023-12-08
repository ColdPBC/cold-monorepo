import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { BaseWorker } from '../worker';
import { CacheService } from '../cache';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { get, set } from 'lodash';

export interface Auth0APIOptions {
  baseURL: string;
  headers: { 'content-type': string; Authorization: string | null };
  validateStatus: any;
}

@Injectable()
export class Auth0TokenService extends BaseWorker {
  tokenBody: {
    client_id: string;
    client_secret: string;
    audience: string;
    grant_type: string;
    scope?: string;
  };
  expiresAt: number = 0;

  options: {
    baseURL: string;
    headers: { 'content-type': string; Authorization: string | null };
    validateStatus: any;
  };

  httpService: HttpService;
  config: ConfigService;

  constructor(private cache: CacheService) {
    super(Auth0TokenService.name);
    this.httpService = new HttpService();
    this.config = new ConfigService();

    this.tokenBody = {
      client_id: this.config.get<string>('AUTH0_CLIENT_ID') || '',
      client_secret: this.config.get<string>('AUTH0_CLIENT_SECRET') || '',
      audience: `https://${this.config.get<string>('AUTH0_DOMAIN')}/api/v2/`,
      grant_type: 'client_credentials',
    };

    this.options = {
      baseURL: `https://${this.config.get<string>('AUTH0_DOMAIN')}/api/v2`,
      headers: { 'content-type': 'application/json', Authorization: null },
      validateStatus: (status: any) => {
        return status >= 200 && status < 400;
      },
    };

    this.init();
  }

  async init(): Promise<AxiosRequestConfig<any>> {
    try {
      if (this.cache) {
        const token: any = await this.cache.get('auth0-management-token');
        if (!token) {
          await this.getManagementToken();
        }

        await this.setOptions(token);
      }

      if (!this.options.headers.Authorization || this.expiresAt < new Date().getSeconds()) {
        //this.logger = new WorkerLogger(Auth0UtilityService.name);
        await this.getManagementToken();
        return this.options;
      }

      return this.options;
    } catch (e: any) {
      if (e.response) {
        this.logger.error(e.response?.data?.message, { error: e.response?.data });
      }
      this.logger.error(e, { error: e.response });

      throw e;
    }
  }

  /***
   * Get Management Token from Auth0
   */
  async getManagementToken() {
    this.logger.info('Requesting Auth0 Management Token');
    const tokenBody = Object.assign({}, this.tokenBody);
    tokenBody.client_id = this.config.get<string>('AUTH0_CLIENT_ID') || '';

    const tokenResponse = await this.httpService.axiosRef.post(`https://${this.config.get<string>('AUTH0_DOMAIN')}/oauth/token`, tokenBody, this.options);

    if (tokenResponse.data['access_token']) {
      await this.setOptions(tokenResponse);

      if (this.cache) {
        await this.cache.set('auth0-management-token', tokenResponse.data, { ttl: 1000 * 60 * 60 * 20, update: true });
      }
    }
  }

  async setOptions(tokenResponse: AxiosResponse<any>) {
    this.options.headers.Authorization = `Bearer ${get(tokenResponse, 'data.access_token', get(tokenResponse, 'access_token'))}`;
    //auth0-management-token
    this.expiresAt = new Date().setSeconds(get(tokenResponse, 'data.expires_in', get(tokenResponse, 'expires_in')));
    set(tokenResponse.data, 'expiresAt', this.expiresAt);

    return this.options;
  }
}
