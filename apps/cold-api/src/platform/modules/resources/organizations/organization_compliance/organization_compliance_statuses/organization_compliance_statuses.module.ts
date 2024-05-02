import { Module } from '@nestjs/common';
import { OrganizationComplianceStatusesService } from './organization_compliance_statuses.service';
import { OrganizationComplianceStatusesController } from './organization_compliance_statuses.controller';

@Module({
  controllers: [OrganizationComplianceStatusesController],
  providers: [OrganizationComplianceStatusesService],
})
export class OrganizationComplianceStatusesModule {}
