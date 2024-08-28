import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Material } from './material';
import { OrganizationFacility } from './organization-facility';

@Entity({ tableName: 'material_suppliers' })
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
