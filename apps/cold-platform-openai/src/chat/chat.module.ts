import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PineconeModule } from '../pinecone/pinecone.module';
import { LangchainModule } from '../langchain/langchain.module';
import { LangchainService } from '../langchain/langchain.service';

@Module({
  imports: [PineconeModule, LangchainModule],
  providers: [ChatService, LangchainService],
})
export class ChatModule {}
