import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Material } from './material';
import { Organization } from './organization';
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

	@RelationshipField<ProductMaterial>(() => Material, { id: (entity) => entity.material?.id, nullable: true })
	material?: Material;

	@Field(() => String, { nullable: true })
	materialSupplierId?: string;

	@Field(() => ISODateStringScalar, { nullable: true })
	createdAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	updatedAt?: Date;

	@RelationshipField<ProductMaterial>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;

	@Field(() => String, { nullable: true })
	unitOfMeasure?: string;

	@Field(() => Number, { nullable: true })
	yield?: number;

	@Field(() => String, { nullable: true })
	bomSection?: string;

	@Field(() => String, { nullable: true })
	placement?: string;

	@Field(() => Number, { nullable: true })
	weight?: number;
}
