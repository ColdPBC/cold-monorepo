import { WorkerLogger } from '../logger';
import * as mqtt from 'mqtt';
import { get } from 'lodash';
import { init, isCuid } from '@paralleldrive/cuid2';
import { SecretsService } from '../secrets/secrets.service';
import * as z from 'zod';
export type MqttStatus = 'complete' | 'failed';
export type MqttAction = 'create' | 'update' | 'delete';
import { ss, secrets } from '../secrets/secrets.service';
import { cpus, freemem, hostname, loadavg, NetworkInterfaceInfo, totalmem } from 'os';

export enum MqttActionEnum {
	GET = 'get',
	CREATE = 'create',
	UPDATE = 'update',
	DELETE = 'delete',
}

export enum MqttStatusEnum {
	COMPLETE = 'complete',
	FAILED = 'failed',
	ACTIVE = 'active',
	QUEUED = 'queued',
	DELAYED = 'delayed',
	STALLED = 'stalled',
}

export const MqttActionSchema = z.nativeEnum(MqttActionEnum);
export const MqttStatusSchema = z.nativeEnum(MqttStatusEnum);

const payloadSchema = z
	.object({
		action: MqttActionSchema,
		status: MqttStatusSchema,
		data: z.any().optional(),
		swr_key: z.string(),
		org_id: z.string(),
		user: z.any(),
	})
	.strip();

export type MQTTPayloadType = z.infer<typeof payloadSchema>;

export class MqttService {
	private iotEndpoint = 'a2r4jtij2021gz-ats.iot.us-east-1.amazonaws.com';
	private clientId: string = hostname();
	mqttClient: mqtt.MqttClient | undefined;
	logger: WorkerLogger;
	entity: string;
	secrets: any;
	attempts: 0;
	constructor(entity: string) {
		this.entity = entity;
		const cuid = init({
			length: 24,
		});
		this.clientId = cuid();
		this.logger = new WorkerLogger(`mqtt-${entity}`);
		this.getResolvedSecrets();
	}

	async getResolvedSecrets() {
		this.secrets = await secrets();
		if (this.secrets && this.secrets.IOT_ENDPOINT) {
			this.iotEndpoint = this.secrets.IOT_ENDPOINT;
		}
		//await this.connect('MQTTService');
	}

	/**
	 * "x-auth0-domain": "dev-6qt527e13qyo4ls6.us.auth0.com",
	 *         "x-amz-customauthorizer-name": "mqtt_authorizer",
	 *         "x-cold-org": "org_VWv3Al9pLEI4CaOH",
	 *         "x-cold-env": "development",
	 * @param entity
	 */
	async connect(context?: any): Promise<mqtt.MqttClient> {
		if (!process.env.MQTT_PRIVATE_KEY) {
			throw new Error('MQTT_PRIVATE_KEY is missing');
		}
		if (!process.env.MQTT_CA_ROOT_1) {
			throw new Error('MQTT_CA_ROOT_1 is missing');
		}
		if (!process.env.MQTT_CA_ROOT_3) {
			throw new Error('MQTT_CA_ROOT_3 is missing');
		}
		if (!process.env.MQTT_CERT) {
			throw new Error('MQTT_CERT is missing');
		}

		if (this.mqttClient && this.mqttClient.connected) {
			return this.mqttClient;
		}

		const privateKey = process.env.MQTT_PRIVATE_KEY;
		const caRoot1 = process.env.MQTT_CA_ROOT_1;
		const caRoot3 = process.env.MQTT_CA_ROOT_3;
		const mqttcert = process.env.MQTT_CERT;
		const auth0Domain = process.env.AUTH0_DOMAIN || 'dev-6qt527e13qyo4ls6.us.auth0.com';

		if (!auth0Domain) {
			this.logger.warn('Auth0 domain environment variable is missing; defaulting to dev domain');
		}

		if (!privateKey || !caRoot1 || !caRoot3 || !mqttcert) {
			throw new Error('MQTT configuration is missing');
		}

		try {
			// Read your AWS IoT Core device certificate, private key, and CA certificate
			const cert = `${Buffer.from(mqttcert, 'base64')}`;
			const key = `${Buffer.from(privateKey, 'base64')}`;
			const ca = [`${Buffer.from(caRoot1, 'base64')}`, `${Buffer.from(caRoot3, 'base64')}`];

			this.mqttClient = mqtt.connect({
				wsOptions: {
					headers: {
						'x-auth0-domain': this.secrets.AUTH0_DOMAIN || 'dev-6qt527e13qyo4ls6.us.auth0.com',
						'x-amz-customauthorizer-name': 'mqtt_authorizer',
						'x-cold-org': `${context.context.user.organization.id}`,
						'x-cold-env': `${process.env.NODE_ENV || 'development'}`,
						token: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5Ea1BmUDhuQVpHamhhZ1E1TjMyTCJ9.eyJjb2xkY2xpbWF0ZV9jbGFpbXMiOnsiZW1haWwiOiJ0cm95Lm1vcnZhbnRAY29sZGNsaW1hdGUuY29tIiwiaWQiOiJnb29nbGUtb2F1dGgyfDEwNzMwMjA2OTc4MjQ4NzAyNDkzNiIsInJvbGVzIjpbImNvbGQ6YWRtaW4iXX0sImlzcyI6Imh0dHBzOi8vZGV2LTZxdDUyN2UxM3F5bzRsczYudXMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA3MzAyMDY5NzgyNDg3MDI0OTM2IiwiYXVkIjpbImh0dHBzOi8vYXBpLmNvbGRjbGltYXRlLnd0Zi8iLCJodHRwczovL2Rldi02cXQ1MjdlMTNxeW80bHM2LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MTQ2Mjk5NDEsImV4cCI6MTcxNDcxNjM0MSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyIsImF6cCI6IkFvY3lORXFCb2NLZm1VOUFIVXMwa29HZVo3M2xicmtGIiwicGVybWlzc2lvbnMiOlsiaW1wZXJzb25hdGUiLCJyZWFkOmFsbCIsIndyaXRlOmFsbCJdfQ.QWIXLNGQZrxyV61dXrMfDcEvJqrQA2F7BRfPEkFrZdzHBU7-A9BtDW0RZa4Mtx7cs_vPE-N80XLaRw3CWQrvxX3kQttmlpq6xlmfUZ2Qzv6mZ-6XHOc5DL1B33ElRj01pBRkjQwHKH8xsAXoBH7zb_F7PbEsX1-bwN9PnoJk9hr6x4k_F3ABN2yBHf-QCYPnAVMgjWWLkCbO5tbxK7wuOHe9zpphcPa74rKzKtoPiaGXchZPUjdQSNy-khO4ggF7PYyL_No0zJO-NNsdKgT8PIcnsCqj-uxTRmRKXgJ80bZdeT4x8tHdwMjmUue1AQeziLS_67s0eFLMl72UIYTq0w`,
					},
				},
				host: this.iotEndpoint,
				port: 8883,
				clientId: `${this.clientId}${new Date().getTime()}`,
				protocol: 'mqtts',
				protocolVersion: 5,
				key: key,
				cert: cert,
				ca: ca,
			});

			// Handle MQTT events
			this.mqttClient.on('connect', () => {
				this.logger.log(`Connected to AWS IoT Core as ${this.clientId}`);
			});

			this.mqttClient.on('error', error => {
				this.logger.error(error.message, error);
			});

			return this.mqttClient;
		} catch (e) {
			this.logger.error(e);
			throw e;
		}
	}

	subscribe(topic: string): void {
		if (this.mqttClient) {
			this.mqttClient.subscribe(`${topic}`);
			this.logger.log(`Subscribed to topic: ${topic}`);
		} else {
			this.logger.error('MQTT client is not connected');
		}
	}

	onMessage(callback: (topic: string, message: string, packet: any) => void): void {
		if (this.mqttClient) {
			this.mqttClient.on('message', (topic, message, packet) => {
				callback(topic, message.toString(), packet);
			});
		} else {
			this.logger.error('MQTT client is not connected');
		}
	}

	validate(payload: any) {
		return payloadSchema.parse(payload) as MQTTPayloadType;
	}

	/**
	 * Publishes message to the UI
	 * @param payload
	 */
	/*publishToUI(payload: MqttUIPayload): void {
		if (this.mqttClient) {
			if (typeof payload.user !== 'string' && payload.user['coldclimate_claims']) {
				payload.user = payload.user['coldclimate_claims']['email'];
			}

			const topic = `ui/${this.config.get('NODE_ENV', 'development')}/${payload.org_id}/${payload.user}`;

			this.publishMQTT('ui', payload, topic);
		} else {
			this.logger.error('MQTT client is not connected');
		}
	}*/

	/**
	 * Publish MQTT Message
	 * @param responseTopic | The topic to reply to
	 * @param payload
	 */
	/*replyTo(responseTopic: string, payload: any): void {
		try {
			if (this.mqttClient && responseTopic) {
				this.mqttClient.publish(responseTopic, JSON.stringify(payload), { qos: 0, retain: false });

				this.logger.log(`Published to topic: ${responseTopic}`);
			} else {
				this.logger.error('MQTT client is not connected');
			}
		} catch (e: any) {
			this.logger.error(e.message, e);
		}
	}*/

	/**
	 * Publish MQTT Message
	 * @param payload
	 * @param context
	 * @param topic (optional) | Overrides the topic that would be derived from the target
	 */
	async publishMQTT(payload: MQTTPayloadType, context: any, topic?: string): Promise<void> {
		try {
			if (!this.mqttClient || !this.mqttClient.connected) {
				this.mqttClient = await this.connect(context);
				while (!this.mqttClient.connected) {
					await new Promise(resolve => setTimeout(resolve, 5000 + this.attempts * 1000));
					this.attempts++;
					if (this.attempts > 10) {
						this.logger.error('Max failed attempts to connect to AWS IoT Core');
						break;
					}
				}

				this.attempts = 0;
			}
			const inputs = this.validate(payload);

			topic = topic ? topic : `ui/${process.env.NODE_ENV || 'development'}/${get(payload, 'org_id')}/${inputs.user}`;

			this.mqttClient.publish(topic, JSON.stringify(inputs));

			this.logger.log(`Published to topic: ${topic}`, { payload, ...context });
		} catch (e: any) {
			this.logger.error(e.message, e);
		}
	}

	disconnect(): void {
		if (this.mqttClient) {
			this.mqttClient.end();
			this.logger.log('Disconnected from AWS IoT Core');
		}
	}
}

const mqttService = new MqttService('GraphQL');

export { mqttService, secrets };
