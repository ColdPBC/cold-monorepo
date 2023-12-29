import './tracer';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { WinstonModule } from 'nest-winston';
import { createLogger, Logger } from 'winston';
// eslint-disable-next-line @nx/enforce-module-boundaries
import winstonConfig from '../../../libs/nest/src/lib/worker/winston.config';
import { AppModule } from './app/app.module';

dotenv.config();

async function bootstrap(instance: Logger) {
  const app = await NestFactory.create(AppModule.forRootAsync(), {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });

  //app.useGlobalPipes(new ResourceValidationPipe());
  app.enableCors();

  await app.listen(process.env['PORT'] || 7004, '0.0.0.0');
}

async function init() {
  const instance = createLogger(winstonConfig('main'));
  await bootstrap(instance);
}

init();
