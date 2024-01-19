import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { AuthenticatedUser, BaseWorker, CacheService, Cuid2Generator, DarklyService, PrismaService } from '@coldpbc/nest';
import { ComplianceDefinition } from './schemas/compliance_definition_schema';

@Span()
@Injectable()
export class ComplianceDefinitionService extends BaseWorker {
  exclude_orgs: Array<{ id: string; name: string; display_name: string }>;

  constructor(readonly darkly: DarklyService, private prisma: PrismaService, private readonly cache: CacheService) {
    super('ComplianceDefinitionService');
  }

  override async onModuleInit() {
    this.darkly.subscribeToJsonFlagChanges('dynamic-org-white-list', value => {
      this.exclude_orgs = value;
    });
  }

  /***
   * This action creates a new compliance definition
   * @param complianceDefinition
   * @param user
   */
  async create(user: AuthenticatedUser, complianceDefinition: ComplianceDefinition): Promise<ComplianceDefinition> {
    this.setTags({ user: user.coldclimate_claims, compliance_definition: complianceDefinition });

    try {
      const existing = await this.prisma.compliance_definitions.findUnique({
        where: {
          name: complianceDefinition.name,
        },
      });

      if (existing) {
        throw new BadRequestException(`A compliance definition with the name ${complianceDefinition.name} already exists`);
      }

      complianceDefinition.id = new Cuid2Generator('compdf').scopedId;
      const response = await this.prisma.compliance_definitions.create({
        data: complianceDefinition,
      });

      this.logger.info('created compliance definition', response);

      return response as ComplianceDefinition;
    } catch (e) {
      this.metrics.increment('cold.api.surveys.create', this.tags);
      throw e;
    }
  }

  /***
   * This action returns all compliance definitions
   * @param bpc
   */
  async findAll(bpc?: boolean): Promise<ComplianceDefinition[]> {
    if (!bpc) {
      const cached = this.cache.get('compliance_definitions');
      if (cached) {
        return cached as unknown as ComplianceDefinition[];
      }
    }

    const definitions = (await this.prisma.compliance_definitions.findMany()) as ComplianceDefinition[];

    if (!definitions) {
      throw new NotFoundException(`Unable to find any compliance definitions`);
    }

    await this.cache.set('compliance_definitions', definitions, { update: true });

    return definitions;
  }

  /**
   * This action returns a compliance definition by name
   * @param name
   * @param user
   * @param bypassCache
   * @param impersonateOrg
   */
  async findOne(name: string, user: AuthenticatedUser, bypassCache?: boolean): Promise<ComplianceDefinition> {
    this.setTags({ user: user.coldclimate_claims, bpc: bypassCache });

    if (!bypassCache) {
      const cached = (await this.cache.get(`compliance_definitions:${name}`)) as ComplianceDefinition;

      if (cached) {
        return cached;
      }
    }
    try {
      const def = (await this.prisma.compliance_definitions.findUnique({
        where: { name: name },
      })) as ComplianceDefinition;

      if (!def) {
        throw new NotFoundException(`Unable to find compliance definition with name: ${name}`);
      }

      await this.cache.set(`compliance_definitions:${name}`, def, { update: true });

      return def;
    } catch (e) {
      this.logger.error(e.message, { error: e });
      throw e;
    }
  }

  /***
   * This action updates a named compliance definition
   * @param name
   * @param complianceDefinition
   * @param user
   */
  async update(name: string, complianceDefinition: ComplianceDefinition, user: AuthenticatedUser): Promise<ComplianceDefinition> {
    this.setTags({
      user: user.coldclimate_claims,
      compliance_definition: complianceDefinition,
    });

    try {
      await this.cache.delete(`compliance_definition:${name}`);

      const def = await this.findOne(name, user, true);

      if (!def) {
        throw new NotFoundException(`Unable to find compliance definition with name: ${name}`);
      }

      const definition = await this.prisma.compliance_definitions.update({
        where: { name: name },
        data: complianceDefinition,
      });

      this.setTags({ status: 'completed' });

      this.logger.info('updated definition', definition);

      this.metrics.increment('cold.api.surveys.update', 1, this.tags);

      return definition as unknown as ComplianceDefinition;
    } catch (e) {
      this.logger.error(e.message, { error: e });
      throw e;
    }
  }

  /***
   * This action removes a named compliance definition
   * @param name
   * @param user
   */
  async remove(name: string, user: AuthenticatedUser) {
    this.setTags({
      compliance_definition_name: name,
      user: user.coldclimate_claims,
      ...this.tags,
    });

    try {
      const def = await this.findOne(name, user);
      if (def) {
        await this.cache.delete(`compliance_definition:name:${def.name}`);
      }

      await this.prisma.compliance_definitions.delete({ where: { name: name } });

      this.logger.info(`deleted compliance definition: ${name}`, { id: def.id, name: def.name });
    } catch (e) {
      this.logger.error(e.message, { error: e });

      throw e;
    }
  }
}
