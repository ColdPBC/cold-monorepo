import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Emission } from './emission';
import { Integration } from './integration';
import { MaterialSupplier } from './material-supplier';
import { Organization } from './organization';
import { OrganizationAttribute } from './organization-attribute';
import { UtilityBill } from './utility-bill';
import { OrganizationFacility as OrmOrganizationFacility } from '../entities';
import { connection } from '../database';

@Entity<OrganizationFacility>('OrganizationFacility', {
	provider: new MikroBackendProvider(OrmOrganizationFacility, connection),
})
export class OrganizationFacility {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<OrganizationFacility>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => String, { nullable: true })
	city?: string;

	@Field(() => String, { nullable: true })
	country?: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => String, { nullable: true })
	addressLine2?: string;

	@Field(() => String, { nullable: true })
	postalCode?: string;

	@Field(() => Boolean)
	deleted = false;

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;

	@Field(() => String, { nullable: true })
	stateProvince?: string;

	@Field(() => String, { nullable: true })
	addressLine1?: string;

	@Field(() => Boolean, { nullable: true })
	supplier = false;

	@Field(() => Number, { nullable: true })
	supplierTier?: number;

	@RelationshipField<Emission>(() => [Emission], { relatedField: 'organizationFacility' })
	emissions!: Emission[];

	@RelationshipField<Integration>(() => [Integration], { relatedField: 'organizationFacility' })
	integrations!: Integration[];

	@RelationshipField<MaterialSupplier>(() => [MaterialSupplier], { relatedField: 'organizationFacility' })
	materialSuppliers!: MaterialSupplier[];

	@RelationshipField<OrganizationAttribute>(() => [OrganizationAttribute], { relatedField: 'organizationFacility' })
	organizationAttributes!: OrganizationAttribute[];

	@RelationshipField<UtilityBill>(() => [UtilityBill], { relatedField: 'organizationFacility' })
	utilityBills!: UtilityBill[];
}
