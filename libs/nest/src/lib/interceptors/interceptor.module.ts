import { Global, Module } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({
  imports: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
  exports: [],
})
export class InterceptorModule {
  static async forFeatureAsync() {
    return {
      module: InterceptorModule,
      imports: [],
      providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
      exports: [],
    };
  }
}
