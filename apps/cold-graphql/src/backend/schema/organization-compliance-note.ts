import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ComplianceQuestion } from './compliance-question';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceNoteFile } from './organization-compliance-note-file';
import { OrganizationComplianceNoteLink } from './organization-compliance-note-link';
import { OrganizationComplianceNote as OrmOrganizationComplianceNote } from '../entities';
import { connection } from '../database';

@Entity<OrganizationComplianceNote>('OrganizationComplianceNote', {
	provider: new MikroBackendProvider(OrmOrganizationComplianceNote, connection),
})
export class OrganizationComplianceNote {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	note!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<OrganizationComplianceNote>(() => ComplianceQuestion, { id: (entity) => entity.complianceQuestion?.id })
	complianceQuestion!: ComplianceQuestion;

	@RelationshipField<OrganizationComplianceNote>(() => OrganizationCompliance, { id: (entity) => entity.organizationCompliance?.id })
	organizationCompliance!: OrganizationCompliance;

	@Field(() => Boolean)
	deleted = false;

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;

	@RelationshipField<OrganizationComplianceNoteFile>(() => [OrganizationComplianceNoteFile], { relatedField: 'organizationComplianceNote' })
	organizationComplianceNoteFiles!: OrganizationComplianceNoteFile[];

	@RelationshipField<OrganizationComplianceNoteLink>(() => [OrganizationComplianceNoteLink], { relatedField: 'organizationComplianceNote' })
	organizationComplianceNoteLinks!: OrganizationComplianceNoteLink[];
}
