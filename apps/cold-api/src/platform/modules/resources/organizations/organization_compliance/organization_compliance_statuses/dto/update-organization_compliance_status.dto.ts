import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationComplianceStatusDto } from './create-organization_compliance_status.dto';

export class UpdateOrganizationComplianceStatusDto extends PartialType(CreateOrganizationComplianceStatusDto) {}
