/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRootAsync());
  const port = process.env.PORT || 3000;
  const httpAdapter = app.getHttpAdapter();
  const server = httpAdapter.getHttpServer();

  server.keepAliveTimeout = 61000;
  server.headersTimeout = 65000;

  const getOrigin = () => {
    switch (process.env['DD_ENV']) {
      case 'production':
        return 'https://app.coldclimate.com';
      case 'staging':
        return 'https://app.coldclimate.online';
      default:
        return 'http://localhost:4200';
    }
  };
  app.enableCors({ allowedHeaders: '*', exposedHeaders: '*', origin: `${getOrigin()}` });
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
