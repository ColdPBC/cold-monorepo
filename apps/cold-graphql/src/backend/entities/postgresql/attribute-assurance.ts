import { Entity, Index, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { OrganizationAttribute } from './organization-attribute';
import { default_acl } from '../../acl_policies';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { OrganizationFile } from './organization-file';

@Entity({ tableName: 'attribute_assurances' })
@ApplyAccessControlList(default_acl)
export class AttributeAssurance {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @ManyToOne({ entity: () => Organization, ref: true, index: 'attribute_assurances_organization_id_idx1' })
  organization!: Ref<Organization>;

  @Property({ type: 'datetime', length: 3 })
  effectiveStartDate!: Date;

  @Property({ type: 'datetime', length: 3 })
  effectiveEndDate!: Date;

  @ManyToOne({ entity: () => OrganizationAttribute, ref: true, fieldName: 'organization_attributes_id', nullable: true, index: 'attribute_assurances_org_claim_id_idx1' })
  organizationAttribute?: Ref<OrganizationAttribute>;

  @ManyToOne({ entity: () => OrganizationFile, ref: true, nullable: true, index: 'attribute_assurances_organization_file_id_idx1' })
  organizationFile?: Ref<OrganizationFile>;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;
}
