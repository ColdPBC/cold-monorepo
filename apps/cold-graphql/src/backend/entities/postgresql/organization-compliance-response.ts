import { Entity, ManyToOne, OneToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceQuestion } from './compliance-question';
import { OrganizationCompliance } from './organization-compliance';

@Entity({ tableName: 'organization_compliance_responses' })
export class OrganizationComplianceResponse {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => ComplianceQuestion, ref: true, index: 'organization_compliance_responses_compliance_question_id_idx' })
	complianceQuestion!: Ref<ComplianceQuestion>;

	@OneToOne({ entity: () => OrganizationCompliance, ref: true, unique: 'organization_compliance_responses_organization_compliance_i_key' })
	organizationCompliance!: Ref<OrganizationCompliance>;

	@Property({ type: 'json', nullable: true })
	additionalContext?: Record<string, unknown>;

	@Property({ type: 'json', nullable: true })
	value?: Record<string, unknown>;

	@Property({ type: 'boolean', default: false })
	deleted = false;
}
