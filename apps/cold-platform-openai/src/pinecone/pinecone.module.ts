import { Module } from '@nestjs/common';
import { PineconeService } from './pinecone.service';
import { LangchainModule } from '../langchain/langchain.module';
import { LangchainLoaderService } from '../langchain/langchain.loader.service';
import { PrismaModule } from '@coldpbc/nest';
import { BullModule } from '@nestjs/bull';
import { PineconeConsumer } from './pinecone.consumer';
import { ExtractionService } from '../extraction/extraction.service';
import { ExtractionModule } from '../extraction/extraction.module';

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'pinecone',
		}),
		LangchainModule,
		PrismaModule,
	],
	providers: [PineconeService, LangchainLoaderService, PineconeConsumer],
	exports: [PineconeService],
})
export class PineconeModule {}
