import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceQuestion } from './compliance-question';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceNoteFile } from './organization-compliance-note-file';
import { OrganizationComplianceNoteLink } from './organization-compliance-note-link';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

@Entity({ tableName: 'organization_compliance_notes' })
export class OrganizationComplianceNote {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @Property({ type: 'text' })
  note!: string;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @ManyToOne({ entity: () => ComplianceQuestion, ref: true, index: 'organization_compliance_notes_compliance_question_id_idx' })
  complianceQuestion!: Ref<ComplianceQuestion>;

  @ManyToOne({ entity: () => OrganizationCompliance, ref: true, index: 'organization_compliance_notes_organization_compliance_id_idx' })
  organizationCompliance!: Ref<OrganizationCompliance>;

  @Property({ type: 'boolean', default: false })
  deleted = false;

  @Property({ type: 'json', nullable: true })
  metadata?: Record<string, unknown>;

  @OneToMany({ entity: () => OrganizationComplianceNoteFile, mappedBy: 'organizationComplianceNote' })
  organizationComplianceNoteFiles = new Collection<OrganizationComplianceNoteFile>(this);

  @OneToMany({ entity: () => OrganizationComplianceNoteLink, mappedBy: 'organizationComplianceNote' })
  organizationComplianceNoteLinks = new Collection<OrganizationComplianceNoteLink>(this);
}
