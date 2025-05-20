import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
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
import { Organization as OrmOrganization } from '../entities';
import { connection } from '../database';

@Entity<Organization>('Organization', {
	provider: new MikroBackendProvider(OrmOrganization, connection),
})
export class Organization {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => GraphQLJSON)
	enabledConnections!: Record<string, unknown>;

	@Field(() => String)
	displayName!: string;

	@Field(() => GraphQLJSON, { nullable: true })
	branding?: Record<string, unknown>;

	@Field(() => String, { nullable: true })
	phone?: string;

	@Field(() => String, { nullable: true })
	email?: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => Boolean)
	isTest = false;

	@Field(() => String, { nullable: true })
	website?: string;

	@Field(() => Boolean)
	deleted = false;

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;

	@Field(() => String, { nullable: true })
	linearSecret?: string;

	@Field(() => String, { nullable: true })
	linearWebhookId?: string;

	@RelationshipField<Action>(() => [Action], { relatedField: 'organization' })
	actions!: Action[];

	@RelationshipField<AttributeAssurance>(() => [AttributeAssurance], { relatedField: 'organization' })
	attributeAssurances!: AttributeAssurance[];

	@RelationshipField<CategoryDatum>(() => [CategoryDatum], { relatedField: 'organization' })
	categoryData!: CategoryDatum[];

	@RelationshipField<EprSubmission>(() => [EprSubmission], { relatedField: 'organization' })
	eprSubmissions!: EprSubmission[];

	@RelationshipField<FacilityFootprint>(() => [FacilityFootprint], { relatedField: 'organization' })
	facilityFootprints!: FacilityFootprint[];

	@RelationshipField<Integration>(() => [Integration], { relatedField: 'organization' })
	integrations!: Integration[];

	@RelationshipField<MaterialEmissionFactor>(() => [MaterialEmissionFactor], { relatedField: 'organization' })
	materialEmissionFactors!: MaterialEmissionFactor[];

	@RelationshipField<MaterialSupplier>(() => [MaterialSupplier], { relatedField: 'organization' })
	materialSuppliers!: MaterialSupplier[];

	@RelationshipField<MaterialTagAssignment>(() => [MaterialTagAssignment], { relatedField: 'organization' })
	materialTagAssignments!: MaterialTagAssignment[];

	@RelationshipField<MaterialTag>(() => [MaterialTag], { relatedField: 'organization' })
	materialTags!: MaterialTag[];

	@RelationshipField<Material>(() => [Material], { relatedField: 'organization' })
	materials!: Material[];

	@RelationshipField<OrganizationCompliance>(() => [OrganizationCompliance], { relatedField: 'organization' })
	organizationCompliances!: OrganizationCompliance[];

	@RelationshipField<OrganizationComplianceAiResponseFile>(() => [OrganizationComplianceAiResponseFile], { relatedField: 'organization' })
	organizationComplianceAiResponseFiles!: OrganizationComplianceAiResponseFile[];

	@RelationshipField<OrganizationComplianceAiResponse>(() => [OrganizationComplianceAiResponse], { relatedField: 'organization' })
	organizationComplianceAiResponses!: OrganizationComplianceAiResponse[];

	@RelationshipField<OrganizationCompliancesOld>(() => [OrganizationCompliancesOld], { relatedField: 'organization' })
	organizationCompliancesOlds!: OrganizationCompliancesOld[];

	@RelationshipField<OrganizationFacility>(() => [OrganizationFacility], { relatedField: 'organization' })
	organizationFacilities!: OrganizationFacility[];

	@RelationshipField<OrganizationFile>(() => [OrganizationFile], { relatedField: 'organization' })
	organizationFiles!: OrganizationFile[];

	@RelationshipField<ProductMaterial>(() => [ProductMaterial], { relatedField: 'organization' })
	productMaterials!: ProductMaterial[];

	@RelationshipField<ProductTagAssignment>(() => [ProductTagAssignment], { relatedField: 'organization' })
	productTagAssignments!: ProductTagAssignment[];

	@RelationshipField<Product>(() => [Product], { relatedField: 'organization' })
	products!: Product[];

	@RelationshipField<ProductsTag>(() => [ProductsTag], { relatedField: 'organization' })
	productsTags!: ProductsTag[];

	@RelationshipField<SurveyDatum>(() => [SurveyDatum], { relatedField: 'organization' })
	surveyData!: SurveyDatum[];

	@RelationshipField<SurveyStatus>(() => [SurveyStatus], { relatedField: 'organization' })
	surveyStatuses!: SurveyStatus[];

	@RelationshipField<SustainabilityAttributeClassifcationAssignment>(() => [SustainabilityAttributeClassifcationAssignment], { relatedField: 'organization' })
	sustainabilityAttributeClassifcationAssignments!: SustainabilityAttributeClassifcationAssignment[];

	@RelationshipField<SustainabilityAttribute>(() => [SustainabilityAttribute], { relatedField: 'organization' })
	sustainabilityAttributes!: SustainabilityAttribute[];

	@RelationshipField<UtilityBill>(() => [UtilityBill], { relatedField: 'organization' })
	utilityBills!: UtilityBill[];

	@RelationshipField<VectorRecord>(() => [VectorRecord], { relatedField: 'organization' })
	vectorRecords!: VectorRecord[];
}
