import { EcoinventImpactCategoryHooks } from '../hooks/ecoinvent-impact-category.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, Index, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { EcoinventActivityImpact } from './ecoinvent-activity-impact';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'ecoinvent_impact_categories' })
export class EcoinventImpactCategory {
	sidecar: EcoinventImpactCategoryHooks;

	constructor() {
		this.sidecar = new EcoinventImpactCategoryHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Index({ name: 'ecoinvent_impact_categories_impact_method_idx1' })
	@Property({ type: 'text' })
	impactMethod!: string;

	@Index({ name: 'ecoinvent_impact_categories_name_idx1' })
	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@OneToMany({ entity: () => EcoinventActivityImpact, mappedBy: 'ecoinventImpactCategory' })
	ecoinventActivityImpacts = new Collection<EcoinventActivityImpact>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof EcoinventImpactCategory, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new EcoinventImpactCategoryHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof EcoinventImpactCategory, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImpactCategoryHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof EcoinventImpactCategory, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImpactCategoryHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof EcoinventImpactCategory, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImpactCategoryHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof EcoinventImpactCategory, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImpactCategoryHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof EcoinventImpactCategory, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImpactCategoryHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof EcoinventImpactCategory, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImpactCategoryHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof EcoinventImpactCategory, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImpactCategoryHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
