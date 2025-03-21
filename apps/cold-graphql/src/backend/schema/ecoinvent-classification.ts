import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { EcoinventActivity } from './ecoinvent-activity';
import { EcoinventActivityClassification } from './ecoinvent-activity-classification';
import { EcoinventClassification as OrmEcoinventClassification } from '../entities';
import { connection } from '../database';

@Entity<EcoinventClassification>('EcoinventClassification', {
	provider: new MikroBackendProvider(OrmEcoinventClassification, connection),
})
export class EcoinventClassification {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => String)
	system!: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<EcoinventActivity>(() => [EcoinventActivity], { relatedField: 'ecoinventClassification' })
	ecoinventActivities!: EcoinventActivity[];

	@RelationshipField<EcoinventActivityClassification>(() => [EcoinventActivityClassification], { relatedField: 'ecoinventClassification' })
	ecoinventActivityClassifications!: EcoinventActivityClassification[];
}
