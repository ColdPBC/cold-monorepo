import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { OrganizationComplianceNote } from './organization-compliance-note';
import { OrganizationComplianceNoteLink as OrmOrganizationComplianceNoteLink } from '../entities';
import { connection } from '../database';

@Entity<OrganizationComplianceNoteLink>('OrganizationComplianceNoteLink', {
	provider: new MikroBackendProvider(OrmOrganizationComplianceNoteLink, connection),
})
export class OrganizationComplianceNoteLink {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	url!: string;

	@Field(() => ISODateStringScalar, { nullable: true })
	createdAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	updatedAt?: Date;

	@RelationshipField<OrganizationComplianceNoteLink>(() => OrganizationComplianceNote, { id: (entity) => entity.organizationComplianceNote?.id })
	organizationComplianceNote!: OrganizationComplianceNote;

	@Field(() => Boolean)
	deleted = false;
}
