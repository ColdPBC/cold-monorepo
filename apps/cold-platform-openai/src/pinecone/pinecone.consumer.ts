import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';
import { Process, Processor } from '@nestjs/bull';
import { PineconeService } from './pinecone.service';

@Injectable()
@Processor('pinecone')
export class PineconeConsumer extends BaseWorker implements OnModuleInit {
  constructor(private readonly pc: PineconeService) {
    super(PineconeConsumer.name);
  }

  async onModuleInit(): Promise<void> {}

  @Process('sync_files')
  async processInjestFile(job: any) {
    const { organization, user, file, index_details } = job.data;
    await this.pc.ingestData(user, organization, file, undefined, index_details);
    this.logger.info(`Ingested file ${file.original_name} into index ${index_details.indexName} using ${index_details.config.model} for organization ${organization.id}`);
    return {};
  }
}
