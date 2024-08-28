import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { OrganizationComplianceNote } from './organization-compliance-note';
import { OrganizationFile } from './organization-file';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

@Entity({ tableName: 'organization_compliance_note_files' })
export class OrganizationComplianceNoteFile {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @ManyToOne({ entity: () => OrganizationComplianceNote, ref: true, index: 'organization_compliance_note__organization_compliance_note__idx' })
  organizationComplianceNote!: Ref<OrganizationComplianceNote>;

  @ManyToOne({ entity: () => OrganizationFile, ref: true, fieldName: 'organization_files_id', index: 'organization_compliance_note_files_organization_files_id_idx' })
  organizationFile!: Ref<OrganizationFile>;

  @Property({ type: 'boolean', default: false })
  deleted = false;
}
