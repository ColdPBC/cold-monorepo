import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './organization-attribute-hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { AttributeAssurance } from './attribute-assurance';
import { Material } from './material';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { Product } from './product';
import { SustainabilityAttribute } from './sustainability-attribute';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_attributes' })
export class OrganizationAttribute {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => SustainabilityAttribute, ref: true, index: 'organization_attributes_attribute_id_idx1' })
	sustainabilityAttribute!: Ref<SustainabilityAttribute>;

	@ManyToOne({ entity: () => OrganizationFacility, ref: true, nullable: true, index: 'organization_attributes_organization_facility_id_idx' })
	organizationFacility?: Ref<OrganizationFacility>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@ManyToOne({ entity: () => Material, ref: true, nullable: true, index: 'organization_attributes_material_id_idx1' })
	material?: Ref<Material>;

	@ManyToOne({ entity: () => Product, ref: true, nullable: true, index: 'organization_attributes_product_id_idx1' })
	product?: Ref<Product>;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'organization_attributes_organization_id_idx1' })
	organization!: Ref<Organization>;

	@ManyToOne({ entity: () => OrganizationFile, ref: true, nullable: true, index: 'organization_attributes_organization_file_id_idx1' })
	organizationFile?: Ref<OrganizationFile>;

	@OneToMany({ entity: () => AttributeAssurance, mappedBy: 'organizationAttribute' })
	attributeAssurances = new Collection<AttributeAssurance>(this);
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
