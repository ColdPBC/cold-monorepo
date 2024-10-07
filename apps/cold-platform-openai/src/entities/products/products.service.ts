import { Injectable } from '@nestjs/common';
import { BaseWorker, Cuid2Generator, GuidPrefixes, PrismaService } from '@coldpbc/nest';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { Process, Processor } from '@nestjs/bull';
import { zodResponseFormat } from 'openai/helpers/zod';
import { baseProductsSchema } from '../../schemas';
import { materials, organization_facilities, organizations, products } from '@prisma/client';
import { get } from 'lodash';

@Injectable()
@Processor('openai:products')
export class ProductsService extends BaseWorker {
	openAi: any;

	constructor(readonly config: ConfigService, readonly prisma: PrismaService) {
		super(ProductsService.name);

		this.openAi = new OpenAI({
			organization: this.config.getOrThrow('OPENAI_ORG_ID'),
			apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
		});
	}

	@Process('products')
	async process(job) {
		console.log('Processing job', job.id);
		const { content, user, organization } = job.data;

		const parsed = JSON.parse(content);

		for (const item of parsed.products) {
			if (!item.name) {
				continue;
			}

			let filter: any;
			if (item.upc_code) {
				filter = {
					upc_code: item.upc_code,
					organization_id: organization.id,
				};
			} else if (item.style_code) {
				filter = {
					orgIdStyle: {
						style_code: item.style_code,
						organization_id: organization.id,
					},
				};
			} else {
				filter = {
					orgIdName: {
						name: item.name,
						organization_id: organization.id,
					},
				};
			}

			let supplier: organization_facilities = {} as organization_facilities;

			if (item.supplier) {
				supplier = await this.prisma.organization_facilities.upsert({
					where: {
						orgFacilityName: {
							organization_id: job.data.organization.id,
							name: item.supplier.name,
						},
					},
					create: {
						id: new Cuid2Generator(GuidPrefixes.OrganizationFacility).scopedId,
						organization_id: job.data.organization.id,
						...item.supplier,
						supplier_tier: 1,
					},
					update: {
						supplier_tier: 1,
					},
				});
			}

			const product = await this.prisma.products.upsert({
				where: {
					orgIdName: {
						name: item.name,
						organization_id: organization.id,
					},
				},
				create: {
					name: item.name,
					upc_code: item.upc_code,
					style_code: item.style_code,
					organization_id: organization.id,
					season_code: item.season_code,
					supplier_id: supplier.id || undefined,
					metadata: item.metadata,
				},
				update: {
					name: item.name,
					style_code: item.style_code,
					organization_id: organization.id,
					season_code: item.season_code,
					supplier_id: supplier.id || undefined,
					metadata: item.metadata,
				},
			});

			this.logger.info('modified product', { product, organization });
			try {
				const materials = item.materials || [];

				for (const material of materials) {
					if (!material.name) {
						continue;
					}
					await this.processMaterials(material, product, organization);
				}

				const components = item.components || [];

				for (const material of components) {
					if (!material.name) {
						continue;
					}
					await this.processMaterials(material, product, organization);
				}
			} catch (error) {
				this.logger.error('Error', error);
			}
		}
		//return response;
	}

	async processMaterials(item: any, product: products, organization: organizations) {
		const material = await this.prisma.materials.upsert({
			where: {
				orgIdName: {
					name: item.name,
					organization_id: organization.id,
				},
			},
			create: {
				name: item.name,
				id: new Cuid2Generator(GuidPrefixes.Material).scopedId,
				organization_id: organization.id,
			},
			update: {
				name: item.name,
				organization_id: organization.id,
			},
			include: {
				product_materials: true,
				material_suppliers: true,
				attribute_assurances: true,
			},
		});

		this.logger.info('modified material', { product: product, material });

		if (product.id && material.id) {
			const productMaterial = await this.prisma.product_materials.upsert({
				where: {
					materialProductKey: {
						product_id: product.id,
						material_id: material.id,
					},
				},
				create: {
					product_id: product.id,
					material_id: material.id,
				},
				update: {
					product_id: product.id,
					material_id: material.id,
				},
			});

			this.logger.info('modified product material material', { product, material, product_material: productMaterial });

			if (item.supplier) {
				const supplier = await this.prisma.organization_facilities.upsert({
					where: {
						orgFacilityName: {
							name: item.supplier.name,
							organization_id: organization.id,
						},
					},
					create: {
						id: new Cuid2Generator(GuidPrefixes.OrganizationFacility).scopedId,
						name: item.supplier.name,
						organization_id: organization.id,
						city: item.supplier.city,
						country: item.supplier.country,
						postal_code: item.supplier.postal_code,
						address_line_1: item.supplier.address_line_1,
						address_line_2: item.supplier.address_line_2,
						state_province: item.supplier.state_province,
						supplier: item.supplier.supplier,
						supplier_tier: item.supplier.supplier_tier,
					},
					update: {
						name: item.supplier.name,
						organization_id: organization.id,
						city: item.supplier.city,
						country: item.supplier.country,
						postal_code: item.supplier.postal_code,
						address_line_1: item.supplier.address_line_1,
						address_line_2: item.supplier.address_line_2,
						state_province: item.supplier.state_province,
						supplier: item.supplier.supplier,
						supplier_tier: item.supplier.supplier_tier,
					},
				});

				this.logger.info('modified supplier', { product, supplier, product_material: productMaterial, material });

				if (supplier.id) {
					const materialSupplier = await this.prisma.material_suppliers.upsert({
						where: {
							materialSupplierKey: {
								material_id: material.id,
								supplier_id: supplier.id,
							},
						},
						create: {
							material_id: material.id,
							supplier_id: supplier.id,
						},
						update: {
							material_id: material.id,
							supplier_id: supplier.id,
						},
					});

					this.logger.info('modified material supplier', { product, supplier, product_material: productMaterial, material, materialSupplier });
				}
			}
		}
	}
}
