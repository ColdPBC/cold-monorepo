import { Module } from '@nestjs/common';
import { ColdRabbitService, NestModule, OrgUserInterceptor, PrismaModule, EventService } from '@coldpbc/nest';
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
import { ExtractionModule } from './extraction/extraction.module';
import { EntitiesModule } from './entities/entities.module';
import { ClassificationModule } from './classification/classification.module';
import { YieldEstimationModule } from './yield-estimation/yield-estimation.module';

@Module({})
export class AppModule {
	static async forRootAsync() {
		//const config = new ConfigService();

		return {
			module: AppModule,
			imports: [
				await NestModule.forRootAsync(),
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
				BullModule.registerQueue({
					name: 'openai:materials',
					settings: {
						stalledInterval: 3600000,
						maxStalledCount: 120,
					},
				}),
				BullModule.registerQueue({
					name: 'openai:products',
					settings: {
						stalledInterval: 3600000,
						maxStalledCount: 120,
					},
				}),
				BullModule.registerQueue({
					name: 'openai:suppliers',
					settings: {
						stalledInterval: 3600000,
						maxStalledCount: 120,
					},
				}),
				BullModule.registerQueue({
					name: 'openai:classification',
				}),
				ServeStaticModule.forRoot({
					serveStaticOptions: {
						index: false,
						fallthrough: true,
					},
					serveRoot: '../../../assets',
				}),
				FreeplayModule,
				ClassificationModule,
				EntitiesModule,
				PrismaModule,
				AssistantModule,
				PineconeModule,
				LangchainModule,
				LoadersModule,
				ExtractionModule,
				await CrawlerModule.forRootAsync(),
				ChatModule,
        YieldEstimationModule,
			],
			controllers: [OpenAIController],
			providers: [
				FileService,
				JobConsumer,
				RabbitService,
				ColdRabbitService,
				EventService,
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
