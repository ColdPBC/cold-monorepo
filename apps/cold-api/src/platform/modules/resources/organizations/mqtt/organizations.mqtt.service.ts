import {
  BaseWorker,
  ComplianceQuestionsRepository,
  ComplianceSectionGroupsRepository,
  ComplianceSectionsCacheRepository,
  ComplianceSectionsRepository,
  Cuid2Generator,
  MqttAPIComplianceSectionPayload,
  MqttService,
  MqttSocketAPIPayload,
} from '@coldpbc/nest';
import { Injectable, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class ComplianceMQTT extends BaseWorker implements OnModuleInit {
  constructor(
    readonly mqttService: MqttService,
    readonly groupRepository: ComplianceSectionGroupsRepository,
    readonly questionRepository: ComplianceQuestionsRepository,
    readonly sectionRepository: ComplianceSectionsRepository,
    readonly sectionCacheRepository: ComplianceSectionsCacheRepository,
  ) {
    super(ComplianceMQTT.name);
  }

  override async onModuleInit() {
    this.mqttService.connect(ComplianceMQTT.name, new Cuid2Generator('org').scopedId);
    this.mqttService.subscribe(`$share/api/platform/${process.env['NODE_ENV']}/#`);
    this.mqttService.onMessage(this.onMessage.bind(this));
  }

  async onMessage(topic: string, message: string) {
    // this.logger.log(`Received message on topic ${topic}: ${message}`, packet);

    const start = new Date().getTime();
    const action = topic.replace(`platform/${process.env['NODE_ENV']}/compliance/`, '');

    let payload: any;
    let response: any;

    try {
      switch (action) {
        case `getComplianceSectionGroupList`: {
          payload = JSON.parse(message) as MqttSocketAPIPayload;
          response = await this.groupRepository.getSectionGroupList(payload);
          break;
        }
        case `getComplianceSectionList`: {
          payload = JSON.parse(message) as MqttAPIComplianceSectionPayload;
          response = await this.sectionRepository.getFilteredSectionList(payload);
          break;
        }
        case `getComplianceQuestionList`: {
          payload = JSON.parse(message) as MqttAPIComplianceSectionPayload;
          response = await this.questionRepository.getQuestionList(payload);
          break;
        }
        default: {
          this.logger.error(`Unknown topic ${topic}`, { action, message });

          throw new UnprocessableEntityException({
            description: 'Invalid action',
          });
        }
      }

      if (payload.reply_to) {
        this.mqttService.replyTo(payload.reply_to, response);
      }
    } catch (e) {
      this.logger.error('Invalid JSON payload', { ...e, message });
      throw new UnprocessableEntityException({
        description: 'Unable to process request',
      });
    }

    const end = new Date().getTime();

    this.metrics.timing(`cold.compliance.mqtt.${action}`, end - start, {
      organization: payload.org_id,
      compliance: payload.compliance_set_name,
      compliance_section_group_id: payload.compliance_section_group_id,
      compliance_section_id: payload.compliacnce_section_id,
    });

    this.logger.log(`Processed ${action} in ${end - start}ms`);
  }
}
