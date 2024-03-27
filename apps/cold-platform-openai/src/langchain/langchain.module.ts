import { Module } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { PromptsService } from '../prompts/prompts.service';
import { LoadersModule } from './custom_loaders/loaders.module';
import { PineconeModule } from '../pinecone/pinecone.module';

@Module({
  imports: [LoadersModule, PineconeModule],
  providers: [LangchainService, PromptsService],
})
export class LangchainModule {}
