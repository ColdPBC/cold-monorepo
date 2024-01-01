import { Module } from '@nestjs/common';

import { NestModule } from '@coldpbc/nest';
import { ClimatiqModule } from './climatiq/climatiq.module';
import { ClimatiqService } from './climatiq/climatiq.service';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitService } from './rabbit/rabbit.service';
import { BullModule } from '@nestjs/bull';

@Module({
  providers: [AppService],
})
export class AppModule {
  static async forRootAsync() {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        await NestModule.forRootAsync(),
        ClimatiqModule,
        BullModule.registerQueue({
          name: 'climatiq',
        }),
      ],
      controllers: [],
      providers: [ClimatiqService, RabbitService],
      exports: [RabbitService],
    };
  }
}
