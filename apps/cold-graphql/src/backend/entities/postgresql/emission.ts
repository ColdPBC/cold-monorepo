import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './emission-hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Integration } from './integration';
import { OrganizationFacility } from './organization-facility';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'emissions' })
export class Emission {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => Integration, ref: true })
	integration!: Ref<Integration>;

	@Property({ type: 'json' })
	activityData!: Record<string, unknown>;

	@Property({ type: 'json' })
	integrationData!: Record<string, unknown>;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text' })
	region!: string;

	@Property({ type: 'text' })
	category!: string;

	@Property({ type: 'double' })
	co2e!: number;

	@Property({ type: 'text' })
	co2eCalculationOrigin!: string;

	@Property({ type: 'text' })
	co2eUnit!: string;

	@Property({ type: 'json' })
	emissionFactor!: Record<string, unknown>;

	@Property({ fieldName: 'co2_calculation_method', type: 'text' })
	co2CalculationMethod!: string;

	@Property({ type: 'json' })
	constituentGases!: Record<string, unknown>;

	@ManyToOne({ entity: () => OrganizationFacility, ref: true, fieldName: 'facility_id' })
	organizationFacility!: Ref<OrganizationFacility>;

	@Property({ type: 'boolean', default: false })
	deleted = false;
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<unknown, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<unknown, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<unknown, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<unknown, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
