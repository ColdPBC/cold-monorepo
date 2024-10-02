import { ComponentDefinitionHooks } from '../hooks/component-definition.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

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
	sidecar: ComponentDefinitionHooks;

	constructor() {
		this.sidecar = new ComponentDefinitionHooks();
	}

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

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ComponentDefinition, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ComponentDefinitionHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ComponentDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComponentDefinitionHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ComponentDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComponentDefinitionHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ComponentDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComponentDefinitionHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ComponentDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComponentDefinitionHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ComponentDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComponentDefinitionHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ComponentDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComponentDefinitionHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ComponentDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComponentDefinitionHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
