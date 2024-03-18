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

  override async onModuleInit(sdkKey?: string) {
    this.sdkKey = sdkKey ? sdkKey : this.config.getOrThrow('LD_SDK_KEY');

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
    if (!this.client.on) await this.onModuleInit();

    const response = await this.client.variation(flag, context || this.context, null);
    this.client.track(flag, this.context);
    this.logger.log(`JsonFlag: ${flag} called`, {
      context: context || this.context,
      response,
    });

    await this.client.flush();

    return response;
  }

  /**
   * Get boolean flag
   * @param flag
   * @param defaultValue
   * @param context
   */
  async getBooleanFlag(flag: string, defaultValue?: any, context?: DarklyContext): Promise<boolean> {
    if (!this.client.on) await this.onModuleInit();

    const response = (await this.client.variation(flag, context || this.context, defaultValue)) as boolean;

    this.logger.log(`[${response ? '✅ Enabled' : '🛑Disabled'}] ${flag}`, {
      context: context || this.context,
      enabled: response,
    });

    this.client.track(flag, this.context);

    await this.client.flush();

    return response;
  }

  /**
   * Get string flag
   * @param flag
   * @param defaultValue
   * @param context
   */
  async getStringFlag(flag: string, defaultValue?: any, context?: DarklyContext): Promise<string> {
    if (!this.client.on) await this.onModuleInit();

    const response = await this.client.variation(flag, context || this.context, defaultValue);

    this.client.track(flag, this.context);

    await this.client.flush();

    return response;
  }

  /**
   * Get numeric flag
   * @param flag
   * @param defaultValue
   * @param context
   */
  async getNumberFlag(flag: string, defaultValue?: any, context?: DarklyContext): Promise<number> {
    if (!this.client.on) await this.onModuleInit();

    const response = await this.client.variation(flag, context || this.context, defaultValue);

    this.client.track(flag, this.context);

    await this.client.flush();

    return response;
  }

  /**
   * Subscribe to changes on specified json flag
   * @param key
   * @param callback
   */
  async subscribeToJsonFlagChanges(key: string, callback: (flagValue: any) => void): Promise<void> {
    if (!this.client.on) await this.onModuleInit();
    // Register a callback to be invoked when specified json feature flag changes
    this.client.on(`update:${key}`, async (flag: any) => {
      callback(await this.getJSONFlag(flag.key, this.context));
    });
  }

  /**
   * Subscribe to changes to all json flags
   * @param callback
   */
  async subscribeToAnyJsonFlagChanges(callback: (flagValue: any) => void): Promise<void> {
    if (!this.client.on) await this.onModuleInit();

    // Register a callback to be invoked when any json feature flag changes
    this.client.on(`update`, async (flag: any) => {
      callback(await this.getJSONFlag(flag.key, this.context));
    });
  }

  /**
   * Subscribe to changes to specified string flag
   * @param key
   * @param callback
   */
  async subscribeToStringFlagChanges(key: string, callback: (flagValue: string) => void): Promise<void> {
    if (!this.client.on) await this.onModuleInit();
    // Register a callback to be invoked when specified boolean feature flag changes
    this.client.on(`update:${key}`, async (flag: any) => {
      callback(await this.getStringFlag(flag.key, this.context));
    });
  }

  /**
   * Subscribe to changes to specified number flag
   * @param key
   * @param callback
   */
  subscribeToNumericFlagChanges(key: string, callback: (flagValue: number) => void): void {
    // Register a callback to be invoked when specified boolean feature flag changes
    this.client.on(`update:${key}`, async (flag: any) => {
      callback(await this.getNumberFlag(flag.key, this.context));
    });
  }

  /**
   * Subscribe to changes to specified boolean | string | number flag
   * @param key
   * @param callback
   */
  async subscribeToBooleanFlagChanges(key: string, callback: (flagValue: boolean) => void): Promise<void> {
    if (!this.client.on) await this.onModuleInit();

    // Register a callback to be invoked when specified boolean feature flag changes
    this.client.on(`update:${key}`, async (flag: any) => {
      callback(await this.getBooleanFlag(flag.key, this.context));
    });
  }

  /**
   * Subscribe to changes on all boolean flags
   * @param callback
   */
  async subscribeToAllChanges(callback: (flagValue: any) => void): Promise<void> {
    if (!this.client.on) await this.onModuleInit();
    // Register a callback to be invoked when any boolean feature flag changes
    this.client.on(`update`, async (flag: string) => {
      callback(await this.getBooleanFlag(flag, this.context));
    });
  }
}
