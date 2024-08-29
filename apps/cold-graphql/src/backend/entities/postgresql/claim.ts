import { Collection, Entity, Enum, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { OrganizationClaim } from './organization-claim';

export enum ClaimsType {
	THIRD_PARTY = 'THIRD_PARTY',
	INTERNAL = 'INTERNAL',
	TEST = 'TEST',
}

export enum ClaimsLevel {
	ORGANIZATION = 'ORGANIZATION',
	SUPPLIER = 'SUPPLIER',
	PRODUCT = 'PRODUCT',
	MATERIAL = 'MATERIAL',
}

@Entity({ tableName: 'claims' })
export class Claim {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Organization, ref: true, nullable: true })
	organization?: Ref<Organization>;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Enum({ type: 'string', items: () => ClaimsType })
	type!: ClaimsType;

	@Enum({ type: 'string', items: () => ClaimsLevel })
	level!: ClaimsLevel;

	@OneToMany({ entity: () => OrganizationClaim, mappedBy: 'claim' })
	organizationClaims = new Collection<OrganizationClaim>(this);
}
