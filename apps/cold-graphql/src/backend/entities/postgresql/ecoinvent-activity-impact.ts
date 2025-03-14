import { EcoinventActivityImpactHooks } from '../hooks/ecoinvent-activity-impact.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, Index, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { EcoinventActivity } from './ecoinvent-activity';
import { EcoinventImpactCategory } from './ecoinvent-impact-category';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'ecoinvent_activity_impacts' })
export class EcoinventActivityImpact {
	sidecar: EcoinventActivityImpactHooks;

	constructor() {
		this.sidecar = new EcoinventActivityImpactHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => EcoinventActivity, ref: true, index: 'ecoinvent_activity_impacts_ecoinvent_activity_id_idx1' })
	ecoinventActivity!: Ref<EcoinventActivity>;

	@ManyToOne({ entity: () => EcoinventImpactCategory, ref: true, fieldName: 'impact_category_id', index: 'ecoinvent_activity_impacts_impact_category_id_idx1' })
	ecoinventImpactCategory!: Ref<EcoinventImpactCategory>;

	@Index({ name: 'ecoinvent_activity_impacts_impact_value_idx1' })
	@Property({ type: 'double' })
	impactValue!: number;

	@Property({ type: 'text' })
	impactUnitName!: string;

	@Property({ type: 'text' })
	impactMethodName!: string;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof EcoinventActivityImpact, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityImpactHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof EcoinventActivityImpact, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityImpactHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof EcoinventActivityImpact, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityImpactHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof EcoinventActivityImpact, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityImpactHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof EcoinventActivityImpact, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityImpactHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof EcoinventActivityImpact, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityImpactHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof EcoinventActivityImpact, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityImpactHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof EcoinventActivityImpact, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityImpactHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
