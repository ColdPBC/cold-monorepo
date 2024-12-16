import { graphweaverMetadata, ResolverOptions } from '@exogee/graphweaver';
import { getConnection } from '../../database.config';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Product } from '../product';
import { OrganizationProductMaterialEmissions } from '../views/organization-product-material-emissions';
import { set } from 'lodash';
import { GraphQLJSONObject } from '@exogee/graphweaver-scalars';

graphweaverMetadata.addQuery({
	name: 'pcfEmissionsByProduct',
	getType: () => GraphQLJSONObject,
	intentionalOverride: true,
	args: {
		organizationId: {
			type: () => String,
			description: 'Organization ID',
			nullable: false,
		},
		productId: {
			type: () => String,
			description: 'Product ID',
			nullable: false,
		},
	},
	resolver: async options => {
		try {
			const productProvider = new MikroBackendProvider(Product, getConnection());
			const product = await productProvider.findOne({
				organization: {
					id: options.args.organizationId,
				},
				id: options.args.productId,
			});

			if (!product?.id) {
				return product;
			}

			const emissionProvider = new MikroBackendProvider(OrganizationProductMaterialEmissions, getConnection());

			const emissions = await emissionProvider.find({
				organizationId: options.args.organizationId,
				productId: product.id,
			});

			const category = product.productCategory;

			const totalEmissionsFactor = emissions.reduce((sum, emission: any) => sum + emission.emissionsFactor || 0, 0);

			const categoryEmissions = await emissionProvider.find({
				productCategory: category,
				organizationId: options.args.oprganizationId,
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

			return {
				total_product_c02e: totalEmissionsFactor,
				product_category: category,
				products_in_category: categoryEmissions.length,
				total_category_c02e: totalCategoryEmissionsFactor,
				average_category_c02e: averageCategoryEmissionsFactor,
			};
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
});
