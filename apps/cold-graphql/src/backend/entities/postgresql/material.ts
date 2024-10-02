import { MaterialHooks } from '../hooks/material.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { AttributeAssurance } from './attribute-assurance';
import { MaterialSupplier } from './material-supplier';
import { Organization } from './organization';
import { ProductMaterial } from './product-material';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'materials' })
export class Material {
	sidecar: MaterialHooks;

	constructor() {
		this.sidecar = new MaterialHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'datetime', length: 6, nullable: true })
	createdAt?: Date;

	@Property({ type: 'datetime', length: 6, nullable: true })
	updatedAt?: Date;

	@Property({ type: 'boolean', nullable: true, default: false })
	deleted = false;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'materials_organization_id_idx1' })
	organization!: Ref<Organization>;

	@OneToMany({ entity: () => AttributeAssurance, mappedBy: 'material' })
	attributeAssurances = new Collection<AttributeAssurance>(this);

	@OneToMany({ entity: () => MaterialSupplier, mappedBy: 'material' })
	materialSuppliers = new Collection<MaterialSupplier>(this);

	@OneToMany({ entity: () => ProductMaterial, mappedBy: 'material' })
	productMaterials = new Collection<ProductMaterial>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof Material, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new MaterialHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof Material, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof Material, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof Material, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof Material, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof Material, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof Material, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof Material, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
