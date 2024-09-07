import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceQuestion } from './compliance-question';
import { OrganizationCompliance } from './organization-compliance';

@ApplyAccessControlList(default_acl)
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

	@ManyToOne({ entity: () => OrganizationCompliance, ref: true })
	organizationCompliance!: Ref<OrganizationCompliance>;

	@Property({ type: 'json', nullable: true })
	additionalContext?: Record<string, unknown>;

	@Property({ type: 'json', nullable: true })
	value?: Record<string, unknown>;

	@Property({ type: 'boolean', default: false })
	deleted = false;
}
