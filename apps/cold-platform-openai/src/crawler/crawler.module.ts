import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CrawlerConsumer } from './crawler.consumer';
import { BullModule } from '@nestjs/bull';
import { PineconeModule } from '../pinecone/pinecone.module';
import { PineconeService } from '../pinecone/pinecone.service';
import { LangchainModule } from '../langchain/langchain.module';

@Module({})
export class CrawlerModule {
  static async forRootAsync() {
    return {
      module: CrawlerModule,
      imports: [
        BullModule.registerQueue({
          name: 'openai_crawler',
        }),
        PineconeModule,
        LangchainModule,
      ],
      providers: [CrawlerService, CrawlerConsumer, PineconeService],
      exports: [],
    };
  }
}
