import { Module } from '@nestjs/common';
import { ComplianceController } from './compliance.controller';
import { ComplianceDefinitionService } from './compliance_definition.service';
import { DarklyModule } from '@coldpbc/nest';

@Module({
  imports: [DarklyModule.forRoot()],
  controllers: [ComplianceController],
  providers: [ComplianceDefinitionService],
  exports: [ComplianceDefinitionService],
})
export class ComplianceDefinitionModule {}
