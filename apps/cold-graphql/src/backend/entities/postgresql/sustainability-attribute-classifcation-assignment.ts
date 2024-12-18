import { SustainabilityAttributeClassifcationAssignmentHooks } from '../hooks/sustainability-attribute-classifcation-assignment.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { MaterialClassification } from './material-classification';
import { Organization } from './organization';
import { SustainabilityAttribute } from './sustainability-attribute';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'sustainability_attribute_classifcation_assignment' })
export class SustainabilityAttributeClassifcationAssignment {
	sidecar: SustainabilityAttributeClassifcationAssignmentHooks;

	constructor() {
		this.sidecar = new SustainabilityAttributeClassifcationAssignmentHooks();
	}

	@PrimaryKey({ type: 'integer' })
	id!: number;

	@ManyToOne({ entity: () => Organization, ref: true })
	organization!: Ref<Organization>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'json' })
	metadata!: Record<string, unknown>;

	@ManyToOne({ entity: () => SustainabilityAttribute, ref: true })
	sustainabilityAttribute!: Ref<SustainabilityAttribute>;

	@ManyToOne({ entity: () => MaterialClassification, ref: true })
	materialClassification!: Ref<MaterialClassification>;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeClassifcationAssignmentHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeClassifcationAssignmentHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeClassifcationAssignmentHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeClassifcationAssignmentHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeClassifcationAssignmentHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeClassifcationAssignmentHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeClassifcationAssignmentHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeClassifcationAssignmentHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
