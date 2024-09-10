import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './sustainability-attribute.hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Collection, Entity, Enum, Index, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { OrganizationAttribute } from './organization-attribute';

export enum SustainabilityAttributesLevel {
	ORGANIZATION = 'ORGANIZATION',
	SUPPLIER = 'SUPPLIER',
	PRODUCT = 'PRODUCT',
	MATERIAL = 'MATERIAL',
}

export enum SustainabilityAttributesType {
	THIRD_PARTY = 'THIRD_PARTY',
	INTERNAL = 'INTERNAL',
	TEST = 'TEST',
}

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'sustainability_attributes' })
export class SustainabilityAttribute {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Organization, ref: true, nullable: true, index: 'sustainability_attributes_organization_id_idx1' })
	organization?: Ref<Organization>;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Index({ name: 'sustainability_attributes_level_idx1' })
	@Enum({ type: 'string', items: () => SustainabilityAttributesLevel })
	level!: SustainabilityAttributesLevel;

	@Index({ name: 'sustainability_attributes_type_idx1' })
	@Enum({ type: 'string', items: () => SustainabilityAttributesType })
	type!: SustainabilityAttributesType;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@OneToMany({ entity: () => OrganizationAttribute, mappedBy: 'sustainabilityAttribute' })
	organizationAttributes = new Collection<OrganizationAttribute>(this);
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof SustainabilityAttribute, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof SustainabilityAttribute, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof SustainabilityAttribute, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof SustainabilityAttribute, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
