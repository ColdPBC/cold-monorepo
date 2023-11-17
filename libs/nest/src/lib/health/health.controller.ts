import { Controller, Get, Req, Res } from '@nestjs/common';
import { Public } from '../decorators';
import { BaseWorker } from '../worker';
import { HealthService } from './health.service';
import { Request, Response } from 'express';

@Controller()
export class HealthController extends BaseWorker {
  constructor(private readonly service: HealthService) {
    super(HealthController.name);
  }

  /**
   * Used for health checks
   * @returns {Promise<any>}
   */
  @Get('health')
  @Public()
  public health(
    @Req()
    req: Request,
    @Res() res: Response,
  ) {
    return this.service.health(req, res);
  }
}
