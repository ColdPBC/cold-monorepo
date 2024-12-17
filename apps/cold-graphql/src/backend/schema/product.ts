import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { AttributeAssurance } from './attribute-assurance';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
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

	@Field(() => ISODateStringScalar, { nullable: true })
	createdAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	updatedAt?: Date;

	@Field(() => Boolean, { nullable: true })
	deleted = false;

	@RelationshipField<Product>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;

	@Field(() => String, { nullable: true })
	seasonCode?: string;

	@Field(() => String, { nullable: true })
	styleCode?: string;

	@RelationshipField<Product>(() => OrganizationFacility, { id: (entity) => entity.organizationFacility?.id, nullable: true })
	organizationFacility?: OrganizationFacility;

	@Field(() => String, { nullable: true })
	upcCode?: string;

	@Field(() => String, { nullable: true })
	brandProductId?: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => String, { nullable: true })
	supplierProductId?: string;

	@Field(() => String, { nullable: true })
	productCategory?: string;

	@Field(() => String, { nullable: true })
	productSubcategory?: string;

	@Field(() => String, { nullable: true })
	brandProductSku?: string;

	@Field(() => String, { nullable: true })
	gender?: string;

	@Field(() => GraphQLJSON, { nullable: true })
	emissionStats?: Record<string, unknown>;

	@RelationshipField<AttributeAssurance>(() => [AttributeAssurance], { relatedField: 'product' })
	attributeAssurances!: AttributeAssurance[];

	@RelationshipField<ProductMaterial>(() => [ProductMaterial], { relatedField: 'product' })
	productMaterials!: ProductMaterial[];
}
