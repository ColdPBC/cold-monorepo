import './tracer';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './platform/modules/app.module';
import { OpenapiModule } from './platform/modules/swagger/openapi.module';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { WorkerLogger } from '@coldpbc/nest';
import { json, urlencoded } from 'express';

dotenv.config();

async function bootstrap(instance) {
  const app = await NestFactory.create(AppModule.forRootAsync(), {
    logger: instance,
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  //app.useGlobalPipes(new ResourceValidationPipe());
  app.enableCors();

  OpenapiModule.register(app);
  patchNestjsSwagger();

  await app.listen(process.env['PORT'] || 7001, '0.0.0.0');
}

async function init() {
  const instance = new WorkerLogger('main');
  await bootstrap(instance);
}

init();
