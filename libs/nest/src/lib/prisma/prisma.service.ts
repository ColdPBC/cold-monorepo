import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    if (process.env['DATABASE_URL']) {
      await this.$connect();
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    const eventType = 'beforeExit';
    // @ts-expect-error Shutdown hooks
    this.$on(eventType, async () => {
      await app.close();
    });
  }
}
