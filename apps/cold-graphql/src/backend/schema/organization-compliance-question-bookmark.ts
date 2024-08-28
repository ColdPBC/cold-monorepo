import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ComplianceQuestion } from './compliance-question';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceQuestionBookmark as OrmOrganizationComplianceQuestionBookmark } from '../entities';
import { connection } from '../database';

@Entity<OrganizationComplianceQuestionBookmark>('OrganizationComplianceQuestionBookmark', {
	provider: new MikroBackendProvider(OrmOrganizationComplianceQuestionBookmark, connection),
})
export class OrganizationComplianceQuestionBookmark {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	email!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<OrganizationComplianceQuestionBookmark>(() => ComplianceQuestion, { id: (entity) => entity.complianceQuestion?.id })
	complianceQuestion!: ComplianceQuestion;

	@RelationshipField<OrganizationComplianceQuestionBookmark>(() => OrganizationCompliance, { id: (entity) => entity.organizationCompliance?.id })
	organizationCompliance!: OrganizationCompliance;

	@Field(() => Boolean)
	deleted = false;
}
