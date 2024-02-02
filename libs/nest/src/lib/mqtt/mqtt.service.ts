import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';
import { BaseWorker } from '../worker';
import { Cuid2Generator } from '../utility';
import { IAuthenticatedUser } from '../primitives';

export type MqttStatus = 'complete' | 'failed';
export type MqttAction = 'create' | 'update' | 'delete';

export interface MqttUIPayload {
  org_id: string;
  user: IAuthenticatedUser | string;
  swr_key: string;
  action: MqttAction;
  status: MqttStatus;
  data?: any;
}

export interface MqttSystemPayload {
  swr_key: string;
  action: MqttAction;
  status: MqttStatus;
  data?: any;
}

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
    //this.topicBase = parts.length < 3 ? `${process.env['NODE_ENV']}/${parts[1]}` : `${process.env['NODE_ENV']}/${parts[1]}/${parts[2]}`;*/
    this.iotEndpoint = process.env['IOT_ENDPOINT'] || 'a2r4jtij2021gz-ats.iot.us-east-1.amazonaws.com';
    this.clientId = new Cuid2Generator(prefix).scopedId;
  }

  override async onModuleInit(): Promise<void> {
    this.connect(MqttService.name);
  }

  connect(className?: string): mqtt.MqttClient {
    const privateKey = this.config.getOrThrow('MQTT_PRIVATE_KEY');
    const caRoot1 = this.config.getOrThrow('MQTT_CA_ROOT_1');
    const caRoot3 = this.config.getOrThrow('MQTT_CA_ROOT_3');
    const mqttcert = this.config.getOrThrow('MQTT_CERT');
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
        payload.user = payload.user.coldclimate_claims.email;
      }

      const topic = `ui/${this.config.get('NODE_ENV', 'development')}/${payload.org_id}/${payload.user}`;

      const stringed = JSON.stringify(payload);
      this.mqttClient.publish(topic, stringed);

      this.logger.log(`Published to UI topic: ${topic}`, payload);
    } else {
      this.logger.error('MQTT client is not connected');
    }
  }

  /**
   * Publishes system message
   * @param payload
   */
  publishSystemPublic(payload: MqttSystemPayload): void {
    if (this.mqttClient) {
      const topic = `system/${this.config.get('NODE_ENV', 'development')}/public`;
      this.mqttClient.publish(topic, JSON.stringify(payload));

      this.logger.log(`Published to system topic: ${topic}`, payload);
    } else {
      this.logger.error('MQTT client is not connected');
    }
  }

  publishSystemCold(payload: MqttSystemPayload): void {
    if (this.mqttClient) {
      const topic = `system/${this.config.get('NODE_ENV', 'development')}/cold`;
      this.mqttClient.publish(topic, JSON.stringify(payload));

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
