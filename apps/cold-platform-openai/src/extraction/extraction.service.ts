import { Injectable } from '@nestjs/common';
import { toUTCDate, BaseWorker, IAuthenticatedUser, MqttService, PrismaService, S3Service } from '@coldpbc/nest';
import z from 'zod';
import { attribute_assurances, file_types, organization_files, organizations } from '@prisma/client';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { zodResponseFormat } from 'openai/helpers/zod';
import { ClassificationService } from './classification.service';
import { get } from 'lodash';
import { OpenAiBase64ImageUrl } from '../pinecone/pinecone.service';
import { PDFDocument } from 'pdf-lib';
import { pdfByteArrayToScreenshots } from './screenShotPDFPages';
import { fromBuffer } from 'pdf2pic';
import { pdfToText } from './extractTextFromPDF';
import { Process, Processor } from '@nestjs/bull';

@Injectable()
export class ExtractionService extends BaseWorker {
	private openAi;

	constructor(
		readonly config: ConfigService,
		readonly classifyService: ClassificationService,
		private readonly prisma: PrismaService,
		readonly s3: S3Service,
		readonly mqtt: MqttService,
	) {
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

			const processed = await this.extractDataFromContent(extracted, user, filePayload, organization);
			return processed;
		} catch (error) {
			this.logger.error('Error extracting text from pdf', { error, namespace: organization.name, file: filePayload });
			return null;
		}
	}

	async convertPdfPageToImage(pageNumber: number, content: Uint8Array, filePayload: { original_name: any[] }, user: IAuthenticatedUser, organization: organizations) {
		const convert = fromBuffer(Buffer.from(content), { format: 'png', quality: 100, density: 100 });

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

	async processPdfPages(fileBuffer: Uint8Array, filePayload: any, user: IAuthenticatedUser, organization: organizations) {
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

	async extractDataFromImages(images: OpenAiBase64ImageUrl[], user: IAuthenticatedUser, orgFile: organization_files, organization: organizations) {
		const start = new Date();
		try {
			// classify content and generate a prompt for the extraction
			const classification = await this.classifyService.classifyImageUrls(images, user, orgFile, organization);

			const imageContent: { type: string; text?: string; image_url?: { url: string } }[] = [
				{
					type: 'text',
					text: classification.prompt,
				},
			];

			images.forEach(image => {
				imageContent.push(image);
			});

			const response = await this.openAi.beta.chat.completions.parse({
				model: 'gpt-4o-2024-08-06',
				messages: [
					{
						role: 'user',
						content: imageContent,
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
					classification: get(orgFile, 'metadata.classification'),
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
			if (!classification.sustainability_attribute_id) {
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

			await this.createAttributeAssurances(classification, organization, orgFile, updateData, orgFile, user);

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

			return typeof parsedResponse === 'string' ? parsedResponse : JSON.stringify(parsedResponse);
		} catch (e) {
			this.logger.info('Error extracting data from content', { error: e, file: orgFile, user, organization });
			const metadata = orgFile.metadata as any;
			const updateData: any = {
				metadata: {
					...metadata,
					status: 'failed',

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

	/**
	 * Use Ai to extract text from an image
	 * @param content
	 * @param user
	 * @param orgFile
	 * @param organization
	 */
	async extractDataFromContent(content: any[] | string, user: IAuthenticatedUser, orgFile: organization_files, organization: organizations) {
		const start = new Date();
		try {
			// map over content to extract pageContent if content is an array of langchain documents
			content = Array.isArray(content) ? content.map(c => c.pageContent) : content;

			// classify content and generate a prompt for the extraction
			const classification = await this.classifyService.classifyContent(content, user, orgFile, organization);

			const prompt = `${classification?.prompt} Please use the response_format to properly extract the content ${Array.isArray(content) ? content.join(' ') : content}`;

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
					classification: get(orgFile, 'metadata.classification'),
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
			if (!classification.sustainability_attribute_id) {
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

			await this.createAttributeAssurances(classification, organization, orgFile, updateData, orgFile, user);

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

			return typeof parsedResponse === 'string' ? parsedResponse : JSON.stringify(parsedResponse);
		} catch (e) {
			this.logger.info('Error extracting data from content', { error: e });
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

	private async createAttributeAssurances(classification, organization: organizations, orgFile: organization_files, updateData: any, updatedFile: any, user: IAuthenticatedUser) {
		const data = {
			sustainability_attribute_id: classification.sustainability_attribute_id,
			organization_id: organization.id,
			organization_file_id: orgFile.id,
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
