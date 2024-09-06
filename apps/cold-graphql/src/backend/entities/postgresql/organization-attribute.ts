import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { AttributeAssurance } from './attribute-assurance';
import { Material } from './material';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { Product } from './product';
import { SustainabilityAttribute } from './sustainability-attribute';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

@Entity({ tableName: 'organization_attributes' })
@ApplyAccessControlList(default_acl)
export class OrganizationAttribute {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @ManyToOne({ entity: () => SustainabilityAttribute, ref: true, index: 'organization_attributes_attribute_id_idx1' })
  sustainabilityAttribute!: Ref<SustainabilityAttribute>;

  @ManyToOne({ entity: () => OrganizationFacility, ref: true, nullable: true, index: 'organization_attributes_organization_facility_id_idx' })
  organizationFacility?: Ref<OrganizationFacility>;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @Property({ type: 'boolean', default: false })
  deleted = false;

  @ManyToOne({ entity: () => Material, ref: true, nullable: true, index: 'organization_attributes_material_id_idx1' })
  material?: Ref<Material>;

  @ManyToOne({ entity: () => Product, ref: true, nullable: true, index: 'organization_attributes_product_id_idx1' })
  product?: Ref<Product>;

  @ManyToOne({ entity: () => Organization, ref: true, index: 'organization_attributes_organization_id_idx1' })
  organization!: Ref<Organization>;

  @ManyToOne({ entity: () => OrganizationFile, ref: true, nullable: true, index: 'organization_attributes_organization_file_id_idx1' })
  organizationFile?: Ref<OrganizationFile>;

  @OneToMany({ entity: () => AttributeAssurance, mappedBy: 'organizationAttribute' })
  attributeAssurances = new Collection<AttributeAssurance>(this);
}
