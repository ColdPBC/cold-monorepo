import { Module } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { PromptsService } from '../prompts/prompts.service';

@Module({
  providers: [LangchainService, PromptsService],
})
export class LangchainModule {}
