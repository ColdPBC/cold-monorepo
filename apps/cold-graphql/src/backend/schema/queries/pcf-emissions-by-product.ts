import { graphweaverMetadata, ResolverOptions } from '@exogee/graphweaver';
import { getConnection } from '../../database.config';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Product } from '../product';
import { OrganizationProductMaterialEmissions } from '../views/organization-product-material-emissions';

import { GraphQLJSONObject } from '@exogee/graphweaver-scalars';
import { uniqBy } from 'lodash';

export async function cache_pcf_emissions(options: ResolverOptions) {
	try {
		const emissionProvider = new MikroBackendProvider(OrganizationProductMaterialEmissions, getConnection());

		const categories: any = [];

		const filter = {
			organization: {
				id: options.args.organizationId,
			},
		};

		const productProvider = new MikroBackendProvider(Product, getConnection());

		const products = await productProvider.find(filter);

		if (!products || products.length < 1) {
			return { error: 'No products found' };
		}

		const distinctCategories = uniqBy(products, 'productCategory').map((category: any) => category.productCategory);

		for (const category of distinctCategories) {
			const productsInCategory = products.filter((product: any) => product.productCategory === category);

			const categoryEmissions = await emissionProvider.find({
				productCategory: category ? category : null,
				organizationId: options.args.oprganizationId,
			});

			const totalCategoryEmissionsFactor = categoryEmissions.reduce((sum, emission: any) => {
				if (emission.emissionsFactor) {
					return sum + emission.emissionsFactor || 0;
				}

				return sum;
			}, 0);

			const averageCategoryEmissionsFactor = totalCategoryEmissionsFactor / productsInCategory.length;

			const emission_stats = {
				category,
				products_in_category: productsInCategory.length,
				total_category_c02e: totalCategoryEmissionsFactor,
				average_category_c02e: averageCategoryEmissionsFactor,
			};

			categories.push(emission_stats);

			for (const product of productsInCategory) {
				const productEmissions = categoryEmissions.filter((emission: any) => {
					if (emission.product.id === product.id) {
						return emission;
					}

					return null;
				});

				const pcf = productEmissions.reduce((sum, emission: any) => sum + emission.emissionsFactor || 0, 0);

				if (!productEmissions || productEmissions.length < 1) {
					console.log(`No emissions found for ${product.name}(id: ${product.id})`);
				}

				const stats = {
					total_product_c02e: pcf,
					...emission_stats,
				};

				console.log(`Updating emission stats for ${product.name}(id: ${product.id})`, stats);

				await productProvider.em.upsert('Product', {
					id: product.id,
					emissionStats: pcf ? stats : undefined,
				});
			}

			await productProvider.em.flush();
		}

		return { emissions: categories };
	} catch (e) {
		console.error(e);
		throw e;
	}
}

graphweaverMetadata.addQuery({
	name: 'cache_pcf_emissions',
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
			nullable: true,
		},
	},
	resolver: async options => await cache_pcf_emissions(options),
});
