import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { AttributeAssurance } from './attribute-assurance';
import { Material } from './material';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { Product } from './product';
import { SustainabilityAttribute } from './sustainability-attribute';
import { OrganizationAttribute as OrmOrganizationAttribute } from '../entities';
import { connection } from '../database';

@Entity<OrganizationAttribute>('OrganizationAttribute', {
	provider: new MikroBackendProvider(OrmOrganizationAttribute, connection),
})
export class OrganizationAttribute {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<OrganizationAttribute>(() => SustainabilityAttribute, { id: (entity) => entity.sustainabilityAttribute?.id })
	sustainabilityAttribute!: SustainabilityAttribute;

	@RelationshipField<OrganizationAttribute>(() => OrganizationFacility, { id: (entity) => entity.organizationFacility?.id, nullable: true })
	organizationFacility?: OrganizationFacility;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => Boolean)
	deleted = false;

	@RelationshipField<OrganizationAttribute>(() => Material, { id: (entity) => entity.material?.id, nullable: true })
	material?: Material;

	@RelationshipField<OrganizationAttribute>(() => Product, { id: (entity) => entity.product?.id, nullable: true })
	product?: Product;

	@RelationshipField<OrganizationAttribute>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@RelationshipField<OrganizationAttribute>(() => OrganizationFile, { id: (entity) => entity.organizationFile?.id, nullable: true })
	organizationFile?: OrganizationFile;

	@RelationshipField<AttributeAssurance>(() => [AttributeAssurance], { relatedField: 'organizationAttribute' })
	attributeAssurances!: AttributeAssurance[];
}
