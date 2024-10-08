import { Injectable, Scope } from '@nestjs/common';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { ExtractionService } from './extraction.service';
import { OpenAiBase64ImageUrl } from '../pinecone/pinecone.service';
import { BaseWorker, IAuthenticatedUser, S3Service } from '@coldpbc/nest';
import { Queue } from 'bull';
import { organization_files, organizations } from '@prisma/client';

export interface ExtractionJobPayload {
	extension: string;
	isImage?: boolean;
	classification: any;
	filePayload: organization_files;
	user: IAuthenticatedUser;
	organization: organizations;
	content?: string;
	openAiImageUrlContent?: OpenAiBase64ImageUrl[];
}

@Injectable()
@Processor({ name: 'openai:extraction', scope: Scope.REQUEST })
export class ExtractionProcessorService extends BaseWorker {
	constructor(
		@InjectQueue('openai:products') readonly productQueue: Queue,
		@InjectQueue('openai:materials') readonly materialQueue: Queue,
		@InjectQueue('openai:suppliers') readonly supplierQueue: Queue,
		readonly extraction: ExtractionService,
		readonly s3: S3Service,
	) {
		super(ExtractionProcessorService.name);
	}

	@Process('extract')
	async processExtractionJob(job: any) {
		const { extension, classification, content, isImage, filePayload, user, organization } = job.data;

		this.logger.info(`Extracting data from ${filePayload.original_name}`, { extension, classification, filePayload, user, organization });

		try {
			let extracted: any;

			if (content) {
				extracted = await this.extraction.extractDataFromContent(content, classification, user, filePayload, organization);
			} else {
				extracted = await this.extraction.extractDataFromImages(classification, extension, isImage, user, filePayload, organization);
			}

			if (extracted) {
				const parsed: any = typeof extracted === 'string' ? JSON.parse(extracted) : extracted;

				if (parsed.products && parsed.products.length > 0) {
					await this.productQueue.add('products', { content: extracted, user, organization }, { removeOnComplete: true, removeOnFail: true });
				} else if (parsed.materials) {
					await this.materialQueue.add('materials', { content: extracted, user, organization }, { removeOnComplete: true, removeOnFail: true });
				} else {
					await this.supplierQueue.add('suppliers', { content: extracted, user, organization }, { removeOnComplete: true, removeOnFail: true });
				}
			}
			return {};
		} catch (e) {
			this.logger.error(e.message, { error: e, filePayload, user, organization, classification });
			throw e;
		}

		/*if (extracted) {
			// Encode the JSON string to a byte array
			const encoder = new TextEncoder();
			encoder.encode(JSON.stringify(extracted));
		}*/
	}
}
