import { PrismaMigration } from './prisma-migration';
import { ActionTemplate } from './action-template';
import { Action } from './action';
import { AttributeAssurance } from './attribute-assurance';
import { CategoryDatum } from './category-datum';
import { CategoryDefinition } from './category-definition';
import { ClimatiqActvity } from './climatiq-actvity';
import { ComplianceDefinition } from './compliance-definition';
import { ComplianceQuestionDependencyChain } from './compliance-question-dependency-chain';
import { ComplianceQuestion } from './compliance-question';
import { ComplianceSectionDependencyChain } from './compliance-section-dependency-chain';
import { ComplianceSectionGroup } from './compliance-section-group';
import { ComplianceSection } from './compliance-section';
import { ComponentDefinition } from './component-definition';
import { EmissionScope } from './emission-scope';
import { Emission } from './emission';
import { FacilityFootprint } from './facility-footprint';
import { Integration } from './integration';
import { MaterialClassification } from './material-classification';
import { MaterialSupplier } from './material-supplier';
import { Material } from './material';
import { News } from './news';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceAiResponseFile } from './organization-compliance-ai-response-file';
import { OrganizationComplianceAiResponse } from './organization-compliance-ai-response';
import { OrganizationComplianceNoteFile } from './organization-compliance-note-file';
import { OrganizationComplianceNoteLink } from './organization-compliance-note-link';
import { OrganizationComplianceNote } from './organization-compliance-note';
import { OrganizationComplianceQuestionBookmark } from './organization-compliance-question-bookmark';
import { OrganizationComplianceResponse } from './organization-compliance-response';
import { OrganizationComplianceStatus } from './organization-compliance-status';
import { OrganizationCompliancesOld } from './organization-compliances-old';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { Organization } from './organization';
import { PolicyDatum } from './policy-datum';
import { PolicyDefinition } from './policy-definition';
import { ProductMaterial } from './product-material';
import { Product } from './product';
import { ServiceDefinition } from './service-definition';
import { SupportedUtility } from './supported-utility';
import { SurveyDatum } from './survey-datum';
import { SurveyDefinition } from './survey-definition';
import { SurveyStatus } from './survey-status';
import { SustainabilityAttribute } from './sustainability-attribute';
import { UtilityBill } from './utility-bill';
import { VectorRecord } from './vector-record';
import { OrganizationProductMaterialEmissions } from './organization-product-material-emissions';

export * from './prisma-migration';
export * from './action-template';
export * from './action';
export * from './attribute-assurance';
export * from './category-datum';
export * from './category-definition';
export * from './climatiq-actvity';
export * from './compliance-definition';
export * from './compliance-question-dependency-chain';
export * from './compliance-question';
export * from './compliance-section-dependency-chain';
export * from './compliance-section-group';
export * from './compliance-section';
export * from './component-definition';
export * from './emission-scope';
export * from './emission';
export * from './facility-footprint';
export * from './integration';
export * from './material-classification';
export * from './material-supplier';
export * from './material';
export * from './news';
export * from './organization-compliance';
export * from './organization-compliance-ai-response-file';
export * from './organization-compliance-ai-response';
export * from './organization-compliance-note-file';
export * from './organization-compliance-note-link';
export * from './organization-compliance-note';
export * from './organization-compliance-question-bookmark';
export * from './organization-compliance-response';
export * from './organization-compliance-status';
export * from './organization-compliances-old';
export * from './organization-facility';
export * from './organization-file';
export * from './organization';
export * from './policy-datum';
export * from './policy-definition';
export * from './product-material';
export * from './product';
export * from './service-definition';
export * from './supported-utility';
export * from './survey-datum';
export * from './survey-definition';
export * from './survey-status';
export * from './sustainability-attribute';
export * from './utility-bill';
export * from './vector-record';
export * from './organization-product-material-emissions';

export const entities = [
	PrismaMigration,
	ActionTemplate,
	Action,
	AttributeAssurance,
	CategoryDatum,
	CategoryDefinition,
	ClimatiqActvity,
	ComplianceDefinition,
	ComplianceQuestionDependencyChain,
	ComplianceQuestion,
	ComplianceSectionDependencyChain,
	ComplianceSectionGroup,
	ComplianceSection,
	ComponentDefinition,
	EmissionScope,
	Emission,
	FacilityFootprint,
	Integration,
	MaterialClassification,
	MaterialSupplier,
	Material,
	News,
	OrganizationCompliance,
	OrganizationComplianceAiResponseFile,
	OrganizationComplianceAiResponse,
	OrganizationComplianceNoteFile,
	OrganizationComplianceNoteLink,
	OrganizationComplianceNote,
	OrganizationComplianceQuestionBookmark,
	OrganizationComplianceResponse,
	OrganizationComplianceStatus,
	OrganizationCompliancesOld,
	OrganizationFacility,
	OrganizationFile,
	OrganizationProductMaterialEmissions,
	Organization,
	PolicyDatum,
	PolicyDefinition,
	ProductMaterial,
	Product,
	ServiceDefinition,
	SupportedUtility,
	SurveyDatum,
	SurveyDefinition,
	SurveyStatus,
	SustainabilityAttribute,
	UtilityBill,
	VectorRecord,
];
