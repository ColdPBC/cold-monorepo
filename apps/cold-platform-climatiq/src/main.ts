import './tracer';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppModule } from './app.module';
import { WorkerLogger } from '@coldpbc/nest';

dotenv.config();

async function bootstrap(instance: WorkerLogger) {
	const app = await NestFactory.create(AppModule.forRootAsync(), {
		logger: false,
		bufferLogs: true,
		autoFlushLogs: true,
	});

	//app.useGlobalPipes(new ResourceValidationPipe());
	app.enableCors();

	await app.listen(process.env['PORT'] || 7003, '0.0.0.0');
}

async function init() {
	const instance = new WorkerLogger('main');
	await bootstrap(instance);
}

init();
