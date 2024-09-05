import { BaseWorker, ColdRabbitService, DarklyService, IAuthenticatedUser, PrismaService } from '@coldpbc/nest';
import { Injectable, NotFoundException, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import OpenAI from 'openai';
import { organizations, service_definitions } from '@prisma/client';
import { Tools } from './assistant/tools/tools';
import { ConfigService } from '@nestjs/config';

export type OpenAIAssistant = {
  model: string;
  instructions: string;
  name: string;
  description?: string;
  tools: any;
};

@Injectable()
export class AppService extends BaseWorker implements OnModuleInit {
  client: OpenAI;
  service: service_definitions;
  topic = '';

  constructor(readonly config: ConfigService, readonly prisma: PrismaService, readonly rabbit: ColdRabbitService, readonly darkly: DarklyService, readonly tools: Tools) {
    super(AppService.name);
    this.client = new OpenAI({
      organization: config.getOrThrow('OPENAI_ORG_ID'),
      apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
    });
  }

  async onModuleInit(): Promise<void> {
    const pkg = await BaseWorker.getParsedJSON('apps/cold-platform-openai/package.json');

    try {
      this.service = (await this.rabbit.register_service(pkg.service)) as service_definitions;
    } catch (e) {
      this.logger.error(e.message, e);
      try {
        this.service = (await this.prisma.service_definitions.findUnique({
          where: {
            name: pkg.name,
          },
        })) as service_definitions;

        this.logger.warn('Unable to register service with RabbitMQ, retrieved service definition from database.');
      } catch (e) {
        this.handleError(e);
      }
    }
  }

  handleError(e, meta?) {
    if (e.status === 404) {
      throw new NotFoundException(e.message);
    }
    if (e.status > 399 && e.status < 500) {
      this.logger.error(e.message, meta);
      throw new UnprocessableEntityException(e.message);
    }
  }
  // @ts-expect-error - Fix this later
  async deleteAssistant(parsed: any) {
    const { user, integration } = parsed;
    try {
      const assistant = await this.client.beta.assistants.del(integration.id);
      this.logger.info(`User ${user.coldclimate_claims.email} deleted assistant ${integration.id}`, {
        assistant,
        user,
      });

      return assistant;
    } catch (e) {
      this.logger.error(`FAILED: delete assistant ${integration.id}`, { ...parsed, error: { ...e } });
      this.handleError(e.message, { error: e, parsed });
    }
  }

  async createAssistant(parsed: any) {
    const service = await this.prisma.service_definitions.findUnique({
      where: {
        name: 'cold-platform-openai',
      },
    });

    if (!service) {
      throw new NotFoundException('OpenAI Service Definition not found');
    }

    const organization: organizations = parsed.organization;
    const user = parsed.user;

    const assistant: OpenAIAssistant = {
      name: `${organization.name}`,
      instructions: await this.darkly.getStringFlag('dynamic-open-ai-assistant-instructions', '', {
        kind: 'organization',
        name: organization.display_name,
        key: organization.name,
      }),
      description: `OpenAI assistant for ${organization.display_name}`,
      model: await this.darkly.getStringFlag('static-gpt-assistant-model', 'gpt-4o', {
        kind: 'organization',
        name: organization.display_name,
        key: organization.name,
      }),
      tools: [{ type: 'file_search' }, await this.tools.answerable(organization), await this.tools.unanswerable(organization)],
    };

    try {
      let integration = await this.prisma.integrations.findFirst({
        where: {
          organization_id: organization.id,
          service_definition_id: service.id,
        },
      });

      if (integration) {
        this.logger.warn('Integration already exists in the DB for this organization and service definition.', {
          integration,
          user,
          organization,
          service,
        });

        try {
          const assistant = await this.client.beta.assistants.retrieve(integration.id);

          let vectorStore;

          if (assistant) {
            this.logger.warn('Integration already exists in openAI for this organization.', {
              integration,
              user,
              organization,
              service,
            });

            const stores = await this.client.beta.vectorStores.list();
            vectorStore = stores.data.find(store => store.name === `${organization.name}`);

            if (!vectorStore) {
              vectorStore = await this.createOpenAiVectorStore(organization, integration);
            } else {
              this.logger.warn('Vector Store already exists in OpenAI for this organization.', {
                integration,
                user,
                organization,
                service,
              });

              let isVectorStoreInAssistant = false;
              assistant?.tool_resources?.file_search?.vector_store_ids?.map(id => {
                if (id === vectorStore.id) {
                  isVectorStoreInAssistant = true;
                }
              });

              if (!isVectorStoreInAssistant) {
                this.logger.warn('Vector Store does not match in OpenAI.  Updating OpenAI assistant.', {
                  integration,
                  user,
                  organization,
                  service,
                });

                await this.client.beta.assistants.update(integration.id, { tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } } });
              }
            }

            if (!vectorStore) {
              throw new NotFoundException({ inOpenAi: assistant, integration, user, organization, service }, 'Vector Store not found in OpenAI');
            }

            return Object.assign(integration, assistant, vectorStore);
          }
        } catch (e) {
          if (e.status == 404) {
            this.logger.warn('Integration exists in DB but not in OpenAI.  Record will be recreated in DB.', {
              integration,
              user,
              organization,
              service,
            });
            await this.prisma.integrations.delete({
              where: {
                id: integration.id,
              },
            });
          }
        }
      }

      let metadata: any = {};

      const vectorStore = await this.createOpenAiVectorStore(organization);

      const openAIResponse = await this.client.beta.assistants.create({ ...assistant, tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } } });

      if (!openAIResponse.id.includes('asst_')) {
        this.logger.error(new Error('OpenAI assistant creation failed.'), openAIResponse);
      }

      metadata = JSON.parse(JSON.stringify({ ...openAIResponse, vectorStore }));

      this.logger.info(`OpenAI assistant (${openAIResponse.name}) created for ${organization.name}`, {
        organization,
        user,
        integration,
        payload: assistant,
        assistant: openAIResponse,
      });

      integration = await this.prisma.integrations.create({
        data: {
          id: openAIResponse.id,
          organization_id: organization.id,
          service_definition_id: service.id,
          metadata: metadata,
        },
      });

      return Object.assign(integration, metadata);
    } catch (e) {
      this.handleError(e, {
        organization,
        user,
        service,
        payload: assistant,
      });
    }
  }

  private async createOpenAiVectorStore(
    organization: {
      id: string;
      name: string;
      enabled_connections: any;
      display_name: string;
      branding: any;
      phone: string | null;
      website: string | null;
      email: string | null;
      created_at: Date;
      updated_at: Date;
      isTest: boolean;
      deleted: boolean;
    },
    integration?: {
      id: string;
      service_definition_id: string;
      organization_id: string;
      metadata: any;
      created_at: Date;
      updated_at: Date;
      facility_id: string | null;
      deleted: boolean;
    },
  ) {
    const vectorStore = await this.client.beta.vectorStores.create({ name: `${organization.name}` });

    if (integration) {
      await this.prisma.integrations.update({
        where: {
          id: integration?.id,
        },
        data: {
          metadata: JSON.stringify({
            ...integration?.metadata,
            vectorStore: vectorStore,
          }),
        },
      });
    }

    return vectorStore;
  }

  // @ts-expect-error - Fix this later
  async listModels(user: IAuthenticatedUser) {
    try {
      const openAIResponse = await this.client.models.list();

      this.logger.info(`OpenAI models listed for ${user.coldclimate_claims.email}`, {
        user,
        openAi: openAIResponse,
      });

      return openAIResponse?.data;
    } catch (e) {
      this.handleError(e, {
        user,
      });
    }
  }
  // @ts-expect-error - Fix this later
  async listAssistants(user: IAuthenticatedUser) {
    try {
      const openAIResponse = await this.client.beta.assistants.list();

      this.logger.info(`OpenAI assistants listed for ${user.coldclimate_claims.email}`, {
        user,
        openAi: openAIResponse,
      });

      return openAIResponse?.data;
    } catch (e) {
      this.handleError(e, {
        user,
      });
    }
  }
}
