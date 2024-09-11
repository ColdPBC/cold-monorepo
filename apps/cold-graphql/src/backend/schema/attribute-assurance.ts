import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Organization } from './organization';
import { OrganizationFile } from './organization-file';
import { AttributeAssurance as OrmAttributeAssurance } from '../entities';
import { connection } from '../database';

@Entity<AttributeAssurance>('AttributeAssurance', {
	provider: new MikroBackendProvider(OrmAttributeAssurance, connection),
})
export class AttributeAssurance {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<AttributeAssurance>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => ISODateStringScalar)
	effectiveStartDate!: Date;

	@Field(() => ISODateStringScalar)
	effectiveEndDate!: Date;

	@RelationshipField<AttributeAssurance>(() => OrganizationFile, { id: (entity) => entity.organizationFile?.id, nullable: true })
	organizationFile?: OrganizationFile;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => String, { nullable: true })
	materialId?: string;

	@Field(() => String, { nullable: true })
	organizationFacilityId?: string;

	@Field(() => String, { nullable: true })
	productId?: string;

	@Field(() => String)
	sustainabilityAttributeId!: string;
}
