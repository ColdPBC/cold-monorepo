import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BaseWorker } from '../../worker/worker.class';
import { CacheService } from '../cache/cache.service';
import { PrismaService } from '../vendor/prisma/prisma.service';

@Injectable()
export class TestOrgCleanup extends BaseWorker {
  constructor(private readonly prisma: PrismaService, private readonly cacheService: CacheService) {
    super(TestOrgCleanup.name);
  }

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }
}
