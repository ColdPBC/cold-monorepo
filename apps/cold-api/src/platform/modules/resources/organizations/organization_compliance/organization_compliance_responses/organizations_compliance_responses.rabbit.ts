import { Injectable } from '@nestjs/common';
import { BaseWorker, ComplianceQuestionsRepository, ComplianceSectionGroupsRepository, MqttService } from '@coldpbc/nest';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class OrganizationComplianceResponseRabbit extends BaseWorker {
  constructor(readonly repository: ComplianceQuestionsRepository, readonly groupList: ComplianceSectionGroupsRepository, readonly mqtt: MqttService) {
    super(OrganizationComplianceResponseRabbit.name);
  }

  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: `cold.core.api.compliance_responses`,
    queue: `cold.core.api.compliance_responses`,
    allowNonJsonMessages: false,
  })
  async processRPCMessages(msg): Promise<any> {
    const data = msg.data as any;
    const groups = await this.groupList.getSectionGroupList({
      compliance_definition_name: data.compliance_set,
    });

    this.mqtt.replyTo(`ui/${process.env.NODE_ENV}/${data.organization.id}/${data.compliance_set}`, groups);

    const sections = await this.repository.getFilteredQuestionList({
      compliance_section_id: data.compliance_section_id,
      organization_id: data.organization.id,
    });

    this.mqtt.replyTo(msg.data.reply_to, sections);
  }
}
