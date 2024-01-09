import { ConflictException, Injectable, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, ColdRabbitService, Organizations, PrismaService } from '@coldpbc/nest';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { get, set } from 'lodash';
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
    @InjectQueue('bayou') private queue: Queue,
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

  toEnergyPayload(
    data: bill_parsedDTO,
    emission_factor: {
      activity_id: string;
      region?: string;
    } = { activity_id: 'electricity-supply_grid-source_residual_mix', region: 'US' },
  ) {
    return {
      emission_factor: {
        activity_id: emission_factor.activity_id,
        data_version: '^1',
        region: emission_factor.region,
      },
      parameters: {
        energy: 0,
        energy_unit: 'kWh',
      },
    };
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
            location_id: get(payload.object, 'customer_external_id'),
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

      // unlock bill data if locked
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
        return null;
      } else {
        throw e;
      }
    }
  }

  private async getIntegration(service_definition_id: string, org_id: string, location_id: string) {
    return await this.prisma.integrations.findUnique({
      where: {
        organization_id: org_id,
        integrationKey: {
          location_id: location_id,
          service_definition_id: service_definition_id,
        },
      },
    });
  }

  async createCustomer(user: AuthenticatedUser, orgId: string, locId: string, payload: BayouCustomerPayload) {
    if (!user.isColdAdmin && user.coldclimate_claims.org_id !== orgId) {
      throw new UnprocessableEntityException(`Organization ID (${orgId}) is invalid for this user`);
    }

    const service = await this.prisma.service_definitions.findUnique({
      where: {
        name: process.env['DD_SERVICE'],
      },
    });

    if (!service) {
      throw new UnprocessableEntityException(`Service definition ${process.env['DD_SERVICE']} not found.`);
    }

    const existingIntegration = await this.getIntegration(service.id, orgId, locId);

    //check for duplicate customer in Bayou
    const bayouCustomer = await this.getCustomer(locId);

    if (bayouCustomer) {
      // location exists in bayou
      if (existingIntegration?.location_id == locId && bayouCustomer?.external_id === locId) {
        throw new ConflictException(`Bayou customer (${bayouCustomer.id}) already linked for location: ${locId}`);
      }

      // location exists in bayou, but not linked to this service
      if (!existingIntegration) {
        this.logger.warn(`Bayou customer (${bayouCustomer.id}) already exists for location: ${locId}, but no integration found in DB`, {
          bayou_data: bayouCustomer,
        });

        const integration = await this.prisma.integrations.create({
          data: {
            organization_id: orgId,
            location_id: locId,
            service_definition_id: service.id,
            metadata: bayouCustomer,
          },
        });

        this.logger.warn(`Linked Bayou customer (${bayouCustomer.id}) to new record in integrations`, {
          bayou_data: bayouCustomer,
          integration,
        });

        return bayouCustomer;
      }
    } else {
      // location doesn't exist in bayou
      const bayouResponse = await this.axios.axiosRef.post(`https://staging.bayou.energy/api/v2/customers`, payload, this.axiosConfig);

      await this.prisma.integrations.create({
        data: {
          organization_id: orgId,
          service_definition_id: service.id,
          location_id: locId,
          metadata: bayouResponse.data,
        },
      });

      this.logger.info(`Bayou customer (${bayouResponse.data.id}) created for location: ${locId}`, {
        org_id: orgId,
        bayou_data: bayouResponse.data,
      });

      return bayouResponse.data;
    }
  }

  toBayouPayload(data: { user: AuthenticatedUser; organization: Organizations; location_id: string; metadata: never }) {
    if (!data.organization['id']) throw new UnprocessableEntityException('No organization id found in payload');
    if (!data.organization.locations) throw new UnprocessableEntityException('No organization locations found in payload');
    const location = data.organization.locations.find(l => l.id === data.location_id);
    if (!location) throw new UnprocessableEntityException(`No location found for ${data.location_id}`);
    if (!data.location_id) throw new UnprocessableEntityException('No location id found in payload');
    if (!data.metadata['email'] && !data.user.coldclimate_claims.email) throw new UnprocessableEntityException('No email found in payload');
    if (!data.metadata['utility']) throw new UnprocessableEntityException('No utility found in payload');

    if (!data.metadata['email']) {
      this.logger.warn(`No email found in payload, defaulting to user email`, data);
      set(data.metadata, 'email', data.user.coldclimate_claims.email);
    }

    return {
      external_id: data.location_id,
      email: data.metadata['email'],
      street: location?.address,
      city: location?.city,
      state: location?.state,
      zipcode: location?.postal_code,
      country: location?.country || 'US',
      utility: data.metadata['utility'],
    };
  }
}
