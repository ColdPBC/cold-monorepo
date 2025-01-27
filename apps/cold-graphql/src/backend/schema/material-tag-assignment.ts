import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Material } from './material';
import { Organization } from './organization';
import { MaterialTagAssignment as OrmMaterialTagAssignment } from '../entities';
import { connection } from '../database';

@Entity<MaterialTagAssignment>('MaterialTagAssignment', {
	provider: new MikroBackendProvider(OrmMaterialTagAssignment, connection),
})
export class MaterialTagAssignment {
	@Field(() => ID, { primaryKeyField: true })
	id!: number;

	@RelationshipField<MaterialTagAssignment>(() => Material, { id: (entity) => entity.material?.id })
	material!: Material;

	@Field(() => Number)
	tagId!: number;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<MaterialTagAssignment>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;
}
