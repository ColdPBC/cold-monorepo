import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { BaseWorker, Cuid2Generator, GuidPrefixes, PrismaService } from '@coldpbc/nest';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { zodResponseFormat } from 'openai/helpers/zod';
import { materialsSchema } from '../../schemas';

@Injectable()
@Processor('openai:materials')
export class MaterialsService extends BaseWorker {
	private openAi: any;

	constructor(readonly config: ConfigService, readonly prisma: PrismaService) {
		super(MaterialsService.name);
		this.openAi = new OpenAI({
			organization: this.config.getOrThrow('OPENAI_ORG_ID'),
			apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
		});
	}

	@Process('materials')
	async process(job) {
		console.log('Processing job', job.id);
		const { content, user, organization } = job.data;

		const messages = [
			{
				type: 'text',
				text: `You are a helpful assistant who has expert knowledge in sustainability compliance and manufacturing processes of both products and materials and are tasked with extracting a list of materials used in making a product from the JSON provided:
				JSON: ${content}`,
			},
		];

		try {
			const response = await this.openAi.beta.chat.completions.parse({
				model: 'gpt-4o-2024-08-06',
				messages: [
					{
						role: 'user',
						content: messages,
					},
				],
				response_format: zodResponseFormat(materialsSchema, 'material_processing'),
			});

			if (response?.choices[0].message?.parsed?.materials) {
				for (const item of response.choices[0].message.parsed.materials) {
					const data = {
						id: new Cuid2Generator(GuidPrefixes.Material).scopedId,
						organization_id: job.data.organization.id,
						name: item.name,
					};

					const material = await this.prisma.materials.upsert({
						where: {
							orgIdName: {
								organization_id: job.data.organization.id,
								name: item.name,
							},
						},
						create: {
							...data,
						},
						update: {
							...data,
						},
					});

					this.logger.info('created material', { material });

					if (item.supplier) {
						const supplier = await this.prisma.organization_facilities.upsert({
							where: {
								orgFacilityName: {
									organization_id: job.data.organization.id,
									name: item.supplier.name,
								},
							},
							create: {
								id: new Cuid2Generator(GuidPrefixes.OrganizationFacility).scopedId,
								organization_id: job.data.organization.id,
								...item.supplier,
								supplier_tier: 2,
							},
							update: {
								...item.supplier,
								supplier_tier: 2,
							},
						});

						if (material.id && supplier.id) {
							await this.prisma.material_suppliers.upsert({
								where: {
									materialSupplierKey: {
										material_id: material.id,
										supplier_id: supplier.id,
									},
								},
								create: {
									material_id: material.id,
									supplier_id: supplier.id,
								},
								update: {
									material_id: material.id,
									supplier_id: supplier.id,
								},
							});
						}
						this.logger.info('linked material and supplier', { supplier, material });
					}
				}
			}

			this.logger.info('Response', response);
			return response;
		} catch (error) {
			this.logger.error('Error', error);
		}
	}
}
