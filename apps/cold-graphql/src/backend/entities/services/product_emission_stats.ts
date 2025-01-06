import { CreateOrUpdateHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { Material, OrganizationProductMaterialEmissions, Product, ProductMaterial } from '../postgresql';
import { OrgContext } from '../../libs/acls/acl_policies';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { getConnection } from '../../database.config';

export async function get_product_args_from_material(material: Material): Promise<Product[]> {
	const productProvider = new MikroBackendProvider(Product, getConnection());

	// Fetch products that use the given material
	const products = await productProvider.em.find(Product, {
		productMaterials: {
			material: {
				$in: [material.id],
			},
		},
	});

	return products;
}

export async function cache_product_emission_stats(params: DeleteHookParams<any, OrgContext> | CreateOrUpdateHookParams<any, OrgContext>) {
	if (!params.entities || params.entities.length < 1) {
		return params;
	}

	try {
		const emissionProvider = new MikroBackendProvider(OrganizationProductMaterialEmissions, getConnection());
		const productProvider = new MikroBackendProvider(Product, getConnection());

		for (const item of params.entities) {
			if (!item) {
				continue;
			}

			const input = params.fields?.args.input as any;

			const product = (await productProvider.findOne({ id: input.product?.id || item.product.id })) as Product;

			const repository = emissionProvider.em.getRepository(Product);

			const count = await repository.count({ productCategory: product.productCategory });

			const categoryEmissions = await emissionProvider.find({
				productCategory: product.productCategory,
				organizationId: product.organization.id || params.context.user.org_id,
			});

			const totalCategoryEmissionsFactor = categoryEmissions.reduce((sum, emission: any) => {
				if (emission.emissionsFactor) {
					return sum + emission.emissionsFactor || 0;
				}

				return sum;
			}, 0);

			const averageCategoryEmissionsFactor = totalCategoryEmissionsFactor / count;

			const emission_stats = {
				category: product.productCategory,
				products_in_category: count,
				total_category_c02e: totalCategoryEmissionsFactor,
				average_category_c02e: averageCategoryEmissionsFactor,
				total_product_c02e: 0,
			};

			const productEmissions = categoryEmissions.filter((emission: any) => {
				if (emission.product.id === product.id) {
					return emission;
				}

				return null;
			});

			emission_stats.total_product_c02e = productEmissions.reduce((sum, emission: any) => sum + emission.emissionsFactor || 0, 0);
			product.emissionStats = emission_stats;

			await productProvider.em.upsert(Product, product);

			console.log(`Updated product ${product.name}(${product.id}) with emissions data`, { product });
		}

		return params;
	} catch (e) {
		console.error(e);
		throw e;
	}
}
