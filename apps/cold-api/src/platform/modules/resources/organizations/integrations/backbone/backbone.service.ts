import { Injectable } from '@nestjs/common';

import { BaseWorker, Cuid2Generator, GuidPrefixes, IRequest, PrismaService, ImperialUnits, WeightFactorUnits } from '@coldpbc/nest';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { capitalize, find, get, merge, set } from 'lodash';
import { organizations } from '@prisma/client';

export type IRPCRequest = { user: IAuthenticatedUser; organization: organizations; system_prompt: string; question: string; schema: any };

@Injectable()
export class BackboneService extends BaseWorker {
	private config: AxiosRequestConfig;
	private axios: HttpService;
	productCategories: any[];
	componentTypes: any[];

	conversionFactor = {
		kg: 1,
		g: 0.001,
		lb: 0.453592,
		oz: 0.0283495,
		m2: 1,
		ft2: 0.092903,
		yd2: 0.836127,
		in2: 0.00064516,
		cm: 0.01,
		in: 0.0254,
		ft: 0.3048,
		yd: 0.9144,
	};

	constructor(readonly prisma: PrismaService) {
		super(BackboneService?.name);

		this.config = {
			baseURL: 'https://prod-api.backboneapp.co/api/v2',
			headers: {},
		};
		this.axios = new HttpService();
	}

	// custom fields
	/*customFields = {
		value_field_name: 'name',
		year_field_id: '62fa7cfba63b100013a6e7d7',
		season_field: '5e29ee82e38dd60034e3c369',
		material_supplier_field_id: '5e2a079c9556da0033a23232',
		material_weight_field_id: '67acdb7031b9c1da6490ece5',
		material_yield_field_id: '5e4ecd88a369020033942cbd',
		material_description_field_id: '5e3c6cfd490c1100343dbcce',
		material_notes_field_id: '5e4ecda1a369020033942cbf',
		product_supplier_field_id: '5e31c0dd56f58f003e3cc4e8',
		product_weight_field_id: '5e31c26f56f58f003e3cc501',
		product_gender_field_id: '5e31bff356f58f003e3cc4e3',
		product_landed_cost: '5e31cef056f58f003e3cc58b',
		product_folded_dimensions_field_id: '6070a2bf2597fa00141fe8bd',
		product_packaging_dimensions: '5e90a66e5b9d8b00327d59e7',
		product_sustainability_notes_field_id: '5e31c25c56f58f003e3cc4ff',
*/
	value_field_name = 'name';
	year_field_id = '62fa7cfba63b100013a6e7d7';
	season_field = '5e29ee82e38dd60034e3c369';
	supplier_field_id = '5e2a079c9556da0033a23232';

	material_yield_field_id = '5e4ecd88a369020033942cbd';
	material_notes_field_id = '5e4ecda1a369020033942cbf';

	product_supplier_field_id = '5e31c0dd56f58f003e3cc4e8';
	product_weight_field_id = '5e31c26f56f58f003e3cc501';
	product_gender_field_id = '5e31bff356f58f003e3cc4e3';
	product_landed_cost = '5e31cef056f58f003e3cc58b';
	product_folded_dimensions_field_id = '6070a2bf2597fa00141fe8bd';
	product_packaging_dimensions = '5e90a66e5b9d8b00327d59e7';
	product_sustainability_notes_field_id = '5e31c25c56f58f003e3cc4ff';

	customFields = {
		value_field_name: 'value', //'name';
		material_supplier_country_field_id: '6268649e72bf4c0013dfb7ee', //'5ea9d60434c24800327e4da9'
		material_supplier_field_id: '62c72d714468a9001328e1eb', //'5e2a079c9556da0033a23232',
		material_yield_field_id: null, //'5e4ecd88a369020033942cbd',
		material_description_field_id: '6268649e72bf4c0013dfb7ef', //'5e3c6cfd490c1100343dbcce'
		material_width_field_id: '62c730ab72323b0013adcd6b',
		material_weight_field_id: '62c730ab72323b0013adcd68',
		material_composition_field_id: '62c730ab72323b0013adcd67',
		material_dye_technique: '62c72e44361e110013180f31',
		material_coatings_field_id: '62c730ab72323b0013adcd69',

		product_material_description_field_id: '62c60fcc8e13da00133421c2',
		product_supplier_field_id: '62cc7c5097bf380013c921ef', // '5e31c0dd56f58f003e3cc4e8',
		product_supplier_country_field_id: '6268649e72bf4c0013dfb7d8',

		product_weight_field_id: '6744df877515816a5f2bee53', //'5e31c26f56f58f003e3cc501',
		product_width_field_id: '65f327203fd30b4323c3f7cd',
		product_dimensions_lwd_field_id: '62ffb97ef37deca4c85d79c4',
		product_length_field_id: '65f31e453fd30b4323c291f8',
		product_dimensions_cm_field_id: '5e31c1b256f58f003e3cc4f3',
		product_dimensions_in_field_id: '62ffb97ef37deca4c85d79c4',
		product_volume_field_id: '62ffb9a2f37deca4c85d80e9',
		product_volume_unit: 'l',
		product_dimensions_unit: 'cm',
		product_weight_unit: 'kg',

		product_sustainability_notes_field_id: '62c60fda8e13da00133422b4',
		grs_certified_field_id: '6568f0518adb59e5920cb33e',
		material_pfas_test_field_id: '656e25238adb59e5923e81c7',
		product_pfas_status_field_id: '6595d3dd2c1e8fd72727f5f0',
		material_pfas_designation_field_id: '62c72e93361e110013181462',
		material_bluesign_status_field_id: '62c72e57361e1100131810bc',
		material_recycled_type_field_id: '62c72eab4468a9001328f7b3',
	};

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

	async syncProducts(req: IRequest, skip: number, limit: number, total?: number) {
		try {
			this.logger.info(`Syncing products from Backbone API: ${skip}/${total}`);

			if (!this.config.headers?.authentication) {
				await this.authenticate(req);
			}

			this.config.params = {
				skip,
				limit,
			};

			let response: AxiosResponse<any, any> | null = null;

			try {
				response = await this.axios.axiosRef.get('/products', this.config);
			} catch (e) {
				if (e.response.status === 500) {
					this.logger.warn('Authentication token expired, re-authenticating');
					await this.authenticate(req);
					await this.syncProducts(req, skip, limit, total);
				} else {
					throw e;
				}
			}

			if (!total) {
				total = +response?.data.total;
			}

			if (!response || !response?.data || !response?.data.results) {
				return;
			}

			const results = response?.data?.results;

			for (const item of results) {
				const productMetadata = {
					...item,
				};

				// check if year is in the format of 'Season YY' if so then extract the season and year
				if (!isNaN(+item.year?.name)) {
					const parts = item.year?.name.split(' ');

					const p0IsNumber = !isNaN(parts[0]);
					const p1IsNumber = !isNaN(parts[1]);

					if (!p0IsNumber) {
						set(item, 'season.name', parts[0]);
					}

					if (p1IsNumber && parts[1].length === 2) {
						set(item, 'year.name', +`20${parts[1]}`);
					} else if (p1IsNumber) {
						set(item, 'year.name', +parts[1]);
					} else if (p0IsNumber) {
						set(item, 'year.name', +parts[0]);
					}
				}

				if (req.body.startYear) {
					if (!item.year) {
						this.logger.warn(`Skipping product ${item?.name} as it does not have a year`);
						continue;
					}

					if (+item.year.name < +req.body.startYear) {
						this.logger.info(`Skipping product ${item?.name} as it is older than ${req.body.startYear}`);
						continue;
					}
				}

				const response = await this.axios.axiosRef.get(`/products/${item._id}`, this.config);

				if (!response.data) {
					this.logger.warn(`Product ${item._id} not found`);
					return;
				}

				const product = response.data;

				const supplierDetails = await this.getProductSupplier(product, req);
				const categoryData = await this.resolveProductCategories(product, req);

				set(productMetadata, 'categories', categoryData.categories);
				set(productMetadata, 'supplier', supplierDetails);

				let existingProduct: any = await this.prisma.products.findUnique({
					where: {
						orgIdName: {
							name: product?.name,
							organization_id: req.organization.id,
						},
					},
				});

				const data = {
					name: product?.name,
					description: existingProduct?.description ? existingProduct.description : product.description,
					season_code: `${product?.season?.name + ' ' || ''}${product?.year?.name}`,
					plm_id: product._id,
					brand_product_id: product.code,
					style_code: product.code,
					organization_id: req.organization.id,
					supplier_id: supplierDetails?.supplier_id || null,
					product_category: categoryData?.legacy?.product_category || null,
					product_subcategory: categoryData?.legacy?.product_subcategory || null,
				};

				const weightData = product.custom_fields?.find(field => field.field_info === this.customFields.product_weight_field_id);
				const weight = get(weightData, this.customFields.value_field_name, null);

				if (!existingProduct) {
					try {
						existingProduct = await this.prisma.products.create({
							data: {
								id: new Cuid2Generator(GuidPrefixes.OrganizationProduct).scopedId,
								...data,
								metadata: { ...productMetadata, backbone_product: product },
								weight: !isNaN(+weight) ? +weight : null,
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
									name: product?.name,
									organization_id: req.organization.id,
								},
							},
							data: {
								weight: existingProduct.weight ? existingProduct.weight : !isNaN(+weight) ? +weight : null,
								metadata: merge(existingProduct.metadata, { backbone_data: product }),
							},
						});
					} catch (e) {
						this.logger.error(e.message, e);
					}
				}

				if (!existingProduct.id) {
					this.logger.error(`Error upserting product ${product?.name}`, { product: item, organization: req.organization, user: req.user });
					return;
				}
				// process product tag assignments
				for (const tag of categoryData.categories) {
					const tagData = {
						organization_id: req.organization.id,
						tag: tag,
					};

					let existingTag = await this.prisma.products_tags.findFirst({
						where: { ...tagData },
					});

					if (!existingTag) {
						existingTag = await this.prisma.products_tags.create({
							data: { ...tagData },
						});
					}

					await this.prisma.product_tag_assignments.upsert({
						where: {
							organization_product_tag_unique: {
								product_id: existingProduct?.id,
								tag_id: existingTag?.id,
								organization_id: req.organization.id,
							},
						},
						create: {
							product_id: existingProduct?.id,
							organization_id: req.organization.id,
							tag_id: existingTag.id,
						},
						update: {
							organization_id: req.organization.id,
							tag_id: existingTag?.id,
							product_id: existingProduct?.id,
						},
					});
				}

				const bom = await this.getBom(product, req);

				const customFields = await this.resolveCustomFields(bom.custom_fields);

				existingProduct.metadata = merge(existingProduct.metadata, { backbone_data: { custom_fields: customFields } });

				await this.prisma.products.update({
					where: {
						orgIdName: {
							name: product?.name,
							organization_id: req.organization.id,
						},
					},
					data: existingProduct,
				});

				for (const item of bom.bom_items) {
					const existingMaterial = await this.prisma.materials.findUnique({
						where: {
							orgIdName: {
								name: item.component?.name,
								organization_id: req.organization.id,
							},
						},
					});

					const categoryData = await this.resolveMaterialCategories(item, req);

					const weight = this.resolveWeight(item);

					const width = this.resolveWidth(item);

					const materialData = {
						name: item.component?.name,
						description: existingMaterial?.description ? existingMaterial.description : item.description,
						organization_id: req.organization.id,
						brand_material_id: item.component.code,
						width: width.value,
						weight_factor: weight.factor,
						weight_factor_unit_of_measure: weight.factor_unit,
						material_category: categoryData.legacy.material_category,
						material_subcategory: categoryData.legacy.material_subcategory,
						metadata: merge(existingMaterial?.metadata, { backbone_data: { custom_fields: await this.resolveCustomFields(item.component.custom_fields) } }),
					};

					let material: any;
					try {
						material = await this.prisma.materials.upsert({
							where: {
								orgIdName: {
									name: item.component?.name,
									organization_id: req.organization.id,
								},
							},
							update: materialData,
							create: {
								id: new Cuid2Generator(GuidPrefixes.Material).scopedId,
								...materialData,
							},
						});

						// process material tag assignments
						for (const tag of categoryData.categories) {
							const tagData = {
								organization_id: req.organization.id,
								tag: tag,
							};

							let existingTag = await this.prisma.material_tags.findFirst({
								where: { ...tagData },
							});

							if (!existingTag) {
								existingTag = await this.prisma.material_tags.create({
									data: { ...tagData },
								});
							}

							await this.prisma.material_tag_assignments.upsert({
								where: {
									materialTagUniqueKey: {
										material_id: material?.id,
										tag_id: existingTag?.id,
										organization_id: req.organization.id,
									},
								},
								create: {
									material_id: material?.id,
									organization_id: req.organization.id,
									tag_id: existingTag.id,
								},
								update: {
									organization_id: req.organization.id,
									tag_id: existingTag?.id,
									material_id: material?.id,
								},
							});
						}

						this.logger.info(`${item.component?.name} synced for ${existingProduct?.name || product?.name}`, {
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

							this.logger.info(`Material Supplier synced for ${material?.name}`, {
								product: existingProduct,
								material,
								organization: req.organization,
								user: req.user,
							});

							await this.prisma.materials.update({
								where: {
									id: material.id,
								},
								data: {
									organization_facility_id: materialSupplier.supplier_id,
								},
							});

							await this.resolveAttributeAssurances(req, existingProduct, material, supplierDetails, item);
						} catch (e) {
							this.logger.error(e.message, e);
						}
					} else {

					if (!material.id || !existingProduct?.id) {
						this.logger.warn(`Material or Product not found for ${item.component.name} or ${existingProduct?.name}`, { material, product: existingProduct });
						continue;
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
								unit_of_measure: existing?.unit_of_measure ? existing.unit_of_measure : uofm,
								yield: yieldNumber,
								metadata: item,
							},
						});

						this.logger.info(`Product Material synced for ${existingProduct?.name}`, {
							product: existingProduct,
							product_material: productMaterial,
							organization: req.organization,
							user: req.user,
						});
					} catch (e) {
						this.logger.error(e.message, e);
					}
				}
				this.logger.info(`Product synced: ${product?.name}`);
			}

			if (skip < total) {
				await this.syncProducts(req, skip + limit, limit, total);
			}

			return;
		} catch (e) {
			try {
				await this.authenticate(req);
			} catch (e) {
				this.logger.error(e.message, e);
			}

			this.logger.error(e.message, e);
		}
	}

	/**
	 * Resolve Custom Fields : This function resolves the custom fields for a component/material
	 */
	async resolveCustomFields(custom_fields: any[]) {
		for (const item of custom_fields) {
			const response = await this.axios.axiosRef.get(`/custom-fields`, this.config);

			if (!response.data) {
				this.logger.warn(`Product ${item._id} not found`);
				return;
			}

			const fieldData = find(response.data, { _id: item.field_info });
			set(item, 'name', fieldData.name);
			set(item, 'location', fieldData.location);
			set(item, 'type', fieldData.type);
		}

		return custom_fields;
	}

	/**
	 * Resolve Attribute Assurances : This function resolves the attribute assurances for a product, material, and supplier
	 * - Check if the product has any custom fields for attribute assurances (bluesign, grs, pfas, recycled, etc)
	 * - Add an attribute assurance for each custom field found
	 *
	 * @param req
	 * @param product
	 * @param material
	 * @param supplier
	 */
	async resolveAttributeAssurances(req: IRequest, product: any, material: any, supplier: any, bomItem: any) {
		try {
			const assurances = [
				{
					field_id: this.customFields.product_pfas_status_field_id,
					assurance: 'PFAS Free',
					bad_value: 'Product may contain or be treated with PFAS',
					isMaterial: false,
				},
				{
					field_id: this.customFields.material_bluesign_status_field_id,
					assurance: 'Bluesign',
					isMaterial: true,
				},
				{
					field_id: this.customFields.grs_certified_field_id,
					assurance: 'GRS (Global Recycled Standard)',
					bad_value: 'N',
					isMaterial: true,
				},
				{
					field_id: this.customFields.material_pfas_test_field_id,
					assurance: 'PFAS Free',
					bad_value: ['Method 1 Fail', 'Method 2 Fail'],
					isMaterial: true,
				},
				{
					field_id: this.customFields.material_pfas_designation_field_id,
					assurance: 'PFAS Free',
					bad_value: ['C6 WR', 'C8 WR', 'PVC free', 'RSL Compliant'],
					isMaterial: true,
				},
				{
					field_id: this.customFields.material_recycled_type_field_id,
					assurance: 'Recycled',
					bad_value: 'N',
					isMaterial: true,
				},
			];

			for (const assurance of assurances) {
				const fieldData = bomItem.component.custom_fields.find(field => field.field_info === assurance.field_id);

				if (!fieldData) {
					continue;
				}

				const value = get(fieldData, this.customFields.value_field_name, null);

				// skip if the value is empty
				if (!value) {
					continue;
				} else {
					// skip if the value is included in the bad value array
					if (Array.isArray(assurance.bad_value) && assurance.bad_value.includes(value)) {
						continue;
						// skip if the value matches the bad value
					} else if (assurance.bad_value === value) {
						continue;
					}
				}

				const attributeResponse = await this.prisma.sustainability_attributes.findFirst({
					where: {
						name: assurance.assurance,
						organization_id: null,
					},
				});

				if (!attributeResponse) {
					this.logger.warn(`Sustainability Attribute ${value} not found`);
					continue;
				}

				const assuranceData = {
					organization_id: req.organization.id,
					organization_facility_id: supplier?.supplier_id || null,
					material_id: material?.id || null,
					product_id: assurance.isMaterial ? null : product.id,
					sustainability_attribute_id: attributeResponse.id,
				};

				const existing = await this.prisma.attribute_assurances.findFirst({
					where: assuranceData,
				});

				if (existing) {
					await this.prisma.attribute_assurances.update({
						where: {
							id: existing.id,
						},
						data: assuranceData,
					});
				} else {
					await this.prisma.attribute_assurances.create({
						data: assuranceData,
					});
				}
			}
		} catch (e) {
			this.logger.error(e.message, e);
		}
	}
	async getProductSupplier(product: any, req: IRequest) {
		let tier1_supplier: any;

		try {
			const supplierNameField = product.custom_fields.find(field => field.field_info === this.customFields.product_supplier_field_id);
			const supplier_name = get(supplierNameField, this.customFields.value_field_name, null);

			const supplierCountryField = product.custom_fields.find(field => field.field_info === this.customFields.product_supplier_country_field_id);
			const supplier_country = get(supplierCountryField, this.customFields.value_field_name, null);

			if (supplier_name) {
				tier1_supplier = await this.resolveSupplierToFacility(supplier_name, supplier_country, req, 1);
			}
		} catch (e) {
			this.logger.error(e.message, e);
		}

		const data = {
			supplier_id: tier1_supplier?.id ? tier1_supplier.id : null,
		};

		return data;
	}

	resolveWeightFactor(weight: string) {
		try {
			const regex = /(\d+)\s*(\w+)/;
			const match = weight.match(regex);

			if (match) {
				switch (match[2]) {
					case 'gsm':
						return { weight: +match[1] / 1000, unit: WeightFactorUnits.KG_PER_M2 };
					case 'oz':
						return { weight: +match[1] * 0.0283495, unit: WeightFactorUnits.KG_PER_PCS };
					default:
						throw new Error(`Unknown weight unit: ${weight}`);
				}
			}

			return { weight: null, unit: null };
		} catch (e) {
			this.logger.error(e.message, { weight });
			return { weight: null, unit: null };
		}
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
			const supplierData = custom_fields.find(field => field.field_info === this.customFields.material_supplier_field_id);
			const supplier_name = get(supplierData, this.customFields.value_field_name, null);

			const supplierCountryField = custom_fields.find(field => field.field_info === this.customFields.material_supplier_country_field_id);
			const supplier_country = get(supplierCountryField, this.customFields.value_field_name, null);

			if (supplier_name) {
				tier2_supplier = await this.resolveSupplierToFacility(supplier_name, supplier_country, req, 2);
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
	 * @param product
	 * @param {IRequest} req - The request object containing necessary data.
	 * @returns {product_category: string, product_subcategory: string} An object containing the resolved product category and subcategory.
	 */
	async resolveProductCategories(product: any, req: IRequest): Promise<{ legacy: { product_category: string; product_subcategory: string }; categories: any[] }> {
		const categoryData = {
			product_category: '' as string,
			product_subcategory: '' as string,
		};

		if (!this.productCategories || this.productCategories.length < 1) {
			const response = await this.axios.axiosRef.get(`/admin/categories`, this.config);

			if (!response.data) {
				this.logger.warn(`no categories found`);
				return { legacy: categoryData, categories: [] };
			}

			this.productCategories = response.data;
		}

		let currentCategoryId = product.category;

		const categories: string[] = [];

		while (currentCategoryId) {
			const category = this.productCategories?.find(cat => cat._id === currentCategoryId);

			if (!category) break;

			categories.push(capitalize(category?.name));
			currentCategoryId = category?.parent || '';
		}

		categoryData.product_category = categories.reverse().shift() as string;
		categoryData.product_subcategory = categories.join(' | ');

		return { legacy: categoryData, categories };
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

		materialCategories.push(capitalize(componentType?.name));

		let currentCategoryId = componentType?.parent;

		while (currentCategoryId) {
			const category = this.componentTypes.find(cat => cat._id === currentCategoryId);

			if (!category) break;

			materialCategories.push(capitalize(category?.name));
			currentCategoryId = category?.parent || undefined;
		}

		data.material_category = materialCategories.reverse().shift() as string;
		data.material_subcategory = materialCategories.join(' | ');

		return { legacy: data, categories: materialCategories };
	}

	/**
	 * Resolve supplier to facility : This function looks up the supplier by name in the organization_facilities table
	 * @param name
	 * @param country
	 * @param req
	 * @param tier
	 */
	async resolveSupplierToFacility(name: string, country: string, req: IRequest, tier = 2) {
		const supplier_data = {
			name,
			organization_id: req.organization.id,
			supplier: true,
			supplier_tier: tier,
			country: country,
		};

		const supplier = await this.prisma.organization_facilities.upsert({
			where: {
				orgFacilityName: {
					name: name,
					organization_id: req.organization.id,
				},
			},
			create: {
				id: new Cuid2Generator(GuidPrefixes.OrganizationFacility).scopedId,
				...supplier_data,
			},
			update: {
				...supplier_data,
			},
		});

		this.logger.info(`Processed tier ${tier} supplier: ${name}`, supplier);

		return supplier;
	}

	/**
	 * Retrieves Bill of Materials (BOM) items for a given product from Backbone.
	 *
	 * @param {Object} product - The product object containing _id and name properties.
	 * @param {Object} req - The request object containing organization and user details.
	 * @return {Promise<any[]>} - A promise that resolves to an array of BOM items for the product.
	 */
	async getBom(product: { _id: string; name: string }, req: IRequest): Promise<any> {
		this.logger.info(`Syncing BOM items for ${product?.name}`, { product, organization: req.organization, user: req.user });

		if (!this.config.headers?.authentication) {
			await this.authenticate(req);
		}

		const response = await this.axios.axiosRef.get(`/products/${product._id}/bom-items`, this.config);

		if (!response.data) {
			return [];
		}

		return response.data;
	}

	/**
	 * resolve material width : This function resolves the width of a material based on the custom fields
	 * - Check if material data contains a width field
	 * - return width data
	 * "field_info": "62ffb97ef37deca4c85d79c4",
	 *             "value": "28.75 x 15 x 13.5 in"
	 */
	resolveWidth(item: any): { value: number | null; uom: string | null } {
		try {
			if (!this.customFields.material_width_field_id) {
				return { value: null, uom: null };
			}

			const widthData = item.component.custom_fields.find(field => field.field_info === this.customFields.material_width_field_id);

			const width = +get(widthData, this.customFields.value_field_name, null);

			if (!width) {
				return { value: null, uom: null };
			}

			return { value: width, uom: 'in' };
		} catch (e) {
			this.logger.error(e.message, e);

			return { value: null, uom: null };
		}
	}

	/**
	 * Resolve Material Weights : This function resolves the weight of a material based on the custom fields
	 * - Check if material data contains a weight field
	 * - If so, parse the weight data by splitting the string into a number and unit of measure
	 * - Return the weight data
	 * @param item
	 */
	resolveWeight(item: any): { weight: number | null; uom: string | null; factor?: number | null; factor_unit?: string | null } {
		try {
			if (!this.customFields.material_weight_field_id) {
				return { weight: null, uom: null, factor: null, factor_unit: null };
			}

			// conversion factors

			const productAreaM2 = this.getArea(item);

			const weightData = item.component.custom_fields.find(field => field.field_info === this.customFields.material_weight_field_id);

			const weightString = get(weightData, this.customFields.value_field_name, null);
			const weightParts = weightString?.match(/(\d+)\s*([\w/\\]+)/);

			const weightNumber = weightParts?.length > 1 ? +weightParts[1] : null;
			const unitOfMeasure = weightParts?.length > 2 ? weightParts[2] : null;

			// 123g/m2
			// 0.123kg/m2

			// parse weight factors and convert to kg per m2
			const uomParts = unitOfMeasure?.split('/');
			if (uomParts?.length > 1) {
				// is a compound unit of measure
				const uom1 = uomParts[0];
				const uom2 = uomParts[1];

				const uom1Abbreviations = ['kg', 'g', 'lb', 'oz'];
				const uom2Abbreviations = ['m2', 'ft2', 'yd2', 'in2', 'cm', 'in', 'ft', 'yd'];

				// convert to kg per m2
				if (uom1Abbreviations.includes(uom1) && uom2Abbreviations.includes(uom2)) {
					const factor = weightNumber ? (weightNumber * this.conversionFactor[uom1]) / this.conversionFactor[uom2] : 0;

					return { weight: productAreaM2 ? factor * productAreaM2 : null, uom: unitOfMeasure, factor, factor_unit: factor ? `kg per m2` : null };
				}
			} else if (uomParts?.length === 1) {
				// is a single unit of measure
				/* convert to kg */
				const conversionFactor = this.conversionFactor[unitOfMeasure];
				const value = weightNumber ? weightNumber * conversionFactor : 0;
				return { weight: value, uom: 'pcs', factor: null, factor_unit: null };
			}

			return { weight: null, uom: null, factor: null, factor_unit: null };
		} catch (e) {
			this.logger.error(e.message, e);

			return { weight: null, uom: null };
		}
	}

	getArea(item: any) {
		// extract the dimensions
		const dimensions = item.component.custom_fields.find(field => field.field_info === this.customFields.product_dimensions_lwd_field_id);
		if (dimensions) {
			// extract the unit of measure
			const dimensionUoM = dimensions?.value?.split(' ')[5];
			// extract the length
			const length = +dimensions?.value?.split(' ')[0];
			// extract the width
			const width = +dimensions?.value?.split(' ')[2];
			// extract the depth
			const depth = +dimensions?.value?.split(' ')[4];

			// calculate the combined width and depth to include in the area calculation
			const combined = width + depth;

			//return area converted to square meters
			return length * this.conversionFactor[dimensionUoM] * (combined * this.conversionFactor[dimensionUoM]);
		}

		return null;
	}

	//Todo: Move this into a utility class
	resolveUofM(item, existing: any): { uofm: string | null; yieldNumber: number | null } {
		try {
			if (!this.customFields.material_yield_field_id) {
				return { uofm: null, yieldNumber: null };
			}

			let uofm: string | null;
			const yieldData = item.component.custom_fields.find(field => field.field_info === this.customFields.material_yield_field_id);

			const yieldString = get(yieldData, this.customFields.value_field_name, null);
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
