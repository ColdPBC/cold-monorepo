import { AuthenticatedUser, BaseWorker, ColdRabbitService, MqttService, PrismaService, S3Service } from '@coldpbc/nest';
import { Injectable, NotFoundException, OnModuleInit, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import OpenAI from 'openai';
import { service_definitions } from '../../../../libs/nest/src/validation/generated/modelSchema/service_definitionsSchema';
import { organizations } from '../../../../libs/nest/src/validation/generated/modelSchema/organizationsSchema';
import { ConfigService } from '@nestjs/config';

export type OpenAIAssistant = {
  model: string;
  instructions: string;
  name: string;
  description?: string;
  tools?: [{ type: 'code_interpreter' }];
  file_ids?: string[];
  metadata?: Array<unknown>;
};

@Injectable()
export class AppService extends BaseWorker implements OnModuleInit {
  client: OpenAI;
  service: service_definitions;

  //s3: S3Client;

  constructor(
    private readonly mqtt: MqttService,
    private readonly axios: HttpService,
    private readonly s3: S3Service,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private rabbit: ColdRabbitService,
  ) {
    super(AppService.name);
    this.client = new OpenAI({ organization: process.env['OPENAI_ORG_ID'], apiKey: process.env['OPENAI_API_KEY'] });
  }

  async onModuleInit(): Promise<void> {
    const client = this.mqtt.connect();
    client.on('error', error => {
      this.logger.error(error.message, error);
    });
    client.on('connect', () => {
      console.log('Connected to AWS IoT Core');
      this.mqtt.subscribe('#');
      this.mqtt.onMessage((topic, message) => {
        this.logger.info(`Message published to ${topic}`, JSON.parse(message));
      });
    });

    const pkg = await BaseWorker.getParsedJSON('apps/cold-platform-openai/package.json');

    this.service = await this.rabbit.register_service(pkg);

    this.logger.log('OpenAI Service initialized');
  }

  handleError(e, meta) {
    if (e.status === 404) {
      throw new NotFoundException(e.message);
    }
    if (e.status > 399 && e.status < 500) {
      this.logger.error(e.message, meta);
      throw new UnprocessableEntityException(e.message);
    }
  }

  async deleteAssistant(user: AuthenticatedUser, assistantId: string) {
    try {
      const assistant = await this.client.beta.assistants.del(assistantId);
      this.logger.info(`User ${user.coldclimate_claims.email} deleted assistant ${assistantId}.`, { assistant, user });

      return assistant;
    } catch (e) {
      this.handleError(e, { assistantId, user });
    }
  }

  async createAssistant(user: AuthenticatedUser, organization: organizations, service: service_definitions, assistant: OpenAIAssistant) {
    try {
      const openAIResponse = await this.client.beta.assistants.create(assistant);

      if (!openAIResponse.id.includes('asst_')) {
        this.logger.error(new Error('OpenAI assistant creation failed.'), openAIResponse);
      }

      const integration = await this.prisma.integrations.create({
        data: {
          id: openAIResponse.id,
          organization_id: organization.id,
          service_definition_id: service.id,
          metadata: JSON.parse(JSON.stringify(openAIResponse)),
        },
      });

      this.logger.info(`OpenAI assistant (${openAIResponse}) created for ${organization.name}`, {
        ...organization,
        user,
        payload: assistant,
        integration,
        openAi: openAIResponse,
      });

      return openAIResponse;
    } catch (e) {
      this.handleError(e, {
        ...organization,
        user,
        service,
        payload: assistant,
      });
    }
  }

  async listModels(user: AuthenticatedUser) {
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

  async listAssistants(user: AuthenticatedUser) {
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

  async deleteFile(user: AuthenticatedUser, assistantId: string, fileId: string) {
    try {
      const file = await this.client.beta.assistants.files.del(assistantId, fileId);
      this.logger.info(`User ${user.coldclimate_claims.email} deleted file ${fileId}.`, { file, user });

      return file;
    } catch (e) {
      this.handleError(e, {
        user,
        assistantId,
        fileId,
      });
    }
  }

  async getFile(user: AuthenticatedUser, assistantId: string, fileId: string) {
    try {
      const file = await this.client.beta.assistants.files.retrieve(assistantId, fileId);
      this.logger.info(`User ${user.coldclimate_claims.email} requested file ${fileId}.`, { file, user });

      const content = await this.client.files.content(fileId).withResponse();
      this.logger.info(`Retrieved content for file ${fileId}.`, { content, user });
      return file;
    } catch (e) {
      this.handleError(e, {
        user,
        assistantId,
        fileId,
      });
    }
  }

  async listFiles(user: AuthenticatedUser, assistantId: string) {
    try {
      const files = await this.client.beta.assistants.files.list(assistantId);

      this.logger.info(`User ${user.coldclimate_claims.email} requested a list of files.`, { files, user });

      return files;
    } catch (e) {
      this.handleError(e, {
        user,
        assistantId,
      });
    }
  }

  async uploadToOpenAI(user: AuthenticatedUser, orgId: string, file: Express.Multer.File) {
    if (orgId !== user.coldclimate_claims.org_id && !user.isColdAdmin) {
      throw new UnauthorizedException('You do not have permission to perform this action');
    }

    const org = await this.prisma.organizations.findUnique({
      where: {
        id: orgId,
      },
    });

    if (!org) {
      throw new NotFoundException(`Organization ${orgId} not found`);
    }

    const destinationPath = `./uploads/${file.filename}`;

    const response = await this.client.files.create({
      file: this.fs.createReadStream(destinationPath),
      purpose: 'assistants',
    });

    this.logger.info(`Created new openAi file ${response.id} for assistants`, { response });
    const integrations = await this.prisma.integrations.findFirst({
      where: {
        organization_id: orgId,
        service_definition_id: this.service.id,
        location_id: null,
      },
    });

    const myAssistantFile = await this.client.beta.assistants.files.create(integrations.id, {
      file_id: response.id,
    });

    this.logger.info(`Created new assistant file ${myAssistantFile.id} for assistant ${myAssistantFile.assistant_id}`, {
      user,
      org,
      integrations,
      myAssistantFile,
    });

    const uploaded = await this.prisma.organization_files.upsert({
      where: {
        openai_file_id: myAssistantFile.id,
      },
      update: {
        original_name: file.originalname,
        integration_id: integrations.id,
        openai_assistant_id: integrations.id,
        openai_file_id: myAssistantFile.id,
        organization_id: orgId,
        versionId: file['versionId'] || null,
        bucket: null,
        key: null,
        mimetype: file.mimetype,
        size: file.size,
        acl: null,
        fieldname: file.fieldname,
        encoding: file.encoding || null,
        contentType: file['contentType'] || file.mimetype,
        location: destinationPath,
      },
      create: {
        original_name: file.originalname,
        integration_id: integrations.id,
        openai_assistant_id: integrations.id,
        organization_id: orgId,
        versionId: file['versionId'],
        bucket: null,
        key: null,
        mimetype: file.mimetype,
        size: file.size,
        acl: null,
        fieldname: file.fieldname,
        encoding: file.encoding || null,
        contentType: file['contentType'] || file.mimetype,
        location: file.filename,
      },
    });

    this.logger.info(`Stored new organization_file record in db`, {
      organization_file: uploaded,
      user,
      org,
      integrations,
      openAI_file: myAssistantFile,
    });

    this.fs.rmSync(destinationPath);
    return response;
  }
}
