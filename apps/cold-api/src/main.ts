import './tracer';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './platform/modules/app.module';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { json, urlencoded } from 'express';
import { OpenapiModule } from './platform/modules/swagger/openapi.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRootAsync(), {
    logger: false,
    bufferLogs: true,
	  autoFlushLogs: true
  });
  const httpAdapter = app.getHttpAdapter();
  const server = httpAdapter.getHttpServer();

  server.keepAliveTimeout = 61000;
  server.headersTimeout = 65000;

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  //app.useGlobalPipes(new ResourceValidationPipe());
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
  OpenapiModule.register(app);
  patchNestjsSwagger();

  await app.listen(process.env['PORT'] || 7001, '0.0.0.0');
}

async function init() {
  await bootstrap();
}

init();
