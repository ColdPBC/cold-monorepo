import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { OrganizationComplianceNote } from './organization-compliance-note';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

@Entity({ tableName: 'organization_compliance_note_links' })
export class OrganizationComplianceNoteLink {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @Property({ type: 'text' })
  url!: string;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @ManyToOne({ entity: () => OrganizationComplianceNote, ref: true, index: 'organization_compliance_note__organization_compliance_note_idx1' })
  organizationComplianceNote!: Ref<OrganizationComplianceNote>;

  @Property({ type: 'boolean', default: false })
  deleted = false;
}
