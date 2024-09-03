import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Organization } from './organization';
import { FacilityFootprint as OrmFacilityFootprint } from '../entities';
import { connection } from '../database';

@Entity<FacilityFootprint>('FacilityFootprint', {
	provider: new MikroBackendProvider(OrmFacilityFootprint, connection),
})
export class FacilityFootprint {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	facilityId!: string;

	@RelationshipField<FacilityFootprint>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => GraphQLJSON)
	emissions!: Record<string, unknown>;

	@Field(() => String)
	type!: string;

	@Field(() => Number)
	value!: number;

	@Field(() => Boolean)
	deleted = false;
}
