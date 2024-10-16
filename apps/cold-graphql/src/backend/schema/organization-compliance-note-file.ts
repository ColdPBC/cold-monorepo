import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { OrganizationComplianceNote } from './organization-compliance-note';
import { OrganizationFile } from './organization-file';
import { OrganizationComplianceNoteFile as OrmOrganizationComplianceNoteFile } from '../entities';
import { connection } from '../database';

@Entity<OrganizationComplianceNoteFile>('OrganizationComplianceNoteFile', {
	provider: new MikroBackendProvider(OrmOrganizationComplianceNoteFile, connection),
})
export class OrganizationComplianceNoteFile {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => ISODateStringScalar, { nullable: true })
	createdAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	updatedAt?: Date;

	@RelationshipField<OrganizationComplianceNoteFile>(() => OrganizationComplianceNote, { id: (entity) => entity.organizationComplianceNote?.id })
	organizationComplianceNote!: OrganizationComplianceNote;

	@RelationshipField<OrganizationComplianceNoteFile>(() => OrganizationFile, { id: (entity) => entity.organizationFile?.id })
	organizationFile!: OrganizationFile;

	@Field(() => Boolean)
	deleted = false;
}
