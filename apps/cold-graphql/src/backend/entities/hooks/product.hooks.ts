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
		try {
			const items = params.entities || [];
			if (Array.isArray(items) && items?.length < 1) {
				return params as ReadHookParams<typeof Product, OrgContext>;
			}

			const item = items[0];

			const emissionProvider = new MikroBackendProvider(OrganizationProductMaterialEmissions, getConnection());

			const emissions = await emissionProvider.find({
				organizationId: params.context.user.organization.id, //options.args.organizationId,
				productId: params?.args?.filter?.id, //options.args.id,
			});

			const category = item.productCategory;

			const totalEmissionsFactor = emissions.reduce((sum, emission: any) => sum + emission.emissionsFactor || 0, 0);

			const categoryEmissions = await emissionProvider.find({
				productCategory: category,
				organizationId: params?.args?.filter?.organization?.id, //options.args.oprganizationId,
			});

			let categoryEmissionEntries = 0;
			const totalCategoryEmissionsFactor = categoryEmissions.reduce((sum, emission: any) => {
				if (emission.emissionsFactor) {
					categoryEmissionEntries++;
					return sum + emission.emissionsFactor || 0;
				}

				return sum;
			}, 0);
			const averageCategoryEmissionsFactor = totalCategoryEmissionsFactor / categoryEmissionEntries;

			set(item, 'emissions', {
				total_product_c02e: totalEmissionsFactor,
				product_category: category,
				products_in_category: categoryEmissions.length,
				total_category_c02e: totalCategoryEmissionsFactor,
				average_category_c02e: averageCategoryEmissionsFactor,
			});

			return params as ReadHookParams<typeof Product, OrgContext>;
		} catch (e) {
			console.error(e);
			throw e;
		}
	}
	// Overrride AfterReadHook here:

	// Overrride BeforeCreateHook here:

	// Overrride AfterCreateHook here:

	// Overrride BeforeUpdateHook here:

	// Overrride AfterUpdateHook here:

	// Overrride BeforeDeleteHook here:

	// Overrride AfterDeleteHook here:
}
