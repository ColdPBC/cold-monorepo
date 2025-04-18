import { Global, INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { WorkerLogger } from '../worker';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { withOptimize } from '@prisma/extension-optimize';

interface LogEvent {
	timestamp: Date;
	message: string;
	target: string;
}

interface QueryEvent {
	timestamp: Date;
	query: string;
	params: any;
	duration: number;
	target: string;
}

@Injectable()
@Global()
export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor(private readonly config: ConfigService) {
		super({
			datasourceUrl: config['internalConfig']['DATABASE_URL'],
			errorFormat: process.env['NODE_ENV'] === 'development' ? 'pretty' : 'minimal',
			log: [
				{
					emit: 'event',
					level: 'query',
				},
				{
					emit: 'stdout',
					level: 'error',
				},
				{
					emit: 'stdout',
					level: 'info',
				},
				{
					emit: 'stdout',
					level: 'warn',
				},
			],
		});
		if (process.env.OPTIMIZE_API_KEY) {
			const optimized = this.$extends(withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY }));
			// 3. Copy all extended methods/properties onto "this"
			Object.assign(this, optimized);
		}
	}

	async onModuleInit() {
		await this.$connect();
		const logger = new WorkerLogger('PrismaService');
		// @ts-expect-error Prisma event
		this.$on('error', (e: LogEvent) => {
			logger.error(e.message, { timestamp: e.timestamp, target: e.target });
		});

		return this;
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}

	async enableShutdownHooks(app: INestApplication) {
		const eventType = 'beforeExit';
		// @ts-expect-error Shutdown hooks
		this.$on(eventType, async () => {
			await app.close();
		});
	}
}
