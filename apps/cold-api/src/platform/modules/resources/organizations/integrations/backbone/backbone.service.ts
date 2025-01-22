import { Injectable } from '@nestjs/common';
import { BaseWorker, Cuid2Generator, GuidPrefixes, IRequest, PrismaService, ImperialUnits } from '@coldpbc/nest';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { capitalize, merge } from 'lodash';

@Injectable()
export class BackboneService extends BaseWorker {
	private config: AxiosRequestConfig;
	private axios: HttpService;
	productCategories: any[];
	componentTypes: any[];

	constructor(readonly prisma: PrismaService) {
		super(BackboneService.name);

		this.config = {
			baseURL: 'https://prod-api.backboneapp.co/api/v2',
			headers: {},
		};
		this.axios = new HttpService();
	}

	// custom fields

	value_field_name = 'name';
	year_field_id = '62fa7cfba63b100013a6e7d7';
	season_field = '5e29ee82e38dd60034e3c369';
	supplier_field_id = '5e2a079c9556da0033a23232';

	material_supplier_field_id = '5e2a079c9556da0033a23232';
	material_supplier_country_field_id = '5ea9d60434c24800327e4da9';
	material_yield_field_id = '5e4ecd88a369020033942cbd';
	material_description_field_id = '5e3c6cfd490c1100343dbcce';
	material_notes_field_id = '5e4ecda1a369020033942cbf';

	product_supplier_field_id = '5e31c0dd56f58f003e3cc4e8';
	product_weight_field_id = '5e31c26f56f58f003e3cc501';
	product_gender_field_id = '5e31bff356f58f003e3cc4e3';
	product_landed_cost = '5e31cef056f58f003e3cc58b';
	product_folded_dimensions_field_id = '6070a2bf2597fa00141fe8bd';
	product_packaging_dimensions = '5e90a66e5b9d8b00327d59e7';
	product_sustainability_notes_field_id = '5e31c25c56f58f003e3cc4ff';

	async authenticate(req: IRequest) {
		try {
			if (!req.body || !req.body['api_key']) {
				throw new Error('API key is missing');
			}

			this.logger.info('Authenticating with Backbone API');

			this.config.headers = {
				'x-api-key': req.body.api_key,
			};

			const response = await this.axios.axiosRef.post('/users/login', null, this.config);

			if (!response.data.token) {
				throw new Error('Authentication failed');
			}

			this.config.headers = {
				authentication: response.data.token,
			};
		} catch (e) {
			this.logger.error(e.message, e);
		}
	}

	/**
	 * Recursively Sync products from Backbone API
	 * @param req
	 * @param skip
	 * @param limit
	 * @param total
	 */
	async syncProducts(req: IRequest, skip: number, limit: number, total: number) {
		this.logger.info(`Syncing products from Backbone API: ${skip}/${total}`);

		if (!this.config.headers?.authentication) {
			await this.authenticate(req);
		}

		this.config.params = {
			skip,
			limit,
		};

		const response = await this.axios.axiosRef.get('/products', this.config);

		if (!response.data || !response.data.results) {
			return;
		}

		for (const product of response.data.results) {
			if (req.body.startYear) {
				if (!product.year) {
					this.logger.warn(`Skipping product ${product.name} as it does not have a year`);
					continue;
				}
				if (+product.year.name < +req.body.startYear) {
					this.logger.info(`Skipping product ${product.name} as it is older than ${req.body.startYear}`);
					continue;
				}
			}

			const supplierDetails = await this.getProductSupplier(product._id, req);
			const categoryData = await this.resolveProductCategories(product._id, req);

			let existingProduct: any = await this.prisma.products.findUnique({
				where: {
					orgIdName: {
						name: product.name,
						organization_id: req.organization.id,
					},
				},
			});

			const data = {
				name: product.name,
				description: existingProduct?.description ? existingProduct.description : product.description,
				season_code: `${product.season.name} ${product.year.name}`,
				plm_id: product._id,
				brand_product_id: product.code,
				style_code: product.code,
				organization_id: req.organization.id,
				...supplierDetails,
				product_category: categoryData?.product_category || null,
				product_subcategory: categoryData?.product_subcategory || null,
			};

			if (!existingProduct) {
				try {
					existingProduct = await this.prisma.products.create({
						data: {
							id: new Cuid2Generator(GuidPrefixes.OrganizationProduct).scopedId,
							...data,
							metadata: product,
							weight: product.custom_fields.find(field => field.field_info === this.product_weight_field_id)?.value,
						},
					});
				} catch (e) {
					this.logger.error(e.message, e);
				}
			} else {
				try {
					existingProduct = await this.prisma.products.update({
						where: {
							orgIdName: {
								name: product.name,
								organization_id: req.organization.id,
							},
						},
						data: {
							weight: existingProduct.weight ? existingProduct.weight : product.custom_fields.find(field => field.field_info === this.product_weight_field_id)?.value || null,
							metadata: merge(existingProduct.metadata, product),
						},
					});
				} catch (e) {
					this.logger.error(e.message, e);
				}
			}

			const bomItems = await this.getBomItems(product, req);

			for (const item of bomItems) {
				const existingMaterial = await this.prisma.materials.findUnique({
					where: {
						orgIdName: {
							name: item.component.name,
							organization_id: req.organization.id,
						},
					},
				});

				const categoryData = await this.resolveMaterialCategories(item, req);

				const materialData = {
					name: item.component.name,
					description: existingMaterial?.description ? existingMaterial.description : item.description,
					organization_id: req.organization.id,
					brand_material_id: item.component.code,
					material_category: categoryData.material_category,
					material_subcategory: categoryData.material_subcategory,
				};

				let material: any;
				try {
					material = await this.prisma.materials.upsert({
						where: {
							orgIdName: {
								name: item.component.name,
								organization_id: req.organization.id,
							},
						},
						update: materialData,
						create: {
							id: new Cuid2Generator(GuidPrefixes.Material).scopedId,
							...materialData,
						},
					});

					this.logger.info(`${item.component.name} synced for ${existingProduct?.name || product?.name}`, {
						material,
						organization: req.organization,
						user: req.user,
					});
				} catch (e) {
					this.logger.error(e.message, e);
				}

				const materialSupplier = await this.getMaterialSupplier(item.component.custom_fields, req);

				if (materialSupplier.supplier_id) {
					try {
						await this.prisma.material_suppliers.upsert({
							where: {
								materialSupplierKey: {
									material_id: material.id,
									supplier_id: materialSupplier.supplier_id,
								},
							},
							create: {
								id: new Cuid2Generator(GuidPrefixes.MaterialSupplier).scopedId,
								material_id: material.id,
								supplier_id: materialSupplier.supplier_id,
								organization_id: req.organization.id,
							},
							update: {
								organization_id: req.organization.id,
							},
						});

						this.logger.info(`Material Supplier synced for ${material.name}`, {
							product: existingProduct,
							material,
							organization: req.organization,
							user: req.user,
						});
					} catch (e) {
						this.logger.error(e.message, e);
					}
				} else {
					this.logger.warn(`Material Supplier not found for ${item.component.name}`);
				}

				const existing = await this.prisma.product_materials.findUnique({
					where: {
						materialProductKey: {
							material_id: material.id,
							product_id: existingProduct.id,
						},
					},
				});

				try {
					const { uofm, yieldNumber } = this.resolveUofM(item, existing);

					const productMaterial = await this.prisma.product_materials.upsert({
						where: {
							materialProductKey: {
								material_id: material.id,
								product_id: existingProduct.id,
							},
						},
						create: {
							id: new Cuid2Generator(GuidPrefixes.OrganizationProductMaterial).scopedId,
							product_id: existingProduct.id,
							material_id: material.id,
							material_supplier_id: materialSupplier.supplier_id,
							organization_id: req.organization.id,
							placement: item.placement,
							plm_id: item._id,
							metadata: item,
							unit_of_measure: uofm,
							yield: yieldNumber,
						},
						update: {
							material_supplier_id: materialSupplier.supplier_id,
							organization_id: req.organization.id,
							placement: item.placement,
							plm_id: item._id,
							weight: existing?.weight,
							yield: yieldNumber,
							unit_of_measure: uofm,
							metadata: item,
						},
					});

					this.logger.info(`Product Material synced for ${existingProduct.name}`, {
						product: existingProduct,
						product_material: productMaterial,
						organization: req.organization,
						user: req.user,
					});
				} catch (e) {
					this.logger.error(e.message, e);
				}
			}

			this.logger.info(`Product synced: ${product.name}`);
		}

		if (skip < total) {
			await this.syncProducts(req, skip + limit, limit, total);
		}

		return;
	}

	async getProductSupplier(id: string, req: IRequest) {
		if (!this.config.headers?.authentication) {
			await this.authenticate(req);
		}

		const response = await this.axios.axiosRef.get(`/products/${id}`, this.config);

		if (!response.data) {
			this.logger.warn(`Product ${id} not found`);
			return;
		}

		const product = response.data;

		let tier1_supplier: any;

		try {
			const supplier_name = product.custom_fields.find(field => field.field_info === this.product_supplier_field_id)?.value;
			if (supplier_name) {
				tier1_supplier = await this.resolveSupplierToFacility(supplier_name, req);
			}
		} catch (e) {
			this.logger.error(e.message, e);
		}

		const data = {
			supplier_id: tier1_supplier?.id ? tier1_supplier.id : null,
		};

		return data;
	}

	/**
	 * Retrieves the material supplier from the given custom fields based on field information.
	 *
	 * @param custom_fields An array containing the custom fields for the material.
	 * @param req The request object containing necessary information.
	 *
	 * @return Returns an object containing the supplier ID if found, otherwise null.
	 */
	async getMaterialSupplier(custom_fields: any[], req: IRequest) {
		if (!this.config.headers?.authentication) {
			await this.authenticate(req);
		}

		let tier2_supplier: any;

		try {
			const supplier_name = custom_fields.find(field => field.field_info === this.material_supplier_field_id)?.value;
			if (supplier_name) {
				tier2_supplier = await this.resolveSupplierToFacility(supplier_name, req);
			}
		} catch (e) {
			this.logger.error(e.message, e);
		}

		const data = {
			supplier_id: tier2_supplier?.id ? tier2_supplier.id : null,
		};

		return data;
	}

	/**
	 * Resolve product categories : This function returns the product category (the top level product category) and subcategory (all the child categories joined with | )
	 * @param {string} productId - The unique identifier of the product to resolve categories for.
	 * @param {IRequest} req - The request object containing necessary data.
	 * @returns {product_category: string, product_subcategory: string} An object containing the resolved product category and subcategory.
	 */
	async resolveProductCategories(productId: string, req: IRequest): Promise<{ product_category: string; product_subcategory: string }> {
		if (!this.config.headers?.authentication) {
			await this.authenticate(req);
		}

		const productResponse = await this.axios.axiosRef.get(`/products/${productId}`, this.config);

		const categoryData = {
			product_category: '' as string,
			product_subcategory: '' as string,
		};

		if (!this.productCategories || this.productCategories.length < 1) {
			const response = await this.axios.axiosRef.get(`/admin/categories`, this.config);

			if (!response.data) {
				this.logger.warn(`no categories found`);
				return categoryData;
			}

			this.productCategories = response.data;
		}

		let currentCategoryId = productResponse.data.category;

		const categories: string[] = [];

		while (currentCategoryId) {
			const category = this.productCategories.find(cat => cat._id === currentCategoryId);

			if (!category) break;

			categories.push(capitalize(category.name));
			currentCategoryId = category.parent || '';
		}

		categoryData.product_category = categories.reverse().shift() as string;
		categoryData.product_subcategory = categories.join(' | ');

		return categoryData;
	}

	/**
	 * Resolve material categories : This function returns the material category (the top level material category) and subcategory (all the child categories joined with | )
	 * @param material
	 * @param req
	 */
	async resolveMaterialCategories(material: any, req: IRequest) {
		if (!this.componentTypes || this.componentTypes.length < 1) {
			const componentTypes = await this.axios.axiosRef.get(`/admin/component-types`, this.config);

			if (componentTypes.data && componentTypes.data.length > 0) {
				this.componentTypes = componentTypes.data;
			}
		}

		const data = { material_category: '', material_subcategory: '' };

		const materialCategories: string[] = [];

		const componentType = this.componentTypes.find(type => type._id === material.component.component_type);

		materialCategories.push(capitalize(componentType.name));

		let currentCategoryId = componentType.parent;

		while (currentCategoryId) {
			const category = this.componentTypes.find(cat => cat._id === currentCategoryId);

			if (!category) break;

			materialCategories.push(capitalize(category.name));
			currentCategoryId = category.parent || undefined;
		}

		data.material_category = materialCategories.reverse().shift() as string;
		data.material_subcategory = materialCategories.join(' | ');

		return data;
	}

	/**
	 * Resolve supplier to facility : This function looks up the supplier by name in the organization_facilities table
	 * @param name
	 * @param req
	 */
	async resolveSupplierToFacility(name: string, req: IRequest) {
		let supplier = await this.prisma.organization_facilities.findUnique({
			where: {
				orgFacilityName: {
					name: name,
					organization_id: req.organization.id,
				},
			},
		});

		if (!supplier) {
			this.logger.warn(`Supplier not found: ${name}; Creating new supplier`, { name, organization: req.organization, user: req.user });
			try {
				supplier = await this.prisma.organization_facilities.create({
					data: {
						id: new Cuid2Generator(GuidPrefixes.OrganizationFacility).scopedId,
						name,
						organization_id: req.organization.id,
						supplier: true,
					},
				});
			} catch (e) {
				this.logger.error(e.message, e);
				return null;
			}
		}

		this.logger.info(`Supplier found: ${name}`, supplier);

		return supplier;
	}

	/**
	 * Retrieves Bill of Materials (BOM) items for a given product from Backbone.
	 *
	 * @param {Object} product - The product object containing _id and name properties.
	 * @param {Object} req - The request object containing organization and user details.
	 * @return {Promise<any[]>} - A promise that resolves to an array of BOM items for the product.
	 */
	async getBomItems(product: { _id: string; name: string }, req: IRequest): Promise<any[]> {
		this.logger.info(`Syncing BOM items for ${product.name}`, { product, organization: req.organization, user: req.user });

		if (!this.config.headers?.authentication) {
			await this.authenticate(req);
		}

		const response = await this.axios.axiosRef.get(`/products/${product._id}/bom-items`, this.config);

		if (!response.data) {
			return [];
		}

		return response.data.bom_items;
	}

	//Todo: Move this into a utility class
	resolveUofM(item, existing: any): { uofm: string | null; yieldNumber: number | null } {
		try {
			let uofm: string | null;
			const yieldString = item.component.custom_fields.find(field => field.field_info === this.material_yield_field_id)?.value;
			const yieldParts = yieldString?.match(/(\d+)\s*(\w+)/);

			const yieldNumber = existing?.yield ? existing.yield : yieldParts?.length > 1 ? +yieldParts[1] : null;
			const unitOfMeasure = yieldParts.length > 2 ? yieldParts[2] : null;

			const yardAbbreviations = ['y', 'yd', 'yrd', 'yds', 'yard', 'yards'];
			const inchAbbreviations = ['i', 'in', 'inch'];
			const footAbbreviations = ['f', 'ft', 'foot', 'feet'];

			switch (true) {
				case yardAbbreviations.includes(unitOfMeasure):
					uofm = ImperialUnits.yard;
					break;
				case inchAbbreviations.includes(unitOfMeasure):
					uofm = ImperialUnits.inch;
					break;
				case footAbbreviations.includes(unitOfMeasure):
					uofm = ImperialUnits.foot;
					break;
				default:
					uofm = null;
					break;
			}
			return { uofm, yieldNumber };
		} catch (e) {
			this.logger.warn(e.message, e);
			return { uofm: null, yieldNumber: null };
		}
	}
}
