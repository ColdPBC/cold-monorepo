import { Collection, Entity, Enum, OneToMany, OneToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { OrganizationClaim } from './organization-claim';
import {ApplyAccessControlList, AuthorizationContext} from "@exogee/graphweaver-auth";
import {queryNullOrgs} from "../../constants/acls";

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
@ApplyAccessControlList<
	unknown,
	AuthorizationContext & { user: { org_id: string, roles: any } }
>(queryNullOrgs)
export class Claim {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@OneToOne({ entity: () => Organization, ref: true, nullable: true, unique: 'claims_organization_id_name_key' })
	organization: Ref<Organization> | undefined;

	@Property({ type: 'text' })
	name: string | undefined;

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
