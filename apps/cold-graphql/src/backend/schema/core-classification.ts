import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { MaterialClassification } from './material-classification';
import { CoreClassification as OrmCoreClassification } from '../entities';
import { connection } from '../database';

@Entity<CoreClassification>('CoreClassification', {
	provider: new MikroBackendProvider(OrmCoreClassification, connection),
})
export class CoreClassification {
	@Field(() => ID, { primaryKeyField: true })
	id!: number;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<MaterialClassification>(() => [MaterialClassification], { relatedField: 'coreClassification' })
	materialClassifications!: MaterialClassification[];
}
