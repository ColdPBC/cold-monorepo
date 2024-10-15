import { Injectable, Scope } from '@nestjs/common';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { ClassificationService } from './classification.service';
import { OpenAiBase64ImageUrl } from '../pinecone/pinecone.service';
import { BaseWorker, S3Service } from '@coldpbc/nest';
import { Queue } from 'bull';
import { ExtractionService } from '../extraction/extraction.service';
import { ExtractionJobPayload } from '../extraction/extraction.processor.service';
import { isImage } from '../utility';

@Injectable()
@Processor({ name: 'openai:classification' })
export class ClassificationProcessorService extends BaseWorker {
	constructor(
		@InjectQueue('openai:extraction') readonly extractionQueue: Queue,
		readonly classification: ClassificationService,
		readonly extraction: ExtractionService,
		readonly s3: S3Service,
	) {
		super(ClassificationProcessorService.name);
	}

	@Process('classify')
	async classifyDocumentJob(job: any) {
		const { filePayload, user, organization } = job.data;
		try {
			this.logger.info(`Classifying content for ${filePayload.original_name}`, { filePayload, user, organization });

			let openAiImageUrlContent: OpenAiBase64ImageUrl[] = [
				{
					type: 'text',
					text: await this.classification.getClassifyPrompt(organization),
				},
			];

			const extension = filePayload.key.split('.').pop().toLowerCase();

			const file = await this.s3.getObject(user, filePayload.bucket, filePayload.key);
			const fileBytes = await file.Body?.transformToByteArray();

			if (!fileBytes) {
				throw new Error('Failed to read file from S3');
			}

			// If original file was an image, convert it to base64
			if (isImage(extension)) {
				const binaryString = String.fromCharCode(...fileBytes);

				// Convert binary string to base64
				openAiImageUrlContent.push({
					type: 'image_url',
					image_url: { url: `data:image/${extension};base64,${btoa(binaryString)}` },
				});
			}

			let content: any;

			if (extension === 'pdf') {
				// Extract raw content from the document for classification
				content = await this.extraction.extractTextFromPDF(fileBytes, filePayload, user, organization);

				if (!content) {
					// attempt to convert pdf pages to array of OpenAI content objects which contain base64 image urls
					openAiImageUrlContent = await this.extraction.convertPDFPagesToImages(fileBytes, filePayload, user, organization);
				}
			}

			//base64Images = await this.extraction.processPdfPages(fileBytes, filePayload, user, organization);

			//extracted = await this.extraction.extractDataFromImages(base64Images, user, filePayload, organization);

			let classification: any;
			let extractionJobData = {} as ExtractionJobPayload;

			if (content) {
				// classify text content and add to extraction queue
				classification = await this.classification.classifyContent(content, user, filePayload, organization);
				extractionJobData = { content, extension, classification, filePayload, user, organization, attributes: this.classification.sus_attributes };
			} else if (openAiImageUrlContent.length > 0) {
				// classify image pages and add to extraction queue
				classification = await this.classification.classifyImageUrls(openAiImageUrlContent, user, filePayload, organization);
				extractionJobData = { extension, isImage: isImage(extension), classification, filePayload, user, organization, attributes: this.classification.sus_attributes };
			}

			await this.extractionQueue.add('extract', extractionJobData, { removeOnComplete: true, removeOnFail: true });
			this.logger.info(`Classification job for ${filePayload.original_name} completed`, { filePayload, user, organization });
			// done
			return {};
		} catch (e) {
			this.logger.info(e.message, e);

			return e;
		}
		/*

		const extractionPrompt = `${classification?.prompt} Please use the response_format to properly extract the content ${Array.isArray(content) ? content.join(' ') : content}`;

		if (extracted) {
			const parsed: any = typeof extracted === 'string' ? JSON.parse(extracted) : extracted;

			if (parsed.products && parsed.products.length > 0) {
				await this.productQueue.add('products', { content: extracted, user, organization });
			} else if (parsed.materials) {
				await this.materialQueue.add('materials', { content: extracted, user, organization });
			} else {
				await this.supplierQueue.add('suppliers', { content: extracted, user, organization });
			}
		}
		return extracted;

		/*if (extracted) {
			// Encode the JSON string to a byte array
			const encoder = new TextEncoder();
			encoder.encode(JSON.stringify(extracted));
		}*/
	}
}
