import { Entity, Index, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { OrganizationAttribute } from './organization-attribute';

@Entity({ tableName: 'attribute_assurances' })
export class AttributeAssurance {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'attribute_assurances_organization_id_idx1' })
	organization!: Ref<Organization>;

	@Property({ type: 'datetime', length: 3 })
	effectiveStartDate!: Date;

	@Property({ type: 'datetime', length: 3 })
	effectiveEndDate!: Date;

	@ManyToOne({ entity: () => OrganizationAttribute, ref: true, fieldName: 'organization_attributes_id', nullable: true, index: 'attribute_assurances_org_claim_id_idx1' })
	organizationAttribute?: Ref<OrganizationAttribute>;

	@Index({ name: 'attribute_assurances_organization_file_id_idx1' })
	@Property({ type: 'text', nullable: true })
	organizationFileId?: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;
}
