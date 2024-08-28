import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Material } from './material';
import { Product } from './product';

@Entity({ tableName: 'product_materials' })
export class ProductMaterial {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Product, ref: true, index: 'product_materials_product_id_idx' })
	product!: Ref<Product>;

	@ManyToOne({ entity: () => Material, ref: true, index: 'product_materials_material_id_idx' })
	material!: Ref<Material>;

	@Property({ type: 'text' })
	materialSupplierId!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;
}
