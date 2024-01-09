import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { BaseWorker } from '@coldpbc/nest';

@Processor('climatiq')
export class OutboundQueueProcessor extends BaseWorker {
  constructor() {
    super(OutboundQueueProcessor.name);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
  }

  @Process('cold-platform-bayou')
  async processMessages(job: Job<{ event: string }>) {
    switch (job.data.event) {
      case 'new_bill':
        this.logger.info(`Received new bill event`, { name: job.name, id: job.id, data: job.data });
        throw new Error('testing retry logic');
      //return { retry: true };
      default:
        this.logger.error(`Unknown job name: ${job.name}`, { name: job.name, id: job.id, data: job.data });
        throw new Error(`Unknown job name: ${job.name}`);
    }
  }
}
