import { MaterialTagHooks } from '../hooks/material-tag.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'material_tags' })
export class MaterialTag {
	sidecar: MaterialTagHooks;

	constructor() {
		this.sidecar = new MaterialTagHooks();
	}

	@PrimaryKey({ type: 'integer' })
	id!: number;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'material_tags_organization_id_idx1' })
	organization!: Ref<Organization>;

	@Property({ type: 'text' })
	tag!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof MaterialTag, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new MaterialTagHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof MaterialTag, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialTagHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof MaterialTag, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialTagHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof MaterialTag, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialTagHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof MaterialTag, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialTagHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof MaterialTag, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialTagHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof MaterialTag, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialTagHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof MaterialTag, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialTagHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
