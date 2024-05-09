import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ComplianceQuestion } from '../../../../compliance_questions/entities/compliance_question.entity';
import { OrganizationCompliance } from '../../entities/organization_compliance.entity';
import { OrganizationComplianceAiResponse } from '../organization_compliance_ai_responses/entities/organization_compliance_ai_response.entity';

@Entity('organization_compliance_responses')
export class OrganizationComplianceResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  value: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => ComplianceQuestion, compliance_questions => compliance_questions.compliance_section)
  compliance_question: ComplianceQuestion;

  @ManyToOne(() => OrganizationCompliance, organization_compliance => organization_compliance.compliance_definition)
  organization_compliance: OrganizationCompliance;

  @ManyToOne(() => OrganizationComplianceAiResponse, organization_compliance_ai_responses => organization_compliance_ai_responses.organization_compliance_responses)
  ai_response: OrganizationComplianceAiResponse;
}
