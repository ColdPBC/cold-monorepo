import { MaterialSupplierHooks } from '../hooks/material-supplier.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Material } from './material';
import { OrganizationFacility } from './organization-facility';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'material_suppliers' })
export class MaterialSupplier {
	sidecar: MaterialSupplierHooks;

	constructor() {
		this.sidecar = new MaterialSupplierHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Material, ref: true, index: 'material_suppliers_material_id_idx1' })
	material!: Ref<Material>;

	@ManyToOne({ entity: () => OrganizationFacility, ref: true, fieldName: 'supplier_id', index: 'material_suppliers_supplier_id_idx1' })
	organizationFacility!: Ref<OrganizationFacility>;

	@Property({ type: 'datetime', length: 6, nullable: true })
	createdAt?: Date;

	@Property({ type: 'datetime', length: 6, nullable: true })
	updatedAt?: Date;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof MaterialSupplier, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new MaterialSupplierHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof MaterialSupplier, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialSupplierHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof MaterialSupplier, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialSupplierHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof MaterialSupplier, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialSupplierHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof MaterialSupplier, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialSupplierHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof MaterialSupplier, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialSupplierHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof MaterialSupplier, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialSupplierHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof MaterialSupplier, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialSupplierHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
