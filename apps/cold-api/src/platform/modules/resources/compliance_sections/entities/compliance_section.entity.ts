import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComplianceSectionGroup } from '../../compliance_section_groups/entities/compliance_section_group.entity';
import { ComplianceQuestion } from '../../compliance_questions/entities/compliance_question.entity';

@Entity('compliance_sections')
export class ComplianceSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  dependency_expression: string;

  @Column('int')
  order: number;

  @Column('json', { nullable: true })
  metadata: object;

  @ManyToOne(() => ComplianceSectionGroup, complianceSectionGroups => complianceSectionGroups.compliance_sections)
  section_group: ComplianceSectionGroup;

  @OneToMany(() => ComplianceQuestion, complianceQuestions => complianceQuestions.compliance_section)
  compliance_questions: ComplianceQuestion[];
}
