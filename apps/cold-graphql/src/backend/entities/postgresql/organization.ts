import { OrganizationHooks } from '../hooks/organization.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, Index, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Action } from './action';
import { AttributeAssurance } from './attribute-assurance';
import { CategoryDatum } from './category-datum';
import { EprSubmission } from './epr-submission';
import { FacilityFootprint } from './facility-footprint';
import { Integration } from './integration';
import { Material } from './material';
import { MaterialEmissionFactor } from './material-emission-factor';
import { MaterialSupplier } from './material-supplier';
import { MaterialTag } from './material-tag';
import { MaterialTagAssignment } from './material-tag-assignment';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceAiResponse } from './organization-compliance-ai-response';
import { OrganizationComplianceAiResponseFile } from './organization-compliance-ai-response-file';
import { OrganizationCompliancesOld } from './organization-compliances-old';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { Product } from './product';
import { ProductMaterial } from './product-material';
import { ProductTagAssignment } from './product-tag-assignment';
import { ProductsTag } from './products-tag';
import { SurveyDatum } from './survey-datum';
import { SurveyStatus } from './survey-status';
import { SustainabilityAttribute } from './sustainability-attribute';
import { SustainabilityAttributeClassifcationAssignment } from './sustainability-attribute-classifcation-assignment';
import { UtilityBill } from './utility-bill';
import { VectorRecord } from './vector-record';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { organization_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(organization_acl)
@Entity({ tableName: 'organizations' })
export class Organization {
	sidecar: OrganizationHooks;

	constructor() {
		this.sidecar = new OrganizationHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Index({ name: 'organizations_name_idx1' })
	@Unique({ name: 'organizations_name_key' })
	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'json' })
	enabledConnections!: Record<string, unknown>;

	@Property({ type: 'text' })
	displayName!: string;

	@Property({ type: 'json', nullable: true })
	branding?: Record<string, unknown>;

	@Property({ type: 'text', nullable: true })
	phone?: string;

	@Property({ type: 'text', nullable: true })
	email?: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ fieldName: 'isTest', type: 'boolean', default: false })
	isTest = false;

	@Property({ type: 'text', nullable: true })
	website?: string;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'text', nullable: true })
	linearSecret?: string;

	@Property({ type: 'text', nullable: true })
	linearWebhookId?: string;

	@OneToMany({ entity: () => Action, mappedBy: 'organization' })
	actions = new Collection<Action>(this);

	@OneToMany({ entity: () => AttributeAssurance, mappedBy: 'organization' })
	attributeAssurances = new Collection<AttributeAssurance>(this);

	@OneToMany({ entity: () => CategoryDatum, mappedBy: 'organization' })
	categoryData = new Collection<CategoryDatum>(this);

	@OneToMany({ entity: () => EprSubmission, mappedBy: 'organization' })
	eprSubmissions = new Collection<EprSubmission>(this);

	@OneToMany({ entity: () => FacilityFootprint, mappedBy: 'organization' })
	facilityFootprints = new Collection<FacilityFootprint>(this);

	@OneToMany({ entity: () => Integration, mappedBy: 'organization' })
	integrations = new Collection<Integration>(this);

	@OneToMany({ entity: () => MaterialEmissionFactor, mappedBy: 'organization' })
	materialEmissionFactors = new Collection<MaterialEmissionFactor>(this);

	@OneToMany({ entity: () => MaterialSupplier, mappedBy: 'organization' })
	materialSuppliers = new Collection<MaterialSupplier>(this);

	@OneToMany({ entity: () => MaterialTagAssignment, mappedBy: 'organization' })
	materialTagAssignments = new Collection<MaterialTagAssignment>(this);

	@OneToMany({ entity: () => MaterialTag, mappedBy: 'organization' })
	materialTags = new Collection<MaterialTag>(this);

	@OneToMany({ entity: () => Material, mappedBy: 'organization' })
	materials = new Collection<Material>(this);

	@OneToMany({ entity: () => OrganizationCompliance, mappedBy: 'organization' })
	organizationCompliances = new Collection<OrganizationCompliance>(this);

	@OneToMany({ entity: () => OrganizationComplianceAiResponseFile, mappedBy: 'organization' })
	organizationComplianceAiResponseFiles = new Collection<OrganizationComplianceAiResponseFile>(this);

	@OneToMany({ entity: () => OrganizationComplianceAiResponse, mappedBy: 'organization' })
	organizationComplianceAiResponses = new Collection<OrganizationComplianceAiResponse>(this);

	@OneToMany({ entity: () => OrganizationCompliancesOld, mappedBy: 'organization' })
	organizationCompliancesOlds = new Collection<OrganizationCompliancesOld>(this);

	@OneToMany({ entity: () => OrganizationFacility, mappedBy: 'organization' })
	organizationFacilities = new Collection<OrganizationFacility>(this);

	@OneToMany({ entity: () => OrganizationFile, mappedBy: 'organization' })
	organizationFiles = new Collection<OrganizationFile>(this);

	@OneToMany({ entity: () => ProductMaterial, mappedBy: 'organization' })
	productMaterials = new Collection<ProductMaterial>(this);

	@OneToMany({ entity: () => ProductTagAssignment, mappedBy: 'organization' })
	productTagAssignments = new Collection<ProductTagAssignment>(this);

	@OneToMany({ entity: () => Product, mappedBy: 'organization' })
	products = new Collection<Product>(this);

	@OneToMany({ entity: () => ProductsTag, mappedBy: 'organization' })
	productsTags = new Collection<ProductsTag>(this);

	@OneToMany({ entity: () => SurveyDatum, mappedBy: 'organization' })
	surveyData = new Collection<SurveyDatum>(this);

	@OneToMany({ entity: () => SurveyStatus, mappedBy: 'organization' })
	surveyStatuses = new Collection<SurveyStatus>(this);

	@OneToMany({ entity: () => SustainabilityAttributeClassifcationAssignment, mappedBy: 'organization' })
	sustainabilityAttributeClassifcationAssignments = new Collection<SustainabilityAttributeClassifcationAssignment>(this);

	@OneToMany({ entity: () => SustainabilityAttribute, mappedBy: 'organization' })
	sustainabilityAttributes = new Collection<SustainabilityAttribute>(this);

	@OneToMany({ entity: () => UtilityBill, mappedBy: 'organization' })
	utilityBills = new Collection<UtilityBill>(this);

	@OneToMany({ entity: () => VectorRecord, mappedBy: 'organization' })
	vectorRecords = new Collection<VectorRecord>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new OrganizationHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof Organization, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof Organization, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof Organization, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof Organization, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
