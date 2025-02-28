import { Injectable, Scope } from '@nestjs/common';
import { InjectQueue, OnQueueCompleted, OnQueueFailed, OnQueueProgress, Process, Processor } from '@nestjs/bull';
import { ClassificationService } from './classification.service';
import { BaseWorker, EventService, MqttService, PrismaService, S3Service } from '@coldpbc/nest';
import { Job, Queue } from 'bull';
import { isImage } from '../utility';
import { organization_files, processing_status } from '@prisma/client';
import { omit } from 'lodash';
import { ExtractionService } from '../extraction/extraction.service';
import { ExtractionJobPayload } from '../extraction/extraction.processor.service';
import { PineconeService } from '../pinecone/pinecone.service';

@Injectable()
@Processor({ name: 'openai:classification' })
export class ClassificationProcessorService extends BaseWorker {
	constructor(
		readonly pinecone: PineconeService,
		readonly classification: ClassificationService,
		readonly extraction: ExtractionService,
		readonly s3: S3Service,
		readonly events: EventService,
		readonly prisma: PrismaService,
		readonly mqtt: MqttService,
	) {
		super(ClassificationProcessorService.name);
	}

	async onModuleInit(): Promise<void> {
		super.onModuleInit();
	}

	@OnQueueProgress()
	async onProgress(job: Job) {
		const message = `${job.name} Job PROGRESS | id: ${job.id} progress: ${(await job.progress()) * 100}% | ${this.getTimerString(job)}`;
		this.logger.info(message, { ...job.data });
		await job.log(message);
	}

	@OnQueueCompleted()
	async onCompleted(job: Job) {
		this.logger.info(`${job.name} Job COMPLETED | id: ${job.id} completed_on: ${new Date(job.finishedOn || 0).toUTCString()} | ${this.getTimerString(job)}`);

		const { file, user, organization } = job.data;

		const orgFile = (await this.prisma.organization_files.findUnique({
			where: {
				id: file.id,
			},
		})) as organization_files;

		if (!orgFile) {
			throw new Error('File not found');
		}
		// update the file metadata with the classification
		const updateData: any = {
			processing_status: processing_status.AI_PROCESSING,
			metadata: {
				status: 'ai_classified',
			},
		};

		await this.prisma.organization_files.update({
			where: {
				id: orgFile.id,
			},
			data: updateData,
		});

		// Trigger extraction job if classification is complete
		if (job.name === 'classify') {
			const response = await this.pinecone.ingestData(user, organization, file);
			this.logger.info(`Ingested file ${file.original_name} for ${organization.name}`, omit(response, ['bytes']));

			// update the file metadata with the classification
			const updateData: any = {
				processing_status: processing_status.IMPORT_COMPLETE,
			};

			await this.prisma.organization_files.update({
				where: {
					id: orgFile.id,
				},
				data: updateData,
			});
		}

		const extension = orgFile?.original_name?.split('.').shift();

		this.metrics.increment(`cold.platform.openai.${job.name}`, 1, {
			status: 'complete',
			file_type: orgFile.type,
			extension: extension ? extension : 'unknown',
			organization: organization.id,
			organization_name: organization.name,
			user: user.coldclimate_claims.email,
		});
	}

	@OnQueueFailed()
	async onFailed(job: Job) {
		if (!job?.name) {
			this.logger.error(`Job name not found`, job);
			return;
		}
		this.logger.info(`${job.name} Job FAILED | ${job.failedReason}| id: ${job.id} failed_on: ${new Date().toUTCString()} | ${this.getTimerString(job)}`);
		const { organization, user, file } = job.data;
		const metadata = file.metadata as any;

		try {
			const orgFile = await this.prisma.organization_files.update({
				where: {
					id: file.id,
				},
				data: {
					processing_status: 'PROCESSING_ERROR',
					metadata: {
						status: 'failed',
						error: job.failedReason,
						...metadata,
					},
				},
			});
		} catch (e) {
			this.logger.error(e.message, e);
		}

		/*this.mqtt.publishToUI({
			action: 'update',
			status: 'failed',
			resource: 'organization_files',
			event: 'classify-file',
			data: orgFile,
			user,
			swr_key: `organization_files.PROCESSING_ERROR`,
			org_id: organization.id,
		});*/

		await this.events.sendAsyncEvent('cold.core.linear.events', processing_status.PROCESSING_ERROR, { error: job.failedReason, orgFile: file, user, organization });

		const extension = file?.original_name?.split('.').shift();

		this.metrics.increment(`cold.platform.openai.${job.name}`, 1, {
			status: 'complete',
			file_type: file.type,
			extension: extension ? extension : 'unknown',
			organization: organization.id,
			organization_name: organization.name,
			user: user.coldclimate_claims.email,
		});
	}

	@Process('classify')
	async classifyDocumentJob(job: any) {
		const { file, user, organization } = job.data;
		const filePayload = file;
		try {
			this.logger.info(`Classifying content for ${filePayload.original_name}`, { filePayload, user, organization });

			const orgFile = await this.prisma.organization_files.findUnique({
				where: {
					id: filePayload.id,
				},
			});

			if (!orgFile) {
				throw new Error('File not found');
			}

			if (filePayload.processing_status !== processing_status.AI_PROCESSING) {
				await this.prisma.organization_files.update({
					where: {
						organization_id: organization.id,
						id: filePayload.id,
					},
					data: {
						processing_status: processing_status.AI_PROCESSING,
					},
				});
			}

			let openAiImageUrlContent: any[] = [
				{
					type: 'text',
					text: await this.classification.getClassifyPrompt(organization),
				},
			];

			const extension = filePayload.key.split('.').pop().toLowerCase();

			const s3Reponse = await this.s3.getObject(user, filePayload.bucket, filePayload.key);
			const fileBytes = await s3Reponse.Body?.transformToByteArray();

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
				content = await this.extraction.extractTextFromPDF(fileBytes, orgFile, user, organization);

				// no text content extracted from pdf, attempt to convert pdf pages to array of OpenAI content objects which contain base64 image urls
				if (!content) {
					// attempt to convert pdf pages to array of OpenAI content objects which contain base64 image urls
					openAiImageUrlContent = await this.extraction.convertPDFPagesToImages(fileBytes, orgFile, user, organization);
				}
			}

			//base64Images = await this.extraction.processPdfPages(fileBytes, filePayload, user, organization);

			//extracted = await this.extraction.extractDataFromImages(base64Images, user, filePayload, organization);

			let classification: any;
			let extractionJobData = {} as ExtractionJobPayload;
			let containsBinaryData = false;

			if (content) {
				for (const item of content) {
					if (this.likelyBinary(item)) {
						containsBinaryData = true;

						openAiImageUrlContent.push({
							type: 'image_url',
							image_url: { url: `data:image/${extension};base64,${btoa(item)}` },
						});
					}
				}
				if (!containsBinaryData) {
					// classify text content and add to extraction queue
					classification = await this.classification.classifyContent(content, user, orgFile, organization);
					extractionJobData = {
						content,
						extension,
						classification,
						filePayload: orgFile,
						user,
						organization,
						attributes: this.classification.sus_attributes,
					};
				} else if (openAiImageUrlContent.length > 0) {
					// classify image pages and add to extraction queue
					classification = await this.classification.classifyImageUrls(openAiImageUrlContent, user, orgFile, organization);
					extractionJobData = {
						extension,
						isImage: isImage(extension),
						classification,
						filePayload: orgFile,
						user,
						organization,
						attributes: this.classification.sus_attributes,
					};
				}
			}

			await this.prisma.organization_files.update({
				where: {
					organization_id: organization.id,
					id: filePayload.id,
				},
				data: {
					type: classification.type,
					metadata: {
						classification: omit(classification, ['extraction_name', 'extraction_schema']),
						...(orgFile.metadata as object),
					},
				},
			});

			this.logger.info(`Classification job for ${orgFile.original_name} completed`, { orgFile, user, organization });
			await this.onCompleted(job);
			// classification done
		} catch (e) {
			this.logger.info(e.message, e);

			if (e.message === 'File not found') {
				job.discard({ message: e.message });
			} else {
				job.moveToFailed({ message: e.message }, true);
			}

			//await this.onFailed(job);
			//await this.onFailed(job);
			throw e;
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

	likelyBinary(content: string) {
		let nonPrintableCount = 0;

		for (let i = 0; i < content.length; i++) {
			const charCode = content.charCodeAt(i);
			if (charCode < 32 && ![9, 10, 13].includes(charCode)) {
				nonPrintableCount++;
			}
		}

		return nonPrintableCount / content.length > 0.2;
	}

	getTimerString(job: Job) {
		if (job.finishedOn) {
			return `Duration: ${this.getDuration(job)} seconds`;
		} else {
			return `Elapsed: ${(new Date().getTime() - (job.processedOn || 0)) / 1000} seconds`;
		}
	}

	getDuration(job: Job) {
		const finishedOn = new Date(job.finishedOn || 0).getTime();
		const processedOn = new Date(job.processedOn || 0).getTime();
		return (finishedOn - processedOn) / 1000;
	}
}
