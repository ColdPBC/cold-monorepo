import { Module } from '@nestjs/common';

import { NestModule } from '@coldpbc/nest';
import { ClimatiqModule } from './climatiq/climatiq.module';
import { RabbitService } from './rabbit/rabbit.service';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [ClimatiqModule],
  providers: [],
})
export class AppModule {
  static async forRootAsync() {
    return {
      module: AppModule,
      imports: [await NestModule.forRootAsync(), ClimatiqModule, RabbitService, RedisService],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
