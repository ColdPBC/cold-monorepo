import { AttributeAssuranceHooks } from './attribute-assurance.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Material } from './material';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { Product } from './product';
import { SustainabilityAttribute } from './sustainability-attribute';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../libs/acls/acl_policies';
import { OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'attribute_assurances' })
export class AttributeAssurance {
	sidecar: AttributeAssuranceHooks;

	constructor() {
		this.sidecar = new AttributeAssuranceHooks();
	}

	@PrimaryKey({ type: 'uuid' })
	id!: string;

	@ManyToOne({ entity: () => OrganizationFacility, ref: true, nullable: true, index: 'attribute_assurances_organization_facility_id_idx' })
	organizationFacility?: Ref<OrganizationFacility>;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'attribute_assurances_organization_id_idx1' })
	organization!: Ref<Organization>;

	@ManyToOne({ entity: () => SustainabilityAttribute, ref: true, index: 'attribute_assurances_attribute_id_idx1' })
	sustainabilityAttribute!: Ref<SustainabilityAttribute>;

	@ManyToOne({ entity: () => Material, ref: true, nullable: true, index: 'attribute_assurancess_material_id_idx1' })
	material?: Ref<Material>;

	@ManyToOne({ entity: () => Product, ref: true, nullable: true, index: 'attribute_assurances_product_id_idx1' })
	product?: Ref<Product>;

	@ManyToOne({ entity: () => OrganizationFile, ref: true, nullable: true, index: 'attribute_assurances_organization_file_id_idx1' })
	organizationFile?: Ref<OrganizationFile>;

	@Property({ type: 'datetime', length: 3 })
	effectiveStartDate!: Date;

	@Property({ type: 'datetime', length: 3 })
	effectiveEndDate!: Date;

	@Property({ type: 'datetime', length: 6 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 6 })
	updatedAt!: Date;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof AttributeAssurance, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new AttributeAssuranceHooks();
		}
		return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof AttributeAssurance, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new AttributeAssuranceHooks();
		}
		return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof AttributeAssurance, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new AttributeAssuranceHooks();
		}
		return await this.sidecar.beforeReadHook(params);
	}

	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof AttributeAssurance, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new AttributeAssuranceHooks();
		}
		return await this.sidecar.afterReadHook(params);
	}

	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof AttributeAssurance, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new AttributeAssuranceHooks();
		}
		return await this.sidecar.beforeUpdateHook(params);
	}

	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof AttributeAssurance, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new AttributeAssuranceHooks();
		}
		return await this.sidecar.afterUpdateHook(params);
	}

	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof AttributeAssurance, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new AttributeAssuranceHooks();
		}
		return await this.sidecar.beforeDeleteHook(params);
	}

	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof AttributeAssurance, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new AttributeAssuranceHooks();
		}
		return await this.sidecar.afterDeleteHook(params);
	}
}
