import { compliance_definitions, compliance_section_groups } from '@prisma/client';
import { ComplianceSectionsExtendedDto } from '../../compliance-sections';

export class ComplianceSectionGroupsExtendedDto implements Partial<compliance_section_groups> {
  id?: string;
  title?: string;
  metadata?: string;
  compliance_definition_name?: string;
  order?: number;
  compliance_sections?: ComplianceSectionsExtendedDto[];
  compliance_definition?: compliance_definitions;
}
