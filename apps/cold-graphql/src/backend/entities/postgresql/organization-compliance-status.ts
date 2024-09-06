import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { OrganizationCompliance } from './organization-compliance';

@Entity({ tableName: 'organization_compliance_statuses' })
export class OrganizationComplianceStatus {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	type!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'text' })
	email!: string;

	@ManyToOne({ entity: () => OrganizationCompliance, ref: true, index: 'organization_compliance_statuse_organization_compliance_id_idx1' })
	organizationCompliance!: Ref<OrganizationCompliance>;

	@Property({ type: 'boolean', default: false })
	deleted = false;
}
