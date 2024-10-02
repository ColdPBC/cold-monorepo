import { CategoryDefinitionHooks } from '../hooks/category-definition.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { CategoryDatum } from './category-datum';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'category_definitions' })
export class CategoryDefinition {
	sidecar: CategoryDefinitionHooks;

	constructor() {
		this.sidecar = new CategoryDefinitionHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Unique({ name: 'category_definitions_name_key' })
	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text' })
	description!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'json' })
	definition!: Record<string, unknown>;

	@OneToMany({ entity: () => CategoryDatum, mappedBy: 'categoryDefinition' })
	categoryData = new Collection<CategoryDatum>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof CategoryDefinition, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new CategoryDefinitionHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof CategoryDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDefinitionHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof CategoryDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDefinitionHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof CategoryDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDefinitionHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof CategoryDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDefinitionHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof CategoryDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDefinitionHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof CategoryDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDefinitionHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof CategoryDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CategoryDefinitionHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
