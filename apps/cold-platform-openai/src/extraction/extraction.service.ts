import { Injectable } from '@nestjs/common';
import { BaseWorker, IAuthenticatedUser, PrismaService, S3Service } from '@coldpbc/nest';
import z from 'zod';
import { attribute_assurances, file_types, organization_files, organizations } from '@prisma/client';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { zodResponseFormat } from 'openai/helpers/zod';
import {
	defaultExtractionSchema,
	defaultTestSchema,
	defaultCertificateSchema,
	defaultPolicySchema,
	defaultStatementSchema,
	sgs,
	intertek,
	wrap,
	tuv_rhineland,
	bluesign,
} from './extraction_schemas';
import { FileTypes } from '@coldpbc/enums';
import { ClassificationService } from './classification.service';

@Injectable()
export class ExtractionService extends BaseWorker {
	private openAi;

	constructor(readonly config: ConfigService, readonly classifyService: ClassificationService, private readonly prisma: PrismaService, readonly s3: S3Service) {
		super(ExtractionService.name);
		this.openAi = new OpenAI({
			organization: this.config.getOrThrow('OPENAI_ORG_ID'),
			apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
		});
	}

	contentIsUrl(content: any[] | string) {
		return typeof content === 'string' && z.string().url().safeParse(content).success;
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

			const prompt = `${classification.prompt} Please use the response_format to properly extract the content ${Array.isArray(content) ? content.join(' ') : content}`;

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

			this.logger.info(`${classification.extraction_name} response`, { response, user, file: orgFile });

			const updateData: any = {
				type: classification.type,
				metadata: {
					...response.choices[0].message.parsed,
				},
			};

			if (parsedResponse.effective_start_date || parsedResponse.effective_end_date) {
				try {
					updateData.effective_start_date = parsedResponse.effective_start_date ? new Date(parsedResponse.effective_start_date).toISOString() : undefined;
				} catch (e) {
					this.logger.error('Error parsing effective_start_date', { error: e, organization, user });
				}
				try {
					updateData.effective_end_date = parsedResponse.effective_end_date ? new Date(parsedResponse.effective_end_date).toISOString() : undefined;
				} catch (e) {
					this.logger.error('Error parsing effective_start_date', { error: e, organization, user });
				}
			}

			const updatedFile = await this.prisma.organization_files.update({
				where: {
					id: orgFile.id,
				},
				data: updateData,
			});

			this.logger.info('file metadata updated', { file: updatedFile, organization, user });

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

			this.logger.info('attribute assurance created', { assurance, file: updatedFile, organization, user });

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
			throw e;
		}
	}
}
