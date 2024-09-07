import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { PolicyDatum } from './policy-datum';

@ApplyAccessControlList(read_only_acl)
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
