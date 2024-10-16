import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ComplianceSection } from './compliance-section';
import { ComplianceSectionDependencyChain as OrmComplianceSectionDependencyChain } from '../entities';
import { connection } from '../database';

@Entity<ComplianceSectionDependencyChain>('ComplianceSectionDependencyChain', {
	provider: new MikroBackendProvider(OrmComplianceSectionDependencyChain, connection),
})
export class ComplianceSectionDependencyChain {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => GraphQLJSON)
	dependencyChain!: Record<string, unknown>;

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

	@Field(() => ISODateStringScalar, { nullable: true })
	createdAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	updatedAt?: Date;

	@Field(() => Boolean)
	deleted = false;

	@RelationshipField<ComplianceSection>(() => [ComplianceSection], { relatedField: 'complianceSectionDependencyChain' })
	complianceSections!: ComplianceSection[];
}
