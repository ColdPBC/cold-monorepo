import { ActionTemplateHooks } from './action-template.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Action } from './action';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(read_only_acl)
@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'action_templates' })
export class ActionTemplate {
	sidecar: ActionTemplateHooks;

	constructor() {
		this.sidecar = new ActionTemplateHooks();
	}

	sidecar: ActionTemplateHooks;

	constructor() {
		this.sidecar = new ActionTemplateHooks();
	}

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

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ActionTemplate, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ActionTemplate, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ActionTemplate, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ActionTemplateHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
