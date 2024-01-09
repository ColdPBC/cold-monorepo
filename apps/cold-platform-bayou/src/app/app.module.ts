import { Module } from '@nestjs/common';
import { NestModule } from '@coldpbc/nest';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { BayouService } from './bayou.service';
import { BayouController } from './bayou.controller';
import { BullModule } from '@nestjs/bull';
import { RabbitService } from './app.rabbit';

@Module({})
export class AppModule {
  static async forRootAsync() {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        await NestModule.forRootAsync(2),
        BullModule.registerQueue({
          name: 'outbound',
        }),
      ],
      controllers: [BayouController],
      providers: [BayouService, RabbitService],
      exports: [],
    };
  }
}
