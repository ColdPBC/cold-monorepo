import { FacilityFootprintHooks } from './facility-footprint.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../libs/acls/acl_policies';
import { OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'facility_footprints' })
export class FacilityFootprint {
	sidecar: FacilityFootprintHooks;

	constructor() {
		this.sidecar = new FacilityFootprintHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	facilityId!: string;

	@ManyToOne({ entity: () => Organization, ref: true })
	organization!: Ref<Organization>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'json' })
	emissions!: Record<string, unknown>;

	@Property({ type: 'text', default: 'year' })
	type!: string;

	@Property({ type: 'integer' })
	value!: number;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof FacilityFootprint, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new FacilityFootprintHooks();
		}
		return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof FacilityFootprint, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new FacilityFootprintHooks();
		}
		return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof FacilityFootprint, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new FacilityFootprintHooks();
		}
		return await this.sidecar.beforeReadHook(params);
	}

	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof FacilityFootprint, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new FacilityFootprintHooks();
		}
		return await this.sidecar.afterReadHook(params);
	}

	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof FacilityFootprint, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new FacilityFootprintHooks();
		}
		return await this.sidecar.beforeUpdateHook(params);
	}

	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof FacilityFootprint, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new FacilityFootprintHooks();
		}
		return await this.sidecar.afterUpdateHook(params);
	}

	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof FacilityFootprint, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new FacilityFootprintHooks();
		}
		return await this.sidecar.beforeDeleteHook(params);
	}

	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof FacilityFootprint, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new FacilityFootprintHooks();
		}
		return await this.sidecar.afterDeleteHook(params);
	}
}
