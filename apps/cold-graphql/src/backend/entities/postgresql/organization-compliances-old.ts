import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceDefinition } from './compliance-definition';
import { Organization } from './organization';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

@Entity({ tableName: 'organization_compliances_old' })
@ApplyAccessControlList(default_acl)
export class OrganizationCompliancesOld {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @ManyToOne({ entity: () => Organization, ref: true })
  organization!: Ref<Organization>;

  @ManyToOne({ entity: () => ComplianceDefinition, ref: true, fieldName: 'compliance_id', index: 'organization_compliances_old_compliance_id_idx' })
  complianceDefinition!: Ref<ComplianceDefinition>;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @Property({ type: 'json', nullable: true })
  surveysOverride?: Record<string, unknown>;

  @Property({ type: 'boolean', default: false })
  deleted = false;
}
