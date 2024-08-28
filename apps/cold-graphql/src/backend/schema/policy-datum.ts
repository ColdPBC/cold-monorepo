import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { PolicyDefinition } from './policy-definition';
import { PolicyDatum as OrmPolicyDatum } from '../entities';
import { connection } from '../database';

@Entity<PolicyDatum>('PolicyDatum', {
	provider: new MikroBackendProvider(OrmPolicyDatum, connection),
})
export class PolicyDatum {
	@Field(() => String)
	email!: string;

	@RelationshipField<PolicyDatum>(() => PolicyDefinition, { id: (entity) => entity.policyDefinition?.id })
	policyDefinition!: PolicyDefinition;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => ID, { primaryKeyField: true })
	id!: number;
}
