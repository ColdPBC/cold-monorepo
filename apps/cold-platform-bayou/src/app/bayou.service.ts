import { ConflictException, Injectable, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, ColdRabbitService, PrismaService } from '@coldpbc/nest';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { get } from 'lodash';
import { BayouCustomerPayload } from './schemas/bayou.customer.schema';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { service_definitions } from '../../../../libs/nest/src/validation/generated/modelSchema/service_definitionsSchema';
import { bill_parsedDTO, bills_readyDTO } from './schemas/bayou.webhook.schema';

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

  async billsWebhook(payload: bills_readyDTO) {
    for (const bill of get(payload.object, 'bills_parsed', [])) {
      await this.billWebhook({ event: payload.event, object: bill as bill_parsedDTO });
    }
  }

  // Allow any because it's already been validated, and we don't know what the payload will be
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async billWebhook(payload: { event: string; object: bill_parsedDTO }): Promise<{
    message: string;
  } | void> {
    try {
      if (!payload.object.customer_external_id) {
        throw new UnprocessableEntityException(`No customer_external_id found in payload`);
      }

      const integration = await this.prisma.integrations.findUnique({
        where: {
          integrationKey: {
            organization_id: get(payload.object, 'customer_external_id'),
            service_definition_id: this.service.id,
          },
        },
      });

      if (!integration) {
        throw new UnprocessableEntityException(`No integration found in DB for org: ${get(payload.object, 'external_id', '')}`);
      }

      const bill = await this.getBill(payload.object);

      if (!bill) {
        throw new UnprocessableEntityException(`Bill id ${bill.id} not found in Bayou for org: ${integration.organization_id}`);
      }

      await this.rabbit.publish('cold.platform.climatiq', { bills: bill.data, ...payload }, payload.event);
      return { message: 'webhook payload added to processing queue' };
    } catch (e) {
      this.logger.error(e.message, { error: e, payload });
      throw e;
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
        this.logger.error(e.message, { error: e, orgId });
        throw e;
      }
    }
  }

  async getBill(bill: bill_parsedDTO) {
    try {
      if (!bill) {
        return null;
      }
      if (bill.status === 'locked') {
        const unlocked = await this.axios.axiosRef.post(`/bills/${bill.id}/unlock`);
        this.logger.info(`Bill ${bill.id} unlocked`, { unlocked });
      }
      const response = await this.axios.axiosRef.get(`/bills/${bill.id}`, this.axiosConfig);
      return response.data;
    } catch (e) {
      if (e.response?.status === 404) {
        return { data: null };
      } else {
        this.logger.error(e.message, { error: e, bill });
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
