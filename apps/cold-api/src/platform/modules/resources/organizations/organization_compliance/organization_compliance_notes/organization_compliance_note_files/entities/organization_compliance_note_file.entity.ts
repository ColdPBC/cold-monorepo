import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationComplianceNote } from '../../entities/organization_compliance_note.entity';
import { OrganizationFile } from '../../../../files/entities/organization_file.entity';

@Entity('organization_compliance_note_files')
export class OrganizationComplianceNoteFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => OrganizationComplianceNote, organization_compliance_notes => organization_compliance_notes.files)
  note: OrganizationComplianceNote;

  @ManyToOne(() => OrganizationFile, organization_files => organization_files.organization_compliance_note_files)
  organization_files: OrganizationFile;
}
