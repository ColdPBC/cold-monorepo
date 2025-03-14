import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { EcoinventActivity } from './ecoinvent-activity';
import { EcoinventClassification } from './ecoinvent-classification';
import { EcoinventActivityClassification as OrmEcoinventActivityClassification } from '../entities';
import { connection } from '../database';

@Entity<EcoinventActivityClassification>('EcoinventActivityClassification', {
	provider: new MikroBackendProvider(OrmEcoinventActivityClassification, connection),
})
export class EcoinventActivityClassification {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<EcoinventActivityClassification>(() => EcoinventActivity, { id: (entity) => entity.ecoinventActivity?.id })
	ecoinventActivity!: EcoinventActivity;

	@RelationshipField<EcoinventActivityClassification>(() => EcoinventClassification, { id: (entity) => entity.ecoinventClassification?.id })
	ecoinventClassification!: EcoinventClassification;
}
