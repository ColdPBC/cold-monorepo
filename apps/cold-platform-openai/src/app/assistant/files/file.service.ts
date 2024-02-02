import { BaseWorker, IAuthenticatedUser, MqttService, PrismaService, S3Service } from '@coldpbc/nest';
import { Injectable, NotFoundException, OnModuleInit, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import OpenAI, { toFile } from 'openai';
import { omit, pick } from 'lodash';
import { AppService } from '../../app.service';
import { organizations, service_definitions } from '@prisma/client';
import { APIPromise } from 'openai/core';
import { Job } from 'bull';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService extends BaseWorker implements OnModuleInit {
  client: OpenAI;
  package: any;
  service: any;
  mqtt: MqttService;

  constructor(private readonly appService: AppService, private readonly prisma: PrismaService, private readonly s3: S3Service) {
    super(FileService.name);
    this.client = new OpenAI({ organization: process.env['OPENAI_ORG_ID'], apiKey: process.env['OPENAI_API_KEY'] });
    this.mqtt = new MqttService(new ConfigService());
  }

  async onModuleInit(): Promise<void> {
    this.package = await BaseWorker.getParsedJSON('apps/cold-platform-openai/package.json');
    this.service = this.appService.service;
    await this.mqtt.onModuleInit();
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

  async listFiles(user: IAuthenticatedUser) {
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

  async deleteFile(user: IAuthenticatedUser, assistantId: string, fileId: string) {
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

  async getAssistantFile(user: IAuthenticatedUser, orgId: string, fileId: string) {
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

  async getFile(user: IAuthenticatedUser, fileId: string) {
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

  /**
   * List files for an assistant
   * @param user
   * @param orgId
   */
  async listAssistantFiles(user: IAuthenticatedUser, orgId: string) {
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

  /**
   * Upload a file to OpenAI
   * @param job
   */
  async uploadOrgFilesToOpenAI(job: Job) {
    const { payload, user, organization, integration } = job.data;

    try {
      if (organization.id !== user.coldclimate_claims.org_id && !user.isColdAdmin) {
        throw new UnauthorizedException('You do not have permission to perform this action');
      }

      // Retrieve the file from the S3 bucket.
      const s3File: any = await this.s3.getObject(user, payload.bucket, payload.key);

      // scope the file name to the organization in case another org uploads a file with the same name
      const fileName = `${organization.name}-${payload.original_name}`;

      // Check if a file with the same name already exists in OpenAI.
      const files = await this.client.files.list();

      let oaiFile = files.data.find(async f => {
        return f.filename == fileName;
      });

      // If the file does not exist in OpenAI, create a new file.
      if (!oaiFile) {
        oaiFile = await this.client.files.create({
          file: await toFile(s3File.Body as Buffer, fileName),
          purpose: 'assistants',
        });
      } else {
        // If the file already exists in OpenAI, log a warning message.
        this.logger.warn(`File ${payload.original_name} already exists in openAI`, {
          oaiFile,
          ...omit(s3File, ['Body']),
          user,
          payload,
        });
      }

      // Link the file to the assistant.
      const assistant_file = await this.linkFileToAssistant(user, integration.id, oaiFile.id);

      // Create or update a record in the `organization_files` table in the database.
      const persisted = await this.prisma.organization_files.update({
        where: {
          id: payload.id,
        },
        data: {
          original_name: payload.original_name,
          integration_id: integration.id,
          openai_assistant_id: integration.id,
          openai_file_id: assistant_file.id,
        },
      });

      this.logger.info(`Stored new organization_file record in db`, {
        user,
        integration,
        organization: organization.id,
        assistant_file: assistant_file,
        organization_file: payload,
      });

      this.mqtt.publishToUI({
        org_id: organization.id,
        user: user,
        swr_key: `/organizations/${organization.id}/files`,
        action: 'create',
        status: 'complete',
        data: {
          file: pick(persisted, ['id', 'original_name', 'mimetype', 'size']),
        },
      });

      //return the persisted record.
      return persisted;
    } catch (e) {
      this.mqtt.publishToUI({
        org_id: organization.id,
        user: user,
        swr_key: `/organizations/${organization.id}/files`,
        action: 'create',
        status: 'failed',
        data: {
          file: pick(payload, ['id', 'original_name', 'mimetype', 'size']),
        },
      });
    }
  }

  async uploadToOpenAI(user: IAuthenticatedUser, file: Express.Multer.File) {
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

  /**
   * From Controller: Link a file to an assistant and create or update a record in the `organization_files` table in the database.
   * @param user
   * @param assistantId
   * @param openAIFileId
   */
  async linkFileToAssistant(user: IAuthenticatedUser, assistantId: string, openAIFileId: string): Promise<APIPromise<OpenAI.Beta.Assistants.Files.AssistantFile>> {
    let myAssistantFile: OpenAI.Beta.Assistants.Files.AssistantFile | PromiseLike<OpenAI.Beta.Assistants.Files.AssistantFile>;

    try {
      myAssistantFile = await this.client.beta.assistants.files.retrieve(assistantId, openAIFileId);
    } catch (e) {
      if (e.status !== 404) {
        this.logger.error(e.message, { error: e, user, openai_assistant_id: assistantId, openai_file_id: openAIFileId });
      }

      myAssistantFile = await this.client.beta.assistants.files.create(assistantId, {
        file_id: openAIFileId,
      });

      this.logger.info(`Created new assistant file ${myAssistantFile.id} for assistant ${myAssistantFile.assistant_id}`, {
        user,
        openai_assistant_id: assistantId,
        openai_file_id: openAIFileId,
        assistant_file: myAssistantFile,
      });
    }

    return myAssistantFile;
  }

  /**
   * Link a file to an assistant and create or update a record in the `organization_files` table in the database.
   * @param user
   * @param org
   * @param openAIFileId
   * @param filename
   * @param key
   * @param bucket
   */
  async linkFile(user: IAuthenticatedUser, org: organizations, openAIFileId: string, filename: string, service_definition: service_definitions, key?: string, bucket?: string) {
    try {
      const integrations = await this.prisma.integrations.findFirst({
        where: {
          organization_id: org.id,
          service_definition_id: service_definition.id,
          location_id: null,
        },
      });

      if (!integrations) {
        throw new NotFoundException(`Integration not found for organization ${org.id}`);
      }

      const myAssistantFile = await this.linkFileToAssistant(user, integrations.id, openAIFileId);

      let filter;
      if (key && bucket) {
        filter = {
          s3Key: {
            key: key,
            bucket: bucket,
            organization_id: org.id,
          },
        };
      } else {
        filter = {
          openai_file_id: openAIFileId,
        };
      }

      const orgFile = await this.prisma.organization_files.upsert({
        where: filter,
        create: {
          openai_assistant_id: integrations.id,
          openai_file_id: myAssistantFile.id,
          integration_id: integrations.id,
          organization_id: integrations.organization_id,
          original_name: filename || 'unknown',
        },
        update: {
          openai_assistant_id: integrations.id,
          openai_file_id: myAssistantFile.id,
          integration_id: integrations.id,
          organization_id: org.id,
          original_name: filename || 'unknown',
        },
      });

      return { integrations, assistant_file: myAssistantFile, organization_file: orgFile };
    } catch (e) {
      this.logger.error(e.message, e);
      this.handleError(e, { user, organization: org, openai_file_id: openAIFileId });
    }
  }
}
