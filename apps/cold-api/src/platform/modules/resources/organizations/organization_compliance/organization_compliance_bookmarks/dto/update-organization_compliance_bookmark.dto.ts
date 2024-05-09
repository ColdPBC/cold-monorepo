import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationComplianceBookmarkDto } from './create-organization_compliance_bookmark.dto';

export class UpdateOrganizationComplianceBookmarkDto extends PartialType(CreateOrganizationComplianceBookmarkDto) {}
