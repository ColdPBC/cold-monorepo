import { Injectable, Scope } from '@nestjs/common';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { ExtractionService } from './extraction.service';
import { OpenAiBase64ImageUrl } from '../pinecone/pinecone.service';
import { BaseWorker, EventService, IAuthenticatedUser, MqttService, PrismaService, S3Service } from '@coldpbc/nest';
import { Queue } from 'bull';
import { organization_files, organizations, processing_status, sustainability_attributes } from '@prisma/client';

export interface ExtractionJobPayload {
	extension: string;
	isImage?: boolean;
	classification: any;
	filePayload: organization_files;
	user: IAuthenticatedUser;
	organization: organizations;
	content?: string;
	openAiImageUrlContent?: OpenAiBase64ImageUrl[];
	attributes: sustainability_attributes[];
}

@Injectable()
@Processor('openai:extraction')
export class ExtractionProcessorService extends BaseWorker {
	constructor(
		@InjectQueue('openai:products') readonly productQueue: Queue,
		@InjectQueue('openai:materials') readonly materialQueue: Queue,
		@InjectQueue('openai:suppliers') readonly supplierQueue: Queue,
		readonly extraction: ExtractionService,
		readonly s3: S3Service,
		readonly events: EventService,
		readonly prisma: PrismaService,
		readonly mqtt: MqttService,
	) {
		super(ExtractionProcessorService.name);
	}

	@Process('extract')
	async processExtractionJob(job: any) {
		const { extension, classification, content, isImage, filePayload, user, organization, attributes, suppliers } = job.data;

		this.logger.info(`Extracting data from ${filePayload.original_name}`, { extension, classification, filePayload, user, organization });

		try {
			let extracted: any;

			if (content) {
				extracted = await this.extraction.extractDataFromContent(content, classification, user, filePayload, organization, attributes, suppliers);
			} else {
				extracted = await this.extraction.extractDataFromImages(classification, extension, isImage, user, filePayload, organization, attributes, suppliers);
			}

			if (extracted) {
				const parsed: any = typeof extracted === 'string' ? JSON.parse(extracted) : extracted;

				// comment out product/supplier/material creation since that's being handled manually now
				if (parsed.products && parsed.products.length > 0) {
					//	await this.productQueue.add('products', { content: extracted, user, filePayload, organization }, { removeOnComplete: true, removeOnFail: true });
				} else if (parsed.materials) {
					//	await this.materialQueue.add('materials', { content: extracted, user, filePayload, organization }, { removeOnComplete: true, removeOnFail: true });
				} else if (parsed.supplier && parsed.supplier.name) {
					//	await this.supplierQueue.add('suppliers', { content: extracted, user, filePayload, organization }, { removeOnComplete: true, removeOnFail: true });
				}
			}

			if (filePayload.processing_status !== processing_status.AI_PROCESSING) {
				await this.prisma.organization_files.update({
					where: {
						organization_id: organization.id,
						id: filePayload.id,
					},
					data: {
						processing_status: processing_status.IMPORT_COMPLETE,
					},
				});
			}

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

			return {};
		} catch (e) {
			this.logger.error(e.message, { error: e, filePayload, user, organization, classification });

			await this.events.sendAsyncEvent('cold.core.linear.events', processing_status.PROCESSING_ERROR, { error: JSON.stringify(e), orgFile: filePayload, user, organization });

			await this.prisma.organization_files.update({
				where: {
					organization_id: organization.id,
					id: filePayload.id,
				},
				data: {
					processing_status: processing_status.PROCESSING_ERROR,
				},
			});

			throw e;
		}
	}
}
