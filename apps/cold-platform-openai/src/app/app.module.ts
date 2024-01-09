import { Module } from '@nestjs/common';
import { NestModule, PrismaModule } from '@coldpbc/nest';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BullModule } from '@nestjs/bull';

@Module({})
export class AppModule {
  static async forRootAsync() {
    return {
      module: AppModule,
      imports: [
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
          name: 'openai',
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
