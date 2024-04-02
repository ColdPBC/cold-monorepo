import { Module } from '@nestjs/common';
import { NestModule, OrgUserInterceptor, PrismaModule } from '@coldpbc/nest';
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

@Module({
  imports: [],
  providers: [],
})
export class AppModule {
  static async forRootAsync() {
    //const config = new ConfigService();

    return {
      module: AppModule,
      imports: [
        await NestModule.forRootAsync(),
        BullModule.registerQueue({
          name: 'openai',
        }),
        MulterModule.register({
          dest: './uploads',
        }),
        ServeStaticModule.forRoot({
          serveStaticOptions: {
            index: false,
            fallthrough: true,
          },
          serveRoot: '../../../assets',
        }),
        PrismaModule,
        AssistantModule,
        PineconeModule,
        LangchainModule,
        LoadersModule,
        ChatModule,
      ],
      controllers: [OpenAIController],
      providers: [
        FileService,
        JobConsumer,
        AppService,
        {
          provide: APP_INTERCEPTOR,
          useClass: OrgUserInterceptor,
        },
        RabbitService,
        AssistantService,
        ChatService,
        Tools,
      ],
      exports: [],
    };
  }
}
