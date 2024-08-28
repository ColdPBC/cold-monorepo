import { Entity, ManyToOne, OneToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceDefinition } from './compliance-definition';
import { ComplianceSection } from './compliance-section';

@Entity({ tableName: 'compliance_section_groups' })
export class ComplianceSectionGroup {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'integer' })
	order!: number;

	@Property({ type: 'text' })
	title!: string;

	@Property({ type: 'text' })
	complianceDefinitionName!: string;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@ManyToOne({ entity: () => ComplianceDefinition, ref: true, nullable: true, index: 'compliance_section_groups_compliance_definition_id_idx' })
	complianceDefinition?: Ref<ComplianceDefinition>;

	@OneToOne({ entity: () => ComplianceSection, mappedBy: 'complianceSectionGroup' })
	complianceSectionGroupInverse?: ComplianceSection;
}
