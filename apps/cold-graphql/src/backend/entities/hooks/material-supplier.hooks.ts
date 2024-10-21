// MaterialSupplier Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { Material, MaterialSupplier, OrganizationFacility } from '../postgresql';

export class MaterialSupplierHooks extends BaseSidecar {
	constructor() {
		super(MaterialSupplier, 'material_suppliers');
	}

	// Overrride BeforeReadHook here:

	// Overrride AfterReadHook here:

	// Overrride beforeCreateHook here:
	override async beforeCreateHook(params: CreateOrUpdateHookParams<typeof this.entity, OrgContext>) {
		for (const item of params.args.items) {
			const material = this.provider.em.findOneOrFail(Material, { organization: { id: params.context.user.organization.id }, id: item.material.id });
			const supplier = this.provider.em.findOneOrFail(OrganizationFacility, item.organizationFacility.id);

			if (!material) {
				throw new Error(`Material with id ${item.material.id} does not exist`);
			}
			if (!supplier) {
				throw new Error(`Supplier with id ${item.organizationFacility.id} does not exist`);
			}

			this.logger.info(`Material: ${JSON.stringify(material)}`);
			this.logger.info(`Supplier: ${JSON.stringify(supplier)}`);
		}
		return super.beforeCreateHook(params);
	}

	// Overrride AfterCreateHook here:

	// Overrride BeforeUpdateHook here:

	// Overrride AfterUpdateHook here:

	// Overrride BeforeDeleteHook here:

	// Overrride AfterDeleteHook here:
}
