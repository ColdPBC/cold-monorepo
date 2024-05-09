import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationComplianceNote } from '../../entities/organization_compliance_note.entity';

@Entity('organization_compliance_note_links')
export class OrganizationComplianceNoteLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => OrganizationComplianceNote, organizationComplianceNote => organizationComplianceNote.organization_compliance_note_links)
  note: OrganizationComplianceNote;
}
