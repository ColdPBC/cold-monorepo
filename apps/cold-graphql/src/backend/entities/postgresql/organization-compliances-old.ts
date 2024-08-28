import { Entity, ManyToOne, OneToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceDefinition } from './compliance-definition';
import { Organization } from './organization';

@Entity({ tableName: 'organization_compliances_old' })
export class OrganizationCompliancesOld {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@OneToOne({ entity: () => Organization, ref: true, unique: 'organization_compliances_old_organization_id_compliance_id_idx' })
	organization!: Ref<Organization>;

	@ManyToOne({ entity: () => ComplianceDefinition, ref: true, fieldName: 'compliance_id', index: 'organization_compliances_old_compliance_id_idx' })
	complianceDefinition!: Ref<ComplianceDefinition>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'json', nullable: true })
	surveysOverride?: Record<string, unknown>;

	@Property({ type: 'boolean', default: false })
	deleted = false;
}
