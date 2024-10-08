import { Injectable } from '@nestjs/common';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { ExtractionService } from './extraction.service';
import { OpenAiBase64ImageUrl } from '../pinecone/pinecone.service';
import { S3Service } from '@coldpbc/nest';
import { Queue } from 'bull';

@Injectable()
@Processor('openai:extraction')
export class ExtractionProcessorService {
	constructor(
		@InjectQueue('openai:products') readonly productQueue: Queue,
		@InjectQueue('openai:materials') readonly materialQueue: Queue,
		@InjectQueue('openai:suppliers') readonly supplierQueue: Queue,
		readonly extraction: ExtractionService,
		readonly s3: S3Service,
	) {}

	@Process('extract')
	async processExtractionJob(job: any) {
		const { extension, bytes, filePayload, user, organization } = job.data;
		let base64Images: OpenAiBase64ImageUrl[] = [];

		let extracted: string | null;

		const file = await this.s3.getObject(user, filePayload.bucket, filePayload.key);
		const fileBytes = await file.Body?.transformToByteArray();
		if (!fileBytes) {
			throw new Error('Failed to read file from S3');
		}

		if (extension === 'pdf') {
			const file = await this.s3.getObject(user, filePayload.bucket, filePayload.key);
			const fileBytes = await file.Body?.transformToByteArray();

			if (!fileBytes) {
				throw new Error('Failed to read file from S3');
			}

			const text = await this.extraction.extractTextFromPDF(fileBytes, filePayload, user, organization);

			if (text) {
				extracted = await this.extraction.extractDataFromContent(text, user, filePayload, organization);
			} else {
				const file = await this.s3.getObject(user, filePayload.bucket, filePayload.key);
				const fileBytes = await file.Body?.transformToByteArray();

				if (!fileBytes) {
					throw new Error('Failed to read file from S3');
				}

				base64Images = await this.extraction.processPdfPages(fileBytes, filePayload, user, organization);
				extracted = await this.extraction.extractDataFromImages(base64Images, user, filePayload, organization);
			}
		}

		if (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg' || extension.toLowerCase() === 'png') {
			const binaryString = String.fromCharCode(...fileBytes);

			// Convert binary string to base64
			base64Images.push({
				type: 'image_url',
				image_url: { url: `data:image/${extension};base64,${btoa(binaryString)}` },
			});
		}

		//base64Images = await this.extraction.processPdfPages(fileBytes, filePayload, user, organization);

		extracted = await this.extraction.extractDataFromImages(base64Images, user, filePayload, organization);

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
