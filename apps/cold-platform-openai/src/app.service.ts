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
  topic: string = '';

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
      model: await this.darkly.getStringFlag('static-gpt-assistant-model', 'gpt-3.5-turbo', {
        kind: 'organization',
        name: organization.display_name,
        key: organization.name,
      }),
      tools: [{ type: 'retrieval' }, { type: 'code_interpreter' }, await this.tools.answerable(organization), await this.tools.unanswerable(organization)],
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
          const inOpenAi = await this.client.beta.assistants.retrieve(integration.id);
          if (inOpenAi) {
            this.logger.warn('Integration already exists in openAI for this organization.', {
              integration,
              user,
              organization,
              service,
            });

            return Object.assign(integration, inOpenAi);
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

      const openAIResponse = await this.client.beta.assistants.create(assistant);

      if (!openAIResponse.id.includes('asst_')) {
        this.logger.error(new Error('OpenAI assistant creation failed.'), openAIResponse);
      }

      metadata = JSON.parse(JSON.stringify(openAIResponse));

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
