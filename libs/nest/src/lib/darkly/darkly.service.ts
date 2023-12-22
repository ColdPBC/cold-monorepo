import { Global, Injectable } from '@nestjs/common';
import { BaseWorker } from '../worker';
import * as sdk from '@launchdarkly/node-server-sdk';
import { ConfigService } from '@nestjs/config';

export interface DarklyContext {
  kind: string;
  name: string;
  key: string;
}

@Injectable()
@Global()
export class DarklyService extends BaseWorker {
  darkly: sdk.LDClient = {} as sdk.LDClient;
  context: DarklyContext = {
    kind: 'host',
    name: 'hostname',
    key: 'cold-api-nest',
  };
  initialized: boolean = false;
  sdkKey: string = '';

  constructor(private config: ConfigService) {
    super('DarklyService');
    if (this.darkly && this.context && this.initialized && this.sdkKey) return this;
  }

  override async onModuleInit() {
    this.sdkKey = this.config.getOrThrow('LD_SDK_KEY');

    this.darkly = sdk.init(this.sdkKey, {
      logger: this.logger,
      sendEvents: true,
      stream: true,
      application: {
        id: this.details.service,
        version: this.details.version,
      },
    });

    await this.darkly.waitForInitialization();

    if (this.darkly) {
      this.initialized = this.darkly.initialized();
      this.darkly.track(`client called`, this.context);
      await this.darkly.flush();
    }
  }

  /**
   * Get JSON flag
   * @param {string} flag
   * @param {DarklyContext} context
   * @returns {Promise<any>}
   */
  async getJSONFlag(flag: string, context?: DarklyContext): Promise<any> {
    const response = await this.darkly.variation(flag, context || this.context, null);
    this.darkly.track(`${flag} called`, this.context);
    this.logger.log(`flag: ${flag} called with response`, { context: context || this.context, response });

    await this.darkly.flush();

    return response;
  }

  async getFlag(flag: string, context?: DarklyContext): Promise<boolean> {
    const response = await this.darkly.variation(flag, context || this.context, true);
    this.logger.log(`flag: ${flag} called with response`, { context: context || this.context, response });

    this.darkly.track(`${flag} called`, this.context);
    await this.darkly.flush();

    return response;
  }
}
