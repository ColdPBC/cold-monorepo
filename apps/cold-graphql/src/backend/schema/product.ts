import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { AttributeAssurance } from './attribute-assurance';
import { Organization } from './organization';
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

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;

	@Field(() => GraphQLJSON, { nullable: true })
	productCategoryHeirarchy?: Record<string, unknown>;

	@Field(() => String, { nullable: true })
	seasonCode?: string;

	@Field(() => String, { nullable: true })
	styleCode?: string;

	@RelationshipField<AttributeAssurance>(() => [AttributeAssurance], { relatedField: 'product' })
	attributeAssurances!: AttributeAssurance[];

	@RelationshipField<ProductMaterial>(() => [ProductMaterial], { relatedField: 'product' })
	productMaterials!: ProductMaterial[];
}
