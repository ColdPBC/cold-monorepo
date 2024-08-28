import { Collection, Entity, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceDefinition } from './compliance-definition';
import { Organization } from './organization';
import { OrganizationComplianceNote } from './organization-compliance-note';
import { OrganizationComplianceQuestionBookmark } from './organization-compliance-question-bookmark';
import { OrganizationComplianceResponse } from './organization-compliance-response';
import { OrganizationComplianceStatus } from './organization-compliance-status';

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

	@OneToOne({ entity: () => Organization, ref: true, unique: 'organization_compliance_organization_id_compliance_definiti_key' })
	organization!: Ref<Organization>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Property({ type: 'boolean', default: true })
	visible = true;

	@ManyToOne({ entity: () => ComplianceDefinition, ref: true, nullable: true, index: 'organization_compliance_compliance_definition_id_idx' })
	complianceDefinition?: Ref<ComplianceDefinition>;

	@OneToOne({ entity: () => OrganizationComplianceResponse, mappedBy: 'organizationCompliance' })
	organizationComplianceInverse?: OrganizationComplianceResponse;

	@OneToMany({ entity: () => OrganizationComplianceNote, mappedBy: 'organizationCompliance' })
	organizationComplianceNotes = new Collection<OrganizationComplianceNote>(this);

	@OneToMany({ entity: () => OrganizationComplianceQuestionBookmark, mappedBy: 'organizationCompliance' })
	organizationComplianceQuestionBookmarks = new Collection<OrganizationComplianceQuestionBookmark>(this);

	@OneToMany({ entity: () => OrganizationComplianceStatus, mappedBy: 'organizationCompliance' })
	organizationComplianceStatuses = new Collection<OrganizationComplianceStatus>(this);
}
