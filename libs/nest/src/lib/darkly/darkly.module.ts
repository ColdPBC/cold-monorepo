import { Global, Module } from '@nestjs/common';
import { DarklyService } from './darkly.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class DarklyModule {
  static async forRoot() {
    return {
      module: DarklyModule,
      imports: [ConfigModule],
      providers: [DarklyService, ConfigService],
      exports: [DarklyService, ConfigService],
    };
  }
}
