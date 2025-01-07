import { ProductHooks } from '../hooks/product.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, Index, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { AttributeAssurance } from './attribute-assurance';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
import { ProductMaterial } from './product-material';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'products' })
export class Product {
	sidecar: ProductHooks;

	constructor() {
		this.sidecar = new ProductHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Index({ name: 'products_name_idx1' })
	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'datetime', length: 6, nullable: true })
	createdAt?: Date;

	@Property({ type: 'datetime', length: 6, nullable: true })
	updatedAt?: Date;

	@Property({ type: 'boolean', nullable: true, default: false })
	deleted = false;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'products_organization_id_idx1' })
	organization!: Ref<Organization>;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'text', nullable: true })
	seasonCode?: string;

	@Property({ type: 'text', nullable: true })
	styleCode?: string;

	@ManyToOne({ entity: () => OrganizationFacility, ref: true, fieldName: 'supplier_id', nullable: true })
	organizationFacility?: Ref<OrganizationFacility>;

	@Property({ type: 'text', nullable: true })
	upcCode?: string;

	@Index({ name: 'brand_product_id_idx1' })
	@Property({ type: 'text', nullable: true })
	brandProductId?: string;

	@Property({ type: 'text', nullable: true })
	description?: string;

	@Index({ name: 'supplier_product_id_idx1' })
	@Property({ type: 'text', nullable: true })
	supplierProductId?: string;

	@Index({ name: 'brand_category_idx1' })
	@Property({ type: 'text', nullable: true })
	productCategory?: string;

	@Index({ name: 'brand_subcategory_idx1' })
	@Property({ type: 'text', nullable: true })
	productSubcategory?: string;

	@Index({ name: 'brand_product_sku_idx1' })
	@Property({ type: 'text', nullable: true })
	brandProductSku?: string;

	@Property({ type: 'text', nullable: true })
	gender?: string;

	@Property({ type: 'json', nullable: true })
	emissionStats?: Record<string, unknown>;

	@Index({ name: 'products_plm_id_idx1' })
	@Property({ type: 'text', nullable: true })
	plmId?: string;

	@Property({ type: 'integer', nullable: true })
	weight?: number;

	@OneToMany({ entity: () => AttributeAssurance, mappedBy: 'product' })
	attributeAssurances = new Collection<AttributeAssurance>(this);

	@OneToMany({ entity: () => ProductMaterial, mappedBy: 'product' })
	productMaterials = new Collection<ProductMaterial>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof Product, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ProductHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof Product, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof Product, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof Product, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof Product, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof Product, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof Product, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof Product, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
