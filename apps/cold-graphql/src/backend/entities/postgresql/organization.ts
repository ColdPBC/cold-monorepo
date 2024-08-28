import { Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Action } from './action';
import { CategoryDatum } from './category-datum';
import { FacilityFootprint } from './facility-footprint';
import { Integration } from './integration';
import { Material } from './material';
import { OrganizationClaim } from './organization-claim';
import { OrganizationComplianceAiResponse } from './organization-compliance-ai-response';
import { OrganizationComplianceAiResponseFile } from './organization-compliance-ai-response-file';
import { OrganizationFacility } from './organization-facility';
import { Product } from './product';
import { SurveyDatum } from './survey-datum';
import { SurveyStatus } from './survey-status';
import { UtilityBill } from './utility-bill';
import { VectorRecord } from './vector-record';
import {ApplyAccessControlList} from "@exogee/graphweaver-auth";
import {default_acl, organization_acl} from "../../acl_policies";

@Entity({ tableName: 'organizations' })
@ApplyAccessControlList(organization_acl)
export class Organization {
	@PrimaryKey({ type: 'text' })
	id!: string;

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

	@OneToMany({ entity: () => Action, mappedBy: 'organization' })
	actions = new Collection<Action>(this);

	@OneToMany({ entity: () => CategoryDatum, mappedBy: 'organization' })
	categoryData = new Collection<CategoryDatum>(this);

	@OneToOne({ entity: () => SurveyDatum, mappedBy: 'organization' })
	organizationInverse?: SurveyDatum;

	@OneToMany({ entity: () => FacilityFootprint, mappedBy: 'organization' })
	facilityFootprints = new Collection<FacilityFootprint>(this);

	@OneToMany({ entity: () => Integration, mappedBy: 'organization' })
	integrations = new Collection<Integration>(this);

	@OneToMany({ entity: () => Material, mappedBy: 'organization' })
	materials = new Collection<Material>(this);

	@OneToMany({ entity: () => OrganizationClaim, mappedBy: 'organization' })
	organizationClaims = new Collection<OrganizationClaim>(this);

	@OneToMany({ entity: () => OrganizationComplianceAiResponseFile, mappedBy: 'organization' })
	organizationComplianceAiResponseFiles = new Collection<OrganizationComplianceAiResponseFile>(this);

	@OneToMany({ entity: () => OrganizationComplianceAiResponse, mappedBy: 'organization' })
	organizationComplianceAiResponses = new Collection<OrganizationComplianceAiResponse>(this);

	@OneToMany({ entity: () => OrganizationFacility, mappedBy: 'organization' })
	organizationFacilities = new Collection<OrganizationFacility>(this);

	@OneToMany({ entity: () => Product, mappedBy: 'organization' })
	products = new Collection<Product>(this);

	@OneToMany({ entity: () => SurveyStatus, mappedBy: 'organization' })
	surveyStatuses = new Collection<SurveyStatus>(this);

	@OneToMany({ entity: () => UtilityBill, mappedBy: 'organization' })
	utilityBills = new Collection<UtilityBill>(this);

	@OneToMany({ entity: () => VectorRecord, mappedBy: 'organization' })
	vectorRecords = new Collection<VectorRecord>(this);
}
