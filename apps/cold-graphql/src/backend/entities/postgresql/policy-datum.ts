import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { PolicyDefinition } from './policy-definition';

@Entity({ tableName: 'policy_data' })
export class PolicyDatum {
	@Property({ type: 'text' })
	email!: string;

	@ManyToOne({ entity: () => PolicyDefinition, ref: true, fieldName: 'policy_id' })
	policyDefinition!: Ref<PolicyDefinition>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@PrimaryKey({ type: 'integer' })
	id!: number;
}
