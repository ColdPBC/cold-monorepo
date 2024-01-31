import { BadRequestException, ConflictException, Global, Injectable, NotFoundException } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { AuthenticatedUser, BaseWorker, CacheService, Cuid2Generator, DarklyService, MqttService, PrismaService } from '@coldpbc/nest';
import { ComplianceDefinition, OrgCompliance } from './compliance_definition_schema';
import { BroadcastEventService } from '../../../utilities/events/broadcast.event.service';

@Span()
@Global()
@Injectable()
export class ComplianceDefinitionService extends BaseWorker {
  exclude_orgs: Array<{ id: string; name: string; display_name: string }>;

  constructor(
    readonly darkly: DarklyService,
    private prisma: PrismaService,
    private readonly cache: CacheService,
    private readonly mqtt: MqttService,
    private readonly event: BroadcastEventService,
  ) {
    super('ComplianceDefinitionService');
    this.mqtt.connect(ComplianceDefinitionService.name);
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

      complianceDefinition.id = new Cuid2Generator('compdef').scopedId;
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
   * This action activates a new compliance for org
   * @param user
   * @param name
   * @param orgId
   * @param bpc
   */
  async activateOrgCompliance(user: AuthenticatedUser, name: string, orgId: string, bpc?: boolean): Promise<OrgCompliance> {
    this.setTags({ user: user.coldclimate_claims });
    try {
      await this.cache.delete(`compliance_definitions:name:${name}:org:${orgId}`);

      const definition = await this.findOne(name, user, bpc);

      let compliance = await this.prisma.organization_compliances.findFirst({
        where: {
          organization_id: orgId,
          compliance_id: definition.id,
        },
        include: {
          organization: true,
          compliance_definition: true,
        },
      });

      if (compliance) {
        throw new ConflictException(`${name} is already activated for ${orgId}`);
      }

      compliance = await this.prisma.organization_compliances.create({
        data: {
          id: new Cuid2Generator('orgcomp').scopedId,
          organization_id: orgId,
          compliance_id: definition.id,
        },
        include: {
          organization: true,
          compliance_definition: true,
        },
      });

      await this.cache.set(`compliance_definitions:name:${name}:org:${orgId}`, { update: true });

      this.logger.info(`activated ${name} compliance for ${orgId}`, {
        compliance_definition: name,
        organization: { id: orgId },
      });

      const surveyNames = compliance.compliance_definition.surveys as string[];

      const surveys: any[] = [];

      for (const name of surveyNames) {
        const survey = await this.prisma.survey_definitions.findFirst({
          where: {
            name: name,
          },
        });
        if (survey) {
          surveys.push(survey);
        }
      }

      await this.event.sendEvent(false, 'organization_compliances.created', { surveys, compliance }, user, orgId);

      return compliance as OrgCompliance;
    } catch (e) {
      this.logger.error(e.message, { error: e });
      throw e;
    }
  }

  /***
   * This action returns all compliance definitions
   * @param bpc
   */
  async findAll(bpc?: boolean): Promise<ComplianceDefinition[]> {
    if (!bpc) {
      /*const cached = await this.cache.get('compliance_definitions');
      if (cached) {
        return cached as unknown as ComplianceDefinition[];
      }*/
    }

    const definitions = (await this.prisma.compliance_definitions.findMany()) as ComplianceDefinition[];

    if (!definitions || definitions.length == 0) {
      throw new NotFoundException(`Unable to find any compliance definitions`);
    }

    await this.cache.set('compliance_definitions', definitions, { update: true });

    return definitions;
  }

  /***
   * This action returns all compliances activated for an org
   * @param user
   * @param orgId
   * @param bpc
   */
  async findOrgCompliances(user: AuthenticatedUser, orgId: string, bpc?: boolean): Promise<OrgCompliance[]> {
    if (!bpc) {
      /*const cached = (await this.cache.get(`compliance_definitions:org:${orgId}`)) as OrgCompliance[];

      if (cached && cached.length) {
        return cached;
      }*/
    }

    const orgCompliances = (await this.prisma.organization_compliances.findMany({
      where: {
        organization_id: orgId,
      },
      include: {
        organization: true,
        compliance_definition: true,
      },
    })) as unknown as OrgCompliance[];

    if (!orgCompliances || orgCompliances.length == 0) {
      return [];
    }

    await this.cache.set(`compliance_definitions:org:${orgId}`, orgCompliances, { update: true });

    return orgCompliances;
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

    /*if (!bypassCache) {
      const cached = (await this.cache.get(`compliance_definitions:${name}`)) as ComplianceDefinition;

      if (cached) {
        return cached;
      }
    }*/
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

  /***
   * This action deactivates a named compliance for an org
   * @param name
   * @param orgId
   * @param user
   */
  async deactivate(name: string, orgId: string, user: AuthenticatedUser, bpc?: boolean) {
    this.setTags({
      compliance_definition_name: name,
      user: user.coldclimate_claims,
      ...this.tags,
    });
    let compliance: OrgCompliance;
    try {
      const def = await this.findOne(name, user, bpc);

      compliance = (await this.prisma.organization_compliances.findFirst({
        where: {
          organization_id: orgId,
          compliance_id: def.id,
        },
      })) as OrgCompliance;

      if (!compliance) {
        throw new NotFoundException(`Unable to find compliance definition with name: ${name} and org: ${orgId}`);
      }

      await this.prisma.organization_compliances.delete({ where: { id: compliance.id } });

      this.logger.info(`deactivated compliance definition: ${name} for org: ${orgId}`, { id: def.id, name: def.name });
    } catch (e) {
      this.logger.error(e.message, { error: e });

      throw e;
    }
  }
}
