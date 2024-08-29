import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Emission } from './emission';
import { Integration } from './integration';
import { MaterialSupplier } from './material-supplier';
import { Organization } from './organization';
import { OrganizationClaim } from './organization-claim';
import { UtilityBill } from './utility-bill';

@Entity({ tableName: 'organization_facilities' })
export class OrganizationFacility {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'organization_facilities_organization_id_idx' })
	organization!: Ref<Organization>;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text', nullable: true })
	city?: string;

	@Property({ type: 'text', nullable: true })
	country?: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ fieldName: 'address_line_2', type: 'text', nullable: true })
	addressLine2?: string;

	@Property({ type: 'text', nullable: true })
	postalCode?: string;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'text', nullable: true })
	stateProvince?: string;

	@Property({ fieldName: 'address_line_1', type: 'text', nullable: true })
	addressLine1?: string;

	@Property({ type: 'boolean', nullable: true, default: false })
	supplier = false;

	@Property({ type: 'integer', nullable: true })
	supplierTier?: number;

	@OneToMany({ entity: () => Emission, mappedBy: 'organizationFacility' })
	emissions = new Collection<Emission>(this);

	@OneToMany({ entity: () => Integration, mappedBy: 'organizationFacility' })
	integrations = new Collection<Integration>(this);

	@OneToMany({ entity: () => MaterialSupplier, mappedBy: 'organizationFacility' })
	materialSuppliers = new Collection<MaterialSupplier>(this);

	@OneToMany({ entity: () => OrganizationClaim, mappedBy: 'organizationFacility' })
	organizationClaims = new Collection<OrganizationClaim>(this);

	@OneToMany({ entity: () => UtilityBill, mappedBy: 'organizationFacility' })
	utilityBills = new Collection<UtilityBill>(this);
}
