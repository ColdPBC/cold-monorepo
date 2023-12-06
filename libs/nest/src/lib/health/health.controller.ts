import { Controller, Get, Req } from '@nestjs/common';
import { Public } from '../decorators';
import { BaseWorker } from '../worker';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController extends BaseWorker {
  constructor(private readonly service: HealthService) {
    super(HealthController.name);
  }

  /**
   * Used for health checks
   * @returns {Promise<any>}
   */
  @Get()
  @Public()
  public async health(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
    },
  ) {
    return this.service.health(req);
  }
}
