import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Organization } from './organization';
import { Product } from './product';
import { ProductTagAssignment as OrmProductTagAssignment } from '../entities';
import { connection } from '../database';

@Entity<ProductTagAssignment>('ProductTagAssignment', {
	provider: new MikroBackendProvider(OrmProductTagAssignment, connection),
})
export class ProductTagAssignment {
	@Field(() => ID, { primaryKeyField: true })
	id!: number;

	@RelationshipField<ProductTagAssignment>(() => Product, { id: (entity) => entity.product?.id })
	product!: Product;

	@Field(() => Number)
	tagId!: number;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<ProductTagAssignment>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;
}
