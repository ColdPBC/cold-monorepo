import { Module } from '@nestjs/common';

import { NestModule } from '@coldpbc/nest';
import { ClimatiqModule } from './climatiq/climatiq.module';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [ClimatiqModule],
  providers: [],
})
export class AppModule {
  static async forRootAsync() {
    return {
      module: AppModule,
      imports: [await NestModule.forRootAsync(), ClimatiqModule],
      controllers: [],
      providers: [AmqpConnection],
      exports: [],
    };
  }
}
