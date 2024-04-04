import './tracer';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './platform/modules/app.module';
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
  const getOrigin = () => {
    switch (process.env['NODE_ENV']) {
      case 'production':
        return 'https://api.coldclimate.com';
      case 'staging':
        return 'https://api.coldclimate.online';
      default:
        return 'http://localhost:4200';
    }
  };
  app.enableCors({ allowedHeaders: '*', exposedHeaders: '*', origin: `${getOrigin()}` });
  patchNestjsSwagger();

  await app.listen(process.env['PORT'] || 7001, '0.0.0.0');
}

async function init() {
  const instance = new WorkerLogger('main');
  await bootstrap(instance);
}

init();
