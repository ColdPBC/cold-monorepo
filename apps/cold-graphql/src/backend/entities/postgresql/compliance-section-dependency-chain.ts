import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ComplianceSection } from './compliance-section';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'compliance_section_dependency_chains' })
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
