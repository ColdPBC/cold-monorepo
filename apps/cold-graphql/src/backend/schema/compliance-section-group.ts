import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ComplianceDefinition } from './compliance-definition';
import { ComplianceSection } from './compliance-section';
import { ComplianceSectionGroup as OrmComplianceSectionGroup } from '../entities';
import { connection } from '../database';

@Entity<ComplianceSectionGroup>('ComplianceSectionGroup', {
	provider: new MikroBackendProvider(OrmComplianceSectionGroup, connection),
})
export class ComplianceSectionGroup {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => Number)
	order!: number;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	title!: string;

	@Field(() => String)
	complianceDefinitionName!: string;

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;

	@Field(() => ISODateStringScalar, { nullable: true })
	createdAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	updatedAt?: Date;

	@Field(() => Boolean)
	deleted = false;

	@RelationshipField<ComplianceSectionGroup>(() => ComplianceDefinition, { id: (entity) => entity.complianceDefinition?.id, nullable: true })
	complianceDefinition?: ComplianceDefinition;

	@RelationshipField<ComplianceSection>(() => [ComplianceSection], { relatedField: 'complianceSectionGroup' })
	complianceSections!: ComplianceSection[];
}
