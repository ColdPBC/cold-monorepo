import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './integration.hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Emission } from './emission';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { ServiceDefinition } from './service-definition';
import { UtilityBill } from './utility-bill';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'integrations' })
export class Integration {
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
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof Integration, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof Integration, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof Integration, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof Integration, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof Integration, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof Integration, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof Integration, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof Integration, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
