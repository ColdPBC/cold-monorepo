import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Organization } from './organization';
import { MaterialTag as OrmMaterialTag } from '../entities';
import { connection } from '../database';

@Entity<MaterialTag>('MaterialTag', {
	provider: new MikroBackendProvider(OrmMaterialTag, connection),
})
export class MaterialTag {
	@Field(() => ID, { primaryKeyField: true })
	id!: number;

	@RelationshipField<MaterialTag>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => String)
	tag!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;
}
