import { ProductHooks } from './product.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { AttributeAssurance } from './attribute-assurance';
import { Organization } from './organization';
import { ProductMaterial } from './product-material';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../libs/acls/acl_policies';
import { OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'products' })
export class Product {
	sidecar: ProductHooks;

	constructor() {
		this.sidecar = new ProductHooks();
	}

	@PrimaryKey({ type: 'uuid' })
	id!: string;

	@Unique({ name: 'products_name_key' })
	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'datetime', length: 6 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 6 })
	updatedAt!: Date;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'products_organization_id_idx1' })
	organization!: Ref<Organization>;

	@OneToMany({ entity: () => AttributeAssurance, mappedBy: 'product' })
	attributeAssurances = new Collection<AttributeAssurance>(this);

	@OneToMany({ entity: () => ProductMaterial, mappedBy: 'product' })
	productMaterials = new Collection<ProductMaterial>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof Product, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new ProductHooks();
		}
		return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof Product, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new ProductHooks();
		}
		return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof Product, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new ProductHooks();
		}
		return await this.sidecar.beforeReadHook(params);
	}

	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof Product, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new ProductHooks();
		}
		return await this.sidecar.afterReadHook(params);
	}

	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof Product, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new ProductHooks();
		}
		return await this.sidecar.beforeUpdateHook(params);
	}

	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof Product, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new ProductHooks();
		}
		return await this.sidecar.afterUpdateHook(params);
	}

	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof Product, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new ProductHooks();
		}
		return await this.sidecar.beforeDeleteHook(params);
	}

	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof Product, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new ProductHooks();
		}
		return await this.sidecar.afterDeleteHook(params);
	}
}
