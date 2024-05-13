import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PineconeModule } from '../pinecone/pinecone.module';
import { LangchainModule } from '../langchain/langchain.module';
import { LangchainService } from '../langchain/langchain.service';
import { BullModule } from '@nestjs/bull';
import { ColdRabbitModule, MqttModule, MqttService } from '@coldpbc/nest';
import { FreeplayModule } from '../freeplay/freeplay.module';
import { FreeplayService } from '../freeplay/freeplay.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'openai',
    }),
    ColdRabbitModule.forRootAsync(),
    PineconeModule,
    LangchainModule,
    FreeplayModule,
    MqttModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, LangchainService, FreeplayService, MqttService],
})
export class ChatModule {}
