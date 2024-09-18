import { Injectable } from '@nestjs/common';
import { BaseWorker, IAuthenticatedUser, PrismaService, S3Service } from '@coldpbc/nest';
import z, { ZodObject } from 'zod';
import { file_types, organization_files, organizations, sustainability_attributes } from '@prisma/client';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { zodResponseFormat } from 'openai/helpers/zod';
import {
	bluesign,
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
} from './extraction_schemas';
import { snakeCase } from 'lodash';

@Injectable()
export class ClassificationService extends BaseWorker {
	private openAi;
	sus_attributes: sustainability_attributes[];
	private classificationSchema: ZodObject<any>;

	constructor(readonly config: ConfigService, private readonly prisma: PrismaService, readonly s3: S3Service) {
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

	/**
	 * Use Ai to classify content
	 * @param content
	 * @param user
	 * @param orgFile
	 * @param organization
	 */
	async classifyContent(content: any[] | string, user: IAuthenticatedUser, orgFile: organization_files, organization: organizations) {
		if (this.classificationSchema === undefined) {
			await this.init();
		}

		const start = new Date();

		const classifyPrompt = `You are a helpful assistant for ${
			organization.display_name
		} and you help users classify and extract data from documents that they upload.  Classify this content using the following rules:
    - if the content is an RSL (Restricted Substance List), classify it as a POLICY
    - if the content is a statement, classify it as a STATEMENT
    - if the content is an impact assessment from ${organization.display_name}, classify it as a STATEMENT
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

		this.sendMetrics('organization.files', 'cold-openai', 'classify', 'completed', {
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

		const { parsed } = classifyResponse.choices[0].message;

		let extraction_name = 'default_extraction';

		// determine the extraction schema and extraction name to use based on the classification
		switch (parsed.type) {
			case file_types.TEST_RESULTS:
				extraction_name = snakeCase(`test_${parsed.testing_company}`);
				switch (parsed.testing_company) {
					case 'tuvRheinland':
						parsed.extraction_schema = tuv_rhineland;
						break;
					case 'intertek':
						parsed.extraction_schema = intertek;
						break;
					case 'SGS':
						parsed.extraction_schema = sgs;
						break;
					default:
						parsed.extraction_schema = defaultTestSchema;
						break;
				}
				break;
			case file_types.CERTIFICATE:
				parsed.extraction_name = snakeCase(`certificate ${parsed.sustainability_attribute}`);
				switch (parsed.sustainability_attribute) {
					case 'Bluesign Product':
					case 'Bluesign':
						parsed.extraction_schema = bluesign;
						break;
					case 'WRAP':
					case 'Worldwide Responsible Accredited Production':
						parsed.extraction_schema = wrap;
						break;
					default:
						parsed.extraction_schema = defaultCertificateSchema;
						break;
				}
				break;
			case file_types.POLICY:
				parsed.extraction_name = snakeCase(`policy extraction`);
				parsed.extraction_schema = defaultPolicySchema;
				break;
			case file_types.STATEMENT:
				parsed.extraction_name = snakeCase('statement_extraction');
				parsed.extraction_schema = defaultStatementSchema;
				break;
			default:
				extraction_name = snakeCase(`default_extraction`);
				parsed.extraction_schema = defaultExtractionSchema;
				break;
		}

		if (parsed.sustainability_attribute) {
			const attribute = this.sus_attributes.find(k => k.name === parsed.sustainability_attribute);
			if (attribute) {
				parsed.sustainability_attribute_id = attribute.id;
			}
		}

		return parsed;
	}
}
