import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule, ColdCacheModule } from '@coldpbc/nest';
import { TestOrgCleanup } from './testOrgCleanup.cron';

@Module({
  imports: [PrismaModule, ColdCacheModule, ScheduleModule.forRoot()],
  providers: [TestOrgCleanup],
})
export class CronModule {}
