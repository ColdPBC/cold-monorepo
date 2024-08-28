import { Entity, Field, ID } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { PrismaMigration as OrmPrismaMigration } from '../entities';
import { connection } from '../database';

@Entity<PrismaMigration>('PrismaMigration', {
	provider: new MikroBackendProvider(OrmPrismaMigration, connection),
})
export class PrismaMigration {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	checksum!: string;

	@Field(() => ISODateStringScalar, { nullable: true })
	finishedAt?: Date;

	@Field(() => String)
	migrationName!: string;

	@Field(() => String, { nullable: true })
	logs?: string;

	@Field(() => ISODateStringScalar, { nullable: true })
	rolledBackAt?: Date;

	@Field(() => ISODateStringScalar)
	startedAt!: Date;

	@Field(() => Number)
	appliedStepsCount = 0;
}
