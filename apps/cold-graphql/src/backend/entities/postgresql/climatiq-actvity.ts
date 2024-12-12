import { ClimatiqActvityHooks } from '../hooks/climatiq-actvity.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'climatiq_actvities' })
export class ClimatiqActvity {
	sidecar: ClimatiqActvityHooks;

	constructor() {
		this.sidecar = new ClimatiqActvityHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	activityId!: string;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text' })
	category!: string;

	@Property({ type: 'text' })
	sector!: string;

	@Property({ type: 'text' })
	source!: string;

	@Property({ type: 'text' })
	sourceLink!: string;

	@Property({ type: 'text' })
	sourceDataset!: string;

	@Property({ type: 'integer' })
	year!: number;

	@Property({ type: 'integer' })
	yearReleased!: number;

	@Property({ type: 'text' })
	region!: string;

	@Property({ type: 'text' })
	regionName!: string;

	@Property({ type: 'text' })
	description!: string;

	@Property({ type: 'text' })
	unitType!: string;

	@Property({ type: 'text', nullable: true })
	unit?: string;

	@Property({ type: 'text' })
	sourceLcaActivity!: string;

	@Property({ type: 'json' })
	dataQualityFlags!: Record<string, unknown>;

	@Property({ type: 'text' })
	accessType!: string;

	@Property({ type: 'json' })
	supportedCalculationMethods!: Record<string, unknown>;

	@Property({ type: 'text', nullable: true })
	factor?: string;

	@Property({ type: 'text', nullable: true })
	factorCalculationMethod?: string;

	@Property({ type: 'json', nullable: true })
	constituentGases?: Record<string, unknown>;

	@Property({ type: 'json' })
	dataVersion!: Record<string, unknown>;

	@Property({ type: 'json' })
	dataVersionInformation!: Record<string, unknown>;

	@Property({ type: 'text', nullable: true })
	factorCalculationOrigin?: string;

	@Property({ type: 'integer', nullable: true })
	uncertainty?: number;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ClimatiqActvity, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ClimatiqActvityHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ClimatiqActvity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ClimatiqActvityHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ClimatiqActvity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ClimatiqActvityHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ClimatiqActvity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ClimatiqActvityHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ClimatiqActvity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ClimatiqActvityHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ClimatiqActvity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ClimatiqActvityHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ClimatiqActvity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ClimatiqActvityHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ClimatiqActvity, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ClimatiqActvityHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
