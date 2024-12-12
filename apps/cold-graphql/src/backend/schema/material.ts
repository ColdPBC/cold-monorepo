import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { AttributeAssurance } from './attribute-assurance';
import { MaterialClassification } from './material-classification';
import { MaterialSupplier } from './material-supplier';
import { Organization } from './organization';
import { ProductMaterial } from './product-material';
import { Material as OrmMaterial } from '../entities';
import { connection } from '../database';

@Entity<Material>('Material', {
	provider: new MikroBackendProvider(OrmMaterial, connection),
})
export class Material {
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

	@RelationshipField<Material>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => String, { nullable: true })
	materialCategory?: string;

	@Field(() => String, { nullable: true })
	materialSubcategory?: string;

	@Field(() => String, { nullable: true })
	brandMaterialId?: string;

	@Field(() => String, { nullable: true })
	supplierMaterialId?: string;

	@Field(() => String, { nullable: true })
	organizationFacilityId?: string;

	@Field(() => Number, { nullable: true })
	emissionsFactor?: number;

	@Field(() => String, { nullable: true })
	activityId?: string;

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;

	@Field(() => String, { nullable: true })
	dataSource?: string;

	@Field(() => String, { nullable: true })
	aiDescription?: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@RelationshipField<Material>(() => MaterialClassification, { id: (entity) => entity.materialClassification?.id, nullable: true })
	materialClassification?: MaterialClassification;

	@RelationshipField<AttributeAssurance>(() => [AttributeAssurance], { relatedField: 'material' })
	attributeAssurances!: AttributeAssurance[];

	@RelationshipField<MaterialSupplier>(() => [MaterialSupplier], { relatedField: 'material' })
	materialSuppliers!: MaterialSupplier[];

	@RelationshipField<ProductMaterial>(() => [ProductMaterial], { relatedField: 'material' })
	productMaterials!: ProductMaterial[];
}
