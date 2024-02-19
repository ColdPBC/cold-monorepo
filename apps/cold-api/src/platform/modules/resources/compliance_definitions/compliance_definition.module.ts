import { Module } from '@nestjs/common';
import { ComplianceController } from './compliance.controller';
import { ComplianceDefinitionService } from './compliance_definition.service';

@Module({
  controllers: [ComplianceController],
  providers: [ComplianceDefinitionService],
  exports: [ComplianceDefinitionService],
})
export class ComplianceDefinitionModule {}
