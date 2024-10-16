import { Injectable, Scope, UnprocessableEntityException } from '@nestjs/common';
import { toUTCDate, BaseWorker, IAuthenticatedUser, MqttService, PrismaService, S3Service, Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import z from 'zod';
import { attribute_assurances, file_types, organization_facilities, organization_files, organizations, sustainability_attributes } from '@prisma/client';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { zodResponseFormat } from 'openai/helpers/zod';
import { ClassificationService } from '../classification/classification.service';
import { get, omit, snakeCase } from 'lodash';
import { OpenAiBase64ImageUrl } from '../pinecone/pinecone.service';
import { PDFDocument } from 'pdf-lib';
import { fromBuffer } from 'pdf2pic';
import { pdfToText } from './extractTextFromPDF';
import {
	address_line_1,
	address_line_2,
	baseCertificateSchema,
	BillOfMaterialsSchema,
	bluesignProductSchema,
	bluesignSchema,
	city,
	country,
	defaultCertificateSchema,
	defaultExtractionSchema,
	defaultPolicySchema,
	defaultStatementSchema,
	defaultTestSchema,
	intertek,
	PoProductsSchema,
	postal_code,
	sgs,
	state_province,
	tuv_rhineland,
	wrap,
} from '../schemas';

@Injectable()
export class ExtractionService extends BaseWorker {
	private openAi;

	constructor(readonly config: ConfigService, private readonly prisma: PrismaService, readonly s3: S3Service, readonly mqtt: MqttService) {
		super(ExtractionService.name);
		this.openAi = new OpenAI({
			organization: this.config.getOrThrow('OPENAI_ORG_ID'),
			apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
		});
	}

	contentIsUrl(content: any[] | string) {
		return typeof content === 'string' && z.string().url().safeParse(content).success;
	}

	async extractTextFromPDF(pdf: Uint8Array, filePayload: any, user: any, organization: any) {
		try {
			const extracted = await pdfToText(pdf);

			if (!extracted) {
				return null;
			}

			return extracted;
			//const processed = await this.extractDataFromContent(extracted, user, filePayload, organization);
			//return processed;
		} catch (error) {
			this.logger.error('Error extracting text from pdf', { error, namespace: organization.name, file: filePayload });
			return null;
		}
	}

	async convertPdfPageToImage(pageNumber: number, content: Uint8Array, filePayload: { original_name: any[] }, user: IAuthenticatedUser, organization: organizations) {
		const convert = fromBuffer(Buffer.from(content), { format: 'png', quality: 100, density: 100, width: 1080 });

		try {
			const image = await convert(pageNumber, { responseType: 'buffer' });

			if (!image.buffer) {
				throw new Error(`No content found in ${filePayload.original_name}`);
			}

			return image.buffer.toString('base64');
		} catch (e) {
			this.logger.error('Error converting pdf to image', { error: e, namespace: organization.name, file: filePayload });

			throw e;
		}
	}

	async convertPDFPagesToImages(fileBuffer: Uint8Array, filePayload: any, user: IAuthenticatedUser, organization: organizations) {
		try {
			/*	const file = await this.s3.getObject(user, filePayload.bucket, filePayload.key);
			const fileBytes = await file.Body?.transformToByteArray();
			if (!fileBytes) {
				throw new Error(`No content found in ${filePayload.original_name}`);
			}*/

			const base64String = Buffer.from(fileBuffer).toString('base64');

			const pdfLoadDoc = await PDFDocument.load(base64String, { ignoreEncryption: true });

			const pageCount = pdfLoadDoc.getPageCount();

			if (pdfLoadDoc.isEncrypted) {
				throw new Error(`FATAL: Unable to process encrypted PDF ${filePayload.original_name}.  Either upload decrypted PDF or create a new PDF with screenshots of the pages`);
			}

			const pages: OpenAiBase64ImageUrl[] = [];

			for (let i = 0; i < pageCount; i++) {
				const imageBase64 = await this.convertPdfPageToImage(i + 1, fileBuffer, filePayload, user, organization);

				pages.push({
					type: 'image_url',
					image_url: { url: `data:image/png;base64,${imageBase64}` },
				});
			}

			return pages;
		} catch (e) {
			this.logger.error('Error converting pdf to image', { error: e, namespace: organization.name, file: filePayload });
			throw e;
		}
	}

	async extractDataFromImages(
		classification: any,
		extension: string,
		isImage: boolean,
		user: IAuthenticatedUser,
		filePayload: organization_files,
		organization: organizations,
		attributes: sustainability_attributes[],
		suppliers: organization_facilities[],
	) {
		const start = new Date();
		try {
			// classify content and generate a prompt for the extraction

			const orgfile = await this.prisma.organization_files.findUnique({
				where: {
					id: filePayload.id,
				},
			});

			if (!orgfile) {
				throw new Error('File no longer found in DB');
			}

			if (!classification || !classification.extraction_prompt) {
				throw new Error('Classification not found');
			}

			const images: OpenAiBase64ImageUrl[] = [
				{
					type: 'text',
					text: classification.extraction_prompt,
				},
			];

			if (!filePayload?.key || !filePayload?.bucket) {
				throw new Error('File key, or bucket not found in file payload');
			}

			const file = await this.s3.getObject(user, filePayload.bucket, filePayload.key);
			const fileBytes = await file.Body?.transformToByteArray();

			if (!fileBytes) {
				throw new Error('Failed to read file from S3');
			}

			// If original file was an image, convert it to base64
			if (isImage) {
				const binaryString = String.fromCharCode(...fileBytes);

				// Convert binary string to base64
				images.push({
					type: 'image_url',
					image_url: { url: `data:image/${extension};base64,${btoa(binaryString)}` },
				});
			}

			classification = await this.resolveExtractionSchema(classification);

			const response = await this.openAi.beta.chat.completions.parse({
				model: 'gpt-4o-2024-08-06',
				messages: [
					{
						role: 'user',
						content: images,
					},
				],
				response_format: zodResponseFormat(classification.extraction_schema, classification.extraction_name),
			});

			const parsedResponse = response.choices[0].message.parsed;

			filePayload = (await this.prisma.organization_files.findUnique({
				where: {
					id: filePayload.id,
				},
			})) as organization_files;

			const updateData: any = {
				type: classification.type,
				metadata: {
					status: 'ai_extracted',
					classification: omit(classification, ['extraction_schema']),
					extraction: parsedResponse,
				},
			};

			if (parsedResponse.effective_start_date || parsedResponse.effective_end_date) {
				try {
					updateData.effective_start_date = parsedResponse.effective_start_date ? toUTCDate(parsedResponse.effective_start_date).toISOString() : undefined;
				} catch (e) {
					this.logger.error('Error parsing effective_start_date', { error: e, organization, user });
				}

				try {
					updateData.effective_end_date = parsedResponse.effective_end_date ? toUTCDate(parsedResponse.effective_end_date).toISOString() : undefined;
				} catch (e) {
					this.logger.error('Error parsing effective_start_date', { error: e, organization, user });
				}
			}

			filePayload = await this.prisma.organization_files.update({
				where: {
					id: filePayload.id,
				},
				data: updateData,
			});

			this.logger.info('file metadata updated', { file: filePayload, organization, user });

			this.mqtt.publishToUI({
				action: 'update',
				status: 'complete',
				event: 'extract-file-data',
				resource: 'organization_files',
				data: filePayload,
				user,
				swr_key: `organization_files.${(filePayload?.metadata as any).status}`,
				org_id: organization.id,
			});

			// if the classification does not contain a sustainability attribute, return the parsed response
			if (!attributes.find(item => item.name === classification.sustainability_attribute)) {
				this.sendMetrics('organization.files', 'cold-openai', 'no-sustainability-attribute', 'completed', {
					start,
					sendEvent: true,
					tags: {
						sustainability_attribute_name: classification.sustainability_attribute,
						sustainability_attribute_id: classification.sustainability_attribute_id,
						organization_name: organization?.name,
						organization_id: organization?.id,
						user_email: user?.coldclimate_claims?.email,
						file_name: filePayload.original_name,
						file_type: filePayload.type,
						file_id: filePayload.id,
					},
				});

				this.mqtt.publishToUI({
					action: 'update',
					status: 'complete',
					resource: 'organization_files',
					event: 'extract-file-data',
					data: { ...filePayload, notes: 'No sustainability attribute found in classification' },
					user,
					swr_key: `organization_files.${updateData.metadata.status}`,
					org_id: organization.id,
				});

				return typeof parsedResponse === 'string' ? parsedResponse : JSON.stringify(parsedResponse);
			}

			await this.setSupplierId(parsedResponse, organization);

			await this.createAttributeAssurances(classification, organization, filePayload, updateData, filePayload, user, attributes, parsedResponse.supplier_id);

			this.sendMetrics('organization.files', 'cold-openai', 'extraction', 'completed', {
				start,
				sendEvent: false,
				tags: {
					sustainability_attribute_name: classification.sustainability_attribute,
					sustainability_attribute_id: classification.sustainability_attribute_id,
					organization_name: organization?.name,
					organization_id: organization?.id,
					user_email: user?.coldclimate_claims?.email,
					file_name: filePayload.original_name,
					file_type: filePayload.type,
					file_id: filePayload.id,
				},
			});

			return parsedResponse;
		} catch (e) {
			this.logger.error(`Error extracting data from content: ${e.message}`, { error: { ...e }, classification, file: filePayload, user, organization });

			this.sendMetrics('organization.files', 'cold-openai', 'extraction', 'completed', {
				start,
				sendEvent: true,
				tags: {
					organization_name: organization?.name,
					organization_id: organization?.id,
					user_email: user?.coldclimate_claims?.email,
					file_name: filePayload.original_name,
					file_type: filePayload.type,
					file_id: filePayload.id,
					error: e.message,
				},
			});
			const metadata = filePayload.metadata as any;
			const updateData: any = {
				metadata: {
					...metadata,
					status: 'failed',
					classification: classification,
					error: e.message,
				},
			};

			this.mqtt.publishToUI({
				action: 'update',
				status: 'failed',
				resource: 'organization_files',
				event: 'extract-file-data',
				data: filePayload,
				user,
				swr_key: `organization_files.${updateData.metadata.status}`,
				org_id: organization.id,
			});

			if (e.message !== 'File Not Found') {
				await this.prisma.organization_files.update({
					where: {
						id: filePayload.id,
					},
					data: updateData,
				});
			}

			throw e;
		}
	}

	/**
	 * Use Ai to extract text from an image
	 * @param content
	 * @param classification
	 * @param user
	 * @param orgFile
	 * @param organization
	 * @param attributes
	 * @param suppliers
	 */
	async extractDataFromContent(
		content: any[] | string,
		classification: any,
		user: IAuthenticatedUser,
		orgFile: organization_files,
		organization: organizations,
		attributes: sustainability_attributes[],
		suppliers: organization_facilities[],
	) {
		const start = new Date();
		try {
			if (!classification || !classification.extraction_prompt) {
				throw new Error('Classification not found');
			}

			classification = await this.resolveExtractionSchema(classification);

			// map over content to extract pageContent if content is an array of langchain documents
			content = Array.isArray(content) ? content.map(c => c.pageContent) : content;

			const prompt = `${classification?.extraction_prompt} Please use the response_format to properly extract the content ${Array.isArray(content) ? content.join(' ') : content}`;

			/*const prompt = `You are a helpful assistant and you help users extract unstructured data from documents that they upload.  Please use the response_format to properly extract the content ${
        this.contentIsUrl(content) ? 'from the following image' : `from the following context: ${Array.isArray(content) ? content.join(' ') : content}`
      }:`;*/

			const messageContent: { type: string; text?: string; image_url?: { url: string } }[] = [
				{
					type: 'text',
					text: prompt,
				},
			];

			const imageContent: any = [
				{
					type: 'text',
					text: prompt,
				},
				{
					type: 'image_url',
					image_url: { url: this.contentIsUrl(content) ? content : '' },
				},
			];

			const response = await this.openAi.beta.chat.completions.parse({
				model: 'gpt-4o-2024-08-06',
				messages: [
					{
						role: 'user',
						content: this.contentIsUrl(content) ? imageContent : messageContent,
					},
				],
				response_format: zodResponseFormat(classification.extraction_schema, classification.extraction_name),
			});

			const parsedResponse = response.choices[0].message.parsed;

			orgFile = (await this.prisma.organization_files.findUnique({
				where: {
					id: orgFile.id,
				},
			})) as organization_files;

			if (!orgFile) {
				throw new Error('File not found');
			}

			this.logger.info(`${classification.extraction_name} response`, { response, user, file: orgFile });

			const updateData: any = {
				type: classification.type,
				metadata: {
					status: 'ai_extracted',
					classification: omit(classification, ['extraction_schema']),
					...response.choices[0].message.parsed,
				},
			};

			if (parsedResponse.effective_start_date || parsedResponse.effective_end_date) {
				try {
					updateData.effective_start_date = parsedResponse.effective_start_date ? toUTCDate(parsedResponse.effective_start_date).toISOString() : undefined;
				} catch (e) {
					this.logger.error('Error parsing effective_start_date', { error: e, organization, user });
				}

				try {
					updateData.effective_end_date = parsedResponse.effective_end_date ? toUTCDate(parsedResponse.effective_end_date).toISOString() : undefined;
				} catch (e) {
					this.logger.error('Error parsing effective_start_date', { error: e, organization, user });
				}
			}

			orgFile = await this.prisma.organization_files.update({
				where: {
					id: orgFile.id,
				},
				data: updateData,
			});

			this.logger.info('file metadata updated', { file: orgFile, organization, user });

			this.mqtt.publishToUI({
				action: 'update',
				status: 'complete',
				event: 'extract-file-data',
				resource: 'organization_files',
				data: orgFile,
				user,
				swr_key: `organization_files.${(orgFile?.metadata as any).status}`,
				org_id: organization.id,
			});

			// if the classification does not contain a sustainability attribute, return the parsed response
			if (!attributes?.find(item => item.name === classification.sustainability_attribute)) {
				this.sendMetrics('organization.files', 'cold-openai', 'no-sustainability-attribute', 'completed', {
					start,
					sendEvent: true,
					tags: {
						sustainability_attribute_name: classification.sustainability_attribute,
						sustainability_attribute_id: classification.sustainability_attribute_id,
						organization_name: organization?.name,
						organization_id: organization?.id,
						user_email: user?.coldclimate_claims?.email,
						file_name: orgFile.original_name,
						file_type: orgFile.type,
						file_id: orgFile.id,
					},
				});

				this.mqtt.publishToUI({
					action: 'update',
					status: 'complete',
					resource: 'organization_files',
					event: 'extract-file-data',
					data: { ...orgFile, notes: 'No sustainability attribute found in classification' },
					user,
					swr_key: `organization_files.${updateData.metadata.status}`,
					org_id: organization.id,
				});

				return typeof parsedResponse === 'string' ? parsedResponse : JSON.stringify(parsedResponse);
			}

			if (parsedResponse.supplier?.name && parsedResponse.matched_name) {
				await this.setSupplierId(parsedResponse, organization);
			}
			await this.setSupplierId(parsedResponse, organization);

			await this.createAttributeAssurances(classification, organization, orgFile, updateData, orgFile, user, attributes, parsedResponse.supplier_id);

			this.sendMetrics('organization.files', 'cold-openai', 'extraction', 'completed', {
				start,
				sendEvent: false,
				tags: {
					sustainability_attribute_name: classification.sustainability_attribute,
					sustainability_attribute_id: classification.sustainability_attribute_id,
					organization_name: organization?.name,
					organization_id: organization?.id,
					user_email: user?.coldclimate_claims?.email,
					file_name: orgFile.original_name,
					file_type: orgFile.type,
					file_id: orgFile.id,
				},
			});

			return parsedResponse;
		} catch (e) {
			this.logger.info(`Error extracting data from content: ${e.message}`, { error: { ...e }, classification, file: orgFile, user, organization });

			const metadata = orgFile.metadata as any;
			metadata.status = 'failed';
			const updateData: any = {
				metadata: {
					...metadata,
					classification: get(orgFile, 'metadata.classification'),
					error: e.message,
				},
			};

			orgFile = await this.prisma.organization_files.update({
				where: {
					id: orgFile.id,
				},
				data: updateData,
			});

			this.sendMetrics('organization.files', 'cold-openai', 'extraction', 'completed', {
				start,
				sendEvent: true,
				tags: {
					organization_name: organization?.name,
					organization_id: organization?.id,
					user_email: user?.coldclimate_claims?.email,
					file_name: orgFile.original_name,
					file_type: orgFile.type,
					file_id: orgFile.id,
					error: e.message,
				},
			});

			this.mqtt.publishToUI({
				action: 'update',
				status: 'failed',
				resource: 'organization_files',
				event: 'extract-file-data',
				data: orgFile,
				user,
				swr_key: `organization_files.${updateData.metadata.status}`,
				org_id: organization.id,
			});

			throw e;
		}
	}

	private async setSupplierId(parsedResponse: any, organization: organizations) {
		if (parsedResponse.matched_name && !parsedResponse.matched_name.includes('NOT FOUND')) {
			const matchedSupplier = await this.prisma.organization_facilities.findUnique({
				where: {
					orgFacilityName: {
						organization_id: organization.id,
						name: parsedResponse.matched_name,
					},
				},
			});

			if (matchedSupplier?.id) {
				parsedResponse.supplier_id = matchedSupplier.id;
			}
		}

		if (!parsedResponse.supplier_id) {
			if (!parsedResponse.supplier?.name || parsedResponse.supplier?.name === 'NOT FOUND') {
				throw new UnprocessableEntityException('Supplier name not found in classification');
			}

			const newSupplier = await this.prisma.organization_facilities.upsert({
				where: {
					orgFacilityName: {
						organization_id: organization.id,
						name: parsedResponse.supplier.name,
					},
				},
				create: {
					id: new Cuid2Generator(GuidPrefixes.OrganizationFacility).scopedId,
					organization_id: organization.id,
					...parsedResponse.supplier,
					supplier: true,
					supplier_tier: parsedResponse.supplier.supplier_tier || 2,
				},
				update: {},
			});

			parsedResponse.supplier_id = newSupplier.id;
		}
	}

	private async resolveExtractionSchema(classification: any) {
		if (typeof classification === 'string') {
			classification = JSON.parse(classification);
		}

		classification.extraction_name = 'default_extraction';

		// determine the extraction schema and extraction name to use based on the classification
		switch (classification.type) {
			case file_types.TEST_REPORT:
				classification.extraction_name = snakeCase(`test_${classification.testing_company}`);
				switch (classification.testing_company) {
					case 'tuvRheinland':
						classification.extraction_schema = tuv_rhineland;
						break;
					case 'intertek':
						classification.extraction_schema = intertek;
						break;
					case 'SGS':
						classification.extraction_schema = sgs;
						break;
					default:
						classification.extraction_schema = defaultTestSchema;
						break;
				}
				break;
			case file_types.SCOPE_CERTIFICATE:
			case file_types.TRANSACTION_CERTIFICATE:
			case file_types.CERTIFICATE: {
				//You have a list of known suppliers, and you need to extract the supplier name from a document. You are expected to find the best matching supplier from the list using partial string matching. The goal is to match only the core, significant part of the supplier’s name.
				if (!classification.sustainability_attribute) {
					//content.sustainability_attribute = 'certificate_AttributeUnknown';
					throw new UnprocessableEntityException('Sustainability attribute not found in classification');
				} else {
					const certSchema = baseCertificateSchema.extend({
						matched_name: z.string().describe(
							`Here is a list of known suppliers: ${classification.suppliers.join(
								', ',
							)}, and you need to extract the supplier name from a document. You are expected to find the best matching supplier from the list using partial string matching. The goal is to match only the core, significant part of the supplier’s name.

\t•\tIf a name in the document contains a segment that partially matches a name in the list, return the best matching name found in the list of known suppliers.
\t•\tIf no match is found, return ‘NOT FOUND’.`,
						),
						supplier: z.object({
							name: z
								.string()
								.describe(`Look for the name of the company to which this certificate is awarded and find the best match for the name from this known list of supplier names.`),
							address_line_1,
							address_line_2,
							city,
							state_province,
							postal_code,
							country,
						}),
					});

					classification.extraction_name = snakeCase(`certificate ${classification.sustainability_attribute}`);
					switch (classification.sustainability_attribute) {
						case 'Bluesign Product': {
							classification.extraction_schema = certSchema.extend({
								name: z.enum(['bluesign Product']).describe('The name of the bluesign product certificate.'),
							});
							break;
						}
						case 'Bluesign':
							classification.extraction_schema = certSchema.extend({
								name: z.enum(['bluesign']).describe('The name of the certificate.'),
							});
							break;
						case 'WRAP':
						case 'Worldwide Responsible Accredited Production':
							classification.extraction_schema = certSchema.extend({
								name: z.enum(['Worldwide Responsible Accredited Production (WRAP)']),
							});
							break;
						default:
							classification.extraction_schema = certSchema.extend({
								name: z.enum([classification.sustainability_attribute]).describe('The name of the certificate.'),
							});
							break;
					}
				}
				break;
			}
			case file_types.POLICY:
				classification.extraction_name = snakeCase(`policy extraction`);
				classification.extraction_schema = defaultPolicySchema;
				break;
			case file_types.STATEMENT:
				classification.extraction_name = snakeCase('statement_extraction');
				classification.extraction_schema = defaultStatementSchema;
				break;
			case file_types.BILL_OF_MATERIALS:
				classification.extraction_name = snakeCase('bill_of_materials_extraction');
				classification.extraction_schema = BillOfMaterialsSchema;
				break;
			case file_types.PURCHASE_ORDER:
				classification.extraction_name = snakeCase('purchase_order_extraction');
				classification.extraction_schema = PoProductsSchema;
				break;
			default:
				throw new UnprocessableEntityException('File type not found in classification');
				// if it failed to correctly identify type of document, but did identify a sustainability attribute switch on attribute name
				/*if (classification.sustainability_attribute) {
					switch (classification.sustainability_attribute) {
						case 'Worldwide Responsible Accredited Production (WRAP)':
							classification.extraction_schema = wrap;
							classification.type = file_types.CERTIFICATE;
							classification.extraction_name = snakeCase(`wrap extraction`);
							break;
						case 'Bluesign':
							classification.extraction_schema = bluesignSchema;
							classification.type = file_types.CERTIFICATE;
							classification.extraction_name = snakeCase(`bluesign extraction`);
							break;
						case 'Bluesign Product':
							classification.extraction_schema = bluesignProductSchema;
							classification.type = file_types.CERTIFICATE;
							classification.extraction_name = snakeCase(`bluesign product extraction`);
							break;
					}

					const attribute = await this.prisma.sustainability_attributes.findFirst({
						where: {
							name: classification.sustainability_attribute,
						},
					});

					if (attribute) {
						classification.sustainability_attribute_id = attribute.id;
					}
				} else {
					classification.extraction_name = snakeCase(`default extraction`);
					classification.extraction_schema = defaultExtractionSchema;
				}*/
				break;
		}

		return classification;
	}

	private async createAttributeAssurances(
		classification,
		organization: organizations,
		orgFile: organization_files,
		updateData: any,
		updatedFile: any,
		user: IAuthenticatedUser,
		attributes: sustainability_attributes[],
		supplier_id: string,
	) {
		const attribute_id = attributes.find(a => a.name === classification.sustainability_attribute)?.id;

		const data = {
			sustainability_attribute_id: attribute_id,
			organization_id: organization.id,
			organization_file_id: orgFile.id,
			organization_facility_id: supplier_id,
			effective_start_date: updateData.effective_start_date,
			effective_end_date: updateData.effective_end_date,
		} as attribute_assurances;

		if (updateData.effective_start_date) {
			data.effective_start_date = updateData.effective_start_date;
		}

		if (updateData.effective_end_date) {
			data.effective_end_date = updateData.effective_end_date;
		}

		const existingAssurance = await this.prisma.attribute_assurances.findFirst({
			where: {
				...data,
			},
		});

		let assurance;

		if (existingAssurance) {
			data.id = existingAssurance.id;
			assurance = await this.prisma.attribute_assurances.update({
				where: {
					id: existingAssurance.id,
				},
				data: data,
			});
		} else {
			assurance = await this.prisma.attribute_assurances.create({
				data,
			});
		}

		this.mqtt.publishToUI({
			action: 'create',
			status: 'complete',
			resource: 'attribute_assurances',
			data: assurance,
			user,
			swr_key: 'attribute_assurances.created',
			org_id: organization.id,
		});

		this.logger.info('attribute assurance created', { assurance, file: updatedFile, organization, user });
	}
}
