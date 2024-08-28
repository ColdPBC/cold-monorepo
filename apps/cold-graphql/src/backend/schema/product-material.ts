import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Material } from './material';
import { Product } from './product';
import { ProductMaterial as OrmProductMaterial } from '../entities';
import { connection } from '../database';

@Entity<ProductMaterial>('ProductMaterial', {
	provider: new MikroBackendProvider(OrmProductMaterial, connection),
})
export class ProductMaterial {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<ProductMaterial>(() => Product, { id: (entity) => entity.product?.id })
	product!: Product;

	@RelationshipField<ProductMaterial>(() => Material, { id: (entity) => entity.material?.id })
	material!: Material;

	@Field(() => String)
	materialSupplierId!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;
}
