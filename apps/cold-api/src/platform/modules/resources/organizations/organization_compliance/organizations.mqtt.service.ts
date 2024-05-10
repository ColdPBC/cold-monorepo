import { Controller, UseGuards } from '@nestjs/common';
import { Cuid2Generator, JwtAuthGuard, MqttService, PrismaService } from '@coldpbc/nest';
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
    this.mqttService.connect(MqttController.name, new Cuid2Generator('org').scopedId);
    this.mqttService.subscribe(`$share/{ShareName}/platform/${process.env['NODE_ENV']}/api/#`);
    this.mqttService.onMessage(this.onMessage.bind(this));
  }

  async onMessage(topic: string, message: string) {
    // this.logger.log(`Received message on topic ${topic}: ${message}`);
    //const payload = JSON.parse(message);

    switch (topic) {
      case `platform/${process.env['NODE_ENV']}/api/organizations/getComplianceSetManagementData`:
        //this.logger.log(`Received message on topic ${topic}: ${message}`);
        return await this.getOrgComplianceData(JSON.parse(message));
      case `platform/${process.env['NODE_ENV']}/api/query`: {
        //this.logger.log(`Received message on topic ${topic}: ${message}`);
        break;
      }
      default:
      // this.logger.error(`Unknown topic ${topic}`);
    }
  }

  async getOrgComplianceData({ orgId }) {
    const response = await this.prisma.organizations.findMany({
      where: {
        id: orgId,
      },
      select: {
        display_name: true,
        organization_compliance: {
          select: {
            compliance_definition_name: true,
            compliance_definition: {
              select: {
                image_url: true,
                logo_url: true,
                name: true,
                order: true,
                compliance_section_groups: {
                  select: {
                    id: true,
                    order: true,
                    title: true,
                    compliance_sections: {
                      select: {
                        id: true,
                        key: true,
                        order: true,
                        title: true,
                        dependency_expression: true,
                        compliance_questions: {
                          select: {
                            additional_context: true,
                            component: true,
                            coresponding_question: true,
                            created_at: true,
                            dependency_expression: true,
                            id: true,
                            key: true,
                            options: true,
                            order: true,
                            placeholder: true,
                            prompt: true,
                            question_summary: true,
                            rubric: true,
                            tooltip: true,
                          },
                          orderBy: {
                            order: 'desc',
                          },
                        },
                      },
                      orderBy: {
                        order: 'desc',
                      },
                    },
                  },
                  orderBy: {
                    order: 'desc',
                  },
                },
              },
            },
          },
        },
      },
    });

    return response;
  }

  handleMyTopic(payload: any) {
    console.log(`Received message on topic my_topic: ${payload}`);
  }
}
