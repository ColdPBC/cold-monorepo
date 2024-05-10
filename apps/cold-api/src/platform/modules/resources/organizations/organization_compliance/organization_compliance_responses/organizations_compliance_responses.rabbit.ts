import { Injectable } from '@nestjs/common';
import { BaseWorker, MqttService } from '@coldpbc/nest';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { ComplianceRepository } from '../../mqtt/compliance.repository';

@Injectable()
export class OrganizationComplianceResponseRabbit extends BaseWorker {
  constructor(readonly repository: ComplianceRepository, readonly mqtt: MqttService) {
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
    // @ts-expect-error - data is any
    const groups = await this.repository.complianceSectionGroupListByOrgIdCompNameKey({
      org_id: data.organization.id,
      compliance_set_name: data.compliance_set,
    });
    this.mqtt.replyTo(`ui/${process.env.NODE_ENV}/${data.organization.id}/${data.compliance_set}`, groups);

    // @ts-expect-error - data is any
    const sections = await this.repository.complianceQuestionListByOrgIdCompNameKey({
      org_id: data.organization.id,
      compliance_set_name: data.compliance_set,
      compliance_section_group_id: data.compliance_section_group_id,
      compliance_section_id: data.compliance_section_id,
    });

    this.mqtt.replyTo(msg.data.reply_to, sections);
  }
}
