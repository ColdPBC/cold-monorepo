import { ProductTagAssignmentHooks } from '../hooks/product-tag-assignment.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { Product } from './product';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'product_tag_assignments' })
export class ProductTagAssignment {
	sidecar: ProductTagAssignmentHooks;

	constructor() {
		this.sidecar = new ProductTagAssignmentHooks();
	}

	@PrimaryKey({ type: 'integer' })
	id!: number;

	@ManyToOne({ entity: () => Product, ref: true, index: 'product_tag_assignments_product_id_idx1' })
	product!: Ref<Product>;

	@Property({ type: 'integer' })
	tagId!: number;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'product_tag_assignments_organization_id_idx1' })
	organization!: Ref<Organization>;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ProductTagAssignment, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ProductTagAssignmentHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ProductTagAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductTagAssignmentHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ProductTagAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductTagAssignmentHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ProductTagAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductTagAssignmentHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ProductTagAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductTagAssignmentHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ProductTagAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductTagAssignmentHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ProductTagAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductTagAssignmentHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ProductTagAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ProductTagAssignmentHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
