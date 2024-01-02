import { ConflictException, Injectable, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, ColdRabbitService, PrismaService } from '@coldpbc/nest';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { get } from 'lodash';
import { BayouCustomerPayload } from './schemas/bayou.customer.schema';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { service_definitions } from '../../../../libs/nest/src/validation/generated/modelSchema/service_definitionsSchema';
import { bills_readyDTO } from './schemas/bayou.webhook.schema';

@Injectable()
export class BayouService extends BaseWorker implements OnModuleInit {
  axiosConfig: { baseURL: string; headers: { Authorization: string; 'content-type': string; accept: string } };
  service: service_definitions;

  constructor(
    private axios: HttpService,
    private prisma: PrismaService,
    private config: ConfigService,
    private rabbit: ColdRabbitService,
    @InjectQueue('outbound') private queue: Queue,
  ) {
    super(BayouService.name);
    const authHeader = `Basic ${Buffer.from(`${this.config.getOrThrow('BAYOU_API_KEY')}:`).toString('base64')}`;
    this.axiosConfig = {
      baseURL: 'https://staging.bayou.energy/api/v2',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: authHeader,
      },
    };
  }

  async onModuleInit(): Promise<void> {
    const pkg = await BaseWorker.getParsedJSON('apps/cold-platform-bayou/package.json');

    this.service = await this.rabbit.register_service(pkg);

    this.logger.log('BayouService initialized');
  }

  // Allow any because it's already been validated, and we don't know what the payload will be
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async webhook(payload: { event: string; object: bills_readyDTO }): Promise<{
    message: string;
  } | void> {
    const integration = await this.prisma.integrations.findUnique({
      where: {
        integrationKey: {
          organization_id: get(payload.object, 'external_id', ''),
          service_definition_id: this.service.id,
        },
      },
    });

    switch (payload.event) {
      case 'new_bill':
      case 'updated_bill':
      case 'bills_ready':
        if (integration) {
          const bills = await this.getBills(integration.organization_id);

          if (!bills.data) {
            throw new UnprocessableEntityException(`No bills found in Bayou for org: ${integration.organization_id}`);
          }

          await this.rabbit.publish('cold.platform.climatiq', { bills: bills.data, payload }, payload.event);
          return { message: 'webhook payload added to processing queue' };
        }
        break;
      default:
        this.logger.error(new UnprocessableEntityException(`${payload.event} webhook not yet implemented`));
        return { message: `${payload.event} webhook not yet implemented` };
    }
  }

  async getBills(orgId: string) {
    try {
      const response = await this.axios.axiosRef.get(`/customers/external_id:${orgId}/bills`, this.axiosConfig);
      return response.data;
    } catch (e) {
      if (e.response.status === 404) {
        return { data: null };
      } else {
        throw e;
      }
    }
  }

  private async getCustomer(orgId: string) {
    try {
      const response = await this.axios.axiosRef.get(`/customers/external_id:${orgId}`, this.axiosConfig);
      return response.data;
    } catch (e) {
      if (e.response.status === 404) {
        return { data: null };
      } else {
        throw e;
      }
    }
  }

  private async getIntegration(orgId: string) {
    return await this.prisma.integrations.findUnique({
      where: {
        integrationKey: {
          organization_id: orgId,
          service_definition_id: this.service.id,
        },
      },
    });
  }

  async createCustomer(user: AuthenticatedUser, payload: BayouCustomerPayload) {
    try {
      // accept external_id specified in payload if user is cold admin, otherwise use org_id from claims
      const extId = user.isColdAdmin ? payload.external_id : user.coldclimate_claims.org_id;
      const bayouCustomer = await this.getCustomer(extId);
      let existingIntegration = await this.getIntegration(extId);

      if (existingIntegration && bayouCustomer.data) {
        throw new ConflictException(`Bayou customer (${bayouCustomer.data.id}) already exists for org: ${user.coldclimate_claims.org_id}`);
      }

      if (!existingIntegration && bayouCustomer.data) {
        this.logger.warn(`Bayou customer (${bayouCustomer.data.id}) already exists for org: ${user.coldclimate_claims.org_id}, but no integration found in DB`, {
          bayou: bayouCustomer.data,
        });

        existingIntegration = await this.prisma.integrations.create({
          data: {
            organization_id: extId,
            service_definition_id: this.service.id,
            metadata: bayouCustomer.data,
          },
        });
      }

      const bayouResponse = await this.axios.axiosRef.post(`https://staging.bayou.energy/api/v2/customers`, payload, this.axiosConfig);

      const integrationData = {
        organization_id: extId,
        service_definition_id: this.service.id,
        response: bayouResponse.data,
      };

      if (!existingIntegration) {
        await this.prisma.integrations.create({
          data: {
            organization_id: extId,
            service_definition_id: this.service.id,
            metadata: bayouResponse.data,
          },
        });
      }

      this.logger.info(`Bayou customer (${bayouResponse.data.id}) created for org: ${extId}`, integrationData);
      return integrationData;
    } catch (e) {
      throw new UnprocessableEntityException({
        message: e.message,
        error: e.response?.data,
      });
    }
  }
}
