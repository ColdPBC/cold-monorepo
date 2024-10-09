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
} from '@coldpbc/nest';
import { FreeplayModule } from '../freeplay/freeplay.module';
import { FreeplayService } from '../freeplay/freeplay.service';
import { ChatController } from './chat.controller';
import { ScoringModule } from '../../../cold-api/src/platform/modules/resources/surveys/scoring/scoring.module';

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
		ComplianceSectionsRepository,
		ComplianceAiResponsesRepository,
		ComplianceResponsesRepository,
		ComplianceSectionsCacheRepository,
	],
})
export class ChatModule {}
