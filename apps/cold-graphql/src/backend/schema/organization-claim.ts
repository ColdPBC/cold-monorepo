import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Claim } from './claim';
import { Material } from './material';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { Product } from './product';
import { OrganizationClaim as OrmOrganizationClaim } from '../entities';
import { connection } from '../database';

@Entity<OrganizationClaim>('OrganizationClaim', {
	provider: new MikroBackendProvider(OrmOrganizationClaim, connection),
})
export class OrganizationClaim {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<OrganizationClaim>(() => Claim, { id: (entity) => entity.claim?.id })
	claim!: Claim;

	@RelationshipField<OrganizationClaim>(() => OrganizationFacility, { id: (entity) => entity.organizationFacility?.id, nullable: true })
	organizationFacility?: OrganizationFacility;

	@RelationshipField<OrganizationClaim>(() => OrganizationFile, { id: (entity) => entity.organizationFile?.id })
	organizationFile!: OrganizationFile;

	@Field(() => ISODateStringScalar, { nullable: true })
	issuedDate?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	effectiveDate?: Date;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => Boolean)
	deleted = false;

	@RelationshipField<OrganizationClaim>(() => Material, { id: (entity) => entity.material?.id, nullable: true })
	material?: Material;

	@RelationshipField<OrganizationClaim>(() => Product, { id: (entity) => entity.product?.id, nullable: true })
	product?: Product;

	@RelationshipField<OrganizationClaim>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;
}
