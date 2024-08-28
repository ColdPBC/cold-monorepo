import { Entity, Field, ID } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { EmissionScope as OrmEmissionScope } from '../entities';
import { connection } from '../database';

@Entity<EmissionScope>('EmissionScope', {
	provider: new MikroBackendProvider(OrmEmissionScope, connection),
})
export class EmissionScope {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	label!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => Number, { nullable: true })
	ghgSubcategory?: number;

	@Field(() => Number)
	ghgCategory!: number;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => String, { nullable: true })
	subcategoryLabel?: string;

	@Field(() => Boolean)
	deleted = false;
}
