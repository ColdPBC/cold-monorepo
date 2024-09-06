import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Material } from './material';
import { OrganizationFacility } from './organization-facility';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

@Entity({ tableName: 'material_suppliers' })
@ApplyAccessControlList(default_acl)
export class MaterialSupplier {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @ManyToOne({ entity: () => Material, ref: true, index: 'material_suppliers_material_id_idx' })
  material!: Ref<Material>;

  @ManyToOne({ entity: () => OrganizationFacility, ref: true, fieldName: 'supplier_id' })
  organizationFacility!: Ref<OrganizationFacility>;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;
}
