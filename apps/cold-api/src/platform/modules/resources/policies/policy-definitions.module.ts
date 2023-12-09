import { Module } from '@nestjs/common';

import { ColdCacheModule, PrismaModule } from '@coldpbc/nest';
import { PolicyDefinitionsController } from './policy-definitions.controller';
import { PolicyDefinitionsService } from './policy-definitions.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule, PrismaModule, ColdCacheModule],
  controllers: [PolicyDefinitionsController],
  providers: [ConfigService, PolicyDefinitionsService],
})
export class PolicyDefinitionsModule {}
