import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { AttributeAssurance } from './attribute-assurance';
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

	@RelationshipField<AttributeAssurance>(() => [AttributeAssurance], { relatedField: 'material' })
	attributeAssurances!: AttributeAssurance[];

	@RelationshipField<MaterialSupplier>(() => [MaterialSupplier], { relatedField: 'material' })
	materialSuppliers!: MaterialSupplier[];

	@RelationshipField<ProductMaterial>(() => [ProductMaterial], { relatedField: 'material' })
	productMaterials!: ProductMaterial[];
}
