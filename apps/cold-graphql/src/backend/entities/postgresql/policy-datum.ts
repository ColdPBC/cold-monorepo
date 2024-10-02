import { PolicyDatumHooks } from '../hooks/policy-datum.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { PolicyDefinition } from './policy-definition';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'policy_data' })
export class PolicyDatum {
	sidecar: PolicyDatumHooks;

	constructor() {
		this.sidecar = new PolicyDatumHooks();
	}

	@Property({ type: 'text' })
	email!: string;

	@ManyToOne({ entity: () => PolicyDefinition, ref: true, fieldName: 'policy_id' })
	policyDefinition!: Ref<PolicyDefinition>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@PrimaryKey({ type: 'integer' })
	id!: number;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof PolicyDatum, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new PolicyDatumHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof PolicyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PolicyDatumHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof PolicyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PolicyDatumHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof PolicyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PolicyDatumHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof PolicyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PolicyDatumHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof PolicyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PolicyDatumHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof PolicyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PolicyDatumHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof PolicyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PolicyDatumHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
