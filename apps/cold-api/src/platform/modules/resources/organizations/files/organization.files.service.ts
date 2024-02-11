import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { BaseWorker, CacheService, Cuid2Generator, DarklyService, MqttService, PrismaService, S3Service } from '@coldpbc/nest';
import { IntegrationsService } from '../../integrations/integrations.service';
import { BroadcastEventService } from '../../../../utilities/events/broadcast.event.service';
import { OrganizationService } from '../organization.service';
import { pick } from 'lodash';

@Span()
@Injectable()
export class OrganizationFilesService extends BaseWorker {
  httpService: HttpService;
  test_orgs: Array<{ id: string; name: string; display_name: string }>;

  constructor(
    readonly cache: CacheService,
    readonly darkly: DarklyService,
    readonly events: BroadcastEventService,
    readonly integrations: IntegrationsService,
    readonly s3: S3Service,
    readonly mqtt: MqttService,
    private readonly orgService: OrganizationService,
    readonly prisma: PrismaService,
  ) {
    super('OrganizationFilesService');
    this.httpService = new HttpService();
  }

  override async onModuleInit() {
    this.darkly.subscribeToJsonFlagChanges('dynamic-org-white-list', value => {
      this.test_orgs = value;
    });
  }

  async getFiles(req: any, orgId: string, bpc?: boolean): Promise<any> {
    try {
      const org = await this.orgService.getOrganization(orgId, req, bpc);

      if (!org) {
        throw new NotFoundException(`Organization ${orgId} not found`);
      }

      const files = await this.prisma.organization_files.findMany({
        where: {
          organization_id: orgId,
        },
      });

      //const response = await this.events.sendEvent(true, 'organization_files.get', { organization: org }, user, orgId);

      return files;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async uploadFile(req: any, orgId: string, file: Express.MulterS3.File, bpc?: boolean) {
    const { user, url } = req;
    try {
      const org = await this.orgService.getOrganization(orgId, req, bpc);

      if (!org) {
        throw new NotFoundException(`Organization ${orgId} not found`);
      }

      const existing = await this.prisma.organization_files.findUnique({
        where: {
          s3Key: {
            key: file.key,
            bucket: file.bucket,
            organization_id: orgId,
          },
        },
      });

      if (existing?.checksum === file.metadata.md5Hash) {
        this.logger.warn(`file ${file.key} already exists in db`, file);
        throw new ConflictException(`file ${file.key} already exists in db for org ${orgId}`);
      }

      const uploaded = await this.prisma.organization_files.create({
        data: {
          id: new Cuid2Generator('ofile').scopedId,
          original_name: file.originalname,
          integration_id: null,
          organization_id: orgId,
          versionId: file['versionId'],
          bucket: file.bucket,
          key: file.key,
          mimetype: file.mimetype,
          size: file.size,
          acl: file.acl,
          fieldname: file.fieldname,
          encoding: file.encoding,
          contentType: file.contentType,
          location: file.location,
          checksum: file.metadata.md5Hash,
        },
      });

      await this.events.sendEvent(false, 'file.uploaded', uploaded, user, orgId);

      return uploaded;
    } catch (e) {
      this.logger.error(e);

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

  async deleteFile(req: any, orgId: string, fileId: string) {
    const { user, url } = req;
    try {
      const org = await this.orgService.getOrganization(orgId, req);

      if (!org) {
        throw new NotFoundException(`Organization ${orgId} not found`);
      }

      const file = await this.prisma.organization_files.findUnique({
        where: {
          id: fileId,
          organization_id: orgId,
        },
      });

      if (!file) {
        throw new NotFoundException(`File ${fileId} not found`);
      }

      await this.prisma.organization_files.delete({
        where: {
          id: fileId,
        },
      });

      await this.events.sendEvent(false, 'file.deleted', file, user, orgId);

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

      return file;
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
          file_id: fileId,
        },
      });

      return e;
    }
  }
}
