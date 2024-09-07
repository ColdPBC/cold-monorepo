import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Action } from './action';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'action_templates' })
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
