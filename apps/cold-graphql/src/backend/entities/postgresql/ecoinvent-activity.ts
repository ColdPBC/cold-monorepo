import { EcoinventActivityHooks } from '../hooks/ecoinvent-activity.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, Index, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { EcoinventActivityClassification } from './ecoinvent-activity-classification';
import { EcoinventActivityImpact } from './ecoinvent-activity-impact';
import { EcoinventClassification } from './ecoinvent-classification';
import { MaterialClassificationActivity } from './material-classification-activity';
import { MaterialEmissionFactor } from './material-emission-factor';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'ecoinvent_activities' })
export class EcoinventActivity {
	sidecar: EcoinventActivityHooks;

	constructor() {
		this.sidecar = new EcoinventActivityHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Index({ name: 'ecoinvent_activities_name_idx1' })
	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text', nullable: true })
	description?: string;

	@Index({ name: 'ecoinvent_activities_parent_activity_id_idx1' })
	@Property({ type: 'text', nullable: true })
	parentActivityId?: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Index({ name: 'ecoinvent_activities_location_idx1' })
	@Property({ type: 'text', nullable: true })
	location?: string;

	@Property({ type: 'json', nullable: true })
	rawData?: Record<string, unknown>;

	@ManyToOne({ entity: () => EcoinventClassification, ref: true, nullable: true })
	ecoinventClassification?: Ref<EcoinventClassification>;

	@OneToMany({ entity: () => EcoinventActivityClassification, mappedBy: 'ecoinventActivity' })
	ecoinventActivityClassifications = new Collection<EcoinventActivityClassification>(this);

	@OneToMany({ entity: () => EcoinventActivityImpact, mappedBy: 'ecoinventActivity' })
	ecoinventActivityImpacts = new Collection<EcoinventActivityImpact>(this);

	@OneToMany({ entity: () => MaterialClassificationActivity, mappedBy: 'ecoinventActivity' })
	materialClassificationActivities = new Collection<MaterialClassificationActivity>(this);

	@OneToMany({ entity: () => MaterialEmissionFactor, mappedBy: 'ecoinventActivity' })
	materialEmissionFactors = new Collection<MaterialEmissionFactor>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof EcoinventActivity, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof EcoinventActivity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof EcoinventActivity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof EcoinventActivity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof EcoinventActivity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof EcoinventActivity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof EcoinventActivity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof EcoinventActivity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
