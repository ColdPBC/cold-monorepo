import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CacheService, BaseWorker } from '@coldpbc/nest';

export interface Auth0APIOptions {
  baseURL: string;
  headers: { 'content-type': string; Authorization: string | null };
  validateStatus: any;
}

@Injectable()
export class Auth0UtilityService extends BaseWorker {
  tokenBody: {
    client_id: string;
    client_secret: string;
    audience: string;
    grant_type: string;
    scope?: string;
  };
  expiresAt: number;

  options: {
    baseURL: string;
    headers: { 'content-type': string; Authorization: string | null };
    validateStatus: any;
  };

  httpService: HttpService;
  config: ConfigService;

  constructor(private readonly cache: CacheService) {
    super('Auth0UtilityService');
    this.httpService = new HttpService();
    this.config = new ConfigService();
    //this.logger = new WorkerLogger(Auth0UtilityService.name);
    this.tokenBody = {
      client_id: this.config.get<string>('AUTH0_CLIENT_ID') || '',
      client_secret: this.config.get<string>('AUTH0_CLIENT_SECRET') || '',
      audience: `https://${this.config.get<string>('AUTH0_DOMAIN')}/api/v2/`,
      grant_type: 'client_credentials',
    };

    this.options = {
      baseURL: `https://${this.config.get<string>('AUTH0_DOMAIN')}/api/v2`,
      headers: { 'content-type': 'application/json', Authorization: null },
      validateStatus: status => {
        return status >= 200 && status < 400;
      },
    };
  }

  async init(): Promise<Auth0APIOptions> {
    try {
      if (!this.options.headers.Authorization || this.expiresAt < new Date().getSeconds()) {
        await this.getManagementToken();
        return this.options;
      }

      return this.options;
    } catch (e) {
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
    const tokenBody = Object.assign({}, this.tokenBody);
    tokenBody.client_id = this.config.get<string>('AUTH0_CLIENT_ID') || '';

    const tokenResponse = await this.httpService.axiosRef.post(`https://${this.config.get<string>('AUTH0_DOMAIN')}/oauth/token`, tokenBody, this.options);

    this.options.headers.Authorization = `Bearer ${tokenResponse.data.access_token}`;
    this.expiresAt = new Date().setSeconds(tokenResponse.data.expires_in);
  }
}
