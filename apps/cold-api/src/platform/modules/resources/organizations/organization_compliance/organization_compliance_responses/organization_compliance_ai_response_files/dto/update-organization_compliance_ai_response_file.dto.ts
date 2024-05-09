import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationComplianceAiResponseFileDto } from './create-organization_compliance_ai_response_file.dto';

export class UpdateOrganizationComplianceAiResponseFileDto extends PartialType(CreateOrganizationComplianceAiResponseFileDto) {}
