import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ComplianceQuestion } from './compliance-question';
import { ComplianceQuestionDependencyChain as OrmComplianceQuestionDependencyChain } from '../entities';
import { connection } from '../database';

@Entity<ComplianceQuestionDependencyChain>('ComplianceQuestionDependencyChain', {
	provider: new MikroBackendProvider(OrmComplianceQuestionDependencyChain, connection),
})
export class ComplianceQuestionDependencyChain {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => GraphQLJSON)
	dependencyChain!: Record<string, unknown>;

	@Field(() => String)
	complianceQuestionId!: string;

	@Field(() => String)
	complianceQuestionKey!: string;

	@Field(() => String)
	complianceSectionId!: string;

	@Field(() => String)
	complianceSectionKey!: string;

	@Field(() => String)
	complianceSectionGroupId!: string;

	@Field(() => String)
	complianceDefinitionName!: string;

	@Field(() => String)
	dependencyExpression!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => Boolean)
	deleted = false;

	@RelationshipField<ComplianceQuestion>(() => [ComplianceQuestion], { relatedField: 'complianceQuestionDependencyChain' })
	complianceQuestions!: ComplianceQuestion[];
}
