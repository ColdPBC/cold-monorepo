import { Module } from '@nestjs/common';
import { NestModule, OrgUserInterceptor, PrismaModule, S3Service } from '@coldpbc/nest';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RabbitService } from './rabbit.service';
import { MulterModule } from '@nestjs/platform-express';
import { OpenAIController } from './app.controller';
import { FileService } from './assistant/files/file.service';
import { AssistantService } from './assistant/assistant.service';
import { AssistantModule } from './assistant/assistant.module';
import { BullModule, RegisterFlowProducerOptions, RegisterQueueOptions } from '@nestjs/bullmq';
import { BullMQConfigService } from '../../../../libs/nest/src/lib/utility/bull-config.service';
import { ConfigService } from '@nestjs/config';
import { OpenaiFlowConsumerService } from './assistant/surveys/openai-flow-consumer/openai-flow-consumer.service';
import { OpenaiSurveysService } from './assistant/surveys/openai-surveys/openai-surveys.service';
import { OpenaiSurveyService } from './assistant/surveys/openai-survey/openai-survey.service';
import { OpenaiSurveySectionService } from './assistant/surveys/openai-survey-section/openai-survey-section.service';
import { OpenaiSurveySectionQuestionService } from './assistant/surveys/openai-survey-section-question/openai-survey-section-question.service';

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
