import { Module } from '@nestjs/common';
import { ConfigurationModule, NestModule, OrgUserInterceptor, PrismaModule } from '@coldpbc/nest';
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
import { EventsModule } from '../../../cold-api/src/platform/modules/utilities/events/events.module';

@Module({})
export class AppModule {
  static async forRootAsync() {
    //const config = new ConfigService();

    return {
      module: AppModule,
      imports: [
        await ConfigurationModule.forRootAsync(),
        await NestModule.forRootAsync(2, 'cold-api-'),
        await EventsModule.forRootAsync(),
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
      ],
      controllers: [OpenAIController],
      providers: [
        FileService,
        AppService,
        {
          provide: APP_INTERCEPTOR,
          useClass: OrgUserInterceptor,
        },
        RabbitService,
        AssistantService,
      ],
      exports: [],
    };
  }
}
