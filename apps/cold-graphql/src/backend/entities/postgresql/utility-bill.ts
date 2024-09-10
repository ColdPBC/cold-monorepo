import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './utility-bill.hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Integration } from './integration';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'utility_bills' })
export class UtilityBill {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Integration, ref: true })
	integration!: Ref<Integration>;

	@Property({ type: 'datetime', length: 3 })
	periodFrom!: Date;

	@Property({ type: 'datetime', length: 3 })
	periodTo!: Date;

	@Property({ type: 'json' })
	data!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => Organization, ref: true })
	organization!: Ref<Organization>;

	@ManyToOne({ entity: () => OrganizationFacility, ref: true, fieldName: 'facility_id' })
	organizationFacility!: Ref<OrganizationFacility>;

	@Property({ type: 'boolean', default: false })
	deleted = false;
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof UtilityBill, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof UtilityBill, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof UtilityBill, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof UtilityBill, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof UtilityBill, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof UtilityBill, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof UtilityBill, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof UtilityBill, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
