import { Global, INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { WorkerLogger } from '../worker';
import { ConfigService } from '@nestjs/config';

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
  }

  async onModuleInit() {
    await this.$connect();
    const logger = new WorkerLogger('PrismaService');

    // @ts-expect-error Prisma event
    this.$on('query', (e: QueryEvent) => {
      if (process.env['NODE_ENV'] !== 'development') {
        logger.info('Postgres Query', {
          timestamp: e.timestamp,
          target: e.target,
          query: e.query,
          params: e.params,
          duration: e.duration,
          dd: {
            service: process.env['DD_SERVICE'],
            version: process.env['DD_VERSION'],
            env: process.env['NODE_ENV'],
          },
        });
      } else {
        console.info({
          message: 'Postgres Query',
          level: 'info',
          context: 'PrismaService',
          timestamp: e.timestamp,
          target: e.target,
          query: e.query,
          params: e.params,
          duration: e.duration,
          dd: {
            service: process.env['DD_SERVICE'],
            version: process.env['DD_VERSION'],
            env: process.env['NODE_ENV'],
          },
        });
      }
    });
    // @ts-expect-error Prisma event
    this.$on('error', (e: LogEvent) => {
      logger.error(e.message, { timestamp: e.timestamp, target: e.target });
    });

    return this;
  }

  async enableShutdownHooks(app: INestApplication) {
    const eventType = 'beforeExit';
    // @ts-expect-error Shutdown hooks
    this.$on(eventType, async () => {
      await app.close();
    });
  }
}
