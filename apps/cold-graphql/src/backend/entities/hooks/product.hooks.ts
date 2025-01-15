// Product Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { Product } from '../postgresql';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { OrganizationProductMaterialEmissions } from '../postgresql/organization-product-material-emissions';
import { getConnection } from '../../database.config';
import { set } from 'lodash';

export class ProductHooks extends BaseSidecar {
	constructor() {
		super(Product, 'products');
	}
	// Overrride BeforeReadHook here:
	override async afterReadHook(params: any): Promise<ReadHookParams<typeof Product, OrgContext>> {
		return params;
	}
	// Overrride AfterReadHook here:

	// Overrride BeforeCreateHook here:

	// Overrride AfterCreateHook here:

	// Overrride BeforeUpdateHook here:

	// Overrride AfterUpdateHook here:

	// Overrride BeforeDeleteHook here:

	// Overrride AfterDeleteHook here:
}
