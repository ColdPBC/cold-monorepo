import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { MaterialSupplier } from './material-supplier';
import { Organization } from './organization';
import { OrganizationClaim } from './organization-claim';
import { ProductMaterial } from './product-material';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

@Entity({ tableName: 'materials' })
@ApplyAccessControlList(default_acl)
export class Material {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @Unique({ name: 'materials_name_key' })
  @Property({ type: 'text' })
  name!: string;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @Property({ type: 'boolean', default: false })
  deleted = false;

  @ManyToOne({ entity: () => Organization, ref: true, index: 'materials_organization_id_idx' })
  organization!: Ref<Organization>;

  @OneToMany({ entity: () => MaterialSupplier, mappedBy: 'material' })
  materialSuppliers = new Collection<MaterialSupplier>(this);

  @OneToMany({ entity: () => OrganizationClaim, mappedBy: 'material' })
  organizationClaims = new Collection<OrganizationClaim>(this);

  @OneToMany({ entity: () => ProductMaterial, mappedBy: 'material' })
  productMaterials = new Collection<ProductMaterial>(this);
}
