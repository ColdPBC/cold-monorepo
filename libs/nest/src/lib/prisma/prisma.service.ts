import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtendedPrismaClient } from './prisma.extensions';

@Injectable()
export class PrismaService extends ExtendedPrismaClient implements OnModuleInit {
  constructor(override readonly config: ConfigService) {
    super(config);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    const eventType = 'beforeExit';
    // @ts-expect-error Shutdown hooks
    this.$on(eventType, async () => {
      await app.close();
    });
  }
}
