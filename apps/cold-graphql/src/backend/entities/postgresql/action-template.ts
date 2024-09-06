import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Action } from './action';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

@Entity({ tableName: 'action_templates' })
@ApplyAccessControlList(default_acl)
export class ActionTemplate {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @Property({ type: 'json' })
  template!: Record<string, unknown>;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @OneToMany({ entity: () => Action, mappedBy: 'actionTemplate' })
  actions = new Collection<Action>(this);
}
