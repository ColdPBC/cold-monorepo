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
  client: sdk.LDClient = {} as sdk.LDClient;
  context: DarklyContext = {
    kind: 'host',
    name: 'hostname',
    key: 'cold-api-nest',
  };
  initialized: boolean = false;
  sdkKey: string = '';

  constructor(private config: ConfigService) {
    super('DarklyService');
    if (this.client && this.context && this.initialized && this.sdkKey) return this;
  }

  override async onModuleInit() {
    this.sdkKey = this.config.getOrThrow('LD_SDK_KEY');

    this.client = sdk.init(this.sdkKey, {
      logger: this.logger,
      sendEvents: true,
      stream: true,
      application: {
        id: this.details.service,
        version: this.details.version,
      },
    });

    await this.client.waitForInitialization();

    if (this.client) {
      this.initialized = this.client.initialized();
      this.client.track(`client called`, this.context);
      await this.client.flush();
    }
  }

  /**
   * Get JSON flag
   * @param {string} flag
   * @param {DarklyContext} context
   * @returns {Promise<any>}
   */
  async getJSONFlag(flag: string, context?: DarklyContext): Promise<any> {
    const response = await this.client.variation(flag, context || this.context, null);
    this.client.track(`${flag} called`, this.context);
    this.logger.log(`flag: ${flag} called with response`, { context: context || this.context, response });

    await this.client.flush();

    return response;
  }

  async getFlag(flag: string, context?: DarklyContext): Promise<boolean> {
    const response = await this.client.variation(flag, context || this.context, true);
    this.logger.log(`flag: ${flag} called with response`, { context: context || this.context, response });

    this.client.track(`${flag} called`, this.context);
    await this.client.flush();

    return response;
  }

  // Method to subscribe to feature flag changes
  subscribeToFlagChanges(key: string, callback: (flagValue: boolean) => void): void {
    // Register a callback to be invoked when the feature flag changes
    this.client.on(`update:${key}`, async (flag: any) => {
      callback(await this.getFlag(flag.key, this.context));
    });
  }

  // Method to subscribe to feature flag changes
  subscribeToAnyChanges(callback: (flagValue: boolean) => void): void {
    // Register a callback to be invoked when the feature flag changes
    this.client.on(`update`, async (flag: string) => {
      callback(await this.getFlag(flag, this.context));
    });
  }
}
