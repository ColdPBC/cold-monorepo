import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PineconeModule } from '../pinecone/pinecone.module';
import { LangchainModule } from '../langchain/langchain.module';
import { LangchainService } from '../langchain/langchain.service';
import { BullModule } from '@nestjs/bull';
import { ColdRabbitModule } from '@coldpbc/nest';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'openai',
    }),
    ColdRabbitModule.forRootAsync(),
    PineconeModule,
    LangchainModule,
  ],
  providers: [ChatService, LangchainService],
})
export class ChatModule {}
