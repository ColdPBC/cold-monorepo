import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ComplianceQuestion } from './compliance-question';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceResponse as OrmOrganizationComplianceResponse } from '../entities';
import { connection } from '../database';

@Entity<OrganizationComplianceResponse>('OrganizationComplianceResponse', {
	provider: new MikroBackendProvider(OrmOrganizationComplianceResponse, connection),
})
export class OrganizationComplianceResponse {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<OrganizationComplianceResponse>(() => ComplianceQuestion, { id: (entity) => entity.complianceQuestion?.id })
	complianceQuestion!: ComplianceQuestion;

	@RelationshipField<OrganizationComplianceResponse>(() => OrganizationCompliance, { id: (entity) => entity.organizationCompliance?.id })
	organizationCompliance!: OrganizationCompliance;

	@Field(() => GraphQLJSON, { nullable: true })
	additionalContext?: Record<string, unknown>;

	@Field(() => GraphQLJSON, { nullable: true })
	value?: Record<string, unknown>;

	@Field(() => Boolean)
	deleted = false;
}
