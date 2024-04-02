import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker, DarklyService } from '@coldpbc/nest';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LangchainService extends BaseWorker implements OnModuleInit {
  openAIapiKey: string = '';
  returnSourceDocuments: boolean = true;

  constructor(private readonly config: ConfigService, private readonly darkly: DarklyService) {
    super(LangchainService.name);
  }

  async onModuleInit(): Promise<void> {
    this.logger.log('Langchain Service Initialized');
    this.openAIapiKey = this.config.getOrThrow('OPENAI_API_KEY');
    this.returnSourceDocuments = await this.darkly.getBooleanFlag('dynamic-rag-return-source-documents');
  }
}
