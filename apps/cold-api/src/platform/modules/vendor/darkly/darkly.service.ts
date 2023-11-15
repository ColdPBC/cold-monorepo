import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../worker/worker.class';
import * as sdk from '@launchdarkly/node-server-sdk';

interface DarklyContext {
  kind: string;
  name: string;
  key: string;
}

@Injectable()
export class DarklyService extends BaseWorker {
  darkly: sdk.LDClient;
  context: DarklyContext;
  initialized: boolean;
  sdkKey: string;

  constructor() {
    super('DarklyService');

    if (this.initialized) return this;

    this.context = {
      kind: 'host',
      name: 'hostname',
      key: 'cold-api-nest',
    };

    if (!process.env.LD_SDK_KEY) {
      this.logger.warn('LaunchDarkly SDK Key not found');
    } else {
      this.sdkKey = process.env.LD_SDK_KEY;
    }

    this.init();
  }

  async init(): Promise<void> {
    this.darkly = sdk.init(process.env.LD_SDK_KEY || '', {
      logger: this.logger,
      sendEvents: true,
      stream: true,
      application: {
        id: this.details.pkg_name,
        version: this.details.pkg_version,
      },
    });

    await this.darkly.waitForInitialization();

    this.initialized = this.darkly.initialized();
    this.darkly.track(`client called`, this.context);
    await this.darkly.flush();
  }

  /**
   * Get JSON flag
   * @param {string} flag
   * @param {DarklyContext} context
   * @returns {Promise<any>}
   */
  async getJSONFlag(flag: string, context?: DarklyContext): Promise<any> {
    if (!this.initialized) {
      await this.darkly.waitForInitialization();
    }
    const response = await this.darkly.variation(flag, context || this.context, null);
    this.darkly.track(`${flag} called`, this.context);
    await this.darkly.flush();

    return response;
  }

  async getFlag(flag: string, context?: DarklyContext): Promise<boolean> {
    if (!this.initialized) {
      await this.darkly.waitForInitialization();
    }
    const response = await this.darkly.variation(flag, context || this.context, true);
    this.darkly.track(`${flag} called`, this.context);
    await this.darkly.flush();

    return response;
  }
}
