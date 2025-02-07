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

	// Overrride beforeReadHook here:

	// Overrride afterReadHook here:

	// Overrride beforeCreateHook here:

	// Overrride afterCreateHook here:

	// Overrride beforeUpdateHook here:

	// Overrride afterUpdateHook here:

	// Overrride beforeDeleteHook here:

	// Overrride afterDeleteHook here:
}
