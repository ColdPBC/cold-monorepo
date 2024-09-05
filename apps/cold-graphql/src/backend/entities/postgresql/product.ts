import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { Organization } from './organization';
import { OrganizationAttribute } from './organization-attribute';
import { ProductMaterial } from './product-material';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

@Entity({ tableName: 'products' })
@ApplyAccessControlList(default_acl)
export class Product {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @Unique({ name: 'products_name_key' })
  @Property({ type: 'text' })
  name!: string;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @Property({ type: 'boolean', default: false })
  deleted = false;

  @ManyToOne({ entity: () => Organization, ref: true, index: 'products_organization_id_idx' })
  organization!: Ref<Organization>;

  @OneToMany({ entity: () => OrganizationAttribute, mappedBy: 'product' })
  organizationAttributes = new Collection<OrganizationAttribute>(this);

  @OneToMany({ entity: () => ProductMaterial, mappedBy: 'product' })
  productMaterials = new Collection<ProductMaterial>(this);
}
