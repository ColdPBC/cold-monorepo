import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { PolicyDatum } from './policy-datum';

@Entity({ tableName: 'policy_definitions' })
export class PolicyDefinition {
	@PrimaryKey({ type: 'integer' })
	id!: number;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text' })
	definition!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@OneToMany({ entity: () => PolicyDatum, mappedBy: 'policyDefinition' })
	policyData = new Collection<PolicyDatum>(this);
}
