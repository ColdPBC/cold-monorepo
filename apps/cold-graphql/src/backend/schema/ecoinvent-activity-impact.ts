import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { EcoinventActivity } from './ecoinvent-activity';
import { EcoinventImpactCategory } from './ecoinvent-impact-category';
import { EcoinventActivityImpact as OrmEcoinventActivityImpact } from '../entities';
import { connection } from '../database';

@Entity<EcoinventActivityImpact>('EcoinventActivityImpact', {
	provider: new MikroBackendProvider(OrmEcoinventActivityImpact, connection),
})
export class EcoinventActivityImpact {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<EcoinventActivityImpact>(() => EcoinventActivity, { id: (entity) => entity.ecoinventActivity?.id })
	ecoinventActivity!: EcoinventActivity;

	@RelationshipField<EcoinventActivityImpact>(() => EcoinventImpactCategory, { id: (entity) => entity.ecoinventImpactCategory?.id })
	ecoinventImpactCategory!: EcoinventImpactCategory;

	@Field(() => Number)
	impactValue!: number;

	@Field(() => String)
	impactUnitName!: string;

	@Field(() => String)
	impactMethodName!: string;

	@Field(() => String, { nullable: true })
	indicatorName?: string;
}
