import { Module } from '@nestjs/common';

import { ColdCacheModule, PrismaModule } from 'nest';
import { PolicyDefinitionsController } from './policy-definitions.controller';
import { PolicyDefinitionsService } from './policy-definitions.service';

@Module({
  imports: [PrismaModule, ColdCacheModule],
  controllers: [PolicyDefinitionsController],
  providers: [PolicyDefinitionsService],
})
export class PolicyDefinitionsModule {}
