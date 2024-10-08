import { Injectable } from '@nestjs/common';
import { BaseWorker, IAuthenticatedUser, MqttService, PrismaService, S3Service } from '@coldpbc/nest';
import z from 'zod';
import { file_types, organization_files, organizations, sustainability_attributes } from '@prisma/client';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { zodResponseFormat } from 'openai/helpers/zod';
import {
	bluesignSchema,
	bluesignProductSchema,
	defaultCertificateSchema,
	defaultExtractionSchema,
	defaultPolicySchema,
	defaultStatementSchema,
	defaultTestSchema,
	intertek,
	sgs,
	summary,
	tuv_rhineland,
	wrap,
	BillOfMaterialsSchema,
	PoProductsSchema,
} from '../schemas';
import { omit } from 'lodash';
import { OpenAiBase64ImageUrl } from '../pinecone/pinecone.service';

@Injectable()
export class ClassificationService extends BaseWorker {
	private openAi;
	sus_attributes: sustainability_attributes[];

	classificationSchema = z.object({
		type: z.nativeEnum(file_types).describe('The type of document'),
		testing_company: z.enum(['intertek', 'tuvRheinland', 'SGS', 'other']).describe('The name of the testing company'), // move this to the extraction service
		extraction_prompt: z
			.string()
			.describe(
				'Generate a prompt to instruct the model on how to accurately extract data from the document.  The purpose of this prompt is to extract data from the document.  Make sure you include instructions that the model is NOT to invent or hallucinate any data.  All data must be extracted from the document precisely as it appears in the document and the number of parameters must be less than 100.  Do not include more than 100 parameters in the prompt.',
			),
		summary: summary,
	});

	constructor(readonly config: ConfigService, private readonly prisma: PrismaService, readonly s3: S3Service, readonly mqtt: MqttService) {
		super(ClassificationService.name);
		this.openAi = new OpenAI({
			organization: this.config.getOrThrow('OPENAI_ORG_ID'),
			apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
		});

		this.init();
	}

	isImage(extension: string) {
		return ['png', 'jpg', 'gif', 'bmp', 'tiff', 'jpeg', 'heic'].includes(extension.toLowerCase());
	}

	async init() {
		this.sus_attributes = (await this.prisma.sustainability_attributes.findMany({
			select: {
				id: true,
				name: true,
			},
		})) as sustainability_attributes[];

		const attributes = this.sus_attributes.map(k => k.name) as readonly string[];

		// extend existing schema to add sustainability attributes
		this.classificationSchema = this.classificationSchema.extend({
			sustainability_attribute: z
				.string()
				.describe(
					`Select the sustainability attribute that best matches the document according to the following list: Unknown, ${attributes.join(
						', ',
					)}.  It is important that you do not use any other sustainability attribute that is not listed here.`,
				),
		});
	}

	contentIsUrl(content: any[] | string) {
		return typeof content === 'string' && z.string().url().safeParse(content).success;
	}

	async classifyImageUrls(images: OpenAiBase64ImageUrl[], user: IAuthenticatedUser, orgFile: organization_files, organization: organizations) {
		const classifyPrompt = `${this.getClassifyPrompt(organization)} from the provided image urls.`;

		// add the classification prompt to the beginning of the images array
		images.unshift({
			type: 'text',
			text: classifyPrompt,
		});

		const classifyResponse = await this.openAi.beta.chat.completions.parse({
			model: 'gpt-4o-2024-08-06',
			messages: [
				{
					role: 'user',
					content: images,
				},
			],
			response_format: zodResponseFormat(this.classificationSchema, 'content_classification'),
		});

		return classifyResponse.choices[0].message?.parsed;
	}

	// generate a prompt for the classification
	getClassifyPrompt(organization: organizations) {
		return `You are a helpful assistant for ${organization.display_name} and you help users classify and extract data from documents that they upload.  Classify this content using the following rules:
    - if the content is an RSL (Restricted Substance List), classify it as a POLICY
    - if the content is a scope certificate, then classify it as a SCOPE_CERTIFICATE.  Only classify it this way if 'Scope Certificate' is found in the content.
    - if the content is a transaction certificate, then classify it as a TRANSACTION_CERTIFICATE. Only classify it this way if 'Transaction Certificate' is found in the content.
    - if the content is a statement, classify it as a STATEMENT
    - if the content is a bill of materials or BOM, classify it as a BILL_OF_MATERIALS.  If it does not contain 'BOM' or 'Bill Of Materials' anywhere in the content, then DO NOT CLASSIFY IT AS A BILL_OF_MATERIALS.
    - if the document is a purchase order or list of purchase orders, classify it as a PURCHASE_ORDER.  A purchase order must have a "PO NUMBER", and Ship To information.  If it does not contain 'Purchase Order' anywhere in the content, then DO NOT CLASSIFY IT AS A PURCHASE_ORDER
    - if the content is an impact assessment from ${organization.display_name}, classify it as a STATEMENT
    `;
	}

	/**
	 * Use Ai to classify content
	 * @param content
	 * @param user
	 * @param orgFile
	 * @param organization
	 */
	async classifyContent(content: any[] | string, user: IAuthenticatedUser, orgFile: organization_files, organization: organizations) {
		try {
			if (this.classificationSchema === undefined) {
				await this.init();
			}

			const start = new Date();

			const classifyPrompt = this.contentIsUrl(content)
				? `${this.getClassifyPrompt(organization)} from the following image urls`
				: `${this.getClassifyPrompt(organization)} from the following context: ${Array.isArray(content) ? content.join(' ') : content}`;

			const messageContent: { type: string; text?: string; image_url?: { url: string } }[] = [
				{
					type: 'text',
					text: classifyPrompt,
				},
			];

			const imageContent: any = [
				{
					type: 'text',
					text: classifyPrompt,
				},
				{
					type: 'image_url',
					image_url: { url: this.contentIsUrl(content) ? content : '' },
				},
			];

			// send to openAI for classification
			const classifyResponse = await this.openAi.beta.chat.completions.parse({
				model: 'gpt-4o-2024-08-06',
				messages: [
					{
						role: 'user',
						content: this.contentIsUrl(content) ? imageContent : messageContent,
					},
				],
				response_format: zodResponseFormat(this.classificationSchema, 'content_classification'),
			});

			this.logger.info('content_classification response', { classification: classifyResponse.choices[0].message.parsed, user, file: orgFile });

			this.sendMetrics('organization.files', 'cold-openai', 'classify-file', 'completed', {
				start,
				sendEvent: false,
				tags: {
					organization_name: organization?.name,
					organization_id: organization?.id,
					user_email: user?.coldclimate_claims?.email,
					file_name: orgFile.original_name,
					file_type: orgFile.type,
					file_id: orgFile.id,
				},
			});

			if (!Array.isArray(classifyResponse.choices) || classifyResponse.choices.length === 0) {
				throw new Error('No choices found in classify response');
			}

			await this.updateOrgFile(orgFile, classifyResponse.choices[0].message.parsed, organization, user);

			return classifyResponse.choices[0].message.parsed;
		} catch (e) {
			this.logger.error(e.message, { ...e, content, user, file: orgFile, organization });

			const metadata = orgFile.metadata as any;

			orgFile = await this.prisma.organization_files.update({
				where: {
					id: orgFile.id,
				},
				data: {
					metadata: {
						status: 'failed',
						error: e,
						...metadata,
					},
				},
			});

			this.mqtt.publishToUI({
				action: 'update',
				status: 'failed',
				resource: 'organization_files',
				event: 'classify-file',
				data: orgFile,
				user,
				swr_key: `organization_files.${metadata.status}`,
				org_id: organization.id,
			});

			throw e;
		}
	}

	private async updateOrgFile(orgFile: any, parsed: any, organization, user) {
		orgFile = (await this.prisma.organization_files.findUnique({
			where: {
				id: orgFile.id,
			},
		})) as organization_files;

		// update the file metadata with the classification
		const updateData: any = {
			type: parsed.type,
			metadata: {
				status: 'ai_classified',
				classification: omit(parsed, ['extraction_name', 'extraction_schema']),
				...(orgFile.metadata as object),
			},
		};

		await this.prisma.organization_files.update({
			where: {
				id: orgFile.id,
			},
			data: updateData,
		});

		// publish message to MQTT whenever a file is classified
		this.mqtt.publishToUI({
			action: 'update',
			status: 'complete',
			data: orgFile,
			user,
			swr_key: `organization_files.${updateData.metadata.status}`,
			org_id: organization.id,
		});

		return updateData;
	}
}
