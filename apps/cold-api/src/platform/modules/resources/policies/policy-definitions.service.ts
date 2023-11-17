import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker, AuthenticatedUser, PrismaService, CacheService } from 'nest';

import { CreatePolicyDataDto } from './dto/create-policy-data.dto';
import { CreatePolicyDefinition } from './dto/create-policy-definition.dto';
import { PolicyDefinitionDto } from './dto/policy-definition.dto';

@Injectable()
export class PolicyDefinitionsService extends BaseWorker {
  constructor(private prisma: PrismaService, private readonly cache: CacheService) {
    super('PolicyContentService');
  }

  /***
   * This action creates a new policy definition
   * @param createPolicyDefinition
   */
  async create(user: AuthenticatedUser, createPolicyDefinition: PolicyDefinitionDto): Promise<PolicyDefinitionDto> {
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

      return policy;
    } catch (e) {
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
  async update(id: number, updatedPolicy: CreatePolicyDefinition): Promise<PolicyDefinitionDto> {
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

      return policy;
    } catch (e) {
      this.logger.error(e, { updatedPolicy });
      throw e;
    }
  }

  /***
   * This action creates a new policy definition
   * @param id
   * @param user
   */
  async createSignedData(id: number, user: AuthenticatedUser): Promise<CreatePolicyDataDto> {
    try {
      const policyData: CreatePolicyDataDto = {
        id: id,
        email: user?.coldclimate_claims?.email,
        created_at: new Date(),
      };

      const policy = await this.prisma.policy_data.create({
        data: policyData,
      });

      this.logger.info(`${user?.coldclimate_claims.email} signed policy ${id}`, policy);

      return policy;
    } catch (e) {
      this.logger.error(e, { id, user: user?.coldclimate_claims });

      if (e.message.includes('Unique constraint failed on the fields')) {
        throw new ConflictException(`User: ${user.coldclimate_claims.email} already signed policy: ${id}`);
      }

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

    let policy: { id: number; name: string; definition: any } | null | undefined = await this.cache.get(`policy_definition:name:${name}`);

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

  async findSignedDataByEmail(user: AuthenticatedUser): Promise<PolicyDefinitionDto[]> {
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
