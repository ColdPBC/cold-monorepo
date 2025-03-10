import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { EcoinventImport } from './ecoinvent-import';
import { EcoinventDatum as OrmEcoinventDatum } from '../entities';
import { connection } from '../database';

@Entity<EcoinventDatum>('EcoinventDatum', {
	provider: new MikroBackendProvider(OrmEcoinventDatum, connection),
})
export class EcoinventDatum {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<EcoinventDatum>(() => EcoinventImport, { id: (entity) => entity.ecoinventImport?.id })
	ecoinventImport!: EcoinventImport;

	@Field(() => String)
	key!: string;

	@Field(() => String, { nullable: true })
	xml?: string;

	@Field(() => GraphQLJSON, { nullable: true })
	parsed?: Record<string, unknown>;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;
}
