import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { EcoinventClassification } from './ecoinvent-classification';
import { MaterialClassification } from './material-classification';
import { MaterialEcoinventClassification as OrmMaterialEcoinventClassification } from '../entities';
import { connection } from '../database';

@Entity<MaterialEcoinventClassification>('MaterialEcoinventClassification', {
	provider: new MikroBackendProvider(OrmMaterialEcoinventClassification, connection),
})
export class MaterialEcoinventClassification {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<MaterialEcoinventClassification>(() => EcoinventClassification, { id: (entity) => entity.ecoinventClassification?.id })
	ecoinventClassification!: EcoinventClassification;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<MaterialEcoinventClassification>(() => MaterialClassification, { id: (entity) => entity.materialClassification?.id })
	materialClassification!: MaterialClassification;
}
