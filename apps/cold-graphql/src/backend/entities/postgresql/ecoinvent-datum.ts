import { EcoinventDatumHooks } from '../hooks/ecoinvent-datum.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, Index, ManyToOne, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { EcoinventImport } from './ecoinvent-import';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'ecoinvent_data' })
export class EcoinventDatum {
	sidecar: EcoinventDatumHooks;

	constructor() {
		this.sidecar = new EcoinventDatumHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => EcoinventImport, ref: true, fieldName: 'import_id' })
	ecoinventImport!: Ref<EcoinventImport>;

	@Index({ name: 'ecoinvent_data_key_idx1' })
	@Unique({ name: 'ecoinvent_data_key_key' })
	@Property({ type: 'text' })
	key!: string;

	@Property({ type: 'text', nullable: true })
	xml?: string;

	@Property({ type: 'json', nullable: true })
	parsed?: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'text', nullable: true })
	activityName?: string;

	@Property({ type: 'text', nullable: true })
	description?: string;

	@Property({ type: 'text', nullable: true })
	location?: string;

	@Property({ type: 'datetime', length: 3, nullable: true })
	updatedAt?: Date;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof EcoinventDatum, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new EcoinventDatumHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof EcoinventDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventDatumHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof EcoinventDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventDatumHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof EcoinventDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventDatumHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof EcoinventDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventDatumHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof EcoinventDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventDatumHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof EcoinventDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventDatumHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof EcoinventDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventDatumHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
