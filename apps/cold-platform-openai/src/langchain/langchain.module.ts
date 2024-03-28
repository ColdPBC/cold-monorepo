import { Module } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { LoadersModule } from './custom_loaders/loaders.module';
import { PineconeModule } from '../pinecone/pinecone.module';
import { LangchainLoaderService } from './langchain.loader.service';

@Module({
  imports: [LoadersModule, PineconeModule],
  providers: [LangchainService, LangchainLoaderService],
  exports: [LangchainService, LangchainLoaderService],
})
export class LangchainModule {}
