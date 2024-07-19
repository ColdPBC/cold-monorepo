import { PrismaClient } from '@prisma/client';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';
import { WorkerLogger } from '../worker';
import util from 'node:util';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

/**
 * Extends the given Prisma client with additional functionality.
 *
 * @param {PrismaClient} client - The Prisma client instance to extend.
 * @returns {PrismaClient} The extended Prisma client instance.
 */
export const extendedClient = (client: PrismaClient) => {
  const logger = new WorkerLogger('PrismaService');

  client
    .$extends({
      query: {
        async $allOperations({ operation, model, args, query }) {
          const start = performance.now();
          const result = await query(args);
          const end = performance.now();
          const time = end - start;
          logger.debug(util.inspect({ model, operation, args, time }, { showHidden: false, depth: null, colors: process.env['NODE_ENV'] === 'development' }));
          return result;
        },
      },
    })
    .$extends(
      createSoftDeleteExtension({
        models: {
          compliance_definitions: true,
          compliance_sections: true,
          compliance_questions: true,
          compliance_question_dependency_chains: true,
          compliance_responses: true,
          compliance_section_dependency_chains: true,
          compliance_section_groups: true,
          emissions: true,
          facility_footprints: true,
          integrations: true,
          organization_compliance: true,
          organization_compliance_responses: true,
          organization_compliance_ai_responses: true,
          organization_compliance_ai_response_files: true,
          organization_compliance_notes: true,
          organization_compliance_note_files: true,
          organization_compliance_note_links: true,
          organization_compliance_question_bookmarks: false,
          organization_compliance_statuses: true,
          organization_facilities: true,
          organization_files: true,
          organizations: true,
        },
      }),
    );

  return client;
};

/**
 * Represents an extended version of the PrismaClient.
 * Uses a custom configuration and provides additional functionality through the 'extended' property.
 */
@Injectable()
export class ExtendedPrismaClient extends PrismaClient implements OnModuleInit {
  client: CustomPrismaClient;

  constructor(readonly config: ConfigService) {
    super({
      datasourceUrl: `${config['internalConfig']['DATABASE_URL'] ? config['internalConfig']['DATABASE_URL'] : process.env['DATABASE_URL']}?schema=public&connection_limit=1`,
      errorFormat: process.env['NODE_ENV'] === 'development' ? 'pretty' : 'minimal',
      log:
        process.env['NODE_ENV'] === 'development'
          ? [
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
            ]
          : [],
    });
    this.client = extendedClient(this);
  }

  get extended() {
    if (!this.client) this.client = extendedClient(this);

    return this.client;
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

export type CustomPrismaClient = ReturnType<typeof extendedClient>;
