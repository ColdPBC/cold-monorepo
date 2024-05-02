import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationComplianceResponseDto } from './create-organization_compliance_response.dto';

export class UpdateOrganizationComplianceResponseDto extends PartialType(CreateOrganizationComplianceResponseDto) {}
