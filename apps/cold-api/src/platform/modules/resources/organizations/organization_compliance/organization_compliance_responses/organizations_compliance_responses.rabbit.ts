import { Injectable } from '@nestjs/common';
import { BaseWorker, ComplianceQuestionsRepository, ComplianceResponsesRepository, ComplianceSectionGroupsRepository, MqttService } from '@coldpbc/nest';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class OrganizationComplianceResponseRabbit extends BaseWorker {
  constructor(
    readonly repository: ComplianceQuestionsRepository,
    readonly responseRepository: ComplianceResponsesRepository,
    readonly groupList: ComplianceSectionGroupsRepository,
    readonly mqtt: MqttService,
  ) {
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
    //const groups = await this.groupList.getSectionGroupListByOrgCompliance(data.organization, data.compliance_set, data.user);

    // this.mqtt.replyTo(`ui/${process.env.NODE_ENV}/${data.organization.id}/${data.compliance_set}`, groups);

    //TODO: Deprecate this
    /* const sections = await this.repository.getFilteredQuestionList({
      compliance_section_id: data.compliance_section_id,
      organization_id: data.organization.id,
    });
*/
    const response = await this.responseRepository.getScoredComplianceQuestionsByName(data.organization, data.compliance_set, data.user, { bpc: true });
    this.mqtt.replyTo(msg.data.reply_to, response);
  }
}
