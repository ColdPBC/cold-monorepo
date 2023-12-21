import { Module } from '@nestjs/common';
import { NestModule } from '@coldpbc/nest';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { AppService } from './app.service';

@Module({})
export class AppModule {
  static async forRootAsync() {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        await NestModule.forRootAsync(),
      ],
      controllers: [],
      providers: [AppService],
      exports: [],
    };
  }
}
