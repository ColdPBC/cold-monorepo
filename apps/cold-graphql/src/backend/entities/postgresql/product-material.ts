import { ProductMaterialHooks } from '../hooks/product-material.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Material } from './material';
import { Organization } from './organization';
import { Product } from './product';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'product_materials' })
export class ProductMaterial {
	sidecar: ProductMaterialHooks;

	constructor() {
		this.sidecar = new ProductMaterialHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Product, ref: true, index: 'product_materials_product_id_idx1' })
	product!: Ref<Product>;

	@ManyToOne({ entity: () => Material, ref: true, nullable: true, index: 'product_materials_material_id_idx1' })
	material?: Ref<Material>;

	@Property({ type: 'text', nullable: true })
	materialSupplierId?: string;

	@Property({ type: 'datetime', length: 6, nullable: true })
	createdAt?: Date;

	@Property({ type: 'datetime', length: 6, nullable: true })
	updatedAt?: Date;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'product_materials_organization_id_idx1' })
	organization!: Ref<Organization>;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'text', nullable: true })
	unitOfMeasure?: string;

	@Property({ type: 'double', nullable: true })
	yield?: number;

	@Property({ type: 'text', nullable: true })
	bomSection?: string;

	@Property({ type: 'text', nullable: true })
	placement?: string;

	@Property({ type: 'double', nullable: true })
	weight?: number;

	@Property({ type: 'text', nullable: true })
	plmId?: string;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ProductMaterial, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ProductMaterialHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ProductMaterial, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductMaterialHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ProductMaterial, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductMaterialHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ProductMaterial, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductMaterialHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ProductMaterial, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductMaterialHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ProductMaterial, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductMaterialHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ProductMaterial, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductMaterialHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ProductMaterial, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductMaterialHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
