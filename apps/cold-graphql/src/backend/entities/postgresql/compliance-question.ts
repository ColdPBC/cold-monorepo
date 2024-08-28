import { Collection, Entity, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceDefinition } from './compliance-definition';
import { ComplianceQuestionDependencyChain } from './compliance-question-dependency-chain';
import { ComplianceSection } from './compliance-section';
import { OrganizationComplianceAiResponse } from './organization-compliance-ai-response';
import { OrganizationComplianceNote } from './organization-compliance-note';
import { OrganizationComplianceQuestionBookmark } from './organization-compliance-question-bookmark';
import { OrganizationComplianceResponse } from './organization-compliance-response';

@Entity({ tableName: 'compliance_questions' })
export class ComplianceQuestion {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	key!: string;

	@Property({ type: 'integer' })
	order!: number;

	@Property({ type: 'text' })
	prompt!: string;

	@Property({ type: 'text' })
	component!: string;

	@Property({ type: 'text', nullable: true })
	tooltip?: string;

	@Property({ type: 'text', nullable: true })
	placeholder?: string;

	@Property({ type: 'json', nullable: true })
	rubric?: Record<string, unknown>;

	@Property({ type: 'json', nullable: true })
	options?: Record<string, unknown>;

	@Property({ type: 'text', nullable: true })
	dependencyExpression?: string;

	@Property({ type: 'text', nullable: true })
	questionSummary?: string;

	@Property({ type: 'json', nullable: true })
	additionalContext?: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@OneToOne({ entity: () => ComplianceSection, ref: true, unique: 'compliance_questions_compliance_section_id_key_key' })
	complianceSection!: Ref<ComplianceSection>;

	@Property({ type: 'text', nullable: true })
	corespondingQuestion?: string;

	@Property({ type: 'text' })
	complianceDefinitionName!: string;

	@Property({ type: 'json', nullable: true })
	dependencies?: Record<string, unknown>;

	@ManyToOne({ entity: () => ComplianceQuestionDependencyChain, ref: true, nullable: true, index: 'compliance_questions_compliance_question_dependency_chain__idx1' })
	complianceQuestionDependencyChain?: Ref<ComplianceQuestionDependencyChain>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@ManyToOne({ entity: () => ComplianceDefinition, ref: true, nullable: true, index: 'compliance_questions_compliance_definition_id_idx' })
	complianceDefinition?: Ref<ComplianceDefinition>;

	@OneToMany({ entity: () => OrganizationComplianceAiResponse, mappedBy: 'complianceQuestion' })
	organizationComplianceAiResponses = new Collection<OrganizationComplianceAiResponse>(this);

	@OneToMany({ entity: () => OrganizationComplianceNote, mappedBy: 'complianceQuestion' })
	organizationComplianceNotes = new Collection<OrganizationComplianceNote>(this);

	@OneToMany({ entity: () => OrganizationComplianceQuestionBookmark, mappedBy: 'complianceQuestion' })
	organizationComplianceQuestionBookmarks = new Collection<OrganizationComplianceQuestionBookmark>(this);

	@OneToMany({ entity: () => OrganizationComplianceResponse, mappedBy: 'complianceQuestion' })
	organizationComplianceResponses = new Collection<OrganizationComplianceResponse>(this);
}
