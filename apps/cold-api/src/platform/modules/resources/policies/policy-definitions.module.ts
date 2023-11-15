import { Module } from '@nestjs/common';
import { ColdCacheModule } from '../../cache/cache.module';
import { PrismaModule } from '../../vendor/prisma/prisma.module';
import { PolicyDefinitionsController } from './policy-definitions.controller';
import { PolicyDefinitionsService } from './policy-definitions.service';

@Module({
  imports: [PrismaModule, ColdCacheModule],
  controllers: [PolicyDefinitionsController],
  providers: [PolicyDefinitionsService],
})
export class PolicyDefinitionsModule {}
