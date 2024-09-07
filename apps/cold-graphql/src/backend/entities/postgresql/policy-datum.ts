import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { PolicyDefinition } from './policy-definition';

@ApplyAccessControlList(default_acl)
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
