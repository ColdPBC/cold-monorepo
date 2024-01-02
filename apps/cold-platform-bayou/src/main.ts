import '../../../libs/nest/src/lib/tracer';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppModule } from './app/app.module';
import { Logger } from 'winston';
import { WorkerLogger } from '@coldpbc/nest';

dotenv.config();

async function bootstrap(instance: Logger | WorkerLogger) {
  const app = await NestFactory.create(AppModule.forRootAsync(), {
    logger: instance,
  });

  //app.useGlobalPipes(new ResourceValidationPipe());
  app.enableCors();

  await app.listen(process.env['PORT'] || 7004, '0.0.0.0');
}

async function init() {
  const instance = new WorkerLogger('main'); //createLogger(winstonConfig('main'));
  await bootstrap(instance);
}

init();
