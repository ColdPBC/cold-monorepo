import { Module } from '@nestjs/common';
import { ColdRabbitModule, NestModule, OrgUserInterceptor, PrismaModule } from '@coldpbc/nest';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RabbitService } from './rabbit.service';
import { MulterModule } from '@nestjs/platform-express';
import { OpenAIController } from './app.controller';
import { FileService } from './assistant/files/file.service';
import { AssistantService } from './assistant/assistant.service';
import { AssistantModule } from './assistant/assistant.module';
import { BullModule } from '@nestjs/bull';
import { Tools } from './assistant/tools/tools';
import { PineconeModule } from './pinecone/pinecone.module';
import { LangchainModule } from './langchain/langchain.module';
import { ChatModule } from './chat/chat.module';
import { LoadersModule } from './langchain/custom_loaders/loaders.module';
import { JobConsumer } from './job.consumer';
import { ChatService } from './chat/chat.service';
import { FreeplayModule } from './freeplay/freeplay.module';
import { CrawlerModule } from './crawler/crawler.module';
import { EventsModule } from '../../cold-api/src/platform/modules/utilities/events/events.module';
import { ExtractionModule } from './extraction/extraction.module';

@Module({
	imports: [FreeplayModule, CrawlerModule, ExtractionModule],
	providers: [],
})
export class AppModule {
	static async forRootAsync() {
		//const config = new ConfigService();

		return {
			module: AppModule,
			imports: [
				await NestModule.forRootAsync(),
				await EventsModule.forRootAsync(),
				BullModule.registerQueue({
					name: 'openai',
					settings: {
						stalledInterval: 3600000,
						maxStalledCount: 120,
					},
				}),
				BullModule.registerQueue({
					name: 'openai:extraction',
					settings: {
						stalledInterval: 3600000,
						maxStalledCount: 120,
					},
				}),
				MulterModule.register({
					dest: './uploads',
				}),
				BullModule.registerQueue({
					name: 'openai_crawler',
				}),
				ServeStaticModule.forRoot({
					serveStaticOptions: {
						index: false,
						fallthrough: true,
					},
					serveRoot: '../../../assets',
				}),
				PrismaModule,
				await ColdRabbitModule.forRootAsync(),
				AssistantModule,
				PineconeModule,
				LangchainModule,
				LoadersModule,
				ExtractionModule,
				await CrawlerModule.forRootAsync(),
				ChatModule,
			],
			controllers: [OpenAIController],
			providers: [
				FileService,
				JobConsumer,
				RabbitService,
				AppService,
				{
					provide: APP_INTERCEPTOR,
					useClass: OrgUserInterceptor,
				},
				AssistantService,
				ChatService,
				Tools,
			],
			exports: [],
		};
	}
}
