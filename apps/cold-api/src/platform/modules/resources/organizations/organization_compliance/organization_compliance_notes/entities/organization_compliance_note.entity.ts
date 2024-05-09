import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComplianceQuestion } from '../../../../compliance_questions/entities/compliance_question.entity';
import { OrganizationCompliance } from '../../entities/organization_compliance.entity';
import { OrganizationComplianceNoteLink } from '../organization_compliance_note_links/entities/organization_compliance_note_link.entity';
import { OrganizationComplianceNoteFile } from '../organization_compliance_note_files/entities/organization_compliance_note_file.entity';

@Entity('organization_compliance_notes')
export class OrganizationComplianceNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  note: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => ComplianceQuestion, compliance_questions => compliance_questions.compliance_section)
  compliance_question: ComplianceQuestion;

  @ManyToOne(() => OrganizationCompliance, organization_compliance => organization_compliance.organization_compliance_notes)
  organization_compliance: OrganizationCompliance;

  @OneToMany(() => OrganizationComplianceNoteLink, organizationComplianceNoteLink => organizationComplianceNoteLink.note)
  organization_compliance_note_links: OrganizationComplianceNoteLink[];

  @OneToMany(() => OrganizationComplianceNoteFile, organizationComplianceNoteFile => organizationComplianceNoteFile.note)
  files: OrganizationComplianceNoteFile[];
}
