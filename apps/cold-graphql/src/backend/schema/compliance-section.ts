import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ComplianceDefinition } from './compliance-definition';
import { ComplianceQuestion } from './compliance-question';
import { ComplianceSectionDependencyChain } from './compliance-section-dependency-chain';
import { ComplianceSectionGroup } from './compliance-section-group';
import { ComplianceSection as OrmComplianceSection } from '../entities';
import { connection } from '../database';

@Entity<ComplianceSection>('ComplianceSection', {
	provider: new MikroBackendProvider(OrmComplianceSection, connection),
})
export class ComplianceSection {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	key!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	title!: string;

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<ComplianceSection>(() => ComplianceSectionGroup, { id: (entity) => entity.complianceSectionGroup?.id })
	complianceSectionGroup!: ComplianceSectionGroup;

	@Field(() => Number)
	order!: number;

	@Field(() => String)
	complianceDefinitionName!: string;

	@Field(() => String, { nullable: true })
	dependencyExpression?: string;

	@RelationshipField<ComplianceSection>(() => ComplianceSectionDependencyChain, { id: (entity) => entity.complianceSectionDependencyChain?.id, nullable: true })
	complianceSectionDependencyChain?: ComplianceSectionDependencyChain;

	@Field(() => Boolean)
	deleted = false;

	@RelationshipField<ComplianceSection>(() => ComplianceDefinition, { id: (entity) => entity.complianceDefinition?.id, nullable: true })
	complianceDefinition?: ComplianceDefinition;

	@RelationshipField<ComplianceSection>(() => ComplianceQuestion, { id: (entity) => entity.complianceSectionInverse?.id })
	complianceSectionInverse?: ComplianceQuestion;
}
