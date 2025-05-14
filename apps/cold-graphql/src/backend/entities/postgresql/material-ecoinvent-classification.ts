import { MaterialEcoinventClassificationHooks } from '../hooks/material-ecoinvent-classification.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { EcoinventClassification } from './ecoinvent-classification';
import { MaterialClassification } from './material-classification';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'material_ecoinvent_classifications' })
export class MaterialEcoinventClassification {
	sidecar: MaterialEcoinventClassificationHooks;

	constructor() {
		this.sidecar = new MaterialEcoinventClassificationHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => EcoinventClassification, ref: true, index: 'material_ecoinvent_classifications_id_idx1' })
	ecoinventClassification!: Ref<EcoinventClassification>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => MaterialClassification, ref: true, index: 'material_ecoinvent_material_classifications_idx1' })
	materialClassification!: Ref<MaterialClassification>;

	@Property({ type: 'text', nullable: true })
	reasoning?: string;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new MaterialEcoinventClassificationHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEcoinventClassificationHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEcoinventClassificationHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEcoinventClassificationHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEcoinventClassificationHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEcoinventClassificationHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEcoinventClassificationHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialEcoinventClassificationHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
