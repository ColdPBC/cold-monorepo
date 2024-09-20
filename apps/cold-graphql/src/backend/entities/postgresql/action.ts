import { ActionHooks } from './action.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ActionTemplate } from './action-template';
import { Organization } from './organization';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(read_only_acl)
@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'actions' })
export class Action {
	sidecar: ActionHooks;

	constructor() {
		this.sidecar = new ActionHooks();
	}

	sidecar: ActionHooks;

	constructor() {
		this.sidecar = new ActionHooks();
	}

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

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof Action, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof Action, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof Action, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
