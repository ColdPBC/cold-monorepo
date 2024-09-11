import { CategoryDatumHooks } from './category-datum.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { CategoryDefinition } from './category-definition';
import { Organization } from './organization';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'category_data' })
export class CategoryDatum {
	sidecar: CategoryDatumHooks;

	constructor() {
		this.sidecar = new CategoryDatumHooks();
	}

	@Unique({ name: 'category_data_id_key' })
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => CategoryDefinition, ref: true })
	categoryDefinition!: Ref<CategoryDefinition>;

	@ManyToOne({ entity: () => Organization, ref: true })
	organization!: Ref<Organization>;

	@Property({ type: 'json' })
	data!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof CategoryDatum, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new CategoryDatumHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof CategoryDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDatumHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof CategoryDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDatumHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof CategoryDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDatumHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof CategoryDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDatumHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof CategoryDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDatumHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof CategoryDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDatumHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof CategoryDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDatumHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
