import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';
import { BaseWorker } from '../worker';
import { get } from 'lodash';
import { Cuid2Generator } from '../utility';
import { MqttSystemPayload, MqttUIPayload, MqttValidatorService } from './validator';

export type MqttStatus = 'complete' | 'failed';
export type MqttAction = 'create' | 'update' | 'delete';

@Global()
@Injectable()
export class MqttService extends BaseWorker implements OnModuleInit {
	private readonly iotEndpoint: string;
	private readonly clientId: string;
	mqttClient: mqtt.MqttClient | undefined;

	constructor(readonly config: ConfigService) {
		super(MqttService.name);
		const parts = config.getOrThrow('DD_SERVICE').split('-');
		if (parts.length < 2) throw new Error('Invalid DD_SERVICE');
		const pfxIdx = parts.length < 3 ? 1 : 2;
		const prefix = parts[pfxIdx].length < 7 ? parts[pfxIdx] : `${parts[pfxIdx].substring(0, 2)}${parts[pfxIdx].substring(parts[pfxIdx].length - 2, parts[pfxIdx].length)}`;
		this.iotEndpoint = this.config.get('IOT_ENDPOINT', 'a2r4jtij2021gz-ats.iot.us-east-1.amazonaws.com');
		this.clientId = new Cuid2Generator(prefix).scopedId;
	}

	override async onModuleInit(): Promise<void> {
		this.connect(MqttService.name);
	}

	/**
	 * "x-auth0-domain": "dev-6qt527e13qyo4ls6.us.auth0.com",
	 *         "x-amz-customauthorizer-name": "mqtt_authorizer",
	 *         "x-cold-org": "org_VWv3Al9pLEI4CaOH",
	 *         "x-cold-env": "development",
	 * @param className
	 */
	connect(className?: string, client_id?: string): mqtt.MqttClient {
		const privateKey = this.config['internalConfig']['MQTT_PRIVATE_KEY'];
		const caRoot1 = this.config['internalConfig']['MQTT_CA_ROOT_1'];
		const caRoot3 = this.config['internalConfig']['MQTT_CA_ROOT_3'];
		const mqttcert = this.config['internalConfig']['MQTT_CERT'];
		try {
			// Read your AWS IoT Core device certificate, private key, and CA certificate
			const cert = `${Buffer.from(mqttcert, 'base64')}`;
			const key = `${Buffer.from(privateKey, 'base64')}`;
			const ca = [`${Buffer.from(caRoot1, 'base64')}`, `${Buffer.from(caRoot3, 'base64')}`];

			this.mqttClient = mqtt.connect({
				wsOptions: {
					headers: {
						'x-auth0-domain': this.config.get('AUTH0_DOMAIN', 'dev-6qt527e13qyo4ls6.us.auth0.com'),
						'x-amz-customauthorizer-name': 'mqtt_authorizer',
						'x-cold-org': 'org_VWv3Al9pLEI4CaOH',
						'x-cold-env': 'development',
						token:
							'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5Ea1BmUDhuQVpHamhhZ1E1TjMyTCJ9.eyJjb2xkY2xpbWF0ZV9jbGFpbXMiOnsiZW1haWwiOiJ0cm95Lm1vcnZhbnRAY29sZGNsaW1hdGUuY29tIiwiaWQiOiJnb29nbGUtb2F1dGgyfDEwNzMwMjA2OTc4MjQ4NzAyNDkzNiIsInJvbGVzIjpbImNvbGQ6YWRtaW4iXX0sImlzcyI6Imh0dHBzOi8vZGV2LTZxdDUyN2UxM3F5bzRsczYudXMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA3MzAyMDY5NzgyNDg3MDI0OTM2IiwiYXVkIjpbImh0dHBzOi8vYXBpLmNvbGRjbGltYXRlLnd0Zi8iLCJodHRwczovL2Rldi02cXQ1MjdlMTNxeW80bHM2LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MTQ2Mjk5NDEsImV4cCI6MTcxNDcxNjM0MSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyIsImF6cCI6IkFvY3lORXFCb2NLZm1VOUFIVXMwa29HZVo3M2xicmtGIiwicGVybWlzc2lvbnMiOlsiaW1wZXJzb25hdGUiLCJyZWFkOmFsbCIsIndyaXRlOmFsbCJdfQ.QWIXLNGQZrxyV61dXrMfDcEvJqrQA2F7BRfPEkFrZdzHBU7-A9BtDW0RZa4Mtx7cs_vPE-N80XLaRw3CWQrvxX3kQttmlpq6xlmfUZ2Qzv6mZ-6XHOc5DL1B33ElRj01pBRkjQwHKH8xsAXoBH7zb_F7PbEsX1-bwN9PnoJk9hr6x4k_F3ABN2yBHf-QCYPnAVMgjWWLkCbO5tbxK7wuOHe9zpphcPa74rKzKtoPiaGXchZPUjdQSNy-khO4ggF7PYyL_No0zJO-NNsdKgT8PIcnsCqj-uxTRmRKXgJ80bZdeT4x8tHdwMjmUue1AQeziLS_67s0eFLMl72UIYTq0w',
					},
				},
				host: this.iotEndpoint,
				port: 8883,
				clientId: client_id || `${this.clientId}${new Date().getTime()}`,
				protocol: 'mqtts',
				protocolVersion: 5,
				key: key,
				cert: cert,
				ca: ca,
			});

			// Handle MQTT events
			this.mqttClient.on('connect', () => {
				this.logger.log(`${className} Connected to AWS IoT Core`);
				// You can subscribe to topics or perform other actions here
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

	/**
	 * Publishes message to the UI
	 * @param payload
	 */
	publishToUI(payload: MqttUIPayload): void {
		if (!this.mqttClient?.connected) {
			this.connect(MqttService.name);
		}

		if (typeof payload.user !== 'string' && payload.user['coldclimate_claims']) {
			payload.user = payload.user['coldclimate_claims']['email'];
		}

		const topic = `ui/${this.config.get('NODE_ENV', 'development')}/${payload.org_id}/${payload.user}`;

		this.publishMQTT('ui', payload, topic);
	}

	/**
	 * Publish MQTT Message
	 * @param responseTopic | The topic to reply to
	 * @param payload
	 */
	replyTo(responseTopic: string, payload: any): void {
		try {
			if (!this.mqttClient?.connected) {
				this.connect(MqttService.name);
			}

			if (responseTopic) {
				this.mqttClient?.publish(responseTopic, JSON.stringify(payload), { qos: 0, retain: false });

				this.logger.log(`Published to topic: ${responseTopic}`, { ...payload });
			}
		} catch (e: any) {
			this.logger.error(e.message, e);
		}
	}

	/**
	 * Publish MQTT Message
	 * @param target
	 * @param payload
	 * @param topic (optional) | Overrides the topic that would be derived from the target
	 */
	publishMQTT(target: 'public' | 'cold' | 'ui', payload: MqttSystemPayload | MqttUIPayload, topic?: string): void {
		try {
			const inputs = new MqttValidatorService(target, payload);

			switch (inputs.target) {
				case 'public':
				case 'cold':
					topic = topic ? topic : `system/${this.config.get('NODE_ENV', 'development')}/${inputs.target}/`;
					break;
				case 'ui':
					topic = topic ? topic : `ui/${this.config.get('NODE_ENV', 'development')}/${get(inputs.payload, 'org_id')}/${get(inputs.payload, 'user.coldclimate_claims.email')}`;
					break;
			}

			if (this.mqttClient && topic) {
				this.mqttClient.publish(topic, JSON.stringify(inputs.payload));

				this.logger.log(`Published to topic: ${topic}`, { ...inputs.payload });
			} else {
				this.logger.error('MQTT client is not connected');
			}
		} catch (e: any) {
			this.logger.error(e.message, e);
		}
	}

	/*/**
	 * target: 'public' | 'cold' | 'ui'
	 * Publishes system message
	 * @param payload*/

	publishSystemPublic(payload: MqttSystemPayload): void {
		if (this.mqttClient) {
			const topic = `system/${this.config.get('NODE_ENV', 'development')}/public`;

			this.publishMQTT('public', payload, topic);
		} else {
			this.logger.error('MQTT client is not connected');
		}
	}

	publishSystemCold(payload: MqttSystemPayload): void {
		if (this.mqttClient) {
			const topic = `system/${this.config.get('NODE_ENV', 'development')}/cold`;

			this.publishMQTT('cold', payload, topic);

			this.logger.log(`Published to system topic: ${topic}`, payload);
		} else {
			this.logger.error('MQTT client is not connected');
		}
	}

	disconnect(): void {
		if (this.mqttClient) {
			this.mqttClient.end();
			this.logger.log('Disconnected from AWS IoT Core');
		}
	}
}
