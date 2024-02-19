import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '@coldpbc/nest';
import { Policy_definitionsModule } from '../policies/policy_definitions.module';
import { ComponentDefinitionsController } from './component-definitions.controller';
import { ComponentDefinitionsService } from './component-definitions.service';

@Module({
  imports: [Policy_definitionsModule],
  controllers: [ComponentDefinitionsController],
  providers: [ComponentDefinitionsService, JwtService, JwtStrategy],
  exports: [ComponentDefinitionsService, JwtService, JwtStrategy],
})
export class ComponentDefinitionsModule {}
