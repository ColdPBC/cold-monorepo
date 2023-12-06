import { Module } from '@nestjs/common';
import { NestModule, PrismaModule } from '@coldpbc/nest';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({})
export class AppModule {
  static async forRootAsync() {
    return {
      module: AppModule,
      imports: [
        await NestModule.forRootAsync(),
        ServeStaticModule.forRoot({
          serveStaticOptions: {
            index: false,
            fallthrough: true,
          },
          serveRoot: '../../../assets',
        }),
        PrismaModule,
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
