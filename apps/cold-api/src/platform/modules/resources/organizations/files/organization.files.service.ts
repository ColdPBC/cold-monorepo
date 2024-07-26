import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import * as z from 'zod';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { BaseWorker, CacheService, Cuid2Generator, DarklyService, GuidPrefixes, MqttService, PrismaService, S3Service } from '@coldpbc/nest';
import { IntegrationsService } from '../../integrations/integrations.service';
import { EventService } from '../../../utilities/events/event.service';
import { pick } from 'lodash';
import { OrganizationHelper } from '../helpers/organization.helper';

@Span()
@Injectable()
export class OrganizationFilesService extends BaseWorker {
  httpService: HttpService;
  test_orgs: Array<{ id: string; name: string; display_name: string }>;
  openAI: any;

  constructor(
    readonly cache: CacheService,
    readonly darkly: DarklyService,
    readonly events: EventService,
    readonly integrations: IntegrationsService,
    readonly s3: S3Service,
    readonly mqtt: MqttService,
    readonly helper: OrganizationHelper,
    readonly prisma: PrismaService,
  ) {
    super('OrganizationFilesService');
    this.httpService = new HttpService();
  }

  override async onModuleInit() {
    this.darkly.subscribeToJsonFlagChanges('dynamic-org-white-list', value => {
      this.test_orgs = value;
    });

    this.openAI = await this.prisma.service_definitions.findUnique({
      where: {
        name: 'cold-platform-openai',
      },
    });

    if (!this.openAI) {
      this.logger.error('OpenAI service definition not found; file uploads to openAI will not work');
    }
  }

  async getFiles(req: any, orgId: string, bpc?: boolean): Promise<any> {
    try {
      const org = await this.helper.getOrganizationById(orgId, req.user, bpc);

      if (!org) {
        throw new NotFoundException(`Organization ${orgId} not found`);
      }

      const files = await this.prisma.organization_files.findMany({
        where: {
          organization_id: orgId,
        },
        select: {
          id: true,
          original_name: true,
          bucket: true,
          key: true,
          mimetype: true,
          size: true,
          checksum: true,
          type: true,
          expires_at: true,
          effective_start_date: true,
          effective_end_date: true,
          certification_claim: {
            include: {
              certification: true,
            },
          },
        },
      });

      //const response = await this.events.sendEvent(true, 'organization_files.get', { organization: org }, user, orgId);

      return files;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async update(req: any, file_id: string, data: any) {
    z.object({
      effective_end_date: z.string().optional(),
      effective_start_date: z.string().optional(),
      type: z.string().optional(),
    })
      .strip()
      .parse(data);

    this.prisma.organization_files.update({
      where: {
        id: file_id,
        organization_id: req.organization.id,
      },
      data,
    });
  }

  async uploadFile(req: any, orgId: string, files: Array<Express.Multer.File>, bpc?: boolean) {
    const { user, url } = req;
    const org = await this.helper.getOrganizationById(orgId, req.user, bpc);
    const existingFiles: any = [];

    for (const file of files) {
      try {
        if (!org) {
          throw new NotFoundException(`Organization ${orgId} not found`);
        }

        const hash = await S3Service.calculateChecksum(file);

        const response = await this.s3.uploadStreamToS3(user, org.name, file);

        let existing = await this.prisma.organization_files.findUnique({
          where: {
            s3Key: {
              key: response.key,
              bucket: response.bucket,
              organization_id: orgId,
            },
          },
        });

        if (existing) {
          if (existing?.checksum === hash) {
            this.logger.warn(`file ${file.originalname} already exists in db`, pick(file, ['id', 'original_name', 'mimetype', 'size']));
            throw new ConflictException(`file ${file.originalname} already exists in db for org ${org.name}`);
          }

          await this.prisma.organization_files.update({
            where: {
              id: existing.id,
            },
            data: {
              id: new Cuid2Generator(GuidPrefixes.OrganizationFile).scopedId,
              original_name: file.originalname,
              integration_id: null,
              organization_id: orgId,
              versionId: file['versionId'],
              bucket: response.bucket,
              key: response.key,
              mimetype: file.mimetype,
              size: file.size,
              fieldname: file.fieldname,
              encoding: file.encoding,
              contentType: file.mimetype,
              location: file.destination,
              checksum: hash,
              type: 'OTHER',
            },
          });
        } else {
          existing = await this.prisma.organization_files.create({
            data: {
              id: new Cuid2Generator(GuidPrefixes.OrganizationFile).scopedId,
              original_name: file.originalname,
              integration_id: null,
              organization_id: orgId,
              versionId: response.uploaded.VersionId,
              bucket: response.bucket,
              key: response.key,
              mimetype: file.mimetype,
              size: file.size,
              fieldname: file.fieldname,
              encoding: file.encoding,
              contentType: file.mimetype,
              location: file.destination,
              checksum: hash,
              type: 'OTHER',
            },
          });
        }

        //const routingKey = get(this.openAI.definition, 'rabbitMQ.publishOptions.routing_key', 'dead_letter');
        //await this.events.sendPlatformEvent(routingKey, 'file.uploaded', { existing, user, organization: org }, req);

        await this.events.sendIntegrationEvent(false, 'file.uploaded', existing, user, orgId);

        existingFiles.push(existing);
      } catch (e) {
        this.logger.error(e.message, { user, orgId, file: pick(file, ['id', 'original_name', 'mimetype', 'size']) });

        this.mqtt.publishMQTT('ui', {
          org_id: orgId,
          user: user,
          swr_key: url,
          action: 'create',
          status: 'failed',
          data: {
            error: e.message,
            file: pick(file, ['id', 'original_name', 'mimetype', 'size']),
          },
        });

        throw e;
      }
    }

    return existingFiles;
  }

  async deleteFile(req: any, orgId: string, fileIds: string[]) {
    const { user, url } = req;
    try {
      const org = await this.helper.getOrganizationById(orgId, req.user, true);

      if (!org) {
        throw new NotFoundException(`Organization ${orgId} not found`);
      }

      for (const fileId of fileIds) {
        const file = await this.prisma.organization_files.findUnique({
          where: {
            id: fileId,
            organization_id: orgId,
          },
        });

        if (!file) {
          throw new NotFoundException(`File ${fileId} not found`);
        }

        const vectors = await this.prisma.vector_records.findMany({
          where: {
            organization_file_id: fileId,
          },
        });

        await this.events.sendIntegrationEvent(false, 'file.deleted', { file, vectors }, user, orgId);

        await this.prisma.organization_files.delete({
          where: {
            id: fileId,
          },
        });

        this.mqtt.publishMQTT('ui', {
          org_id: orgId,
          user: user,
          swr_key: url,
          action: 'delete',
          status: 'complete',
          data: {
            file_id: fileId,
          },
        });
      }

      return;
    } catch (e) {
      this.logger.error(e);

      this.mqtt.publishMQTT('ui', {
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'delete',
        status: 'failed',
        data: {
          error: e.message,
          file_ids: fileIds,
        },
      });

      return e;
    }
  }
}
