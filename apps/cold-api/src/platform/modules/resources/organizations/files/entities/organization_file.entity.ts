import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationComplianceNoteFile } from '../../organization_compliance/organization_compliance_notes/organization_compliance_note_files/entities/organization_compliance_note_file.entity';
import { OrganizationComplianceAiResponseFile } from '../../organization_compliance/organization_compliance_responses/organization_compliance_ai_response_files/entities/organization_compliance_ai_response_file.entity';

@Entity('organization_files')
export class OrganizationFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  bucket: string;

  @Column({ nullable: true })
  key: string;

  @Column()
  original_name: string;

  @Column()
  organization_id: string;

  @Column({ nullable: true })
  openai_assistant_id: string;

  @Column({ nullable: true })
  openai_file_id: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ nullable: true })
  integration_id: string;

  @Column({ nullable: true })
  mimetype: string;

  @Column({ nullable: true })
  size: number;

  @Column({ nullable: true })
  acl: string;

  @Column({ nullable: true })
  contentType: string;

  @Column({ nullable: true })
  encoding: string;

  @Column({ nullable: true })
  fieldname: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  versionId: string;

  @Column({ nullable: true })
  checksum: string;

  @OneToMany(() => OrganizationComplianceNoteFile, organization_compliance_note_files => organization_compliance_note_files.organization_files)
  organization_compliance_note_files: OrganizationComplianceNoteFile[];

  @OneToMany(() => OrganizationComplianceAiResponseFile, organization_compliance_ai_response_files => organization_compliance_ai_response_files.organization_files)
  organization_compliance_ai_response_files: OrganizationComplianceAiResponseFile[];
}
