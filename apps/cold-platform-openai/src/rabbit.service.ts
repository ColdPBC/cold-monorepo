import { Injectable } from '@nestjs/common';
import { BackOffStrategies, BaseWorker, CacheService, PrismaService, RabbitMessagePayload, S3Service } from '@coldpbc/nest';
import { Nack, RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { PineconeService } from './pinecone/pinecone.service';
import { ChatService } from './chat/chat.service';
import { set } from 'lodash';

/**
 * RabbitService class.
 */
@Injectable()
export class RabbitService extends BaseWorker {
	constructor(
		@InjectQueue('openai') readonly queue: Queue,
		@InjectQueue('openai_crawler') readonly crawlerQueue: Queue,
		readonly config: ConfigService,
		readonly appService: AppService,
		readonly prisma: PrismaService,
		readonly s3: S3Service,
		readonly cache: CacheService,
		readonly pc: PineconeService,
		readonly chatService: ChatService,
	) {
		super(RabbitService.name);
	}

	/**
	 * Handles RPC messages received from RabbitMQ.
	 *
	 * @param data.msg - The RPC message in string format.
	 *
	 * @return - A Promise that resolves to the response of the RPC message.
	 *          The response will be of type unknown.
	 *          If the RPC message is valid and the action is recognized, the response will be the result of the corresponding action.
	 *          If the RPC message is invalid or the action is unknown, an error response will be returned.
	 * @param msg
	 */
	@RabbitRPC({
		exchange: 'amq.direct',
		routingKey: `cold.platform.openai.rpc`,
		queue: `cold.platform.openai.rpc`,
		allowNonJsonMessages: false,
	})
	async handleRPCMessages(msg: RabbitMessagePayload): Promise<any | Nack> {
		try {
			const parsed: unknown = msg.data || msg;
			this.logger.info(`received RPC ${msg.event} request from ${msg.from}`);

			return this.processRPCMessage(msg.event, msg.from, parsed);
		} catch (err) {
			this.logger.error(err.message, { error: err, data: JSON.parse(msg.data) });
			return new Nack();
		}
	}

	/**
	 * Handles async messages received from RabbitMQ.
	 *
	 * @param {object} msg - The data object containing the message.
	 * @param {string} msg.data - The message received from RabbitMQ.
	 * @param {string} msg.from - The name of the service that sent the message.
	 * @param {string} msg.action - The action to be performed.
	 *
	 * @returns {Promise<unknown>} - A Promise representing the result of handling the message.
	 */
	@RabbitSubscribe({
		exchange: 'amq.direct',
		routingKey: `cold.platform.openai`,
		queue: `cold.platform.openai`,
		allowNonJsonMessages: false,
	})
	async handleAsyncMessages(msg: RabbitMessagePayload): Promise<void | Nack> {
		try {
			msg.data = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;
			this.logger.info(`received async ${msg.event} request from ${msg.from}`);

			await this.processAsyncMessage(msg.event, msg.from, msg.data);

			return new Nack();
		} catch (err) {
			return new Nack();
		}
	}

	async processRPCMessage(event: string, from: string, parsed: any) {
		try {
			this.logger.info(`Processing ${event} event triggered by ${parsed.user?.coldclimate_claims?.email} from ${from}`);

			switch (event) {
				case 'openai_question.sent': {
					const response = await this.chatService.askRawQuestion(from, parsed);
					return response;
					break;
				}
				case 'organization.created': {
					if (parsed.organization.website) {
						await this.crawlerQueue.add(
							event,
							{ url: parsed.organization.website, depth: 0 },
							{
								priority: 200,
								removeOnFail: true,
								removeOnComplete: true,
							},
						);
					}
					return {};
				}
				case 'organization.deleted': {
					let assistant, pinecone;
					try {
						assistant = await this.appService.deleteAssistant(parsed);
					} catch (e) {
						this.logger.error(e.message, { ...e });
					}
					try {
						pinecone = await this.pc.deleteIndex(parsed.organization.name);
					} catch (e) {
						this.logger.error(e.message, { ...e });
					}
					return { assistant, pinecone };
				}
				case 'file.uploaded': {
					//await this.pc.ingestData(parsed.user, parsed.organization, parsed.payload);
					//return await this.files.uploadOrgFilesToOpenAI(parsed);
					return;
				}
			}
		} catch (e) {
			this.logger.error(e.message, { e, event, from, parsed });
			throw e;
		}
	}

	// @ts-expect-error - Fix this later
	async processAsyncMessage(event: string, from: string, parsed: any) {
		const { user } = parsed;

		// the API is inconsistent in the payload key and calling the service twice
		if (parsed.payload) {
			set(parsed, 'file', parsed.payload);
		} else if (!parsed.file) {
			throw new Error('No file provided');
		}

		this.logger.info(`Processing ${event} event triggered by ${user?.coldclimate_claims?.email} from ${from}`, {
			...parsed,
		});

		switch (event) {
			case 'organization.updated': {
				if (parsed.organization.website) {
					let url = parsed.organization.website;
					if (url.indexOf('/') === url.length - 1) {
						url = url.slice(0, -1);
					}
					await this.crawlerQueue.add(
						event,
						{
							url: parsed.organization.website,
							depth: 0,
							priority: 200,
							...parsed,
						},
						{ removeOnFail: false, removeOnComplete: false },
					);
					this.logger.info(`Crawling ${url}`);
				}
				return { message: 'Organization updated' };
			}
			case 'organization.created': {
				try {
					const pcResponse = await this.pc.getIndexDetails();
					//const response = await this.appService.createAssistant(parsed);
					if (parsed.organization.website) {
						let url = parsed.organization.website;
						if (url.indexOf('/') === url.length - 1) {
							url = url.slice(0, -1);
						}
						await this.crawlerQueue.add(
							event,
							{
								url: parsed.organization.website,
								depth: 0,
								priority: 200,
								...parsed,
							},
							{ removeOnFail: true, removeOnComplete: true },
						);
					}
					return { pinecone: pcResponse, assistant: {} };
				} catch (e) {
					this.logger.error('Failed to create Pinecone index', e);
					throw e;
				}
			}
			case 'organization.deleted': {
				let pcResponse, response;

				try {
					await this.pc.deleteNamespace(parsed.organization.name);
					this.logger.info('Pinecone namespace deleted', pcResponse);
				} catch (e) {
					this.logger.error('Failed to delete Pinecone index', e);
				}
				try {
					response = await this.appService.deleteAssistant(parsed);
					this.logger.info('OpenAI Assistant deleted', response);
				} catch (e) {
					this.logger.error('Failed to delete OpenAI Assistant', e);
				}

				return { assistant: response, pinecone: pcResponse };
			}
			case 'compliance_flow.enabled': {
				const complianceJob = await this.queue.add(
					'compliance_flow.enabled',
					{
						user,
						payload: parsed.payload,
						organization: parsed.organization,
						integration: parsed.integration,
					},
					{ backoff: { type: BackOffStrategies.EXPONENTIAL }, removeOnComplete: true, priority: 10 },
				);

				this.logger.info(`Compliance flow job created: ${complianceJob.id}`, {
					user,
					compliance: parsed.payload?.compliance?.name | parsed.payload?.compliance?.compliance_definition_name,
					organization: parsed.organization,
				});
				break;
			}
			case 'compliance_automation.enabled':
				{
					let surveys;
					if (parsed.surveys) {
						surveys = parsed.surveys;
					} else {
						surveys = parsed.payload.surveys;
					}

					try {
						for (const survey of surveys) {
							let jobs: number[] = (await this.cache.get(`jobs:${event}:${parsed.organization.id}:${parsed.payload.compliance?.compliance_id}`)) as number[];

							if (typeof jobs === 'string') {
								jobs = JSON.parse(jobs) as [];
							} else if (!jobs) {
								jobs = [];
							}

							const job = await this.queue.add(
								event,
								{
									survey,
									user,
									on_update_url: parsed.payload.on_update_url,
									integration: parsed.integration,
									payload: parsed.payload,
									organization: parsed.organization,
								},
								{ backoff: { type: BackOffStrategies.EXPONENTIAL }, removeOnComplete: true, priority: 10 },
							);

							jobs.push(typeof job.id === 'number' ? job.id : parseInt(job.id));

							await this.cache.set(`jobs:${event}:${parsed.organization.id}:${parsed.payload.compliance?.compliance_id}`, jobs, { ttl: 60 * 60 * 24 * 7 });
						}
					} catch (e) {
						this.logger.error(e.message, e);
					}
				}
				break;
			case 'file.uploaded':
				return await this.queue.add(event, parsed, {
					removeOnFail: false,
					removeOnComplete: true,
					priority: 5,
					backoff: { type: BackOffStrategies.EXPONENTIAL },
				});

			case 'file.deleted':
				return await this.queue.add(event, parsed, {
					removeOnFail: true,
					removeOnComplete: true,
					priority: 5,
					backoff: { type: BackOffStrategies.EXPONENTIAL },
				});

			default:
				return new Nack();
		}
	}
}
