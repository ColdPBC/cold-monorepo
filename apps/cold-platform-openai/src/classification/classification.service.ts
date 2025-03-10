import { Injectable, Scope } from '@nestjs/common';
import { BaseWorker, IAuthenticatedUser, MqttService, PrismaService, S3Service } from '@coldpbc/nest';
import z from 'zod';
import { file_types, organization_facilities, organization_files, organizations, sustainability_attributes } from '@prisma/client';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { zodResponseFormat } from 'openai/helpers/zod';
import { summary } from '../schemas';
import { omit, set } from 'lodash';

@Injectable()
export class ClassificationService extends BaseWorker {
	private openAi;
	sus_attributes: sustainability_attributes[];
	classificationSchema = z.object({
		type: z.nativeEnum(file_types).describe('The type classification of document'),
		reasoning: z.string().describe('Provide detailed reasoning for the classification'),
		summary: summary,
		extraction_prompt: z
			.string()
			.optional()
			.describe(
				'Generate a prompt to instruct the model on how to accurately extract data from the document.  The purpose of this prompt is to extract data from the document.  Make sure you include instructions that the model is NOT to invent or hallucinate any data.  All data must be extracted from the document precisely as it appears in the document and the number of parameters must be less than 100.  Do not include more than 100 parameters in the prompt.',
			),
	});

	constructor(readonly config: ConfigService, private readonly prisma: PrismaService, readonly s3: S3Service, readonly mqtt: MqttService) {
		super(ClassificationService.name);
		this.openAi = new OpenAI({
			organization: this.config.getOrThrow('OPENAI_ORG_ID'),
			apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
		});

		this.init();
	}

	async init() {
		//
	}

	contentIsUrl(content: any[] | string) {
		return typeof content === 'string' && z.string().url().safeParse(content).success;
	}

	// generate a prompt for the classification
	async getClassifyPrompt(organization: organizations) {
		this.sus_attributes = (await this.prisma.sustainability_attributes.findMany({
			where: {
				OR: [{ organization_id: null }, { organization_id: organization.id }],
			},
			select: {
				id: true,
				name: true,
			},
		})) as sustainability_attributes[];

		const attributes = this.sus_attributes.map(k => k.name) as readonly string[];

		// extend existing schema to add sustainability attributes
		this.classificationSchema = this.classificationSchema.extend({
			type: z.nativeEnum(file_types).describe('The type of document'),
			author: z.string().describe('The author of the document'),
			sustainability_attributes: z
				.array(z.string())
				.describe(
					`Select all sustainability attributes that matches any standards referenced in the document according to the following list: ${attributes.join(
						', ',
					)}.  It is important that you do not use any other sustainability attribute that is not listed here.`,
				),
			sustainability_attribute: z
				.string()
				.describe(
					`Select the sustainability attribute that best matches the purpose of the document according to the following list: Unknown, ${attributes.join(
						', ',
					)}.  It is important that you do not use any other sustainability attribute that is not listed here.`,
				),
		});

		return `Classify the document type using the following rules and steps:

Definition of terms:
	- supplier: A company or individual from the following list that provides materials.
	- the brand: ${organization.display_name}; The organization that owns the brand.
	- certifying_entity: An organization that is NOT a supplier and is not ${organization.display_name} that provides compliance documentation.
	
Rules for Classification:
  1. Authorship Rules:
    - In determining authorship, consider the following in order:
        1. The logo or letterhead of the document.
        2. Company name located in the footer or header.
        3. The body of the document.
    - If a document is authored by the ${organization.display_name} then only the following types are valid: SUPPLIER_AGREEMENT, POLICY, PURCHASE_ORDER, BILL_OF_MATERIALS, or OTHER.
    - If a document is authored by a 'supplier' then it must be classified as a SUPPLIER_STATEMENT.
    - If a document is not authored a 'supplier' or ${organization.display_name} then only the following types are valid: AUDIT_REPORT, TEST_REPORT, SCOPE_CERTIFICATE, TRANSACTION_CERTIFICATE, or OTHER.
  2. STATEMENT:
    - MUST be authored by ${organization.display_name}.  If it is not authored by ${organization.display_name} then it is not a STATEMENT.
    - MUST not contain any mention of a specific supplier, purchase orders, or bill of materials.
	3. SUPPLIER_STATEMENT:
		-	Use if the document is authored by a supplier and declares compliance or non-compliance with specific practices, standards, or regulations.
		- It should be assumed that all suppliers provide materials in the production of goods under the ${organization.display_name} brand.
		- Do not classify as ‘SUPPLIER_STATEMENT’ if the document is authored by ${organization.display_name}.
	4. OTHER:
		- Classify as ‘OTHER’ only if no other category applies after thoroughly reviewing all options.
		- Example: Use for ambiguous or unclassifiable documents that do not align with any defined category.
	5. Review your classification to ensure it is accurate and aligns with the document’s content.

Steps for Classification:

	1.	Identify Authorship:
				•	Examine the document to determine if it is authored by:
				•	A supplier or supplier representative
				•	${organization.display_name}.
				•	Another entity that is not a supplier or ${organization.display_name}.
	2.	Assess Content Purpose:
		  Determine whether the document is:
				•	Authored by ${organization.display_name} and is intended to be an agreement between ${organization.display_name} and a supplier (SUPPLIER_AGREEMENT).
				•	Authored by supplier and not by ${organization.display_name} declares compliance or non-compliance (SUPPLIER_STATEMENT).
				•	Authored by ${organization.display_name} and defines organizational guidelines, standards, or restricted substance lists (POLICY).
				•	Authored by ${organization.display_name} and explicitly declares that it is a purchase order or PO (PURCHASE_ORDER).
				•	Authored by ${organization.display_name} and explicitly declares that it is a bill of materials or BOM (BILL_OF_MATERIALS).
				•	Authored by another entity and contains reports on inspections, or audits,(AUDIT_REPORT).
				•	Authored by another entity and contains results from material or product testing (TEST_REPORT).
				•	Certificate authored by another entity such as BlueSign or WRAP or OEKOTEX (SCOPE_CERTIFICATE).
				•	Authored by another entity and explicitly declares that it is a scope certificate (SCOPE_CERTIFICATE).
				•	Authored by another entity and explicitly declares that it is a transaction certificate (TRANSACTION_CERTIFICATE).
	3.	Match Content to Categories:
				•	Review the document against all category definitions. Prioritize categories based on:
				•	Content intent (e.g., compliance declaration fits SUPPLIER_STATEMENT).
				•	Specificity (e.g., only use OTHER if no precise match exists).
	4.	Exclude Incorrect Categories:
				•	Ensure the document does not fit restricted or invalid categories:
				•	Example: Avoid using ‘CERTIFICATE’ as it is explicitly not allowed.
				•	Example: Use 'SCOPE_CERTIFICATE' if the document is certified by OEKOTEX, WRAP, or Bluesign
	5.	Apply the Fallback Rule:
				•	Use ‘OTHER’ only as a last resort. If the document fits SUPPLIER_STATEMENT, do not classify it as ‘OTHER.’
	`;
	}

	async classifyImageUrls(images: any[], user: IAuthenticatedUser, orgFile: organization_files, organization: organizations) {
		const classifyPrompt = `${await this.getClassifyPrompt(organization)} from the provided image urls.`;

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

		const suppliers = (await this.prisma.organization_facilities.findMany({
			where: {
				organization_id: organization.id,
				supplier: true,
			},
			select: {
				id: true,
				name: true,
			},
		})) as organization_facilities[];

		// remove the classification prompt from the beginning of the images array so the image uRLs can be stored in the messages for further processing
		images.shift();

		await set(classifyResponse.choices[0].message?.parsed, 'suppliers', suppliers.map(k => k.name) as readonly string[]);
		await set(classifyResponse.choices[0].message?.parsed, 'attributes', this.sus_attributes);
		await set(classifyResponse.choices[0].message?.parsed, 'images', images);

		return classifyResponse.choices[0].message?.parsed;
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
				? `${await this.getClassifyPrompt(organization)} from the following image urls`
				: `${await this.getClassifyPrompt(organization)} \n\n Content to be classified: ${Array.isArray(content) ? content.join(' ') : content}`;

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

			if (!Array.isArray(classifyResponse.choices) || classifyResponse.choices.length === 0) {
				throw new Error('No choices found in classify response');
			}

			set(classifyResponse.choices[0].message?.parsed, 'attributes', this.sus_attributes);

			const suppliers = (await this.prisma.organization_facilities.findMany({
				where: {
					organization_id: organization.id,
					supplier: true,
				},
				select: {
					id: true,
					name: true,
				},
			})) as organization_facilities[];

			set(classifyResponse.choices[0].message?.parsed, 'suppliers', suppliers.map(k => k.name) as readonly string[]);

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

			return classifyResponse.choices[0].message.parsed;
		} catch (e) {
			this.logger.error(e.message, { ...e, content, user, file: orgFile, organization });
			throw e;
		}
	}
}
