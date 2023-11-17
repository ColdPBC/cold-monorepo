import './tracer';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { WinstonModule } from 'nest-winston';
import { createLogger } from 'winston';
import { AppModule } from './platform/modules/app.module';
import { OpenapiModule } from './platform/modules/swagger/openapi.module';
import winstonConfig from '../../../libs/nest/src/lib/worker/winston.config';
import { patchNestjsSwagger } from '@abitia/zod-dto';

dotenv.config();

async function bootstrap(instance) {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });

  //app.useGlobalPipes(new ResourceValidationPipe());
  app.enableCors();

  OpenapiModule.register(app);
  patchNestjsSwagger();

  await app.listen(process.env.PORT || 7001, '0.0.0.0');
}

async function init() {
  const instance = createLogger(winstonConfig('main'));
  await bootstrap(instance);
}

init();
