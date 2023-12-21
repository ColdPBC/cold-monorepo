/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(await AppModule.forRootAsync());
  const port = process.env.PORT || 7004;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${process.env.ORIGIN || `http://localhost:${port}`}`);
}

bootstrap();
