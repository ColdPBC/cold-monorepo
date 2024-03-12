import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';
import { BaseWorker } from '../worker';
import { get } from 'lodash';
import { Cuid2Generator } from '../utility';
import { MqttSystemPayload, MqttUIPayload, MqttValidatorService } from './validator/mqtt.validator.service';

export type MqttStatus = 'complete' | 'failed';
export type MqttAction = 'create' | 'update' | 'delete';

@Global()
@Injectable()
export class MqttService extends BaseWorker implements OnModuleInit {
  private readonly iotEndpoint: string;
  private readonly clientId: string;
  private mqttClient: mqtt.MqttClient | undefined;

  constructor(private config: ConfigService) {
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

  connect(className?: string): mqtt.MqttClient {
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
        host: this.iotEndpoint,
        port: 8883,
        clientId: this.clientId,
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

  onMessage(callback: (topic: string, message: string) => void): void {
    if (this.mqttClient) {
      this.mqttClient.on('message', (topic, message) => {
        callback(topic, message.toString());
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
    if (this.mqttClient) {
      if (typeof payload.user !== 'string' && payload.user['coldclimate_claims']) {
        payload.user = payload.user['coldclimate_claims']['email'];
      }

      const topic = `ui/${this.config.get('NODE_ENV', 'development')}/${payload.org_id}/${payload.user}`;

      this.publishMQTT('ui', payload, topic);
    } else {
      this.logger.error('MQTT client is not connected');
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
          topic = topic ? topic : `ui/${this.config.get('NODE_ENV', 'development')}/${get(inputs.payload, 'org_id')}/${get(inputs.payload, 'user')}`;
          break;
      }

      if (this.mqttClient && topic) {
        this.mqttClient.publish(topic, JSON.stringify(inputs.payload));

        this.logger.log(`Published to topic: ${topic}`, inputs.payload);
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
