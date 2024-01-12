import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { BaseWorker } from '@coldpbc/nest';
import { BayouService } from './bayou.service';

@Processor('bayou')
export class BayouQueueProcessor extends BaseWorker {
  constructor(private readonly bayou: BayouService) {
    super(BayouQueueProcessor.name);
  }

  @Process('integration.enabled')
  async processMessages(job: Job) {
    const { data } = job['data'];
    const { event, user, from, organization } = data;
    this.logger.info(`Processing ${event} job triggered by ${user['coldclimate_claims']['email']} from ${from}`, {
      data: data,
    });

    return await this.bayou.createCustomer(user, organization['id'], data['location_id'], this.bayou.toBayouPayload(data));
  }
}
