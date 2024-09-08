import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './component-definition-hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';

export enum ComponentDefinitionsType {
	UNKNOWN = 'UNKNOWN',
	FORM = 'FORM',
	NAVIGATION_SIDE = 'NAVIGATION_SIDE',
	NAVIGATION_HEADER = 'NAVIGATION_HEADER',
	NAVIGATION_FOOTER = 'NAVIGATION_FOOTER',
	DATAGRID = 'DATAGRID',
	TEST = 'TEST',
}

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'component_definitions' })
export class ComponentDefinition {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Unique({ name: 'component_definitions_name_key' })
	@Property({ type: 'text' })
	name!: string;

	@Enum({ type: 'string', items: () => ComponentDefinitionsType })
	type!: ComponentDefinitionsType;

	@Property({ type: 'text' })
	description!: string;

	@Property({ type: 'json' })
	definition!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<unknown, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<unknown, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<unknown, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<unknown, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
