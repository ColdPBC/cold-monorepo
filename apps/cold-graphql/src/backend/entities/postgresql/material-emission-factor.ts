import { MaterialEmissionFactorHooks } from '../hooks/material-emission-factor.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { EcoinventActivity } from './ecoinvent-activity';
import { EmissionFactor } from './emission-factor';
import { Material } from './material';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'material_emission_factors' })
export class MaterialEmissionFactor {
	sidecar: MaterialEmissionFactorHooks;

	constructor() {
		this.sidecar = new MaterialEmissionFactorHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Material, ref: true, index: 'material_emission_factors_material_id_idx1' })
	material!: Ref<Material>;

	@ManyToOne({ entity: () => EmissionFactor, ref: true })
	emissionFactor!: Ref<EmissionFactor>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => EcoinventActivity, ref: true, fieldName: 'eco_invent_activity_id', nullable: true, index: 'material_emission_factors_activity_id_idx1' })
	ecoinventActivity?: Ref<EcoinventActivity>;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof MaterialEmissionFactor, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new MaterialEmissionFactorHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof MaterialEmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEmissionFactorHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof MaterialEmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEmissionFactorHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof MaterialEmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEmissionFactorHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof MaterialEmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEmissionFactorHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof MaterialEmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEmissionFactorHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof MaterialEmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEmissionFactorHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof MaterialEmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEmissionFactorHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
