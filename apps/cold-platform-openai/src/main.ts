import './tracer';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv'; // eslint-disable-next-line @nx/enforce-module-boundaries
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule.forRootAsync());

	//app.useGlobalPipes(new ResourceValidationPipe());
	app.enableCors();

	await app.listen(process.env['PORT'] || 7002, '0.0.0.0');
}

async function init() {
	await bootstrap();
	console.log(`Cold Platform OpenAI started on port ${process.env.PORT}`);
}

init();
