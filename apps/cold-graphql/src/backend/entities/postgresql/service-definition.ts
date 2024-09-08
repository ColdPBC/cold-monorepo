import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './service-definition-hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { cold_admin_only } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Integration } from './integration';
import { SupportedUtility } from './supported-utility';

export enum ServiceDefinitionsType {
	PROVIDER = 'provider',
	PLATFORM = 'platform',
	CORE = 'core',
}

@ApplyAccessControlList(cold_admin_only)
@Entity({ tableName: 'service_definitions' })
export class ServiceDefinition {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Unique({ name: 'service_definitions_name_key' })
	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text' })
	label!: string;

	@Property({ type: 'json' })
	definition!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Enum({ type: 'string', items: () => ServiceDefinitionsType })
	type!: ServiceDefinitionsType;

	@OneToMany({ entity: () => Integration, mappedBy: 'serviceDefinition' })
	integrations = new Collection<Integration>(this);

	@OneToMany({ entity: () => SupportedUtility, mappedBy: 'serviceDefinition' })
	supportedUtilities = new Collection<SupportedUtility>(this);
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
