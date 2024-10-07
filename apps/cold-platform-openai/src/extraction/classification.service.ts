import { Injectable } from '@nestjs/common';
import { BaseWorker, IAuthenticatedUser, MqttService, PrismaService, S3Service } from '@coldpbc/nest';
import z, { ZodObject } from 'zod';
import { file_types, organization_files, organizations, sustainability_attributes } from '@prisma/client';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { zodResponseFormat } from 'openai/helpers/zod';
import { DetectDocumentTextCommand, TextractClient } from '@aws-sdk/client-textract';
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
} from '../schemas';
import { omit, snakeCase } from 'lodash';
import { zerialize } from 'zodex';
import { OpenAiBase64ImageUrl } from '../pinecone/pinecone.service';
import BillOfMaterialsSchema from '../schemas/extraction_schemas/bill_of_materials/backbone.bom.schema';
import PurchaseOrderSchema, { PoProductsSchema } from '../schemas/extraction_schemas/purchase_orders/purchase_order.schema';

@Injectable()
export class ClassificationService extends BaseWorker {
	private openAi;
	sus_attributes: sustainability_attributes[];
	private classificationSchema: ZodObject<any>;

	constructor(readonly config: ConfigService, private readonly prisma: PrismaService, readonly s3: S3Service, readonly mqtt: MqttService) {
		super(ClassificationService.name);
		this.openAi = new OpenAI({
			organization: this.config.getOrThrow('OPENAI_ORG_ID'),
			apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
		});

		this.init();
	}

	async init() {
		this.sus_attributes = (await this.prisma.sustainability_attributes.findMany({
			select: {
				id: true,
				name: true,
			},
		})) as sustainability_attributes[];

		const attributes = this.sus_attributes.map(k => k.name) as readonly string[];
		this.classificationSchema = z.object({
			type: z.nativeEnum(file_types).describe('The type of document'),
			sustainability_attribute: z
				.string()
				.describe(
					`Select the sustainability attribute that best matches the document according to the following list: Unknown, ${attributes.join(
						', ',
					)}.  It is important that you do not use any other sustainability attribute that is not listed here.`,
				),
			testing_company: z.enum(['intertek', 'tuvRheinland', 'SGS', 'other']).describe('The name of the testing company'),
			prompt: z
				.string()
				.describe('Generate a prompt to instruct the model on how to accurately extract data from the document.  The purpose of this prompt is to extract data from the document.'),
			summary: summary,
		});
	}

	contentIsUrl(content: any[] | string) {
		return typeof content === 'string' && z.string().url().safeParse(content).success;
	}

	async classifyImageUrls(images: OpenAiBase64ImageUrl[], user: IAuthenticatedUser, orgFile: organization_files, organization: organizations) {
		const classifyPrompt = `You are a helpful assistant for ${organization.display_name} and you help users classify and extract data from documents that they upload.  Classify this content using the following rules:
    - if the content is an RSL (Restricted Substance List), classify it as a POLICY
    - if the content is a statement, classify it as a STATEMENT
    - if the content appears to be a bill of materials or BOM, classify it as a BILL_OF_MATERIALS
    - if the document appears to be a purchase order or list of purchase orders, classify it as a PURCHASE_ORDER
    - if the content is an impact assessment from ${organization.display_name}, classify it as a STATEMENT
     from the following images`;

		const imageContent: { type: string; text?: string; image_url?: { url: string } }[] = [
			{
				type: 'text',
				text: classifyPrompt,
			},
		];

		images.forEach(image => {
			imageContent.push(image);
		});

		const classifyResponse = await this.openAi.beta.chat.completions.parse({
			model: 'gpt-4o-2024-08-06',
			messages: [
				{
					role: 'user',
					content: imageContent,
				},
			],
			response_format: zodResponseFormat(this.classificationSchema, 'content_classification'),
		});

		return this.resolveExtractionSchema(classifyResponse.choices[0].message);
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

			/*
			const textractClient = new TextractClient();

			const detectDocumentTextCommand = new DetectDocumentTextCommand({
				Document: {
					S3Object: {
						Bucket: eventBridgeS3Event.bucket,
						Name: eventBridgeS3Event.object,
					},
				},
			});

			// Textract returns a list of blocks. A block can be a line, a page, word, etc.
			// Each block also contains geometry of the detected text.
			// For more information on the Block type, see https://docs.aws.amazon.com/textract/latest/dg/API_Block.html.
			const { Blocks } = await textractClient.send(detectDocumentTextCommand);

			// For the purpose of this example, we are only interested in words.
			const extractedWords = Blocks.filter(b => b.BlockType === 'WORD').map(b => b.Text);

			this.logger.info(extractedWords.join(' '));
*/
			const classifyPrompt = `You are a helpful assistant for ${
				organization.display_name
			} and you help classify documents and extract data from those documents.  Classify this content using the following rules:
			- limit your response to the following types: ${Object.values(file_types).join(', ')}
    - if the content is an RSL (Restricted Substance List), classify it as a POLICY
    - if the content is a statement, classify it as a STATEMENT
    - if the content is an impact assessment from ${organization.display_name}, classify it as a STATEMENT
    - if the content appears to be a bill of materials or BOM, classify it as a BILL_OF_MATERIALS
    - if the document appears to be a purchase order or list of purchase orders, classify it as a PURCHASE_ORDER
    - if the content is a test report, classify it as a TEST_REPORT
    - if the content is a certificate, classify it as a CERTIFICATE
    - if the content is an audit report, classify it as an AUDIT_REPORT
    - if the content is a code of conduct, classify it as a CODE_OF_CONDUCT
     ${this.contentIsUrl(content) ? 'from the following image' : `from the following context: ${Array.isArray(content) ? content.join(' ') : content}`}:`;

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

			this.logger.info('content_classification response', { classification: classifyResponse, user, file: orgFile });

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

			const parsed = this.resolveExtractionSchema(classifyResponse.choices[0].message);

			const updateData = await this.updateOrgFile(orgFile, parsed);

			// publish message to MQTT whenever a file is classified
			this.mqtt.publishToUI({
				action: 'update',
				status: 'complete',
				data: orgFile,
				user,
				swr_key: `organization_files.${updateData.metadata.status}`,
				org_id: organization.id,
			});

			return parsed;
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

	private async updateOrgFile(orgFile: any, parsed: any) {
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
				extraction: {
					name: parsed.extraction_name,
					schema: zerialize(parsed.extraction_schema),
				},
				...(orgFile.metadata as object),
			},
		};

		await this.prisma.organization_files.update({
			where: {
				id: orgFile.id,
			},
			data: updateData,
		});
		return updateData;
	}

	private resolveExtractionSchema(content: any) {
		content.parsed.extraction_name = 'default_extraction';

		// determine the extraction schema and extraction name to use based on the classification
		switch (content.parsed.type) {
			case file_types.TEST_REPORT:
				content.parsed.extraction_name = snakeCase(`test_${content.parsed.testing_company}`);
				switch (content.parsed.testing_company) {
					case 'tuvRheinland':
						content.parsed.extraction_schema = tuv_rhineland;
						break;
					case 'intertek':
						content.parsed.extraction_schema = intertek;
						break;
					case 'SGS':
						content.parsed.extraction_schema = sgs;
						break;
					default:
						content.parsed.extraction_schema = defaultTestSchema;
						break;
				}
				break;
			case file_types.CERTIFICATE:
				content.parsed.extraction_name = snakeCase(`certificate ${content.parsed.sustainability_attribute}`);
				switch (content.parsed.sustainability_attribute) {
					case 'Bluesign Product':
						content.parsed.extraction_schema = bluesignProductSchema;
						break;
					case 'Bluesign':
						content.parsed.extraction_schema = bluesignSchema;
						break;
					case 'WRAP':
					case 'Worldwide Responsible Accredited Production':
						content.parsed.extraction_schema = wrap;
						break;
					default:
						content.parsed.extraction_schema = defaultCertificateSchema;
						break;
				}
				break;
			case file_types.POLICY:
				content.parsed.extraction_name = snakeCase(`policy extraction`);
				content.parsed.extraction_schema = defaultPolicySchema;
				break;
			case file_types.STATEMENT:
				content.parsed.extraction_name = snakeCase('statement_extraction');
				content.parsed.extraction_schema = defaultStatementSchema;
				break;
			case file_types.BILL_OF_MATERIALS:
				content.parsed.extraction_name = snakeCase('bill_of_materials_extraction');
				content.parsed.extraction_schema = BillOfMaterialsSchema;
				break;
			case file_types.PURCHASE_ORDER:
				content.parsed.extraction_name = snakeCase('purchase_order_extraction');
				content.parsed.extraction_schema = PoProductsSchema;
				break;
			default:
				content.parsed.extraction_name = snakeCase(`default_extraction`);
				content.parsed.extraction_schema = defaultExtractionSchema;
				break;
		}

		if (content.parsed.sustainability_attribute) {
			const attribute = this.sus_attributes.find(k => k.name === content.parsed.sustainability_attribute);
			if (attribute) {
				content.parsed.sustainability_attribute_id = attribute.id;
			}
		}

		return content.parsed;
	}
}
