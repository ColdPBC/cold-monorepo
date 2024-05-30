import { compliance_questions, compliance_sections } from '@prisma/client';

export class ComplianceSectionsExtendedDto implements Partial<compliance_sections> {
  id?: string;
  title?: string;
  metadata?: string;
  key?: string;
  order?: number;
  compliance_definition_name?: string;
  dependency_expression?: string;
  compliance_section_group_id?: string;
  compliance_section_dependency_chains?: any;
  compliance_section_dependency_chain_id?: string;
  compliance_section_group?: any;
  compliance_questions?: compliance_questions[];
}
