import { Injectable } from '@nestjs/common';
import { get } from 'lodash';
import { Response } from 'express';
import { BaseWorker } from '../worker';

@Injectable()
export class HealthService extends BaseWorker {
  constructor() {
    super(HealthService.name);
  }

  /**
   * Used for health checks
   * @returns {Promise<any>}
   */
  async health(req: { body: any; headers: any; query: any }): Promise<any> {
    if (get(process.env, 'ENABLE_HEALTH_LOGS', false)) {
      this.logger.log('Health check request:', { req });
    }
    return 'ok';
  }
}
