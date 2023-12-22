import { Global, Module } from '@nestjs/common';
import { DarklyService } from './darkly.service';

@Global()
@Module({})
export class DarklyModule {
  static async forFeatureAsync() {
    return {
      module: DarklyModule,
      providers: [DarklyService],
      exports: [DarklyService],
    };
  }
}
