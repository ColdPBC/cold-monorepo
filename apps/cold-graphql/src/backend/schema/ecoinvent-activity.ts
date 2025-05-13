import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { EcoinventActivityClassification } from './ecoinvent-activity-classification';
import { EcoinventActivityImpact } from './ecoinvent-activity-impact';
import { EcoinventClassification } from './ecoinvent-classification';
import { MaterialClassificationActivity } from './material-classification-activity';
import { MaterialEmissionFactor } from './material-emission-factor';
import { EcoinventActivity as OrmEcoinventActivity } from '../entities';
import { connection } from '../database';

@Entity<EcoinventActivity>('EcoinventActivity', {
	provider: new MikroBackendProvider(OrmEcoinventActivity, connection),
})
export class EcoinventActivity {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => String, { nullable: true })
	parentActivityId?: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => String, { nullable: true })
	location?: string;

	@Field(() => GraphQLJSON, { nullable: true })
	rawData?: Record<string, unknown>;

	@RelationshipField<EcoinventActivity>(() => EcoinventClassification, { id: (entity) => entity.ecoinventClassification?.id, nullable: true })
	ecoinventClassification?: EcoinventClassification;

	@RelationshipField<EcoinventActivityClassification>(() => [EcoinventActivityClassification], { relatedField: 'ecoinventActivity' })
	ecoinventActivityClassifications!: EcoinventActivityClassification[];

	@RelationshipField<EcoinventActivityImpact>(() => [EcoinventActivityImpact], { relatedField: 'ecoinventActivity' })
	ecoinventActivityImpacts!: EcoinventActivityImpact[];

	@RelationshipField<MaterialClassificationActivity>(() => [MaterialClassificationActivity], { relatedField: 'ecoinventActivity' })
	materialClassificationActivities!: MaterialClassificationActivity[];

	@RelationshipField<MaterialEmissionFactor>(() => [MaterialEmissionFactor], { relatedField: 'ecoinventActivity' })
	materialEmissionFactors!: MaterialEmissionFactor[];
}
