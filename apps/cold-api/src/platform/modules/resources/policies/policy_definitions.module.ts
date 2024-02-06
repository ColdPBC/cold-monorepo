import { Module } from '@nestjs/common';

import { ColdCacheModule, MqttModule, PrismaModule } from '@coldpbc/nest';
import { Policy_definitionsController } from './policy_definitions.controller';
import { Policy_definitionsService } from './policy_definitions.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule, PrismaModule, ColdCacheModule, MqttModule],
  controllers: [Policy_definitionsController],
  providers: [ConfigService, Policy_definitionsService],
  exports: [Policy_definitionsService],
})
export class Policy_definitionsModule {}
