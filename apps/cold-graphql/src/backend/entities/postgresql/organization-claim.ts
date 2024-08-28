import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Claim } from './claim';
import { Material } from './material';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { Product } from './product';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

@Entity({ tableName: 'organization_claims' })
export class OrganizationClaim {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @ManyToOne({ entity: () => Claim, ref: true, index: 'organization_claims_claim_id_idx1' })
  claim!: Ref<Claim>;

  @ManyToOne({ entity: () => OrganizationFacility, ref: true, nullable: true, index: 'organization_claims_organization_facility_id_idx' })
  organizationFacility?: Ref<OrganizationFacility>;

  @ManyToOne({ entity: () => OrganizationFile, ref: true, index: 'organization_claims_organization_file_id_idx1' })
  organizationFile!: Ref<OrganizationFile>;

  @Property({ type: 'datetime', length: 3, nullable: true })
  issuedDate?: Date;

  @Property({ type: 'datetime', length: 3, nullable: true })
  effectiveDate?: Date;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @Property({ type: 'boolean', default: false })
  deleted = false;

  @ManyToOne({ entity: () => Material, ref: true, nullable: true, index: 'organization_claims_material_id_idx1' })
  material?: Ref<Material>;

  @ManyToOne({ entity: () => Product, ref: true, nullable: true, index: 'organization_claims_product_id_idx1' })
  product?: Ref<Product>;

  @ManyToOne({ entity: () => Organization, ref: true, index: 'organization_claims_organization_id_idx1' })
  organization!: Ref<Organization>;
}
