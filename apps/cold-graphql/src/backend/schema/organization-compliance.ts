import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ComplianceDefinition } from './compliance-definition';
import { Organization } from './organization';
import { OrganizationComplianceAiResponse } from './organization-compliance-ai-response';
import { OrganizationComplianceAiResponseFile } from './organization-compliance-ai-response-file';
import { OrganizationComplianceNote } from './organization-compliance-note';
import { OrganizationComplianceQuestionBookmark } from './organization-compliance-question-bookmark';
import { OrganizationComplianceResponse } from './organization-compliance-response';
import { OrganizationComplianceStatus } from './organization-compliance-status';
import { OrganizationCompliance as OrmOrganizationCompliance } from '../entities';
import { connection } from '../database';

@Entity<OrganizationCompliance>('OrganizationCompliance', {
	provider: new MikroBackendProvider(OrmOrganizationCompliance, connection),
})
export class OrganizationCompliance {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	description!: string;

	@Field(() => String)
	complianceDefinitionName!: string;

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;

	@Field(() => ISODateStringScalar, { nullable: true })
	createdAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	updatedAt?: Date;

	@RelationshipField<OrganizationCompliance>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => Boolean)
	deleted = false;

	@Field(() => Boolean)
	visible = true;

	@RelationshipField<OrganizationCompliance>(() => ComplianceDefinition, { id: (entity) => entity.complianceDefinition?.id, nullable: true })
	complianceDefinition?: ComplianceDefinition;

	@RelationshipField<OrganizationComplianceAiResponseFile>(() => [OrganizationComplianceAiResponseFile], { relatedField: 'organizationCompliance' })
	organizationComplianceAiResponseFiles!: OrganizationComplianceAiResponseFile[];

	@RelationshipField<OrganizationComplianceAiResponse>(() => [OrganizationComplianceAiResponse], { relatedField: 'organizationCompliance' })
	organizationComplianceAiResponses!: OrganizationComplianceAiResponse[];

	@RelationshipField<OrganizationComplianceNote>(() => [OrganizationComplianceNote], { relatedField: 'organizationCompliance' })
	organizationComplianceNotes!: OrganizationComplianceNote[];

	@RelationshipField<OrganizationComplianceQuestionBookmark>(() => [OrganizationComplianceQuestionBookmark], { relatedField: 'organizationCompliance' })
	organizationComplianceQuestionBookmarks!: OrganizationComplianceQuestionBookmark[];

	@RelationshipField<OrganizationComplianceResponse>(() => [OrganizationComplianceResponse], { relatedField: 'organizationCompliance' })
	organizationComplianceResponses!: OrganizationComplianceResponse[];

	@RelationshipField<OrganizationComplianceStatus>(() => [OrganizationComplianceStatus], { relatedField: 'organizationCompliance' })
	organizationComplianceStatuses!: OrganizationComplianceStatus[];
}
