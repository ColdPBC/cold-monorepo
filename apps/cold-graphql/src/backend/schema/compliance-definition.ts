import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ComplianceQuestion } from './compliance-question';
import { ComplianceSection } from './compliance-section';
import { ComplianceSectionGroup } from './compliance-section-group';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationCompliancesOld } from './organization-compliances-old';
import { ComplianceDefinition as OrmComplianceDefinition } from '../entities';
import { connection } from '../database';

@Entity<ComplianceDefinition>('ComplianceDefinition', {
	provider: new MikroBackendProvider(OrmComplianceDefinition, connection),
})
export class ComplianceDefinition {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => String)
	logoUrl!: string;

	@Field(() => GraphQLJSON)
	surveys!: Record<string, unknown>;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => String)
	title!: string;

	@Field(() => String, { nullable: true })
	imageUrl?: string;

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;

	@Field(() => Number, { nullable: true })
	order?: number;

	@Field(() => Number, { nullable: true })
	version?: number;

	@Field(() => Boolean)
	visible = false;

	@Field(() => Boolean)
	deleted = false;

	@RelationshipField<ComplianceQuestion>(() => [ComplianceQuestion], { relatedField: 'complianceDefinition' })
	complianceQuestions!: ComplianceQuestion[];

	@RelationshipField<ComplianceSectionGroup>(() => [ComplianceSectionGroup], { relatedField: 'complianceDefinition' })
	complianceSectionGroups!: ComplianceSectionGroup[];

	@RelationshipField<ComplianceSection>(() => [ComplianceSection], { relatedField: 'complianceDefinition' })
	complianceSections!: ComplianceSection[];

	@RelationshipField<OrganizationCompliance>(() => [OrganizationCompliance], { relatedField: 'complianceDefinition' })
	organizationCompliances!: OrganizationCompliance[];

	@RelationshipField<OrganizationCompliancesOld>(() => [OrganizationCompliancesOld], { relatedField: 'complianceDefinition' })
	organizationCompliancesOlds!: OrganizationCompliancesOld[];
}
