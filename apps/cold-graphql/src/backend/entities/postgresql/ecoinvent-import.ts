import { EcoinventImportHooks } from '../hooks/ecoinvent-import.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, Enum, Index, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { EcoinventDatum } from './ecoinvent-datum';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

export enum EcoinventImportsProcessingStatus {
	IMPORT_COMPLETE = 'IMPORT_COMPLETE',
	PROCESSING_ERROR = 'PROCESSING_ERROR',
	MANUAL_REVIEW = 'MANUAL_REVIEW',
	AI_PROCESSING = 'AI_PROCESSING',
	PENDING = 'PENDING',
	JOB_PROCESSING = 'JOB_PROCESSING',
}

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'ecoinvent_imports' })
export class EcoinventImport {
	sidecar: EcoinventImportHooks;

	constructor() {
		this.sidecar = new EcoinventImportHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	bucket!: string;

	@Index({ name: 'ecoinvent_imports_key_idx1' })
	@Unique({ name: 'ecoinvent_imports_key_key' })
	@Property({ type: 'text' })
	key!: string;

	@Index({ name: 'ecoinvent_imports_activity_name_idx1' })
	@Property({ type: 'text' })
	activityName!: string;

	@Index({ name: 'ecoinvent_imports_location_idx1' })
	@Property({ type: 'text' })
	location!: string;

	@Index({ name: 'ecoinvent_imports_reference_product_idx1' })
	@Property({ type: 'text' })
	referenceProduct!: string;

	@Index({ name: 'ecoinvent_imports_job_id_idx1' })
	@Property({ type: 'bigint', nullable: true })
	jobId?: bigint;

	@Index({ name: 'ecoinvent_imports_job_status_idx1' })
	@Property({ type: 'text', nullable: true })
	jobStatus?: string;

	@Index({ name: 'ecoinvent_imports_processing_status_idx1' })
	@Enum({ type: 'string', items: () => EcoinventImportsProcessingStatus, default: 'PENDING' })
	processingStatus: EcoinventImportsProcessingStatus = EcoinventImportsProcessingStatus.PENDING;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updateAt!: Date;

	@OneToMany({ entity: () => EcoinventDatum, mappedBy: 'ecoinventImport' })
	ecoinventData = new Collection<EcoinventDatum>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof EcoinventImport, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new EcoinventImportHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof EcoinventImport, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImportHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof EcoinventImport, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImportHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof EcoinventImport, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImportHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof EcoinventImport, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImportHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof EcoinventImport, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImportHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof EcoinventImport, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImportHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof EcoinventImport, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventImportHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
