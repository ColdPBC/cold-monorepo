import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';
import { BaseWorker } from '../worker';
import { Cuid2Generator } from '../cuid2-generator.service';

@Injectable()
export class MqttService extends BaseWorker implements OnModuleInit {
  private readonly iotEndpoint: string;
  private readonly clientId: string;
  private mqttClient: mqtt.MqttClient | undefined;
  private readonly topicBase: string;

  constructor(private config: ConfigService) {
    super(MqttService.name);
    const parts = config.getOrThrow('DD_SERVICE').split('-');
    if (parts.length < 2) throw new Error('Invalid DD_SERVICE');
    const pfxIdx = parts.length < 3 ? 1 : 2;
    const prefix = parts[pfxIdx].length < 7 ? parts[pfxIdx] : `${parts[pfxIdx].substring(0, 2)}${parts[pfxIdx].substring(parts[pfxIdx].length - 2, parts[pfxIdx].length)}`;
    this.topicBase = parts.length < 3 ? `${process.env['NODE_ENV']}/${parts[1]}` : `${process.env['NODE_ENV']}/${parts[1]}/${parts[2]}`;
    this.iotEndpoint = process.env['IOT_ENDPOINT'] || 'a2r4jtij2021gz-ats.iot.us-east-1.amazonaws.com';
    this.clientId = new Cuid2Generator(prefix).scopedId;
  }

  connect(): mqtt.MqttClient {
    try {
      // Read your AWS IoT Core device certificate, private key, and CA certificate
      const cert = `-----BEGIN CERTIFICATE-----\n${process.env['MQTT_CERT']}\n-----END CERTIFICATE-----\n`;
      const key = `-----BEGIN RSA PRIVATE KEY-----\n${process.env['MQTT_PRIVATE_KEY']}\n-----END RSA PRIVATE KEY-----\n`;
      const ca = [
        `-----BEGIN CERTIFICATE-----\n${process.env['MQTT_CA_ROOT_1']}\n-----END CERTIFICATE-----\n`,
        `-----BEGIN CERTIFICATE-----\n${process.env['MQTT_CA_ROOT_3']}\n-----END CERTIFICATE-----\n`,
      ];

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
        this.logger.log('Connected to AWS IoT Core');
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
      this.mqttClient.subscribe(`${this.topicBase}/${topic}`);
      this.logger.log(`Subscribed to topic: ${this.topicBase}/${topic}`);
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

  publish(topic: string, message: string): void {
    if (this.mqttClient) {
      this.mqttClient.publish(topic, message);
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
