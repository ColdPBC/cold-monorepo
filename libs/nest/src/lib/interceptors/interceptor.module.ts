import { Module } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { OrgUserInterceptor } from './org-user-interceptor.service';
import { RabbitMetadataInterceptor } from './rabbit-metadata.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [],
  providers: [
    RabbitMetadataInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useClass: OrgUserInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [RabbitMetadataInterceptor],
})
export class InterceptorModule {}
