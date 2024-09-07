import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceDefinition } from './compliance-definition';
import { Organization } from './organization';
import { OrganizationComplianceAiResponse } from './organization-compliance-ai-response';
import { OrganizationComplianceAiResponseFile } from './organization-compliance-ai-response-file';
import { OrganizationComplianceNote } from './organization-compliance-note';
import { OrganizationComplianceQuestionBookmark } from './organization-compliance-question-bookmark';
import { OrganizationComplianceResponse } from './organization-compliance-response';
import { OrganizationComplianceStatus } from './organization-compliance-status';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_compliance' })
export class OrganizationCompliance {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	description!: string;

	@Property({ type: 'text' })
	complianceDefinitionName!: string;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => Organization, ref: true })
	organization!: Ref<Organization>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Property({ type: 'boolean', default: true })
	visible = true;

	@ManyToOne({ entity: () => ComplianceDefinition, ref: true, nullable: true, index: 'organization_compliance_compliance_definition_id_idx' })
	complianceDefinition?: Ref<ComplianceDefinition>;

	@OneToMany({ entity: () => OrganizationComplianceAiResponseFile, mappedBy: 'organizationCompliance' })
	organizationComplianceAiResponseFiles = new Collection<OrganizationComplianceAiResponseFile>(this);

	@OneToMany({ entity: () => OrganizationComplianceAiResponse, mappedBy: 'organizationCompliance' })
	organizationComplianceAiResponses = new Collection<OrganizationComplianceAiResponse>(this);

	@OneToMany({ entity: () => OrganizationComplianceNote, mappedBy: 'organizationCompliance' })
	organizationComplianceNotes = new Collection<OrganizationComplianceNote>(this);

	@OneToMany({ entity: () => OrganizationComplianceQuestionBookmark, mappedBy: 'organizationCompliance' })
	organizationComplianceQuestionBookmarks = new Collection<OrganizationComplianceQuestionBookmark>(this);

	@OneToMany({ entity: () => OrganizationComplianceResponse, mappedBy: 'organizationCompliance' })
	organizationComplianceResponses = new Collection<OrganizationComplianceResponse>(this);

	@OneToMany({ entity: () => OrganizationComplianceStatus, mappedBy: 'organizationCompliance' })
	organizationComplianceStatuses = new Collection<OrganizationComplianceStatus>(this);
}
