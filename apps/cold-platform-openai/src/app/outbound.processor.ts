import { OnQueueActive, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { BaseWorker, PrismaService, S3Service } from '@coldpbc/nest';
import { AppService } from './app.service';

@Processor('openai')
export class OutboundQueueProcessor extends BaseWorker {
  constructor(private readonly openAI: AppService, private readonly prisma: PrismaService, private readonly s3: S3Service) {
    super(OutboundQueueProcessor.name);
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.info(`Processing job ${job.id} of type ${job.name} with data ${job.data}`, job);
  }

  @OnQueueFailed()
  onFailed(job: Job) {
    this.logger.error(`Job ${job.id} of type ${job.name} FAILED ${job.failedReason}`, job);
  }

  @Process('file.uploaded')
  async processMessages() {
    //this.logger.info(`Received new file.uploaded job`, { name: job.name, id: job.id, data: job.data });
    /*await lastValueFrom(this.openAI.downloadFile(job)).then(async () => {
      const file = await this.openAI.client.files.create({
        file: this.fs.createReadStream(destinationPath),
        purpose: 'assistants',
      });

      this.logger.info(`Created new file ${file.id} for assistant ${job.data['assistantId']}`, { file, job });
    });*/
  }
}
