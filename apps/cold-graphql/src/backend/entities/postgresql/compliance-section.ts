import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceDefinition } from './compliance-definition';
import { ComplianceQuestion } from './compliance-question';
import { ComplianceSectionDependencyChain } from './compliance-section-dependency-chain';
import { ComplianceSectionGroup } from './compliance-section-group';

@Entity({ tableName: 'compliance_sections' })
export class ComplianceSection {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	key!: string;

	@Property({ type: 'text' })
	title!: string;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => ComplianceSectionGroup, ref: true })
	complianceSectionGroup!: Ref<ComplianceSectionGroup>;

	@Property({ type: 'integer' })
	order!: number;

	@Property({ type: 'text' })
	complianceDefinitionName!: string;

	@Property({ type: 'text', nullable: true })
	dependencyExpression?: string;

	@ManyToOne({ entity: () => ComplianceSectionDependencyChain, ref: true, nullable: true, index: 'compliance_sections_compliance_section_dependency_chain_id_idx' })
	complianceSectionDependencyChain?: Ref<ComplianceSectionDependencyChain>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@ManyToOne({ entity: () => ComplianceDefinition, ref: true, nullable: true, index: 'compliance_sections_compliance_definition_id_idx' })
	complianceDefinition?: Ref<ComplianceDefinition>;

	@OneToMany({ entity: () => ComplianceQuestion, mappedBy: 'complianceSection' })
	complianceQuestions = new Collection<ComplianceQuestion>(this);
}
