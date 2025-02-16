import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Emission } from './emission';
import { Material } from './material';
import { EmissionFactor as OrmEmissionFactor } from '../entities';
import { connection } from '../database';

@Entity<EmissionFactor>('EmissionFactor', {
	provider: new MikroBackendProvider(OrmEmissionFactor, connection),
})
export class EmissionFactor {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => String)
	description!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<Emission>(() => [Emission], { relatedField: 'emissionFactor' })
	emissions!: Emission[];

	@RelationshipField<Material>(() => [Material], { relatedField: 'emissionFactor' })
	materials!: Material[];
}
