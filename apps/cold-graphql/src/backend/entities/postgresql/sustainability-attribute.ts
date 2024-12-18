import { SustainabilityAttributeHooks } from '../hooks/sustainability-attribute.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, Enum, Index, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { AttributeAssurance } from './attribute-assurance';
import { MaterialClassification } from './material-classification';
import { Organization } from './organization';
import { SustainabilityAttributeClassifcationAssignment } from './sustainability-attribute-classifcation-assignment';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { allow_null_orgs_acl, OrgContext } from '../../libs/acls/acl_policies';

export enum SustainabilityAttributesLevel {
	ORGANIZATION = 'ORGANIZATION',
	SUPPLIER = 'SUPPLIER',
	PRODUCT = 'PRODUCT',
	MATERIAL = 'MATERIAL',
}

export enum SustainabilityAttributesType {
	THIRD_PARTY = 'THIRD_PARTY',
	INTERNAL = 'INTERNAL',
	TEST = 'TEST',
}

@ApplyAccessControlList(allow_null_orgs_acl)
@Entity({ tableName: 'sustainability_attributes' })
export class SustainabilityAttribute {
	sidecar: SustainabilityAttributeHooks;

	constructor() {
		this.sidecar = new SustainabilityAttributeHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Organization, ref: true, nullable: true, index: 'sustainability_attributes_organization_id_idx1' })
	organization?: Ref<Organization>;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'datetime', length: 6, nullable: true })
	createdAt?: Date;

	@Property({ type: 'datetime', length: 6, nullable: true })
	updatedAt?: Date;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Index({ name: 'sustainability_attributes_level_idx1' })
	@Enum({ type: 'string', items: () => SustainabilityAttributesLevel })
	level!: SustainabilityAttributesLevel;

	@Index({ name: 'sustainability_attributes_type_idx1' })
	@Enum({ type: 'string', items: () => SustainabilityAttributesType })
	type!: SustainabilityAttributesType;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'text', nullable: true })
	logoUrl?: string;

	@ManyToOne({ entity: () => MaterialClassification, ref: true, nullable: true })
	materialClassification?: Ref<MaterialClassification>;

	@OneToMany({ entity: () => AttributeAssurance, mappedBy: 'sustainabilityAttribute' })
	attributeAssurances = new Collection<AttributeAssurance>(this);

	@OneToMany({ entity: () => SustainabilityAttributeClassifcationAssignment, mappedBy: 'sustainabilityAttribute' })
	sustainabilityAttributeClassifcationAssignments = new Collection<SustainabilityAttributeClassifcationAssignment>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof SustainabilityAttribute, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof SustainabilityAttribute, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof SustainabilityAttribute, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof SustainabilityAttribute, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SustainabilityAttributeHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
