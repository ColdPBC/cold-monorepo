import { Injectable } from '@nestjs/common';
import { BaseWorker, Cuid2Generator, GuidPrefixes, IRequest, PrismaService } from '@coldpbc/nest';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { capitalize } from 'lodash';

@Injectable()
export class BackboneService extends BaseWorker {
	private config: AxiosRequestConfig;
	private axios: HttpService;
	categories: any[];

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
	material_supplier_country_field_id = '5ea9d60434c24800327e4da9';

	material_yield_field_id = '5e4ecd88a369020033942cbd';
	material_description_field_id = '5e3c6cfd490c1100343dbcce';
	material_notes_field_id = '5e4ecda1a369020033942cbf';

	product_supplier_field_id = '5e31c0dd56f58f003e3cc4e8';
	product_gender_field_id = '5e31bff356f58f003e3cc4e3';
	product_landed_cost = '5e31cef056f58f003e3cc58b';
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
			const categoryData = await this.resolveCategories(product._id, req);

			const data = {
				name: product.name,
				description: product.description,
				season_code: `${product.year.name}:${product.season.name}`,
				plm_id: product._id,
				brand_product_id: product.code,
				style_code: product.code,
				organization_id: req.organization.id,
				...supplierDetails,
				product_category: categoryData?.categories.join(' | '),
				product_subcategory: categoryData?.subcategory,
			};

			await this.prisma.products.upsert({
				where: {
					orgIdName: {
						name: product.name,
						organization_id: req.organization.id,
					},
				},
				update: data,
				create: {
					id: new Cuid2Generator(GuidPrefixes.OrganizationProduct).scopedId,
					...data,
				},
			});

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
				tier1_supplier = await this.getSupplier(supplier_name, req);
			}
		} catch (e) {
			this.logger.error(e.message, e);
		}

		const data = {
			metadata: product,
			supplier_id: tier1_supplier?.id ? tier1_supplier.id : null,
		};

		return data;
	}

	async resolveCategories(productId: string, req: IRequest) {
		if (!this.config.headers?.authentication) {
			await this.authenticate(req);
		}

		const productResponse = await this.axios.axiosRef.get(`/products/${productId}`, this.config);

		if (!this.categories || this.categories.length < 1) {
			const response = await this.axios.axiosRef.get(`/admin/categories`, this.config);

			if (!response.data) {
				this.logger.warn(`no categories found`);
				return;
			}

			this.categories = response.data;
		}

		const categoryData = {
			categories: [] as any[],
			subcategory: '' as string,
		};

		let currentCategoryId = productResponse.data.category;

		while (currentCategoryId) {
			const category = this.categories.find(cat => cat._id === currentCategoryId);

			if (!category) break;

			if (!category.parent || currentCategoryId === category.parent) {
				categoryData.subcategory = capitalize(category.name);
				currentCategoryId = '';
			} else {
				categoryData.categories.push(capitalize(category.name));
				currentCategoryId = category.parent;
			}
		}

		return categoryData;
	}

	async getSupplier(name: string, req: IRequest) {
		let supplier = await this.prisma.organization_facilities.findUnique({
			where: {
				orgFacilityName: {
					name: name,
					organization_id: req.organization.id,
				},
			},
		});

		if (!supplier) {
			this.logger.warn(`Supplier not found: ${name}`);
			try {
				supplier = await this.prisma.organization_facilities.create({
					data: {
						id: new Cuid2Generator(GuidPrefixes.OrganizationFacility).scopedId,
						name,
						organization_id: req.organization.id,
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
}
