import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComplianceQuestion } from '../../../../../compliance_questions/entities/compliance_question.entity';
import { OrganizationComplianceResponse } from '../../entities/organization_compliance_response.entity';

@Entity('organization_compliance_ai_responses')
export class OrganizationComplianceAiResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  answer: string;

  @Column()
  justification: string;

  @Column('json')
  references: object;

  @Column('json')
  sources: object;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => ComplianceQuestion, compliance_questions => compliance_questions.compliance_section)
  compliance_questions: ComplianceQuestion[];

  @OneToMany(() => OrganizationComplianceResponse, organization_compliance_responses => organization_compliance_responses.ai_response)
  organization_compliance_responses: OrganizationComplianceResponse[];

  @ManyToOne(() => ComplianceQuestion, complianceQuestion => complianceQuestion.organization_compliance_ai_response)
  compliance_question: ComplianceQuestion;
}
