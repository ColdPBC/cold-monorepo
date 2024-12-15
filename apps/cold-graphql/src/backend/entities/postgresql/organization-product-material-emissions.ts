import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BigIntType, Entity, Index, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { Product } from './product';
import { Material } from './material';
import { OrgContext } from '../../libs/acls/acl_policies';
import { BaseSidecar } from '../base.sidecar';
import { OrganizationProductMaterialEmissionsHooks } from '../hooks/organization-product-material-emissions.hooks';

@Entity({
	expression: `SELECT organization_id, product_id, material_id, material_name, product_category, product_subcategory, emissions_factor FROM organization_product_material_emissions WHERE emissions_factor > 0 GROUP BY organization_id, product_id, material_id, material_name, product_category, product_subcategory, emissions_factor`,
})
export class OrganizationProductMaterialEmissions {
	sidecar: OrganizationProductMaterialEmissionsHooks;

	constructor() {
		this.sidecar = new OrganizationProductMaterialEmissionsHooks();
	}

	@Property({ fieldName: 'organization_id', type: 'text', nullable: true })
	organizationId?: string;

	@Property({ fieldName: 'organization_name', type: 'text', nullable: true })
	organizationName?: string;

	@Property({ fieldName: 'product_id', type: 'text', nullable: true })
	productId?: string;

	@Property({ fieldName: 'product_name', type: 'text', nullable: true })
	productName?: string;

	@Property({ fieldName: 'product_category', type: 'text', nullable: true })
	productCategory?: string;

	@Property({ fieldName: 'product_subcategory', type: 'text', nullable: true })
	productSubcategory?: string;

	@Property({ fieldName: 'material_id', type: 'text', nullable: true })
	materialId?: string;

	@Property({ fieldName: 'material_name', type: 'text', nullable: true })
	materialName!: string;

	@Property({ fieldName: 'emissions_factor', type: 'float', nullable: true })
	emissionsFactor?: number;

	@ManyToOne({
		entity: () => Organization,
		ref: true,
		fieldName: 'organizationId',
		nullable: true,
	})
	organization?: Ref<Organization>;

	@ManyToOne({
		entity: () => Product,
		ref: true,
		fieldName: 'productId',
		nullable: true,
	})
	product?: Ref<Product>;

	@ManyToOne({
		entity: () => Material,
		ref: true,
		fieldName: 'materialId',
		nullable: true,
	})
	material?: Ref<Material>;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof OrganizationProductMaterialEmissions, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationProductMaterialEmissionsHooks();
		}
		return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof OrganizationProductMaterialEmissions, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationProductMaterialEmissionsHooks();
		}
		return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof OrganizationProductMaterialEmissions, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationProductMaterialEmissionsHooks();
		}
		return await this.sidecar.beforeReadHook(params);
	}

	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof OrganizationProductMaterialEmissions, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationProductMaterialEmissionsHooks();
		}
		return await this.sidecar.afterReadHook(params);
	}

	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof OrganizationProductMaterialEmissions, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationProductMaterialEmissionsHooks();
		}
		return await this.sidecar.beforeUpdateHook(params);
	}

	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof OrganizationProductMaterialEmissions, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationProductMaterialEmissionsHooks();
		}
		return await this.sidecar.afterUpdateHook(params);
	}

	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof OrganizationProductMaterialEmissions, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationProductMaterialEmissionsHooks();
		}
		return await this.sidecar.beforeDeleteHook(params);
	}

	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof OrganizationProductMaterialEmissions, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationProductMaterialEmissionsHooks();
		}
		return await this.sidecar.afterDeleteHook(params);
	}
}
