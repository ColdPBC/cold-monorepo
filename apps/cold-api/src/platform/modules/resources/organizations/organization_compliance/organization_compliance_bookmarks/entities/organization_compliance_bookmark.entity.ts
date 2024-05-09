import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ComplianceQuestion } from '../../../../compliance_questions/entities/compliance_question.entity';
import { OrganizationCompliance } from '../../entities/organization_compliance.entity';

@Entity('organization_compliance_question_bookmarks')
export class OrganizationComplianceQuestionBookmarks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => ComplianceQuestion, compliance_questions => compliance_questions.question_bookmarks)
  compliance_question: ComplianceQuestion;

  @ManyToOne(() => OrganizationCompliance, organization_compliance => organization_compliance.question_bookmarks)
  organization_compliance: OrganizationCompliance;
}
