import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { ExtractionService } from './extraction.service';
import { OpenAiBase64ImageUrl } from '../pinecone/pinecone.service';
import { S3Service } from '@coldpbc/nest';

@Injectable()
@Processor('openai:extraction')
export class ExtractionProcessorService {
	constructor(readonly extraction: ExtractionService, readonly s3: S3Service) {}

	@Process('extract')
	async processExtractionJob(job: any) {
		const { extension, bytes, filePayload, user, organization } = job.data;
		let base64Images: OpenAiBase64ImageUrl[] = [];

		if (extension === 'pdf') {
			const file = await this.s3.getObject(user, filePayload.bucket, filePayload.key);
			const fileBytes = await file.Body?.transformToByteArray();

			if (!fileBytes) {
				throw new Error('Failed to read file from S3');
			}

			let text = await this.extraction.extractTextFromPDF(fileBytes, filePayload, user, organization);

			if (text) {
				text = await this.extraction.extractDataFromContent(text, user, filePayload, organization);
				return text;
			} else {
				const file = await this.s3.getObject(user, filePayload.bucket, filePayload.key);
				const fileBytes = await file.Body?.transformToByteArray();

				if (!fileBytes) {
					throw new Error('Failed to read file from S3');
				}

				base64Images = await this.extraction.processPdfPages(fileBytes, filePayload, user, organization);
				text = await this.extraction.extractDataFromImages(base64Images, user, filePayload, organization);
				return text;
			}
		}

		const file = await this.s3.getObject(user, filePayload.bucket, filePayload.key);
		const fileBytes = await file.Body?.transformToByteArray();

		if (!fileBytes) {
			throw new Error('Failed to read file from S3');
		}

		base64Images = await this.extraction.processPdfPages(fileBytes, filePayload, user, organization);

		const extracted = await this.extraction.extractDataFromImages(base64Images, user, filePayload, organization);
		return extracted;

		/*if (extracted) {
			// Encode the JSON string to a byte array
			const encoder = new TextEncoder();
			encoder.encode(JSON.stringify(extracted));
		}*/
	}
}
