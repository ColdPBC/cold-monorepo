import { Injectable } from '@nestjs/common';
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, OnQueueProgress, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import OpenAI, { UnprocessableEntityError } from 'openai';
import { AppService } from './app.service';
import { AssistantService } from './assistant/assistant.service';
import { BaseWorker, CacheService, ComplianceSectionsCacheRepository, DarklyService, MqttService, PrismaService } from '@coldpbc/nest';
import { FileService } from './assistant/files/file.service';
import { ConfigService } from '@nestjs/config';
import { ChatService } from './chat/chat.service';
import { PineconeService } from './pinecone/pinecone.service';
import { ClassificationService } from './extraction/classification.service';
import { ExtractionService } from './extraction/extraction.service';

@Injectable()
@Processor('openai')
export class JobConsumer extends BaseWorker {
	client: OpenAI;
	started: Date;

	constructor(
		readonly config: ConfigService,
		readonly appService: AppService,
		readonly assistant: AssistantService,
		readonly fileService: FileService,
		readonly cache: CacheService,
		readonly loader: PineconeService,
		readonly extraction: ExtractionService,
		readonly darkly: DarklyService,
		readonly chat: ChatService,
		readonly mqtt: MqttService,
		readonly prisma: PrismaService,
		readonly complianceSectionsCacheRepository: ComplianceSectionsCacheRepository,
	) {
		super(JobConsumer.name);
		this.client = new OpenAI({
			organization: this.config.getOrThrow('OPENAI_ORG_ID'),
			apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
		});
	}

	@Process('openai')
	async process(job: Job) {
		this.logger.info(`Received job ${job.id} of type ${job.name}`);
		switch (job.name) {
			case 'file.delete':
				return this.deleteFileJob(job);
			case 'file.uploaded':
				return this.processFileJob(job);
			case 'compliance_automation.enabled':
				return this.processCompliance(job);
			case 'survey':
				return this.processCompliance(job);
			default: {
				const message = `Unknown job type ${job.name}`;
				const apiError = new UnprocessableEntityError(422, undefined, message, undefined);
				this.logger.error(apiError.message, { error: apiError, id: job.id, data: job.data });
				throw apiError;
			}
		}
	}

	@Process('organization.created')
	async processOrganizationCreated(job: Job) {
		this.logger.info(`Received ${job.name} job: ${job.id} `);
		return this.appService.createAssistant(job.data);
	}

	@Process('file.uploaded')
	async processFileJob(job: Job) {
		const processed = await this.loader.ingestData(job.data.user, job.data.organization, job.data.payload);

		await job.progress(50);
		//this.fileService.uploadOrgFilesToOpenAI(job);
		if (!processed?.bytes || !processed?.filePayload || !processed?.user || !processed?.organization) {
			throw new Error('Failed to process file, missing required data');
		}
		const text = await this.extraction.extractTextFromPDF(processed.bytes, processed?.filePayload, processed?.user, processed?.organization);

		if (!text) {
			const base64Images = await this.extraction.processPdfPages(processed.bytes, processed.filePayload, processed.user, processed.organization);

			const extracted = await this.extraction.extractDataFromImages(base64Images, processed.user, processed.filePayload, processed.organization);

			if (extracted) {
				// Encode the JSON string to a byte array
				const encoder = new TextEncoder();
				processed.bytes = encoder.encode(JSON.stringify(extracted));
			}
		}
	}

	@Process('file.deleted')
	async deleteFileJob(job: Job) {
		const { vectors } = job.data.payload;
		const index = await this.loader.getIndex();

		if (Array.isArray(vectors)) {
			const deleted: any = [];
			for (const vector of vectors) {
				await index.namespace(job.data.organization.name).deleteOne(vector.id);
				deleted.push(vector.id);
			}
		}
		return this.fileService.deleteFile(job.data.user, job.data.integration.id, job.data.payload.key);
	}

	@Process('compliance_flow.enabled')
	async processComplianceFlow(job: Job) {
		try {
			this.logger.info(`Received ${job.name} job: ${job.id} `);
			await this.chat.process_compliance(job);
		} catch (e) {
			this.logger.error(e.message, e);
			throw e;
		}
	}

	@Process('compliance_automation.enabled')
	async processCompliance(job: Job) {
		try {
			this.logger.info(`Received ${job.name} job: ${job.id} `);

			await this.chat.process_compliance_set(job);
		} catch (e) {
			this.logger.error(e.message, e);
			throw e;
		}
	}

	@OnQueueActive()
	async onActive(job: Job) {
		const message = `Processing ${job.name} | id: ${job.id} | started: ${new Date(job.processedOn || 0).toUTCString()}`;
		this.logger.info(message, { ...job.data });
		await job.log(message);
	}

	@OnQueueFailed()
	async onFailed(job: Job) {
		const jobs = (await this.cache.get(`organizations:${job.data.organization.id}:jobs:${job.name}:${job.data.payload?.compliance?.compliance_id}`)) as number[];
		const { organization, user, payload } = job.data;

		if (Array.isArray(jobs) && jobs.length > 0) {
			jobs.splice(jobs.indexOf(typeof job.id === 'number' ? job.id : parseInt(job.id)), 1);
		}

		if (job.name === 'file.uploaded') {
			await this.prisma.organization_files.update({
				where: {
					id: job.data.payload.id,
				},
				data: {
					metadata: {
						status: 'failed',
						reason: job.failedReason,
					},
				},
			});
		}

		if (job?.failedReason?.startsWith('FATAL:')) {
			await job.discard();
		} else {
			const message = `Job FAILED | id: ${job.id} reason: ${job.failedReason} | ${this.getTimerString(job)}`;
			this.logger.error(message, { ...job.data });
			await job.log(message);
		}
	}

	@OnQueueCompleted()
	async onCompleted(job: Job) {
		const jobs = (await this.cache.get(`organizations:${job.data.organization.id}:jobs:${job.name}:${job.data.payload.compliance?.compliance_id}`)) as number[];
		if (jobs) {
			jobs.splice(jobs.indexOf(typeof job.id === 'number' ? job.id : parseInt(job.id)), 1);

			await this.cache.set(`organizations:${job.data.organization.id}:jobs:${job.name}::${job.data.payload.compliance?.compliance_id}`, jobs, { ttl: 60 * 60 * 24 * 7 });
		}

		this.logger.info(`${job.name} Job COMPLETED | id: ${job.id} completed_on: ${new Date(job.finishedOn || 0).toUTCString()} | ${this.getTimerString(job)}`);
	}

	@OnQueueProgress()
	async onProgress(job: Job) {
		const message = `${job.name} Job PROGRESS | id: ${job.id} progress: ${(await job.progress()) * 100}% | ${this.getTimerString(job)}`;
		this.logger.info(message, { ...job.data });
		await job.log(message);
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
