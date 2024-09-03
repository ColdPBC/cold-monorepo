import { Module } from '@nestjs/common';
import { NestModule } from '@coldpbc/nest';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({})
export class AppModule {
  static async forRootAsync() {
    return {
      module: AppModule,
      imports: [await NestModule.forRootAsync()],
      providers: [AppService],
      exports: [],
      controllers: [AppController],
    };
  }
}
