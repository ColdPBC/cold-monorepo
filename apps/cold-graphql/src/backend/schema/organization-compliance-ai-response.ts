import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ComplianceQuestion } from './compliance-question';
import { Organization } from './organization';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceAiResponseFile } from './organization-compliance-ai-response-file';
import { OrganizationComplianceAiResponse as OrmOrganizationComplianceAiResponse } from '../entities';
import { connection } from '../database';

@Entity<OrganizationComplianceAiResponse>('OrganizationComplianceAiResponse', {
	provider: new MikroBackendProvider(OrmOrganizationComplianceAiResponse, connection),
})
export class OrganizationComplianceAiResponse {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	justification!: string;

	@Field(() => GraphQLJSON, { nullable: true })
	references?: Record<string, unknown>;

	@Field(() => GraphQLJSON, { nullable: true })
	sources?: Record<string, unknown>;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<OrganizationComplianceAiResponse>(() => ComplianceQuestion, { id: (entity) => entity.complianceQuestion?.id })
	complianceQuestion!: ComplianceQuestion;

	@RelationshipField<OrganizationComplianceAiResponse>(() => OrganizationCompliance, { id: (entity) => entity.organizationCompliance?.id })
	organizationCompliance!: OrganizationCompliance;

	@RelationshipField<OrganizationComplianceAiResponse>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => GraphQLJSON, { nullable: true })
	answer?: Record<string, unknown>;

	@Field(() => GraphQLJSON, { nullable: true })
	additionalContext?: Record<string, unknown>;

	@Field(() => Boolean)
	deleted = false;

	@RelationshipField<OrganizationComplianceAiResponseFile>(() => [OrganizationComplianceAiResponseFile], { relatedField: 'organizationComplianceAiResponse' })
	organizationComplianceAiResponseFiles!: OrganizationComplianceAiResponseFile[];
}
