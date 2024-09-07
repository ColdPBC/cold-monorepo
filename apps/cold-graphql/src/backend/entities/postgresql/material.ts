import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { MaterialSupplier } from './material-supplier';
import { Organization } from './organization';
import { OrganizationAttribute } from './organization-attribute';
import { ProductMaterial } from './product-material';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'materials' })
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

	@OneToMany({ entity: () => OrganizationAttribute, mappedBy: 'material' })
	organizationAttributes = new Collection<OrganizationAttribute>(this);

	@OneToMany({ entity: () => ProductMaterial, mappedBy: 'material' })
	productMaterials = new Collection<ProductMaterial>(this);
}
