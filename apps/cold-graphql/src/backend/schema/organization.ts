import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Action } from './action';
import { CategoryDatum } from './category-datum';
import { Claim } from './claim';
import { FacilityFootprint } from './facility-footprint';
import { Integration } from './integration';
import { Material } from './material';
import { OrganizationClaim } from './organization-claim';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceAiResponse } from './organization-compliance-ai-response';
import { OrganizationComplianceAiResponseFile } from './organization-compliance-ai-response-file';
import { OrganizationCompliancesOld } from './organization-compliances-old';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { Product } from './product';
import { SurveyDatum } from './survey-datum';
import { SurveyStatus } from './survey-status';
import { UtilityBill } from './utility-bill';
import { VectorRecord } from './vector-record';
import { Organization as OrmOrganization } from '../entities';
import { connection } from '../database';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../acl_policies';

@Entity<Organization>('Organization', {
  provider: new MikroBackendProvider(OrmOrganization, connection),
})
@ApplyAccessControlList(default_acl)
export class Organization {
  @Field(() => ID, { primaryKeyField: true })
  id!: string;

  @Field(() => String, { adminUIOptions: { summaryField: true } })
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

  @RelationshipField<Action>(() => [Action], { relatedField: 'organization' })
  actions!: Action[];

  @RelationshipField<CategoryDatum>(() => [CategoryDatum], { relatedField: 'organization' })
  categoryData!: CategoryDatum[];

  @RelationshipField<Claim>(() => [Claim], { relatedField: 'organization' })
  claims!: Claim[];

  @RelationshipField<FacilityFootprint>(() => [FacilityFootprint], { relatedField: 'organization' })
  facilityFootprints!: FacilityFootprint[];

  @RelationshipField<Integration>(() => [Integration], { relatedField: 'organization' })
  integrations!: Integration[];

  @RelationshipField<Material>(() => [Material], { relatedField: 'organization' })
  materials!: Material[];

  @RelationshipField<OrganizationClaim>(() => [OrganizationClaim], { relatedField: 'organization' })
  organizationClaims!: OrganizationClaim[];

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

  @RelationshipField<Product>(() => [Product], { relatedField: 'organization' })
  products!: Product[];

  @RelationshipField<SurveyDatum>(() => [SurveyDatum], { relatedField: 'organization' })
  surveyData!: SurveyDatum[];

  @RelationshipField<SurveyStatus>(() => [SurveyStatus], { relatedField: 'organization' })
  surveyStatuses!: SurveyStatus[];

  @RelationshipField<UtilityBill>(() => [UtilityBill], { relatedField: 'organization' })
  utilityBills!: UtilityBill[];

  @RelationshipField<VectorRecord>(() => [VectorRecord], { relatedField: 'organization' })
  vectorRecords!: VectorRecord[];
}
