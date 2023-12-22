import { Injectable } from '@nestjs/common';
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
  async health(): Promise<any> {
    return 'ok';
  }
}
