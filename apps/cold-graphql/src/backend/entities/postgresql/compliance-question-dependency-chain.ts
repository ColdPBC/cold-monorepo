import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { Collection, Entity, Index, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { ComplianceQuestion } from './compliance-question';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'compliance_question_dependency_chains' })
export class ComplianceQuestionDependencyChain {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'json' })
	dependencyChain!: Record<string, unknown>;

	@Index({ name: 'compliance_question_dependency_chains_compliance_question_i_idx' })
	@Unique({ name: 'compliance_question_dependency_chains_compliance_question_i_key' })
	@Property({ type: 'text' })
	complianceQuestionId!: string;

	@Index({ name: 'compliance_question_dependency_chains_compliance_question_k_idx' })
	@Property({ type: 'text' })
	complianceQuestionKey!: string;

	@Index({ name: 'compliance_question_dependency_chains_compliance_section_id_idx' })
	@Property({ type: 'text' })
	complianceSectionId!: string;

	@Index({ name: 'compliance_question_dependency_chains_compliance_section_ke_idx' })
	@Property({ type: 'text' })
	complianceSectionKey!: string;

	@Index({ name: 'compliance_question_dependency_chains_compliance_section_gr_idx' })
	@Property({ type: 'text' })
	complianceSectionGroupId!: string;

	@Index({ name: 'compliance_question_dependency_chains_compliance_definition_idx' })
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

	@OneToMany({ entity: () => ComplianceQuestion, mappedBy: 'complianceQuestionDependencyChain' })
	complianceQuestions = new Collection<ComplianceQuestion>(this);
}
