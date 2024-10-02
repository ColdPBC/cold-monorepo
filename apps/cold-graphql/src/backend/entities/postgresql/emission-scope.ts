import { EmissionScopeHooks } from '../hooks/emission-scope.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'emission_scopes' })
export class EmissionScope {
	sidecar: EmissionScopeHooks;

	constructor() {
		this.sidecar = new EmissionScopeHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	label!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'integer', nullable: true })
	ghgSubcategory?: number;

	@Property({ type: 'integer' })
	ghgCategory!: number;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text', nullable: true })
	subcategoryLabel?: string;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof EmissionScope, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new EmissionScopeHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof EmissionScope, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionScopeHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof EmissionScope, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionScopeHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof EmissionScope, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionScopeHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof EmissionScope, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionScopeHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof EmissionScope, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionScopeHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof EmissionScope, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionScopeHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof EmissionScope, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionScopeHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
