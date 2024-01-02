import { Module } from '@nestjs/common';
import { NestModule } from '@coldpbc/nest';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { BayouService } from './bayou.service';
import { BayouController } from './bayou.controller';
import { BullModule } from '@nestjs/bull';

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
        BullModule.registerQueue({
          name: 'outbound',
        }),
      ],
      controllers: [BayouController],
      providers: [BayouService],
      exports: [],
    };
  }
}
