import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService, ColdCacheModule, JwtStrategy, MqttModule, PrismaModule } from '@coldpbc/nest';
import { PolicyDefinitionsModule } from '../policies/policy-definitions.module';
import { ComponentDefinitionsController } from './component-definitions.controller';
import { ComponentDefinitionsService } from './component-definitions.service';

@Module({
  imports: [PrismaModule, ColdCacheModule, PolicyDefinitionsModule, MqttModule],
  controllers: [ComponentDefinitionsController],
  providers: [ComponentDefinitionsService, JwtService, JwtStrategy, CacheService],
  exports: [ComponentDefinitionsService, JwtService, JwtStrategy, CacheService],
})
export class ComponentDefinitionsModule {}
