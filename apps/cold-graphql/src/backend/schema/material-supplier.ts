import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Material } from './material';
import { OrganizationFacility } from './organization-facility';
import { MaterialSupplier as OrmMaterialSupplier } from '../entities';
import { connection } from '../database';

@Entity<MaterialSupplier>('MaterialSupplier', {
	provider: new MikroBackendProvider(OrmMaterialSupplier, connection),
})
export class MaterialSupplier {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<MaterialSupplier>(() => Material, { id: (entity) => entity.material?.id })
	material!: Material;

	@RelationshipField<MaterialSupplier>(() => OrganizationFacility, { id: (entity) => entity.organizationFacility?.id })
	organizationFacility!: OrganizationFacility;

	@Field(() => ISODateStringScalar, { nullable: true })
	createdAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	updatedAt?: Date;

	@Field(() => String)
	organizationId!: string;
}
