import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { EcoinventActivity } from './ecoinvent-activity';
import { MaterialClassification } from './material-classification';
import { MaterialClassificationActivity as OrmMaterialClassificationActivity } from '../entities';
import { connection } from '../database';

@Entity<MaterialClassificationActivity>('MaterialClassificationActivity', {
	provider: new MikroBackendProvider(OrmMaterialClassificationActivity, connection),
})
export class MaterialClassificationActivity {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<MaterialClassificationActivity>(() => MaterialClassification, { id: (entity) => entity.materialClassification?.id })
	materialClassification!: MaterialClassification;

	@RelationshipField<MaterialClassificationActivity>(() => EcoinventActivity, { id: (entity) => entity.ecoinventActivity?.id })
	ecoinventActivity!: EcoinventActivity;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => String, { nullable: true })
	reasoning?: string;
}
