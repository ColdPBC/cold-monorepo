import { compliance_definitions, compliance_questions, compliance_sections, organizations, Prisma } from '@prisma/client';
import { ComplianceSectionsExtendedDto } from '../../compliance-sections/dto/compliance-sections-extended.dto';

export class ComplianceQuestionsExtendedDto implements Partial<compliance_questions> {
  id?: string;
  key?: string;
  order?: number;
  prompt?: string;
  component?: string;
  tooltip?: string;
  placeholder?: string;
  rubric?: any;
  options?: any;
  dependency_expression?: string;
  question_summary?: string;
  additional_context?: any;
  created_at?: Date;
  updated_at?: Date;
  compliance_section_id?: string;
  coresponding_question?: string;
  compliance_definition_name?: string;
  dependencies?: any;
  compliance_question_dependency_chain_id?: string;
  compliance_section?: ComplianceSectionsExtendedDto;
  compliance_definition?: compliance_definitions;
}
