import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ComplianceSection } from '../../compliance_sections/entities/compliance_section.entity';
import { OrganizationComplianceResponse } from '../../organizations/organization_compliance/organization_compliance_responses/entities/organization_compliance_response.entity';
import { OrganizationComplianceAiResponse } from '../../organizations/organization_compliance/organization_compliance_responses/organization_compliance_ai_responses/entities/organization_compliance_ai_response.entity';
import { OrganizationComplianceQuestionBookmarks } from '../../organizations/organization_compliance/organization_compliance_bookmarks/entities/organization_compliance_bookmark.entity';

@Entity('compliance_questions')
export class ComplianceQuestion {
  id: string;

  @Column()
  key: string;

  @Column('int')
  order: number;

  @Column()
  prompt: string;

  @Column()
  component: string;

  @Column({ nullable: true })
  tooltip: string;

  @Column({ nullable: true })
  placeholder: string;

  @Column('json', { nullable: true })
  rubric: object;

  @Column('json', { nullable: true })
  options: object;

  @Column({ nullable: true })
  dependency_expression: string;

  @Column({ nullable: true })
  question_summary: string;

  @Column({ nullable: true })
  coresponding_question: string;

  @Column('json', { nullable: true })
  additional_context: object;

  @ManyToOne(() => ComplianceSection, complianceSections => complianceSections.compliance_questions)
  compliance_section: ComplianceSection;

  @ManyToOne(() => OrganizationComplianceResponse, organization_compliance_response => organization_compliance_response.compliance_question)
  organization_compliance_response: OrganizationComplianceResponse;

  @ManyToOne(() => OrganizationComplianceAiResponse, organization_compliance_ai_response => organization_compliance_ai_response.compliance_question)
  organization_compliance_ai_response: OrganizationComplianceAiResponse;

  @OneToMany(() => OrganizationComplianceQuestionBookmarks, bookmarks => bookmarks.compliance_question)
  question_bookmarks: OrganizationComplianceQuestionBookmarks[];
}
