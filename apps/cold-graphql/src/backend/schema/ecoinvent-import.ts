import { Entity, Field, ID, RelationshipField, graphweaverMetadata } from '@exogee/graphweaver';
import { GraphQLBigInt, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { EcoinventDatum } from './ecoinvent-datum';
import { EcoinventImportsProcessingStatus, EcoinventImport as OrmEcoinventImport } from '../entities';
import { connection } from '../database';

graphweaverMetadata.collectEnumInformation({ target: EcoinventImportsProcessingStatus, name: 'EcoinventImportsProcessingStatus' });

@Entity<EcoinventImport>('EcoinventImport', {
	provider: new MikroBackendProvider(OrmEcoinventImport, connection),
})
export class EcoinventImport {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	bucket!: string;

	@Field(() => String)
	key!: string;

	@Field(() => String)
	activityName!: string;

	@Field(() => String)
	location!: string;

	@Field(() => String)
	referenceProduct!: string;

	@Field(() => GraphQLBigInt, { nullable: true })
	jobId?: bigint;

	@Field(() => String, { nullable: true })
	jobStatus?: string;

	@Field(() => EcoinventImportsProcessingStatus)
	processingStatus: string = EcoinventImportsProcessingStatus.PENDING;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updateAt!: Date;

	@RelationshipField<EcoinventDatum>(() => [EcoinventDatum], { relatedField: 'ecoinventImport' })
	ecoinventData!: EcoinventDatum[];
}
