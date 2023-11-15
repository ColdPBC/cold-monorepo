import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ColdCacheModule } from '../cache/cache.module';
import { PrismaModule } from '../vendor/prisma/prisma.module';
import { TestOrgCleanup } from './testOrgCleanup.cron';

@Module({
  imports: [PrismaModule, ColdCacheModule, ScheduleModule.forRoot()],
  providers: [TestOrgCleanup],
})
export class CronModule {}
