import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PineconeModule } from '../pinecone/pinecone.module';
import { LangchainModule } from '../langchain/langchain.module';
import { LangchainService } from '../langchain/langchain.service';
import { BullModule } from '@nestjs/bull';
import {
	ComplianceAiResponsesRepository,
	ComplianceDataModule,
	ComplianceResponsesRepository,
	ComplianceSectionsCacheRepository,
	ComplianceSectionsRepository,
	MqttModule,
	MqttService,
	ScoringModule,
	ScoringService,
} from '@coldpbc/nest';
import { FreeplayModule } from '../freeplay/freeplay.module';
import { FreeplayService } from '../freeplay/freeplay.service';
import { ChatController } from './chat.controller';

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'openai',
		}),
		BullModule.registerQueue({
			name: 'openai:classification',
		}),
		ScoringModule,
		PineconeModule,
		LangchainModule,
		FreeplayModule,
		MqttModule,
		ComplianceDataModule,
	],
	controllers: [ChatController],
	providers: [
		ChatService,
		LangchainService,
		FreeplayService,
		MqttService,
		ScoringService,
		ComplianceSectionsRepository,
		ComplianceAiResponsesRepository,
		ComplianceResponsesRepository,
		ComplianceSectionsCacheRepository,
	],
})
export class ChatModule {}
