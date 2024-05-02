import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker, MqttService, PrismaService } from '@coldpbc/nest';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ComplianceGateway extends BaseWorker implements OnModuleInit {
  constructor(private readonly configService: ConfigService, private readonly mqttService: MqttService, private readonly prisma: PrismaService) {
    super(ComplianceGateway.name);
  }

  async onModuleInit() {
    this.mqttService.connect(ComplianceGateway.name);
    this.mqttService.subscribe(`platform/${process.env['NODE_ENV']}/api/#`);
    this.mqttService.onMessage(this.onMessage.bind(this));
  }

  async onMessage(topic: string, message: string) {
    this.logger.log(`Received message on topic ${topic}: ${message}`);
    //const payload = JSON.parse(message);

    switch (topic) {
      case `platform/${process.env['NODE_ENV']}/api/getComplianceSetManagementData`:
        this.logger.log(`Received message on topic ${topic}: ${message}`);
        return { status: 'success', data: 'getComplianceSetManagementData' };
        break;
      case `platform/${process.env['NODE_ENV']}/api/query`: {
        this.logger.log(`Received message on topic ${topic}: ${message}`);

        break;
      }
      default:
        this.logger.error(`Unknown topic ${topic}`);
    }
  }
}
