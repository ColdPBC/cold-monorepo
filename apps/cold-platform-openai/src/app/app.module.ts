import { Module } from '@nestjs/common';
import { NestModule, OrgUserInterceptor, PrismaModule, S3Service } from '@coldpbc/nest';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BullModule } from '@nestjs/bull';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OutboundQueueProcessor } from './outbound.processor';
import process from 'process';
import { RabbitService } from './rabbit.service';
import { MulterModule } from '@nestjs/platform-express';
import { OpenAIController } from './app.controller';

@Module({})
export class AppModule {
  static async forRootAsync() {
    //const config = new ConfigService();

    return {
      module: AppModule,
      imports: [
        MulterModule.register({
          dest: './uploads',
        }),
        /*MulterModule.registerAsync({
          useFactory: () => ({
            storage: multerS3({
              s3: S3Service.getS3Client(),
              bucket: config.getOrThrow('DD_SERVICE'),
              contentType: multerS3.AUTO_CONTENT_TYPE,
              key: function (req, file, cb) {
                const user = req['user'] as AuthenticatedUser;
                const orgId = req['orgId'];
                if (!orgId) {
                  throw new Error('orgId is required.');
                }

                // Adjust this based on your actual user object structure
                cb(null, `${process.env['NODE_ENV']}/${orgId}/${user.coldclimate_claims.email}/${file.originalname}`);
              },
            }),
          }),
        }),*/

        await NestModule.forRootAsync(2),
        ServeStaticModule.forRoot({
          serveStaticOptions: {
            index: false,
            fallthrough: true,
          },
          serveRoot: '../../../assets',
        }),
        PrismaModule,
        BullModule.registerQueue({
          name: process.env?.DD_SERVICE?.split('-')[2],
        }),
      ],
      controllers: [OpenAIController],
      providers: [
        OutboundQueueProcessor,
        S3Service,
        AppService,
        {
          provide: APP_INTERCEPTOR,
          useClass: OrgUserInterceptor,
        },
        RabbitService,
      ],
      exports: [OutboundQueueProcessor],
    };
  }
}
