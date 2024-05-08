import { Injectable } from '@nestjs/common';
import { BaseWorker, RabbitMessagePayload } from '@coldpbc/nest';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { OrganizationComplianceService } from './organization_compliance/organization_compliance.service';

@Injectable()
export class OrganizationsRabbitService extends BaseWorker {
  constructor(readonly orgComp: OrganizationComplianceService) {
    super(OrganizationsRabbitService.name);
  }

  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: `platform.api.organizations`,
    queue: `platform.api.organizations`,
    allowNonJsonMessages: false,
  })
  async processRPCMessages(msg: RabbitMessagePayload): Promise<any> {
    //return await this.orgComp.getOrgComplianceData();
  }
}
