import { Module } from '@nestjs/common';
import { NestModule, OrgUserInterceptor, PrismaModule, S3Service } from '@coldpbc/nest';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RabbitService } from './rabbit.service';
import { MulterModule } from '@nestjs/platform-express';
import { OpenAIController } from './app.controller';
import { AssistantService } from './assistant/assistant.service';
import { AssistantModule } from './assistant/assistant.module';
import { BullModule } from '@nestjs/bull';

@Module({})
export class AppModule {
  static async forRootAsync() {
    //const config = new ConfigService();

    return {
      module: AppModule,
      imports: [
        await NestModule.forRootAsync(2),
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
        S3Service,
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
