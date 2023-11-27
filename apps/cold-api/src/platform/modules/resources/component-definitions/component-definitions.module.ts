import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy, ColdCacheModule, CacheService, PrismaModule } from '@coldpbc/nest';
import { PolicyDefinitionsModule } from '../policies/policy-definitions.module';
import { ComponentDefinitionsController } from './component-definitions.controller';
import { ComponentDefinitionsService } from './component-definitions.service';

@Module({
  imports: [PrismaModule, ColdCacheModule, PolicyDefinitionsModule],
  controllers: [ComponentDefinitionsController],
  providers: [ComponentDefinitionsService, JwtService, JwtStrategy, CacheService],
})
export class ComponentDefinitionsModule {}
