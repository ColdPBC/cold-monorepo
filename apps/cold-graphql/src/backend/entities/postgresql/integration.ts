import { IntegrationHooks } from './integration.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Emission } from './emission';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { ServiceDefinition } from './service-definition';
import { UtilityBill } from './utility-bill';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../libs/acls/acl_policies';
import { OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'integrations' })
export class Integration {
	sidecar: IntegrationHooks;

	constructor() {
		this.sidecar = new IntegrationHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => ServiceDefinition, ref: true })
	serviceDefinition!: Ref<ServiceDefinition>;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'integrations_organization_id_idx' })
	organization!: Ref<Organization>;

	@Property({ type: 'json' })
	metadata!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => OrganizationFacility, ref: true, fieldName: 'facility_id', nullable: true })
	organizationFacility?: Ref<OrganizationFacility>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@OneToMany({ entity: () => Emission, mappedBy: 'integration' })
	emissions = new Collection<Emission>(this);

	@OneToMany({ entity: () => OrganizationFile, mappedBy: 'integration' })
	organizationFiles = new Collection<OrganizationFile>(this);

	@OneToMany({ entity: () => UtilityBill, mappedBy: 'integration' })
	utilityBills = new Collection<UtilityBill>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof Integration, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new IntegrationHooks();
		}
		return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof Integration, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new IntegrationHooks();
		}
		return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof Integration, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new IntegrationHooks();
		}
		return await this.sidecar.beforeReadHook(params);
	}

	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof Integration, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new IntegrationHooks();
		}
		return await this.sidecar.afterReadHook(params);
	}

	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof Integration, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new IntegrationHooks();
		}
		return await this.sidecar.beforeUpdateHook(params);
	}

	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof Integration, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new IntegrationHooks();
		}
		return await this.sidecar.afterUpdateHook(params);
	}

	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof Integration, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new IntegrationHooks();
		}
		return await this.sidecar.beforeDeleteHook(params);
	}

	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof Integration, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new IntegrationHooks();
		}
		return await this.sidecar.afterDeleteHook(params);
	}
}
