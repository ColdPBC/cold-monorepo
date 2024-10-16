import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ComplianceDefinition } from './compliance-definition';
import { ComplianceQuestionDependencyChain } from './compliance-question-dependency-chain';
import { ComplianceSection } from './compliance-section';
import { OrganizationComplianceAiResponse } from './organization-compliance-ai-response';
import { OrganizationComplianceNote } from './organization-compliance-note';
import { OrganizationComplianceQuestionBookmark } from './organization-compliance-question-bookmark';
import { OrganizationComplianceResponse } from './organization-compliance-response';
import { ComplianceQuestion as OrmComplianceQuestion } from '../entities';
import { connection } from '../database';

@Entity<ComplianceQuestion>('ComplianceQuestion', {
	provider: new MikroBackendProvider(OrmComplianceQuestion, connection),
})
export class ComplianceQuestion {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	key!: string;

	@Field(() => Number)
	order!: number;

	@Field(() => String)
	prompt!: string;

	@Field(() => String)
	component!: string;

	@Field(() => String, { nullable: true })
	tooltip?: string;

	@Field(() => String, { nullable: true })
	placeholder?: string;

	@Field(() => GraphQLJSON, { nullable: true })
	rubric?: Record<string, unknown>;

	@Field(() => GraphQLJSON, { nullable: true })
	options?: Record<string, unknown>;

	@Field(() => String, { nullable: true })
	dependencyExpression?: string;

	@Field(() => String, { nullable: true })
	questionSummary?: string;

	@Field(() => GraphQLJSON, { nullable: true })
	additionalContext?: Record<string, unknown>;

	@Field(() => ISODateStringScalar, { nullable: true })
	createdAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	updatedAt?: Date;

	@RelationshipField<ComplianceQuestion>(() => ComplianceSection, { id: (entity) => entity.complianceSection?.id })
	complianceSection!: ComplianceSection;

	@Field(() => String, { nullable: true })
	corespondingQuestion?: string;

	@Field(() => String)
	complianceDefinitionName!: string;

	@Field(() => GraphQLJSON, { nullable: true })
	dependencies?: Record<string, unknown>;

	@RelationshipField<ComplianceQuestion>(() => ComplianceQuestionDependencyChain, { id: (entity) => entity.complianceQuestionDependencyChain?.id, nullable: true })
	complianceQuestionDependencyChain?: ComplianceQuestionDependencyChain;

	@Field(() => Boolean)
	deleted = false;

	@RelationshipField<ComplianceQuestion>(() => ComplianceDefinition, { id: (entity) => entity.complianceDefinition?.id, nullable: true })
	complianceDefinition?: ComplianceDefinition;

	@RelationshipField<OrganizationComplianceAiResponse>(() => [OrganizationComplianceAiResponse], { relatedField: 'complianceQuestion' })
	organizationComplianceAiResponses!: OrganizationComplianceAiResponse[];

	@RelationshipField<OrganizationComplianceNote>(() => [OrganizationComplianceNote], { relatedField: 'complianceQuestion' })
	organizationComplianceNotes!: OrganizationComplianceNote[];

	@RelationshipField<OrganizationComplianceQuestionBookmark>(() => [OrganizationComplianceQuestionBookmark], { relatedField: 'complianceQuestion' })
	organizationComplianceQuestionBookmarks!: OrganizationComplianceQuestionBookmark[];

	@RelationshipField<OrganizationComplianceResponse>(() => [OrganizationComplianceResponse], { relatedField: 'complianceQuestion' })
	organizationComplianceResponses!: OrganizationComplianceResponse[];
}
