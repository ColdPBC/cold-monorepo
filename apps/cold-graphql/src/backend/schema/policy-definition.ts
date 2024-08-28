import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { PolicyDatum } from './policy-datum';
import { PolicyDefinition as OrmPolicyDefinition } from '../entities';
import { connection } from '../database';

@Entity<PolicyDefinition>('PolicyDefinition', {
	provider: new MikroBackendProvider(OrmPolicyDefinition, connection),
})
export class PolicyDefinition {
	@Field(() => ID, { primaryKeyField: true })
	id!: number;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => String)
	definition!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<PolicyDatum>(() => [PolicyDatum], { relatedField: 'policyDefinition' })
	policyData!: PolicyDatum[];
}
