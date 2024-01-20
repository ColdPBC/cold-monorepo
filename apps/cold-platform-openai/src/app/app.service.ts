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
  tools: any;
};

@Injectable()
export class AppService extends BaseWorker implements OnModuleInit {
  client: OpenAI;
  service: service_definitions;
  topic: string = '';

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
    const pkg = await BaseWorker.getParsedJSON('apps/cold-platform-openai/package.json');

    try {
      this.service = await this.rabbit.register_service(pkg.service);
    } catch (e) {
      this.logger.error(e.message, e);
      try {
        this.service = await this.prisma.service_definitions.findUnique({
          where: {
            name: pkg.name,
          },
        });

        this.logger.warn('Unable to register service with RabbitMQ, retrieved service definition from database.');
      } catch (e) {
        this.handleError(e);
      }
    }
    this.logger.log('OpenAI Service initialized');
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

  async deleteAssistant(user: AuthenticatedUser, assistantId: string) {
    try {
      const assistant = await this.client.beta.assistants.del(assistantId);
      this.logger.info(`User ${user.coldclimate_claims.email} deleted assistant ${assistantId}.`, { assistant, user });

      return assistant;
    } catch (e) {
      this.handleError(e, { assistant_id: assistantId, user });
    }
  }

  async createAssistant(user: AuthenticatedUser, organization: organizations, service: service_definitions, assistant: OpenAIAssistant) {
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

      const openAIResponse = await this.client.beta.assistants.create(assistant);

      if (!openAIResponse.id.includes('asst_')) {
        this.logger.error(new Error('OpenAI assistant creation failed.'), openAIResponse);
      }

      integration = await this.prisma.integrations.create({
        data: {
          id: openAIResponse.id,
          organization_id: organization.id,
          service_definition_id: service.id,
          metadata: JSON.parse(JSON.stringify(openAIResponse)),
        },
      });

      this.logger.info(`OpenAI assistant (${openAIResponse.name}) created for ${organization.name}`, {
        organization,
        user,
        integration,
        payload: assistant,
        assistant: openAIResponse,
      });

      return Object.assign(integration, openAIResponse);
    } catch (e) {
      this.handleError(e, {
        organization,
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

  async listFiles(user: AuthenticatedUser) {
    try {
      const openAIResponse = await this.client.files.list();

      this.logger.info(`OpenAI files listed for ${user.coldclimate_claims.email}`, {
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
        assistant_id: assistantId,
        file_id: fileId,
      });
    }
  }

  async getAssistantFile(user: AuthenticatedUser, orgId: string, fileId: string) {
    try {
      const integration = await this.prisma.integrations.findFirstOrThrow({
        where: {
          organization_id: orgId,
          service_definition_id: this.service.id,
        },
      });

      const assistantId = integration.id;

      const file = await this.client.beta.assistants.files.retrieve(assistantId, fileId);
      this.logger.info(`User ${user.coldclimate_claims.email} requested file ${fileId}.`, { file, user });

      const content = await this.client.files.content(file.id).withResponse();
      this.logger.info(`Retrieved content for file ${fileId}.`, { content, user, file });
      return file;
    } catch (e) {
      this.handleError(e, {
        user,
        org_id: orgId,
        file_id: fileId,
      });
    }
  }

  async getFile(user: AuthenticatedUser, fileId: string) {
    try {
      const file = await this.client.files.retrieve(fileId);
      this.logger.info(`User ${user.coldclimate_claims.email} requested file ${fileId}.`, { file, user });

      const content = await this.client.files.content(fileId).withResponse();
      this.logger.info(`Retrieved content for file ${fileId}.`, { content, user });
      return file;
    } catch (e) {
      this.handleError(e, {
        user,
        file_id: fileId,
      });
    }
  }

  async listAssistantFiles(user: AuthenticatedUser, orgId: string) {
    try {
      const integration = await this.prisma.integrations.findFirstOrThrow({
        where: {
          organization_id: orgId,
          service_definition_id: this.service.id,
        },
      });

      const assistantId = integration.id;
      const files = await this.client.beta.assistants.files.list(assistantId);

      for (const file of files.data) {
        const meta = await this.prisma.organization_files.findUnique({
          where: {
            openai_file_id: file.id,
          },
        });

        if (meta) {
          Object.assign(file, meta);
        }
      }
      this.logger.info(`User ${user.coldclimate_claims.email} retrieved a list of files for assistant: ${assistantId}`, {
        files,
        user,
        assistantId,
      });

      return files.data;
    } catch (e) {
      this.handleError(e, {
        user,
        org_id: orgId,
      });
    }
  }

  async uploadOrgFilesToOpenAI(user: AuthenticatedUser, orgId: string, file: Express.Multer.File) {
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

    const openAIFile = await this.uploadToOpenAI(user, file);

    const { integrations, assistant_file } = await this.linkFileToAssistant(user, org, openAIFile.id);

    const uploaded = await this.prisma.organization_files.upsert({
      where: {
        openai_file_id: assistant_file.id,
      },
      update: {
        original_name: file.originalname,
        integration_id: integrations.id,
        openai_assistant_id: integrations.id,
        openai_file_id: assistant_file.id,
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
        location: file.filename,
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
      user,
      integrations,
      organization: org,
      assistant_file: assistant_file,
      organization_file: uploaded,
    });

    return openAIFile;
  }

  async uploadToOpenAI(user: AuthenticatedUser, file: Express.Multer.File) {
    const sourcePath = `./uploads/${file.filename}`;
    const destinationPath = `./uploads/${file.originalname}`;

    this.fs.rename(sourcePath, destinationPath, err => {
      if (err) {
        if (err.code === 'EXDEV') {
          (sourcePath, destinationPath) => {
            const readStream = this.fs.createReadStream(sourcePath);
            const writeStream = this.fs.createWriteStream(destinationPath);

            readStream.on('error', err => this.handleError(err));
            writeStream.on('error', err => this.handleError(err));

            readStream.on('close', function () {
              this.fs.unlink(sourcePath, () => {
                this.logger.info(`Successfully renamed - AKA moved!`);
              });
            });

            readStream.pipe(writeStream);
          };
        } else {
          throw err;
        }
      }
      console.log('Successfully renamed - AKA moved!', user.coldclimate_claims);
    });

    const openAIFile = await this.client.files.create({
      file: this.fs.createReadStream(destinationPath),
      purpose: 'assistants',
    });

    this.logger.info(`Created new file ${openAIFile.id} with assistants purpose`, { openAIFile });

    this.fs.rmSync(destinationPath);

    return openAIFile;
  }

  async linkFileToAssistant(
    user: AuthenticatedUser,
    org: {
      id: string;
    },
    openAIFileId: string,
    key?: string,
    bucket?: string,
  ) {
    try {
      const integrations = await this.prisma.integrations.findFirst({
        where: {
          organization_id: org.id,
          service_definition_id: this.service.id,
          location_id: null,
        },
      });

      if (!integrations) {
        throw new NotFoundException(`Integration not found for organization ${org.id}`);
      }

      let myAssistantFile;

      try {
        myAssistantFile = await this.client.beta.assistants.files.retrieve(integrations.id, openAIFileId);
      } catch (e) {
        if (e.status !== 404) {
          this.logger.error(e.message, { error: e, user, organization: org, openai_file_id: openAIFileId });
        }

        myAssistantFile = await this.client.beta.assistants.files.create(integrations.id, {
          file_id: openAIFileId,
        });

        this.logger.info(`Created new assistant file ${myAssistantFile.id} for assistant ${myAssistantFile.assistant_id}`, {
          user,
          integrations,
          organization: org,
          assistant_file: myAssistantFile,
        });
      }

      let orgFile;
      if (key && bucket) {
        orgFile = await this.prisma.organization_files.update({
          where: {
            s3Key: {
              key: key,
              bucket: bucket,
              organization_id: org.id,
            },
          },
          data: {
            openai_assistant_id: integrations.id,
            openai_file_id: myAssistantFile.id,
            integration_id: integrations.id,
          },
        });
      } else {
        orgFile = await this.prisma.organization_files.upsert({
          where: {
            openai_file_id: openAIFileId,
          },
          create: {
            openai_assistant_id: integrations.id,
            openai_file_id: myAssistantFile.id,
            integration_id: integrations.id,
            organization_id: integrations.organization_id,
            original_name: myAssistantFile.filename || 'unknown',
          },
          update: {
            openai_assistant_id: integrations.id,
            openai_file_id: myAssistantFile.id,
            integration_id: integrations.id,
            organization_id: org.id,
            original_name: myAssistantFile.filename || 'unknown',
          },
        });
      }
      return { integrations, assistant_file: myAssistantFile, organization_file: orgFile };
    } catch (e) {
      this.logger.error(e.message, e);
      this.handleError(e, { user, organization: org, openai_file_id: openAIFileId });
    }
  }
}
