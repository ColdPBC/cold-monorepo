import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceQuestion } from './compliance-question';
import { Organization } from './organization';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceAiResponseFile } from './organization-compliance-ai-response-file';

@Entity({ tableName: 'organization_compliance_ai_responses' })
export class OrganizationComplianceAiResponse {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	justification!: string;

	@Property({ type: 'json', nullable: true })
	references?: Record<string, unknown>;

	@Property({ type: 'json', nullable: true })
	sources?: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => ComplianceQuestion, ref: true, index: 'organization_compliance_ai_response_compliance_question_id_idx1' })
	complianceQuestion!: Ref<ComplianceQuestion>;

	@ManyToOne({ entity: () => OrganizationCompliance, ref: true })
	organizationCompliance!: Ref<OrganizationCompliance>;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'organization_compliance_ai_responses_organization_id_idx' })
	organization!: Ref<Organization>;

	@Property({ type: 'json', nullable: true })
	answer?: Record<string, unknown>;

	@Property({ type: 'json', nullable: true })
	additionalContext?: Record<string, unknown>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@OneToMany({ entity: () => OrganizationComplianceAiResponseFile, mappedBy: 'organizationComplianceAiResponse' })
	organizationComplianceAiResponseFiles = new Collection<OrganizationComplianceAiResponseFile>(this);
}
