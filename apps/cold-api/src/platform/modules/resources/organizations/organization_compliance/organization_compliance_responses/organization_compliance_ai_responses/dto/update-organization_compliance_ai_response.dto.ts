import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationComplianceAiResponseDto } from './create-organization_compliance_ai_response.dto';

export class UpdateOrganizationComplianceAiResponseDto extends PartialType(CreateOrganizationComplianceAiResponseDto) {}
