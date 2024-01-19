import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService, ColdCacheModule, JwtStrategy, PrismaModule } from '@coldpbc/nest';
import { ComplianceController } from './compliance.controller';
import { ComplianceDefinitionService } from './compliance_definition.service';

@Module({
  imports: [PrismaModule, ColdCacheModule],
  controllers: [ComplianceController],
  providers: [ComplianceDefinitionService, JwtService, JwtStrategy, CacheService],
  exports: [ComplianceDefinitionService],
})
export class ComplianceDefinitionModule {}
