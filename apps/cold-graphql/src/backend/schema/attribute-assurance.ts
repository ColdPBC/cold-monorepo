import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Material } from './material';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { Product } from './product';
import { SustainabilityAttribute } from './sustainability-attribute';
import { AttributeAssurance as OrmAttributeAssurance } from '../entities';
import { connection } from '../database';

@Entity<AttributeAssurance>('AttributeAssurance', {
	provider: new MikroBackendProvider(OrmAttributeAssurance, connection),
})
export class AttributeAssurance {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<AttributeAssurance>(() => OrganizationFacility, { id: (entity) => entity.organizationFacility?.id, nullable: true })
	organizationFacility?: OrganizationFacility;

	@RelationshipField<AttributeAssurance>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@RelationshipField<AttributeAssurance>(() => SustainabilityAttribute, { id: (entity) => entity.sustainabilityAttribute?.id })
	sustainabilityAttribute!: SustainabilityAttribute;

	@RelationshipField<AttributeAssurance>(() => Material, { id: (entity) => entity.material?.id, nullable: true })
	material?: Material;

	@RelationshipField<AttributeAssurance>(() => Product, { id: (entity) => entity.product?.id, nullable: true })
	product?: Product;

	@RelationshipField<AttributeAssurance>(() => OrganizationFile, { id: (entity) => entity.organizationFile?.id, nullable: true })
	organizationFile?: OrganizationFile;

	@Field(() => ISODateStringScalar, { nullable: true })
	effectiveStartDate?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	effectiveEndDate?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	createdAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	updatedAt?: Date;
}
