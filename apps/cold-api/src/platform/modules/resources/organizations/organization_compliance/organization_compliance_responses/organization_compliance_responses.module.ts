import { Module } from '@nestjs/common';
import { OrganizationComplianceResponsesService } from './organization_compliance_responses.service';
import { OrganizationComplianceResponsesController } from './organization_compliance_responses.controller';
import { OrganizationComplianceAiResponsesModule } from './organization_compliance_ai_responses/organization_compliance_ai_responses.module';
import { OrganizationComplianceAiResponseFilesModule } from './organization_compliance_ai_response_files/organization_compliance_ai_response_files.module';
import { OrganizationComplianceResponseRabbit } from './organizations_compliance_responses.rabbit';
import { MqttModule } from '../../mqtt/mqtt.module';
import { ComplianceRepositoryModule } from '@coldpbc/nest';

@Module({
  controllers: [OrganizationComplianceResponsesController],
  providers: [OrganizationComplianceResponsesService, OrganizationComplianceResponseRabbit],
  imports: [OrganizationComplianceAiResponsesModule, OrganizationComplianceAiResponseFilesModule, MqttModule, ComplianceRepositoryModule],
  exports: [OrganizationComplianceResponsesService],
})
export class OrganizationComplianceResponsesModule {}
