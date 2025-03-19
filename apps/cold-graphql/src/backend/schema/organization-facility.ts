import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { AttributeAssurance } from './attribute-assurance';
import { Emission } from './emission';
import { Integration } from './integration';
import { Material } from './material';
import { MaterialSupplier } from './material-supplier';
import { Organization } from './organization';
import { Product } from './product';
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

	@Field(() => ISODateStringScalar, { nullable: true })
	createdAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	updatedAt?: Date;

	@Field(() => String, { nullable: true })
	addressLine2?: string;

	@Field(() => String, { nullable: true })
	postalCode?: string;

	@Field(() => Boolean, { nullable: true })
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

	@Field(() => String, { nullable: true })
	brandFacilityId?: string;

	@Field(() => String, { nullable: true })
	category?: string;

	@Field(() => String, { nullable: true })
	subcategory?: string;

	@RelationshipField<AttributeAssurance>(() => [AttributeAssurance], { relatedField: 'organizationFacility' })
	attributeAssurances!: AttributeAssurance[];

	@RelationshipField<Emission>(() => [Emission], { relatedField: 'organizationFacility' })
	emissions!: Emission[];

	@RelationshipField<Integration>(() => [Integration], { relatedField: 'organizationFacility' })
	integrations!: Integration[];

	@RelationshipField<MaterialSupplier>(() => [MaterialSupplier], { relatedField: 'organizationFacility' })
	materialSuppliers!: MaterialSupplier[];

	@RelationshipField<Material>(() => [Material], { relatedField: 'organizationFacility' })
	materials!: Material[];

	@RelationshipField<Product>(() => [Product], { relatedField: 'organizationFacility' })
	products!: Product[];

	@RelationshipField<UtilityBill>(() => [UtilityBill], { relatedField: 'organizationFacility' })
	utilityBills!: UtilityBill[];
}
