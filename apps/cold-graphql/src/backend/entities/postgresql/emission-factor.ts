import { EmissionFactorHooks } from '../hooks/emission-factor.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, Index, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { MaterialEmissionFactor } from './material-emission-factor';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'emission_factors' })
export class EmissionFactor {
	sidecar: EmissionFactorHooks;

	constructor() {
		this.sidecar = new EmissionFactorHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text', nullable: true })
	description?: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Index({ name: 'emission_factors_value_idx1' })
	@Property({ type: 'double' })
	value!: number;

	@OneToMany({ entity: () => MaterialEmissionFactor, mappedBy: 'emissionFactor' })
	materialEmissionFactors = new Collection<MaterialEmissionFactor>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof EmissionFactor, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new EmissionFactorHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof EmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionFactorHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof EmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionFactorHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof EmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionFactorHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof EmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionFactorHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof EmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionFactorHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof EmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionFactorHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof EmissionFactor, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EmissionFactorHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
