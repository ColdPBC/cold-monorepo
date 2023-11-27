import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BaseWorker } from '../worker';
import { CacheService } from '../cache';
import { PrismaService } from '../prisma';

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
