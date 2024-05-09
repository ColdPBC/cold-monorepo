import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationComplianceDto } from './create-organization_compliance.dto';

export class UpdateOrganizationComplianceDto extends PartialType(CreateOrganizationComplianceDto) {}
