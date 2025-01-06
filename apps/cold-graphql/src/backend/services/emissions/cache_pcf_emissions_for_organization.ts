import { OrganizationProductMaterialEmissions } from '../../schema/views/organization-product-material-emissions';
import { Product } from '../../schema/product';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { getConnection } from '../../database.config';
import { uniqBy } from 'lodash';

/**
 * Calculate emissions statistics for a given category.
 *
 * @param {Array<OrganizationProductMaterialEmissions>} categoryEmissions - Array of emissions data for the category.
 * @param {Array<Product>} productsInCategory - Array of products in the category.
 * @param {string} category - Name of the category being analyzed.
 * @param {any[]} categories - Array to store aggregated emissions statistics.
 *
 * @return {Object} - Object containing emissions statistics for the category, including total and average CO2e emissions factors.
 */
export function calculateCategoryEmissionsStats(categoryEmissions: Array<OrganizationProductMaterialEmissions>, productsInCategory: Array<any>, category, categories: any) {
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
	return emission_stats;
}

/**
 * Extracts the Product Carbon Footprint (PCF) value for a given product from an array of organization's product emissions data.
 *
 * @param {Array<OrganizationProductMaterialEmissions>} categoryEmissions - Array of organization's product emissions data
 * @param {Product} product - The product for which to extract the PCF value
 * @returns {Object} Object containing the Product Carbon Footprint (PCF) value for the specified product
 */
export function extractPCF(categoryEmissions: Array<OrganizationProductMaterialEmissions>, product: any) {
	const productEmissions = categoryEmissions.filter((emission: any) => {
		if (emission.product.id === product.id) {
			return emission;
		}

		return null;
	});

	const pcf = productEmissions.reduce((sum, emission: any) => sum + emission.emissionsFactor || 0, 0);
	return { pcf };
}

/**
 * Retrieves products based on the specified options.
 *
 * @param {Object} options An object containing arguments and context for product retrieval.
 * @param {any} options.args The arguments for product retrieval.
 * @param {Object} options.context The context object for product retrieval.
 *
 * @return {Object} An object containing productProvider, products, and distinctCategories.
 */
export async function getProducts(options: { args: any; context: any }) {
	const filter = {
		organization: {
			id: options.args?.organizationId || options.context?.user?.organization?.id,
		},
	};

	const productProvider = new MikroBackendProvider(Product, getConnection());

	const products = await productProvider.find(filter);

	const distinctCategories = uniqBy(products, 'productCategory').map((category: any) => category.productCategory);
	return { productProvider, products, distinctCategories };
}

/**
 * Updates the emission statistics for a given product.
 * @param {number} pcf - The product carbon footprint value to be updated
 * @param {Object} emission_stats - The emission statistics object containing average_category_c02e, category, products_in_category, total_category_c02e
 * @param {Product} product - The product to update emission stats for
 * @param {MikroBackendProvider<Product>} productProvider - The provider for interacting with the backend
 * @return {Promise<void>} - A promise that resolves once the product emission stats are updated
 */
export async function updateProductEmission(
	pcf: number,
	emission_stats: {
		average_category_c02e: number;
		category: any;
		products_in_category: number;
		total_category_c02e: number;
	},
	product: Product,
	productProvider: MikroBackendProvider<Product>,
) {
	const stats = {
		total_product_c02e: pcf,
		...emission_stats,
	};

	console.log(`Updating emission stats for ${product.name}(id: ${product.id})`, stats);

	return await productProvider.em.upsert('Product', {
		id: product.id,
		emissionStats: pcf ? stats : undefined,
	});
}

/**
 * Caches the PCF emissions for organization products based on the given options.
 *
 * @param {ResolverOptions} options - The options to be used for caching PCF emissions
 * @return {Promise<{emissions: any[]}>} - A promise that resolves to an object containing the cached emissions
 */
export async function cache_pcf_emissions_for_organization(options: any) {
	try {
		const emissionProvider = new MikroBackendProvider(OrganizationProductMaterialEmissions, getConnection());

		const categories: any = [];

		const { productProvider, products, distinctCategories } = await getProducts(options);

		for (const category of distinctCategories) {
			const productsInCategory = products.filter((product: any) => product.productCategory === category);

			const categoryEmissions = await emissionProvider.find({
				productCategory: category ? category : null,
				organizationId: options.args.organizationId || options.context.organization.id,
			});

			const emission_stats = calculateCategoryEmissionsStats(categoryEmissions, productsInCategory, category, categories);

			for (const product of productsInCategory) {
				const { pcf } = extractPCF(categoryEmissions, product);

				await updateProductEmission(pcf, emission_stats, product, productProvider);
			}

			await productProvider.em.flush();
		}

		return { emissions: categories };
	} catch (e) {
		console.error(e);
		throw e;
	}
}
