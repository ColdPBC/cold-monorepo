import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Process, Processor } from '@nestjs/bull';
import { zodResponseFormat } from 'openai/helpers/zod';
import { BaseWorker, Cuid2Generator, GuidPrefixes, PrismaService } from '@coldpbc/nest';
import { baseSupplierSchema, materialsSchema, suppliersSchema } from '../../schemas';

@Injectable()
@Processor('openai:suppliers')
export class SuppliersService extends BaseWorker {
	private openAi: any;

	constructor(readonly config: ConfigService, readonly prisma: PrismaService) {
		super(SuppliersService.name);
		this.openAi = new OpenAI({
			organization: this.config.getOrThrow('OPENAI_ORG_ID'),
			apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
		});
	}

	@Process('suppliers')
	async process(job) {
		console.log('Processing job', job.id);
		const { content, user, organization } = job.data;

		const messages = [
			{
				type: 'text',
				text: `You are a helpful assistant tasked with extracting the supplier details from the JSON provided.  If more than one supllier is present, please extract all the details and include each one in the response.:
				JSON: ${content}`,
			},
		];

		const response = await this.openAi.beta.chat.completions.parse({
			model: 'gpt-4o-2024-08-06',
			messages: [
				{
					role: 'user',
					content: messages,
				},
			],
			response_format: zodResponseFormat(baseSupplierSchema, 'material_processing'),
		});

		const parsed = response.choices[0].message.parsed;
		if (parsed.name) {
			const supplier = await this.prisma.organization_facilities.upsert({
				where: {
					orgFacilityName: {
						organization_id: job.data.organization.id,
						name: parsed.name,
					},
				},
				create: {
					id: new Cuid2Generator(GuidPrefixes.OrganizationFacility).scopedId,
					organization_id: job.data.organization.id,
					...parsed,
					supplier: true,
					supplier_tier: parsed.supplier_tier || 2,
				},
				update: {
					supplier_tier: parsed.supplier_tier || 2,
				},
			});

			this.logger.info('Created supplier', { supplier });
		}

		return response;
	}
}
