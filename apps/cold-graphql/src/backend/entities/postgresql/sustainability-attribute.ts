import { Collection, Entity, Enum, Index, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { OrganizationAttribute } from './organization-attribute';

export enum SustainabilityAttributesLevel {
	ORGANIZATION = 'ORGANIZATION',
	SUPPLIER = 'SUPPLIER',
	PRODUCT = 'PRODUCT',
	MATERIAL = 'MATERIAL',
}

export enum SustainabilityAttributesType {
	THIRD_PARTY = 'THIRD_PARTY',
	INTERNAL = 'INTERNAL',
	TEST = 'TEST',
}

@Entity({ tableName: 'sustainability_attributes' })
export class SustainabilityAttribute {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Organization, ref: true, nullable: true, index: 'sustainability_attributes_organization_id_idx1' })
	organization?: Ref<Organization>;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Index({ name: 'sustainability_attributes_level_idx1' })
	@Enum({ type: 'string', items: () => SustainabilityAttributesLevel })
	level!: SustainabilityAttributesLevel;

	@Index({ name: 'sustainability_attributes_type_idx1' })
	@Enum({ type: 'string', items: () => SustainabilityAttributesType })
	type!: SustainabilityAttributesType;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@OneToMany({ entity: () => OrganizationAttribute, mappedBy: 'sustainabilityAttribute' })
	organizationAttributes = new Collection<OrganizationAttribute>(this);
}
