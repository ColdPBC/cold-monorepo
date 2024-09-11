import { SupportedUtilityHooks } from './supported-utility.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { ServiceDefinition } from './service-definition';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'supported_utilities' })
export class SupportedUtility {
	sidecar: SupportedUtilityHooks;

	constructor() {
		this.sidecar = new SupportedUtilityHooks();
	}

	@Unique({ name: 'supported_utilities_id_key' })
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => ServiceDefinition, ref: true })
	serviceDefinition!: Ref<ServiceDefinition>;

	@Unique({ name: 'supported_utilities_name_key' })
	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text' })
	label!: string;

	@Property({ type: 'json' })
	data!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof SupportedUtility, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new SupportedUtilityHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof SupportedUtility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SupportedUtilityHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof SupportedUtility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SupportedUtilityHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof SupportedUtility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SupportedUtilityHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof SupportedUtility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SupportedUtilityHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof SupportedUtility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SupportedUtilityHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof SupportedUtility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SupportedUtilityHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof SupportedUtility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SupportedUtilityHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
