import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { BaseWorker } from '@coldpbc/nest';

@Processor('climatiq')
export class OutboundQueueProcessor extends BaseWorker {
  @Process('*')
  async processMessages(job: Job<unknown>) {
    switch (job.name) {
      case 'getComputeMetadata':
        return;
      case 'getEmissionEstimate':
        return;
      default:
        this.logger.error(`Unknown job name: ${job.name}`, { name: job.name, id: job.id, data: job.data });
    }
  }
}
