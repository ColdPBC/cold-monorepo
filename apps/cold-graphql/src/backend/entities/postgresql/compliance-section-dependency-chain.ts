import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ComplianceSection } from './compliance-section';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

@Entity({ tableName: 'compliance_section_dependency_chains' })
@ApplyAccessControlList(default_acl)
export class ComplianceSectionDependencyChain {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @Property({ type: 'json' })
  dependencyChain!: Record<string, unknown>;

  @Property({ type: 'text' })
  complianceSectionId!: string;

  @Property({ type: 'text' })
  complianceSectionKey!: string;

  @Property({ type: 'text' })
  complianceSectionGroupId!: string;

  @Property({ type: 'text' })
  complianceDefinitionName!: string;

  @Property({ type: 'text' })
  dependencyExpression!: string;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @Property({ type: 'boolean', default: false })
  deleted = false;

  @OneToMany({ entity: () => ComplianceSection, mappedBy: 'complianceSectionDependencyChain' })
  complianceSections = new Collection<ComplianceSection>(this);
}
