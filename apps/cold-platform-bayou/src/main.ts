import '../../../libs/nest/src/lib/tracer';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { WorkerLogger } from '@coldpbc/nest';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppModule } from './app/app.module';

dotenv.config();

async function bootstrap(logger: WorkerLogger) {
  const app = await NestFactory.create(AppModule.forRootAsync(), {
    logger: logger,
  });

  //app.useGlobalPipes(new ResourceValidationPipe());
  app.enableCors();

  await app.listen(process.env['PORT'] || 7004, '0.0.0.0');
}

async function init() {
  const instance = new WorkerLogger('main');
  await bootstrap(instance);
}

init();
