import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './policy-definition.hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

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
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof PolicyDefinition, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof PolicyDefinition, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof PolicyDefinition, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof PolicyDefinition, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
