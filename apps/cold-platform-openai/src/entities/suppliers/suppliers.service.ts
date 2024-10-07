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

		const parsed = typeof content === 'string' ? JSON.parse(content) : content;

		if (parsed.name) {
			const supplier = await this.prisma.organization_facilities.upsert({
				where: {
					orgFacilityName: {
						organization_id: job.data.organization.id,
						name: parsed.supplier.name,
					},
				},
				create: {
					id: new Cuid2Generator(GuidPrefixes.OrganizationFacility).scopedId,
					organization_id: job.data.organization.id,
					name: parsed.supplier.name,
					city: parsed.supplier.city,
					state_province: parsed.supplier.state_province,
					address_line_1: parsed.supplier.address_line_1,
					address_line_2: parsed.supplier.address_line_2,
					postal_code: parsed.supplier.postal_code,
					supplier: true,
					supplier_tier: parsed.supplier.supplier_tier || 2,
				},
				update: {
					supplier_tier: parsed.supplier.supplier_tier || 2,
				},
			});

			this.logger.info('Created supplier', { supplier, organization, user });
		}

		return parsed;
	}
}
