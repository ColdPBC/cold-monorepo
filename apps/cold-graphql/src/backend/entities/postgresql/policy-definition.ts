import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { PolicyDatum } from './policy-datum';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { public_acl } from '../../acl_policies';

@Entity({ tableName: 'policy_definitions' })
@ApplyAccessControlList(public_acl)
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
