import { Controller, UseGuards } from '@nestjs/common';
import { Cuid2Generator, GuidPrefixes, JwtAuthGuard, MqttService, PrismaService } from '@coldpbc/nest';
import { ConfigService } from '@nestjs/config';
import process from 'process';
import { ApiExcludeController } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiExcludeController()
@Controller()
export class MqttController {
  constructor(readonly mqttService: MqttService, readonly config: ConfigService, readonly prisma: PrismaService) {}

  async onModuleInit() {
    try {
      //await this.client.connect();
      //console.log('Connected to MQTT broker');
    } catch (error) {
      console.error('Failed to connect to MQTT broker:', error);
    }
    this.mqttService.connect(MqttController.name, new Cuid2Generator(GuidPrefixes.Organization).scopedId);
    this.mqttService.subscribe(`$share/{ShareName}/platform/${process.env['NODE_ENV']}/api/#`);
    this.mqttService.onMessage(this.onMessage.bind(this));
  }

  async onMessage(topic: string, message: string) {
    // this.logger.log(`Received message on topic ${topic}: ${message}`);
    //const payload = JSON.parse(message);

    switch (topic) {
      case `platform/${process.env['NODE_ENV']}/api/organizations/getComplianceSetManagementData`:
      //this.logger.log(`Received message on topic ${topic}: ${message}`);
      // return await this.getOrgComplianceData(JSON.parse(message));
      case `platform/${process.env['NODE_ENV']}/api/query`: {
        //this.logger.log(`Received message on topic ${topic}: ${message}`);
        break;
      }
      default:
      // this.logger.error(`Unknown topic ${topic}`);
    }
  }

  handleMyTopic(payload: any) {
    console.log(`Received message on topic my_topic: ${payload}`);
  }
}
