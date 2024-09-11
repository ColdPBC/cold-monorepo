import { OrganizationComplianceStatusHooks } from './organization-compliance-status.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { OrganizationCompliance } from './organization-compliance';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../libs/acls/acl_policies';
import { OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_compliance_statuses' })
export class OrganizationComplianceStatus {
	sidecar: OrganizationComplianceStatusHooks;

	constructor() {
		this.sidecar = new OrganizationComplianceStatusHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	type!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'text' })
	email!: string;

	@ManyToOne({ entity: () => OrganizationCompliance, ref: true, index: 'organization_compliance_statuse_organization_compliance_id_idx1' })
	organizationCompliance!: Ref<OrganizationCompliance>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceStatusHooks();
		}
		return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceStatusHooks();
		}
		return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceStatusHooks();
		}
		return await this.sidecar.beforeReadHook(params);
	}

	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceStatusHooks();
		}
		return await this.sidecar.afterReadHook(params);
	}

	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceStatusHooks();
		}
		return await this.sidecar.beforeUpdateHook(params);
	}

	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceStatusHooks();
		}
		return await this.sidecar.afterUpdateHook(params);
	}

	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceStatusHooks();
		}
		return await this.sidecar.beforeDeleteHook(params);
	}

	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceStatusHooks();
		}
		return await this.sidecar.afterDeleteHook(params);
	}
}
