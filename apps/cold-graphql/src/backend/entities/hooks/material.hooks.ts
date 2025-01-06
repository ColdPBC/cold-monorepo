// Material Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { Material, Product } from '../postgresql';
import { cache_product_emission_stats, get_product_args_from_material } from '../services/product_emission_stats';

export class MaterialHooks extends BaseSidecar {
	constructor() {
		super(Material, 'materials');
	}

	// Overrride BeforeReadHook here:

	// Overrride AfterReadHook here:

	// Overrride BeforeCreateHook here:

	// Overrride AfterCreateHook here:
	override async afterCreateHook(params: CreateOrUpdateHookParams<Material, OrgContext>) {
		//await this.cache_emissions(params);
		/*
		const materials = params?.entities as Material[];
		if (!materials || materials.length < 1) {
			return params;
		}

		const products = await get_product_args_from_material(materials[0]);
		const prodParams: CreateOrUpdateHookParams<any, OrgContext> = {
			context: params.context as OrgContext,
			args: params.args,
			entities: products,
			fields: params.fields,
			transactional: false,
		};
		await cache_product_emission_stats(prodParams);
		await super.afterCreateHook(params);
		*/
		return params;
	}

	// Overrride BeforeUpdateHook here:

	// Overrride AfterUpdateHook here:
	override async afterUpdateHook(params: CreateOrUpdateHookParams<Material, OrgContext>) {
		// await cache_product_emission_stats(params);
		// await super.afterUpdateHook(params);

		return params;
	}
	// Overrride BeforeDeleteHook here:

	// Overrride AfterDeleteHook here:
	override async afterDeleteHook(params: DeleteHookParams<Material, OrgContext>) {
		// await cache_product_emission_stats(params);
		// await super.afterDeleteHook(params);

		return params;
	}
}
