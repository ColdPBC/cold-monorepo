import { VectorRecordHooks } from './vector-record.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { OrganizationFile } from './organization-file';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { cold_admin_only, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(cold_admin_only)
@Entity({ tableName: 'vector_records' })
export class VectorRecord {
	sidecar: VectorRecordHooks;

	constructor() {
		this.sidecar = new VectorRecordHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'json' })
	metadata!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => OrganizationFile, ref: true, nullable: true, index: 'vector_records_organization_file_id_idx' })
	organizationFile?: Ref<OrganizationFile>;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'vector_records_organization_id_idx' })
	organization!: Ref<Organization>;

	@Property({ type: 'text', nullable: true })
	url?: string;

	@Property({ type: 'json' })
	values!: Record<string, unknown>;

	@Property({ type: 'text' })
	indexName!: string;

	@Property({ type: 'text' })
	namespace!: string;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof VectorRecord, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new VectorRecordHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof VectorRecord, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new VectorRecordHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof VectorRecord, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new VectorRecordHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof VectorRecord, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new VectorRecordHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof VectorRecord, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new VectorRecordHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof VectorRecord, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new VectorRecordHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof VectorRecord, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new VectorRecordHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof VectorRecord, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new VectorRecordHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
