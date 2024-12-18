import { MaterialClassificationHooks } from '../hooks/material-classification.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, Index, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { CoreClassification } from './core-classification';
import { Material } from './material';
import { SustainabilityAttribute } from './sustainability-attribute';
import { SustainabilityAttributeClassifcationAssignment } from './sustainability-attribute-classifcation-assignment';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'material_classification' })
export class MaterialClassification {
	sidecar: MaterialClassificationHooks;

	constructor() {
		this.sidecar = new MaterialClassificationHooks();
	}

	@PrimaryKey({ type: 'integer' })
	id!: number;

	@Index({ name: 'material_classification_name_idx1' })
	@Property({ type: 'text' })
	name!: string;

	@Index({ name: 'material_classification_category_idx1' })
	@Property({ type: 'text' })
	category!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => CoreClassification, ref: true, nullable: true })
	coreClassification?: Ref<CoreClassification>;

	@OneToMany({ entity: () => Material, mappedBy: 'materialClassification' })
	materials = new Collection<Material>(this);

	@OneToMany({ entity: () => SustainabilityAttributeClassifcationAssignment, mappedBy: 'materialClassification' })
	sustainabilityAttributeClassifcationAssignments = new Collection<SustainabilityAttributeClassifcationAssignment>(this);

	@OneToMany({ entity: () => SustainabilityAttribute, mappedBy: 'materialClassification' })
	sustainabilityAttributes = new Collection<SustainabilityAttribute>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof MaterialClassification, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new MaterialClassificationHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof MaterialClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialClassificationHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof MaterialClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialClassificationHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof MaterialClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialClassificationHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof MaterialClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialClassificationHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof MaterialClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialClassificationHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof MaterialClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialClassificationHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof MaterialClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new MaterialClassificationHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
