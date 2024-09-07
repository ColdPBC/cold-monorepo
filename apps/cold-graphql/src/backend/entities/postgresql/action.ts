import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ActionTemplate } from './action-template';
import { Organization } from './organization';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'actions' })
export class Action {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'json' })
	action!: Record<string, unknown>;

	@ManyToOne({ entity: () => ActionTemplate, ref: true })
	actionTemplate!: Ref<ActionTemplate>;

	@ManyToOne({ entity: () => Organization, ref: true })
	organization!: Ref<Organization>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;
}
