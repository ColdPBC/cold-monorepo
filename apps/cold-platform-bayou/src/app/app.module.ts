import { Module } from '@nestjs/common';
import { NestModule } from '@coldpbc/nest';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { BayouService } from './bayou.service';
import { BayouController } from './bayou.controller';
import { BullModule } from '@nestjs/bull';
import { RabbitService } from './app.rabbit';
import { BayouQueueProcessor } from './outbound.processor';
import * as process from 'process';

@Module({})
export class AppModule {
  static async forRootAsync() {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        await NestModule.forRootAsync(1),
        BullModule.registerQueue({
          name: process.env?.DD_SERVICE?.split('-')[2],
        }),
      ],
      controllers: [BayouController],
      providers: [BayouService, RabbitService, BayouQueueProcessor],
      exports: [],
    };
  }
}
