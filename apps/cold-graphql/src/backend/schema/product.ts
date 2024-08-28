import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Organization } from './organization';
import { OrganizationClaim } from './organization-claim';
import { ProductMaterial } from './product-material';
import { Product as OrmProduct } from '../entities';
import { connection } from '../database';

@Entity<Product>('Product', {
	provider: new MikroBackendProvider(OrmProduct, connection),
})
export class Product {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => Boolean)
	deleted = false;

	@RelationshipField<Product>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@RelationshipField<OrganizationClaim>(() => [OrganizationClaim], { relatedField: 'product' })
	organizationClaims!: OrganizationClaim[];

	@RelationshipField<ProductMaterial>(() => [ProductMaterial], { relatedField: 'product' })
	productMaterials!: ProductMaterial[];
}
