import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
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

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => Boolean)
	deleted = false;

	@RelationshipField<Material>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@RelationshipField<MaterialSupplier>(() => [MaterialSupplier], { relatedField: 'material' })
	materialSuppliers!: MaterialSupplier[];

	@RelationshipField<ProductMaterial>(() => [ProductMaterial], { relatedField: 'material' })
	productMaterials!: ProductMaterial[];
}
