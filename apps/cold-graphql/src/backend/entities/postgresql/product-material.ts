import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './product-material.hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Material } from './material';
import { Product } from './product';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'product_materials' })
export class ProductMaterial {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Product, ref: true, index: 'product_materials_product_id_idx' })
	product!: Ref<Product>;

	@ManyToOne({ entity: () => Material, ref: true, index: 'product_materials_material_id_idx' })
	material!: Ref<Material>;

	@Property({ type: 'text' })
	materialSupplierId!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ProductMaterial, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ProductMaterial, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ProductMaterial, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ProductMaterial, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ProductMaterial, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ProductMaterial, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ProductMaterial, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ProductMaterial, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
