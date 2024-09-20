import { TestModelHooks } from './test-model.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, PrimaryKey } from '@mikro-orm/core';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'test_model' })
export class TestModel {
	sidecar: TestModelHooks;

	constructor() {
		this.sidecar = new TestModelHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof TestModel, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new TestModelHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof TestModel, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new TestModelHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof TestModel, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new TestModelHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof TestModel, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new TestModelHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof TestModel, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new TestModelHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof TestModel, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new TestModelHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof TestModel, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new TestModelHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof TestModel, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new TestModelHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
