import { Module } from '@nestjs/common';

import { NestModule } from '@coldpbc/nest';
import { ClimatiqModule } from './climatiq/climatiq.module';
import { ClimatiqService } from './climatiq/climatiq.service';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

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
      ],
      controllers: [],
      providers: [ClimatiqService],
      exports: [],
    };
  }
}
