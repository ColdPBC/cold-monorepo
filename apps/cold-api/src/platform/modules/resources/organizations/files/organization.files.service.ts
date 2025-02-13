import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import * as z from 'zod';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
	BaseWorker,
	CacheService,
	Cuid2Generator,
	DarklyService,
	GuidPrefixes,
	IRequest,
	MqttService,
	organization_facilities,
	PrismaService,
	S3Service,
	SuppliersRepository,
} from '@coldpbc/nest';
import { IntegrationsService } from '../../integrations/integrations.service';
import { EventService } from '../../../utilities/events/event.service';
import { omit, pick } from 'lodash';
import { OrganizationHelper } from '../helpers/organization.helper';
import helper from 'csvtojson';
import { file_types, material_suppliers, materials, processing_status, products } from '@prisma/client';
import { GetObjectCommandOutput } from '@aws-sdk/client-s3';

@Span()
@Injectable()
export class OrganizationFilesService extends BaseWorker {
	httpService: HttpService;
	test_orgs: Array<{ id: string; name: string; display_name: string }>;
	openAI: any;

	constructor(
		readonly cache: CacheService,
		readonly darkly: DarklyService,
		readonly events: EventService,
		readonly integrations: IntegrationsService,
		readonly s3: S3Service,
		readonly mqtt: MqttService,
		readonly helper: OrganizationHelper,
		readonly suppliers: SuppliersRepository,
		readonly prisma: PrismaService,
	) {
		super('OrganizationFilesService');
		this.httpService = new HttpService();
	}

	override async onModuleInit() {
		this.darkly.subscribeToJsonFlagChanges('dynamic-org-white-list', value => {
			this.test_orgs = value;
		});

		this.openAI = await this.prisma.service_definitions.findUnique({
			where: {
				name: 'cold-platform-openai',
			},
		});

		if (!this.openAI) {
			this.logger.error('OpenAI service definition not found; file uploads to openAI will not work');
		}
	}

	async importData(req: IRequest, orgId: string, files: Array<Express.Multer.File>) {
		const { user, url, organization } = req;
		const existingFiles: any = [];

		for (const file of files) {
			const errors: any[] = [];

			try {
				if (!organization.id) {
					throw new NotFoundException(`Organization ${orgId} not found`);
				}

				if (!req.headers['postman-token']) {
					file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8');
				}

				// Convert to JSON
				const items = await helper({
					noheader: false,
					delimiter: ',',
				}).fromString(file.buffer.toString('utf-8'));

				for (const item of items) {
					// Process Supplier Information
					let supplier: organization_facilities = {} as organization_facilities;
					const supplierName = item.tier2SupplierName;
					if (supplierName) {
						try {
							// Try to find exact match for supplier by name
							try {
								supplier = (await this.prisma.organization_facilities.findUnique({
									where: {
										orgFacilityName: {
											organization_id: organization.id,
											name: supplierName,
										},
									},
								})) as unknown as organization_facilities;
							} catch (e) {
								this.logger.warn(e.message, { user, orgId });
							}

							if (!supplier) {
								// Try to find supplier via partial matching on name
								const matchedSuppliers = (supplierName
									? await this.suppliers.findByPartialName(organization, user, supplierName.slice(0, 7))
									: []) as unknown as organization_facilities[];

								// If no matches, create a new supplier
								if (matchedSuppliers.length < 1) {
									supplier = (await this.suppliers.createSupplier(organization, user, {
										name: item.tier2SupplierName,
										supplier: true,
										supplier_tier: 2,
									})) as unknown as organization_facilities;
								} else {
									// If multiple matches, select the first one
									supplier = matchedSuppliers[0];
								}
							}

							this.logger.info(`Supplier ${supplier.name} processed`, { organization, user, supplier });
						} catch (e) {
							const context = { resource: 'supplier', e, row: item };
							this.logger.error(e.message, { context, file: omit(file, ['buffer']) });
							errors.push(context);
						}
					}

					// Process Product Information
					let product: products = {} as products;

					if (item.productName) {
						try {
							product = (await this.prisma.products.findFirst({
								where: {
									organization_id: organization.id,
									name: item.productName,
								},
							})) as products;

							if (!product) {
								product = await this.prisma.products.create({
									data: {
										id: new Cuid2Generator(GuidPrefixes.OrganizationProduct).scopedId,
										organization_id: organization.id,
										name: item.productName,
										created_at: new Date(),
										updated_at: new Date(),
										metadata: {},
										season_code: item.seasonCode,
										style_code: item.seasonYear,
										supplier_id: item.tier1SupplierId,
										upc_code: item.upcCode,
										brand_product_id: item.brandProductId,
										supplier_product_id: item.supplierProductId,
										product_category: item.productCategory,
										product_subcategory: item.productSubcategory,
										brand_product_sku: item.brandProductSku,
									},
								});
							} else {
								product = await this.prisma.products.update({
									where: {
										id: product.id,
									},
									data: {
										updated_at: new Date(),
										season_code: item.seasonCode || product.season_code,
										style_code: item.seasonYear || product.season_code,
										supplier_id: item.tier1SupplierId || product.supplier_id,
										upc_code: item.upcCode || product.upc_code,
										brand_product_id: item.brandProductId || product.brand_product_id,
										supplier_product_id: item.supplierProductId || product.supplier_product_id,
										product_category: item.productCategory || product.product_category,
										product_subcategory: item.productSubcategory || product.product_subcategory,
										brand_product_sku: item.brandProductSku || product.brand_product_sku,
									},
								});
							}

							if (product) {
								this.logger.info(`Product ${product.name} processed`, { organization, user, product });
							}
						} catch (e) {
							const context = { resource: 'product', e, row: item };
							this.logger.error(e.message, { context, file: omit(file, ['buffer']) });
							errors.push(context);
						}
					}

					let material = {} as materials;

					// Materials
					if (item.materialName) {
						try {
							material = (await this.prisma.materials.findFirst({
								where: {
									organization_id: organization.id,
									name: item.materialName,
								},
							})) as materials;

							if (!material) {
								material = await this.prisma.materials.create({
									data: {
										id: new Cuid2Generator(GuidPrefixes.Material).scopedId,
										organization_id: organization.id,
										name: item.materialName,
										brand_material_id: item.brandMaterialId,
										material_category: item.materialCategory,
										supplier_material_id: item.supplierMaterialId,
										material_subcategory: item.materialSubcategory,
										organization_facility_id: supplier.id,
										created_at: new Date(),
										updated_at: new Date(),
									},
								});
							} else {
								material = await this.prisma.materials.update({
									where: {
										id: material.id,
									},
									data: {
										updated_at: new Date(),
										brand_material_id: item.brandMaterialId || material.brand_material_id,
										material_category: item.materialCategory || material.material_category,
										material_subcategory: item.materialSubcategory || material.material_subcategory,
										supplier_material_id: item.supplierMaterialId || material.supplier_material_id,
									},
								});
							}

							if (material) {
								this.logger.info(`Material ${material.name} processed`, { organization, user, material });
							}

							// Material Suppliers
							let materialSupplier = {} as material_suppliers;

							if (material.id && supplier?.id) {
								try {
									materialSupplier = (await this.prisma.material_suppliers.findFirst({
										where: {
											organization_id: organization.id,
											material_id: material.id,
											supplier_id: supplier.id,
										},
									})) as material_suppliers;

									if (!materialSupplier) {
										materialSupplier = await this.prisma.material_suppliers.create({
											data: {
												id: new Cuid2Generator(GuidPrefixes.MaterialSupplier).scopedId,
												organization_id: organization.id,
												material_id: material.id,
												supplier_id: supplier.id,
												supplier_product_id: item.supplierProductId,
												created_at: new Date(),
												updated_at: new Date(),
											},
										});
									}

									if (materialSupplier) {
										this.logger.info(`Material Supplier ${materialSupplier.id} processed`, { organization, user, materialSupplier });

										if (product?.id && material.id && materialSupplier.id) {
											// Product Materials
											let productMaterial;

											try {
												productMaterial = await this.prisma.product_materials.findFirst({
													where: {
														organization_id: organization.id,
														product_id: product.id,
														material_id: material.id,
													},
												});

												if (!productMaterial) {
													productMaterial = await this.prisma.product_materials.create({
														data: {
															id: new Cuid2Generator(GuidPrefixes.OrganizationProductMaterial).scopedId,
															organization_id: organization.id,
															product_id: product.id,
															material_id: material.id,
															placement: item.placement,
															bom_section: item.bomSection,
															material_supplier_id: materialSupplier?.id,
															unit_of_measure: item.unitOfMeasure,
															yield: +item.yield,
															created_at: new Date(),
															updated_at: new Date(),
														},
													});
												} else {
													productMaterial = await this.prisma.product_materials.update({
														where: {
															id: productMaterial.id,
														},
														data: {
															updated_at: new Date(),
															placement: item.placement,
															bom_section: item.bomSection,
															material_supplier_id: materialSupplier?.id,
															unit_of_measure: item.unitOfMeasure,
															yield: +item.yield,
														},
													});
												}

												if (productMaterial) {
													this.logger.info(`Product Material ${productMaterial.id} processed`, { organization, user, productMaterial });
												}
											} catch (e) {
												const context = { resource: 'product_material', e, row: item };
												this.logger.error(e.message, context);
												errors.push(context);
											}
										}
									}
								} catch (e) {
									const context = { resource: 'material_supplier', e, row: item };
									this.logger.error(e.message, { context, file: omit(file, ['buffer']) });
									errors.push(context);
								}
							}
						} catch (e) {
							const context = { resource: 'material', e, row: item };
							this.logger.error(e.message, { context, file: omit(file, ['buffer']) });
							errors.push(context);
						}
					}

					//await this.events.sendIntegrationEvent(false, 'file.uploaded', { file, organization }, user);

					this.metrics.increment('cold.file.import.items', 1, {
						status: 'complete',
						organization_id: organization.id,
						organization_name: organization.name,
						user_email: user.coldclimate_claims.email,
						isTestOrg: organization.isTest.toString(),
					});
				}

				this.metrics.increment('cold.file.import', 1, {
					status: 'complete',
					organization_id: organization.id,
					organization_name: organization.name,
					user_email: user.coldclimate_claims.email,
					isTestOrg: organization.isTest.toString(),
				});

				this.metrics.event(
					'Import File Uploaded',
					`A file was uploaded by ${user.coldclimate_claims.email} for ${organization.name}`,
					{
						alert_type: 'success',
						date_happened: new Date(),
						priority: 'normal',
					},
					{
						isTest: organization.isTest.toString(),
						status: 'complete',
						organization_id: organization.id,
						organization_name: organization.name,
						email: user.coldclimate_claims.email,
					},
				);

				existingFiles.push({ file: omit(file, ['buffer']), errors });
			} catch (e) {
				const context = { resource: 'file', e, file: omit(file, ['buffer']) };
				this.logger.error(e.message, context);
				errors.push(context);

				this.metrics.increment('cold.file.import.uploaded', 1, {
					status: 'failed',
					organization_id: organization.id,
					organization_name: organization.name,
					user_email: user.coldclimate_claims.email,
					isTestOrg: organization.isTest.toString(),
				});

				/*	this.mqtt.publishMQTT('ui', {
					resource: 'import_files',
					org_id: orgId,
					user: user,
					swr_key: url,
					action: 'create',
					status: 'failed',
					data: {
						error: e.message,
						file: pick(file, ['id', 'original_name', 'mimetype', 'size']),
					},
				});*/

				this.metrics.event(
					'Import File Upload Failed',
					`A file upload attempt by ${user.coldclimate_claims.email} for ${organization.name} failed`,
					{
						alert_type: 'error',
						date_happened: new Date(),
						priority: 'normal',
					},
					{
						isTest: organization.isTest.toString(),
						organization_id: organization.id,
						organization_name: organization.name,
						email: user.coldclimate_claims.email,
					},
				);

				existingFiles.push({ file: omit(file, ['buffer']), errors });
			}
		}

		return { files: existingFiles };
	}

	async getFiles(req: IRequest, orgId: string, bpc?: boolean): Promise<any> {
		try {
			const org = await this.helper.getOrganizationById(orgId, req.user, bpc);

			if (!org) {
				throw new NotFoundException(`Organization ${orgId} not found`);
			}

			const files = await this.prisma.organization_files.findMany({
				where: {
					organization_id: orgId,
				},
				select: {
					id: true,
					original_name: true,
					bucket: true,
					key: true,
					mimetype: true,
					size: true,
					checksum: true,
					type: true,
					expires_at: true,
					effective_start_date: true,
					effective_end_date: true,
					attribute_assurances: {
						select: {
							material: true,
							product: true,
							supplier: true,
							sustainability_attribute: true,
						},
					},
				},
			});

			//const response = await this.events.sendEvent(true, 'organization_files.get', { organization: org }, user, orgId);

			return files;
		} catch (e) {
			this.logger.error(e);
			throw e;
		}
	}

	async update(req: IRequest, file_id: string, data: any) {
		z.object({
			effective_end_date: z.string().optional().nullable(),
			effective_start_date: z.string().optional().nullable(),
			type: z.string().optional(),
		})
			.strip()
			.parse(data);

		return this.prisma.organization_files.update({
			where: {
				id: file_id,
				organization_id: req.organization.id,
			},
			data,
		});
	}

	async uploadFile(req: IRequest, orgId: string, files: Array<Express.Multer.File>, type?: file_types) {
		const { user, url, organization } = req;
		const org = await this.helper.getOrganizationById(orgId, req.user, true);

		// Add Secret for processing linear webhooks
		if (!org.linear_secret) {
			org.linear_secret = new Cuid2Generator(GuidPrefixes.WebhookSecret).scopedId;
			this.prisma.organizations.update({
				where: { id: org.id },
				data: { linear_secret: org.linear_secret },
			});
		}

		const failed: any = [];
		const uploaded: any = [];

		for (const file of files) {
			try {
				if (!org) {
					throw new NotFoundException(`Organization ${orgId} not found`);
				}

				if (!req.headers['postman-token']) {
					file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8');
				}

				const hash = await S3Service.calculateChecksum(file);

				const response = await this.s3.uploadStreamToS3(user, org.name, file);

				let existing = await this.prisma.organization_files.findUnique({
					where: {
						s3Key: {
							key: response.key,
							bucket: response.bucket,
							organization_id: orgId,
						},
					},
				});

				let status: processing_status;

				// set processing status to MANUAL_REVIEW for OTHER, SD, and BOM files
				switch (type) {
					case file_types.PURCHASE_ORDER:
					case file_types.SUSTAINABILITY_DATA:
					case file_types.BILL_OF_MATERIALS:
						status = processing_status.MANUAL_REVIEW;
						break;
					default:
						status = processing_status.AI_PROCESSING;
				}

				if (existing) {
					if (existing?.checksum === hash) {
						this.logger.warn(`file ${file.originalname} already exists in db`, pick(file, ['id', 'originalname', 'mimetype', 'size']));
						failed.push({ error: new ConflictException(`${existing.original_name} already exists`), file: pick(file, ['id', 'originalname', 'mimetype', 'size']) });
					}

					existing.metadata = existing.metadata ? { status: 'uploaded', ...(existing.metadata as any) } : { status: 'uploaded' };

					await this.prisma.organization_files.update({
						where: {
							id: existing.id,
						},
						data: {
							id: new Cuid2Generator(GuidPrefixes.OrganizationFile).scopedId,
							original_name: file.originalname,
							integration_id: null,
							organization_id: orgId,
							versionId: file['versionId'],
							bucket: response.bucket,
							key: response.key,
							mimetype: file.mimetype,
							size: file.size,
							fieldname: file.fieldname,
							encoding: file.encoding,
							contentType: file.mimetype,
							location: file.destination,
							processing_status: status,
							checksum: hash,
							type: type || 'OTHER',
							metadata: { ...(existing.metadata as any) },
						},
					});
				} else {
					existing = await this.prisma.organization_files.create({
						data: {
							id: new Cuid2Generator(GuidPrefixes.OrganizationFile).scopedId,
							original_name: file.originalname,
							integration_id: null,
							organization_id: orgId,
							versionId: response.uploaded.VersionId,
							bucket: response.bucket,
							key: response.key,
							mimetype: file.mimetype,
							size: file.size,
							fieldname: file.fieldname,
							encoding: file.encoding,
							contentType: file.mimetype,
							location: file.destination,
							checksum: hash,
							processing_status: status,
							type: type || 'OTHER',
							metadata: { status: 'uploaded' },
						},
					});
				}

				if (!failed.find(f => f.file.originalname === existing.original_name)) {
					uploaded.push(existing);
				}

				// only send event to openAI if the file status is AI_PROCESSING otherwise create MANUAL_REVIEW issue in linear
				if (existing.processing_status === processing_status.AI_PROCESSING) {
					await this.events.sendIntegrationEvent(false, 'file.uploaded', { ...existing, organization }, user);
				} else {
					if (existing.bucket && existing.key) {
						const s3File = await this.s3.getObject(user, existing.bucket, existing.key);

						if (!s3File.Body) {
							throw new Error('No body in S3 file');
						}

						const issue = await this.events.sendRPCEvent('cold.core.linear.events', processing_status.MANUAL_REVIEW, { orgFile: existing, organization, user });

						this.logger.info(`Issue created for file ${existing.original_name}`, { issue });
					}
				}

				this.metrics.increment('cold.file.uploaded', 1, {
					status: 'complete',
					organization_id: organization.id,
					organization_name: organization.name,
					user_email: user.coldclimate_claims.email,
					isTestOrg: organization.isTest.toString(),
				});

				this.metrics.event(
					'File Uploaded',
					`A file was uploaded by ${user.coldclimate_claims.email} for ${organization.name}`,
					{
						alert_type: 'success',
						date_happened: new Date(),
						priority: 'normal',
					},
					{
						isTest: organization.isTest.toString(),
						status: 'complete',
						organization_id: organization.id,
						organization_name: organization.name,
						email: user.coldclimate_claims.email,
					},
				);
			} catch (e) {
				this.logger.error(e.message, { user, orgId, file: pick(file, ['id', 'originalname', 'mimetype', 'size']) });

				this.metrics.increment('cold.file.uploaded', 1, {
					status: 'failed',
					organization_id: organization.id,
					organization_name: organization.name,
					user_email: user.coldclimate_claims.email,
					isTestOrg: organization.isTest.toString(),
				});

				this.mqtt.publishMQTT('ui', {
					resource: 'organization_files',
					org_id: orgId,
					user: user,
					swr_key: url,
					action: 'create',
					status: 'failed',
					data: {
						error: e.message,
						file: pick(file, ['id', 'originalname', 'mimetype', 'size']),
					},
				});

				this.metrics.event(
					'File Upload Failed',
					`A file upload attempt by ${user.coldclimate_claims.email} for ${organization.name} failed`,
					{
						alert_type: 'error',
						date_happened: new Date(),
						priority: 'normal',
					},
					{
						isTest: organization.isTest.toString(),
						organization_id: organization.id,
						organization_name: organization.name,
						email: user.coldclimate_claims.email,
					},
				);
				throw e;
			}
		}

		return { failed, uploaded };
	}

	bufferToFile(buffer: Buffer, fileName: string, mimeType = 'application/octet-stream'): File {
		const blob = new Blob([buffer], { type: mimeType });
		return new File([blob], fileName, { type: mimeType });
	}

	async deleteFile(req: IRequest, orgId: string, fileIds: string[]) {
		const { user, url, organization } = req;
		try {
			const org = await this.helper.getOrganizationById(orgId, req.user, true);

			if (!org) {
				throw new NotFoundException(`Organization ${orgId} not found`);
			}

			for (const fileId of fileIds) {
				const file = await this.prisma.organization_files.findUnique({
					where: {
						id: fileId,
						organization_id: orgId,
					},
				});

				if (!file) {
					throw new NotFoundException(`File ${fileId} not found`);
				}

				const vectors = await this.prisma.vector_records.findMany({
					where: {
						organization_file_id: fileId,
					},
				});

				await this.events.sendIntegrationEvent(false, 'file.deleted', { file, vectors, organization }, user);

				await this.prisma.organization_files.delete({
					where: {
						id: fileId,
					},
				});

				this.mqtt.publishMQTT('ui', {
					org_id: orgId,
					user: user,
					swr_key: url,
					action: 'delete',
					status: 'complete',
					data: {
						file_id: fileId,
					},
				});
			}

			return;
		} catch (e) {
			this.logger.error(e);

			this.mqtt.publishMQTT('ui', {
				org_id: orgId,
				user: user,
				swr_key: url,
				action: 'delete',
				status: 'failed',
				data: {
					error: e.message,
					file_ids: fileIds,
				},
			});

			return e;
		}
	}

	async getObjectCommandOutputToFile(output: GetObjectCommandOutput, fileName: string): Promise<File> {
		const streamToBlob = (stream: ReadableStream<Uint8Array>): Promise<Blob> => {
			return new Response(stream).blob();
		};

		if (!output.Body) {
			throw new Error('No body in output');
		}

		const data = await streamToBlob(output.Body.transformToWebStream()); //await streamToBlob(output.Body as ReadableStream<Uint8Array>);
		const file = new File([data], fileName, { type: output.ContentType || 'application/octet-stream' });

		return file;
	}

	async getUrl(req: IRequest, fileId: string) {
		const file = await this.prisma.organization_files.findUnique({
			where: {
				id: fileId,
				organization_id: req.organization.id,
			},
		});

		if (!file || !file.bucket || !file.key) {
			throw new NotFoundException(`File ${fileId} not found`);
		}

		if (!req.organization.isTest) {
			this.metrics.increment('cold.s3_url.requested', 1, {
				organization_id: req.organization.id,
				organization_name: req.organization.name,
				email: req.user.coldclimate_claims.email,
			});
			this.metrics.event(
				'S3 Url Generated',
				`An S3 Url for downloading a file was requested by ${req.user.coldclimate_claims.email} for ${req.organization.name}`,
				{
					alert_type: 'success',
					date_happened: new Date(),
					priority: 'normal',
				},
				{
					organization_id: req.organization.id,
					organization_name: req.organization.name,
					email: req.user.coldclimate_claims.email,
				},
			);
		}

		return this.s3.getSignedURL(req.user, file.bucket, file.key, 120);
	}
}
