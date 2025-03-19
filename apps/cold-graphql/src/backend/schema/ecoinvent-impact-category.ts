import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { EcoinventActivityImpact } from './ecoinvent-activity-impact';
import { EcoinventImpactCategory as OrmEcoinventImpactCategory } from '../entities';
import { connection } from '../database';

@Entity<EcoinventImpactCategory>('EcoinventImpactCategory', {
	provider: new MikroBackendProvider(OrmEcoinventImpactCategory, connection),
})
export class EcoinventImpactCategory {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	impactMethod!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<EcoinventActivityImpact>(() => [EcoinventActivityImpact], { relatedField: 'ecoinventImpactCategory' })
	ecoinventActivityImpacts!: EcoinventActivityImpact[];
}
