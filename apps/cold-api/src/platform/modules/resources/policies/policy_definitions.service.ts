import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker, CacheService, IRequest, MqttService, PrismaService } from '@coldpbc/nest';

import { CreatePolicyDataDto } from './dto/create-policy-data.dto';
import { CreatePolicyDefinition } from './dto/create-policy-definition.dto';
import { PolicyDefinitionDto } from './dto/policy-definition.dto';

@Injectable()
export class Policy_definitionsService extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly cache: CacheService, readonly mqtt: MqttService) {
    super('PolicyContentService');
  }

  /***
   * This action creates a new policy definition
   * @param createPolicyDefinition
   */
  async create(req: IRequest, createPolicyDefinition: PolicyDefinitionDto): Promise<PolicyDefinitionDto> {
    const { user, url } = req;
    try {
      createPolicyDefinition.created_at = new Date();

      const policy = await this.prisma.policy_definitions.create({
        data: createPolicyDefinition as PolicyDefinitionDto,
      });

      this.logger.info('created policy', policy);

      //rebuild cache async
      await this.findPolicyByName(createPolicyDefinition.name, {
        contentOnly: false,
        bypassCache: true,
      });

      this.mqtt.publishMQTT('cold', {
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          policy,
        },
      });

      return policy;
    } catch (e) {
      this.mqtt.publishMQTT('cold', {
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          user: user,
          error: e.message,
        },
      });

      this.logger.error(e, { user: user.coldclimate_claims, createPolicyDefinition });
      if (e.message.includes('Unique constraint failed on the fields')) {
        throw new ConflictException(`A policy exists with the name ${createPolicyDefinition.name} already exists`);
      }
      if (e.name === 'PrismaClientValidationError') {
        throw new UnprocessableEntityException(`Some properties not valid : ${e.message}`, e);
      }

      throw e;
    }
  }

  /***
   * This action updates an existing policy definition
   * @param id
   * @param updatedPolicy
   */
  async update(id: number, updatedPolicy: CreatePolicyDefinition, req: IRequest): Promise<PolicyDefinitionDto> {
    const { url } = req;
    try {
      let policy = await this.prisma.policy_definitions.findUnique({ where: { id } });

      if (!policy) {
        throw new NotFoundException(`Policy ${id} not found`);
      }

      policy = await this.prisma.policy_definitions.update({
        where: {
          id: policy.id,
        },
        data: { definition: updatedPolicy.definition },
      });

      this.logger.info(`updated ${policy.name} policy`, policy);

      await this.cache.set('policy_definitions', policy, { update: true });
      await this.cache.set(`policy_definitions:name:${policy.name}`, policy, { update: true });

      this.mqtt.publishMQTT('cold', {
        swr_key: url,
        action: 'update',
        status: 'complete',
        data: {
          policy,
        },
      });

      return policy;
    } catch (e) {
      this.logger.error(e, { updatedPolicy });
      this.mqtt.publishMQTT('cold', {
        swr_key: url,
        action: 'update',
        status: 'failed',
        data: {
          error: e.message,
        },
      });
      throw e;
    }
  }

  /***
   * This action creates a new policy definition
   * @param id
   * @param user
   */
  async createSignedData(id: number, req: IRequest): Promise<CreatePolicyDataDto> {
    const { user, url } = req;
    try {
      const policyData: CreatePolicyDataDto = {
        policy_id: id,
        email: user?.coldclimate_claims?.email,
        created_at: new Date(),
      };

      const policy = await this.prisma.policy_data.create({
        data: policyData,
      });

      this.logger.info(`${user?.coldclimate_claims.email} signed policy ${id}`, policy);

      this.mqtt.publishMQTT('ui', {
        org_id: user?.coldclimate_claims.org_id,
        user: user,
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          policy,
        },
      });

      return policy;
    } catch (e) {
      this.logger.error(e, { id, user: user?.coldclimate_claims });

      if (e.message.includes('Unique constraint failed on the fields')) {
        throw new ConflictException(`User: ${user.coldclimate_claims.email} already signed policy: ${id}`);
      }

      this.mqtt.publishMQTT('ui', {
        org_id: user?.coldclimate_claims.org_id,
        user: user,
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          error: e.message,
        },
      });

      throw e;
    }
  }

  async findAllPolicies(options?: { bypassCache: boolean }): Promise<PolicyDefinitionDto[]> {
    if (!options?.bypassCache) {
      const cached = (await this.cache.get(`policy_definitions`)) as Array<any>;
      if (cached && cached.length > 0) {
        return cached;
      }
    }

    const policy = await this.prisma.policy_definitions.findMany({
      orderBy: {
        id: 'desc',
      },
      distinct: ['name'],
    });

    await this.cache.set('policy_definitions', policy, { ttl: 0, update: true });

    return policy;
  }

  async findPolicyByName(
    name: string,
    options = {
      bypassCache: false,
      contentOnly: false,
    },
  ): Promise<PolicyDefinitionDto | string> {
    if (!options?.bypassCache) {
      const cached = (await this.cache.get(`policy_definitions:name:${name}`)) as PolicyDefinitionDto;
      if (cached) {
        return options?.contentOnly ? cached.definition : cached;
      }
    }

    let policy:
      | {
          id: number;
          name: string;
          definition: any;
        }
      | null
      | undefined = await this.cache.get(`policy_definition:name:${name}`);

    policy = await this.prisma.policy_definitions.findFirst({
      orderBy: {
        id: 'desc',
      },
      where: {
        name,
      },
    });

    if (!policy) {
      throw new NotFoundException(`Policy ${name} not found`);
    }

    await this.cache.set(`policy_definitions:name:${name}`, policy, {
      update: true,
    });

    return options.contentOnly ? policy.definition : policy;
  }

  async findSignedDataByEmail(req: IRequest): Promise<PolicyDefinitionDto[]> {
    const { user } = req;

    const content = await this.prisma.policy_definitions.findMany({
      distinct: ['name'],
      orderBy: {
        name: 'desc',
      },
      include: {
        policy_data: {
          where: {
            email: user?.coldclimate_claims?.email,
          },
        },
      },
    });

    return content;
  }
}
