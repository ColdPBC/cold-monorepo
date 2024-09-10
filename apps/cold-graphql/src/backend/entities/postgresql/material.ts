import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './material.hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { MaterialSupplier } from './material-supplier';
import { Organization } from './organization';
import { OrganizationAttribute } from './organization-attribute';
import { ProductMaterial } from './product-material';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'materials' })
export class Material {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Unique({ name: 'materials_name_key' })
	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'materials_organization_id_idx' })
	organization!: Ref<Organization>;

	@OneToMany({ entity: () => MaterialSupplier, mappedBy: 'material' })
	materialSuppliers = new Collection<MaterialSupplier>(this);

	@OneToMany({ entity: () => OrganizationAttribute, mappedBy: 'material' })
	organizationAttributes = new Collection<OrganizationAttribute>(this);

	@OneToMany({ entity: () => ProductMaterial, mappedBy: 'material' })
	productMaterials = new Collection<ProductMaterial>(this);
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof Material, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof Material, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof Material, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof Material, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof Material, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof Material, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof Material, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof Material, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
