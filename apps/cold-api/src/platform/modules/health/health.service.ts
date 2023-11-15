import { Injectable } from '@nestjs/common';
import { get } from 'lodash';
import { Request, Response } from 'express';
import { BaseWorker } from '../../worker/worker.class';

@Injectable()
export class HealthService extends BaseWorker {
  constructor() {
    super(HealthService.name);
  }

  /**
   * Used for health checks
   * @returns {Promise<any>}
   */
  async health(req: Request, res: Response): Promise<any> {
    if (get(process.env, 'ENABLE_HEALTH_LOGS', false)) {
      this.logger.log('Health check request:', { req });
      this.logger.log('Health check response:', { res });
    }
    return res.status(200).json({ message: 'OK' });
  }
}
