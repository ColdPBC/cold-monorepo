import { BadRequestException, Global, Injectable, NotFoundException } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { BaseWorker, CacheService, ComplianceDefinitionsRepository, Cuid2Generator, DarklyService, GuidPrefixes, MqttService, PrismaService } from '@coldpbc/nest';
import { ComplianceDefinition, OrgCompliance } from './compliance-definitions.schema';
import { compliance_definitions } from '@prisma/client';
import { omit, pick } from 'lodash';
import { EventService } from '../../../utilities/events/event.service';

@Span()
@Global()
@Injectable()
export class ComplianceDefinitionService extends BaseWorker {
  exclude_orgs: Array<{ id: string; name: string; display_name: string }>;
  openAI_definition: any;

  constructor(
    readonly darkly: DarklyService,
    readonly prisma: PrismaService,
    readonly cache: CacheService,
    readonly mqtt: MqttService,
    readonly event: EventService,
    readonly definitions: ComplianceDefinitionsRepository,
  ) {
    super('ComplianceDefinitionService');
  }

  override async onModuleInit() {
    this.darkly.subscribeToJsonFlagChanges('dynamic-org-white-list', value => {
      this.exclude_orgs = value;
    });
  }

  async activate(orgId: string, req: any, compliance_name: string): Promise<any> {
    const { user, url, headers } = req;
    const compliance_definition = await this.prisma.compliance_definitions.findUnique({
      where: {
        name: compliance_name,
      },
    });

    if (!compliance_definition) {
      throw new NotFoundException(`${compliance_name} compliance definition does not exist`);
    }

    const useComplianceFlow = await this.darkly.getBooleanFlag('dynamic-enable-compliance-flow', false, {
      kind: 'org-compliance-set',
      key: orgId,
      name: compliance_name,
    });

    if (useComplianceFlow) {
      // try the new way first....
      const compliance: any = await this.prisma.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: orgId,
            compliance_definition_name: compliance_name,
          },
        },
        select: {
          id: true,
          compliance_definition_name: true,
          organization: true,
          compliance_definition: {
            select: {
              id: true,
              name: true,
              title: true,
              version: true,
              compliance_section_groups: {
                select: {
                  id: true,
                  title: true,
                  order: true,
                  compliance_sections: {
                    select: {
                      id: true,
                      key: true,
                      title: true,
                      order: true,
                      dependency_expression: true,
                      compliance_questions: {
                        select: {
                          id: true,
                          key: true,
                          order: true,
                          prompt: true,
                          component: true,
                          tooltip: true,
                          placeholder: true,
                          rubric: true,
                          options: true,
                          coresponding_question: true,
                          dependency_expression: true,
                          question_summary: true,
                          additional_context: true,
                          compliance_section_id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!compliance) {
        throw new NotFoundException(`Compliance ${compliance_name} not found for org ${orgId}`);
      }

      await this.event.sendIntegrationEvent(
        false,
        'compliance_flow.enabled',
        {
          base_update_topic: `ui/${process.env.NODE_ENV}/${orgId}/${compliance_name}`,
          service: this.openAI_definition,
          compliance,
          token: headers['authorization'].replace('Bearer ', ''),
        },
        user,
        orgId,
      );

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          event: 'compliance_flow.enabled',
          base_update_topic: `ui/${process.env.NODE_ENV}/${orgId}/${compliance_name}`,
          service: this.openAI_definition,
        },
      });
    } else {
      // then try the old way
      const compliance = await this.prisma.organization_compliances_old.findFirst({
        where: {
          organization_id: orgId,
          compliance_id: compliance_definition.id,
        },
        include: {
          compliance_definition: true,
        },
      });

      if (!compliance) {
        throw new NotFoundException(`Compliance ${compliance_name} not found for org ${orgId}`);
      }

      let surveyNames: string[];
      if (Array.isArray(compliance.surveys_override) && compliance.surveys_override.length > 0) {
        surveyNames = compliance.surveys_override as string[];
      } else {
        surveyNames = compliance.compliance_definition.surveys as string[];
      }

      const surveys: any[] = [];

      for (const name of surveyNames) {
        const survey = await this.prisma.survey_definitions.findFirst({
          where: {
            name: name,
          },
        });
        if (survey) {
          surveys.push(survey);
        } else {
          this.logger.error(`Survey ${name} referenced in ${Array.isArray(compliance.surveys_override) ? 'surveys_override' : 'surveys'} array not found for ${compliance_name}`);
          throw new NotFoundException(
            `Survey ${name} referenced in ${Array.isArray(compliance.surveys_override) ? 'surveys_override' : 'surveys'} array not found for ${compliance_name}`,
          );
        }
      }

      await this.event.sendIntegrationEvent(
        false,
        'compliance_automation.enabled',
        {
          on_update_url: `/organizations/${orgId}/surveys/${compliance_name}`,
          surveys,
          service: this.openAI_definition,
          compliance,
        },
        user,
        orgId,
      );

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          compliance,
        },
      });
    }
  }

  async injectSurvey(req: any, name: string, survey: any) {
    const compliance = await this.prisma.compliance_definitions.findUnique({
      where: {
        name: name,
      },
    });

    if (!compliance) {
      throw new NotFoundException(`Compliance with name ${name} does not exist`);
    }

    await this.importSurveyStructure(Object.assign({ ...compliance, survey_definition: survey }));
  }

  /***
   * This action creates a new compliance definition
   * @param req
   * @param complianceDefinition
   */
  async create(req: any, complianceDefinition: ComplianceDefinition): Promise<ComplianceDefinition> {
    //await this.cache.delete(`compliance:${complianceDefinition.name}:organizations:${req.organization.id}`, true);

    const { user, url } = req;
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

      complianceDefinition.id = new Cuid2Generator(GuidPrefixes.ComplianceDefinition).scopedId;

      const response = await this.prisma.compliance_definitions.create({
        data: omit(complianceDefinition, ['survey_definition']),
      });

      if (complianceDefinition.survey_definition) {
        await this.importSurveyStructure(complianceDefinition);
      }

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: response,
      });

      this.logger.info('created compliance definition', response);

      return response as unknown as ComplianceDefinition;
    } catch (e) {
      this.metrics.increment('cold.api.surveys.create', this.tags);
      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          definition: complianceDefinition,
          error: e.message,
        },
      });

      throw e;
    }
  }

  async importSurveyStructure(compliance: any) {
    let survey: any;
    if (!compliance.survey_definition && compliance.surveys.length > 0) {
      survey = await this.prisma.survey_definitions.findUnique({
        where: {
          name: compliance.surveys[0],
        },
      });

      if (!survey) {
        this.logger.error(`Survey ${compliance.surveys[0]} not found`);
      }
    } else if (compliance?.survey_definition?.sections) {
      survey = compliance.survey_definition;
    }

    if (survey) {
      for (const [key, value] of Object.entries(survey.sections)) {
        const sectionKey = key;
        const sectionValue: any = value;

        const compliance_section_group = await this.prisma.compliance_section_groups.upsert({
          where: {
            compDefNameTitle: {
              compliance_definition_name: compliance.name,
              title: sectionValue.section_type || compliance.name,
            },
          },
          create: {
            id: new Cuid2Generator(GuidPrefixes.SectionGroup).scopedId,
            order: 0,
            title: sectionValue.section_type || compliance.name,
            compliance_definition_name: compliance.name,
          },
          update: {
            title: sectionValue.section_type || compliance.name,
            compliance_definition_name: compliance.name,
          },
        });

        this.logger.log(`created compliance section group: ${sectionValue.title} for ${compliance.name}`, {
          section_group: compliance_section_group,
          compliance_definition: compliance,
        });

        const comp_section = await this.prisma.compliance_sections.upsert({
          where: {
            compSecGroupKey: {
              compliance_section_group_id: compliance_section_group.id,
              key: sectionKey,
            },
          },
          create: {
            id: new Cuid2Generator(GuidPrefixes.ComplianceSection).scopedId,
            key: sectionKey,
            title: sectionValue.title,
            order: sectionValue.category_idx as number,
            dependency_expression: sectionValue?.dependency?.expression,
            compliance_definition_name: compliance.name,
            compliance_section_group_id: compliance_section_group.id,
          },
          update: {
            title: sectionValue.title,
            order: sectionValue.category_idx as number,
            dependency_expression: sectionValue?.dependency?.expression,
            compliance_definition_name: compliance.name,
          },
        });

        this.logger.log(`created new compliance section: ${key}:${sectionValue.title} for ${compliance.name}`, {
          section: comp_section,
          section_group: compliance_section_group,
          compliance_definition: compliance,
        });

        for (const [qkey, qvalue] of Object.entries(sectionValue.follow_up)) {
          const questionKey = qkey;
          const questionValue: any = qvalue;
          const questionData = {
            key: questionKey,
            order: questionValue.idx as number,
            prompt: questionValue.prompt,
            component: questionValue.component,
            tooltip: questionValue.tooltip,
            placeholder: questionValue.placeholder,
            rubric: questionValue.rubric,
            options: questionValue.options,
            compliance_definition_name: compliance.name,
            coresponding_question: questionValue.coresponding_question,
            dependency_expression: questionValue?.dependency?.expression,
            question_summary: questionValue.question_summary,
            additional_context: questionValue.additional_context,
            compliance_section_id: comp_section.id,
          };

          if (!Array.isArray(questionValue.options) || questionValue.options.length < 1) {
            delete questionData.options;
          }

          await this.prisma.compliance_questions.upsert({
            where: {
              compSecKey: {
                key: questionKey,
                compliance_section_id: comp_section.id,
              },
            },
            create: {
              id: new Cuid2Generator(GuidPrefixes.ComplianceQuestion).scopedId,
              ...questionData,
            },
            update: {
              ...questionData,
            },
          });

          this.logger.log(`created new compliance question: ${questionKey} under ${key} for ${compliance.name}`, {
            question: questionData,
            section: comp_section,
            section_group: compliance_section_group,
            compliance_definition: compliance,
          });
        }
      }

      const definition = this.prisma.compliance_definitions.findUnique({
        where: {
          id: compliance.id,
        },
        include: {
          compliance_section_groups: {
            select: {
              id: true,
              title: true,
              order: true,
              compliance_sections: {
                select: {
                  id: true,
                  key: true,
                  title: true,
                  order: true,
                  dependency_expression: true,
                  compliance_definition_name: true,
                  compliance_section_group_id: true,
                  compliance_questions: {
                    select: {
                      id: true,
                      key: true,
                      order: true,
                      prompt: true,
                      component: true,
                      tooltip: true,
                      placeholder: true,
                      rubric: true,
                      options: true,
                      coresponding_question: true,
                      dependency_expression: true,
                      question_summary: true,
                      additional_context: true,
                      compliance_section_id: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!definition) {
        throw new NotFoundException(`Unable to find compliance definition with name: ${compliance.name}`);
      }

      return definition;
    }

    throw new NotFoundException(`Survey definition not found for ${compliance.name}`);
  }

  /***
   * This action creates/updates a compliance for org
   * @param req
   * @param name
   * @param orgId
   * @param bpc
   */
  async createOrgCompliance(req: any, name: string, orgId: string, bpc?: boolean): Promise<OrgCompliance> {
    const { user, url } = req;
    this.setTags({ user: user.coldclimate_claims });
    try {
      await this.cache.delete(`organizations:${orgId}:compliance:${name}:legacy_org_compliance`);

      const definition = await this.findOne(name, req, bpc);

      const data: any = {
        organization_id: orgId,
        compliance_id: definition.id,
      };

      if (req.body.surveys_override) {
        data.surveys_override = req.body.surveys_override;
      }

      const compliance = await this.prisma.organization_compliance.upsert({
        where: {
          orgIdCompNameKey: {
            organization_id: orgId,
            compliance_definition_name: name,
          },
        },
        create: {
          id: new Cuid2Generator(GuidPrefixes.OrganizationCompliance).scopedId,
          description: definition.title,
          compliance_definition_name: definition.name,
          organization_id: orgId,
        },
        update: {
          description: definition.title,
          compliance_definition_name: definition.name,
          organization_id: orgId,
        },
      });

      await this.prisma.organization_compliances_old.upsert({
        where: {
          orgKeyCompKey: {
            organization_id: orgId,
            compliance_id: definition.id,
          },
        },
        update: { ...data },
        create: { ...data },

        include: {
          organization: true,
          compliance_definition: true,
        },
      });

      await this.cache.set(`organizations:${orgId}:compliance:${name}:legacy_org_compliance`, compliance, { update: true });

      this.logger.info(`created ${name} compliance for ${orgId}`, {
        compliance_definition: name,
        organization: { id: orgId },
      });

      this.mqtt.publishMQTT('ui', {
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          ...compliance,
        },
      });

      return compliance as any;
    } catch (e) {
      this.logger.error(e.message, { error: e });

      this.mqtt.publishMQTT('ui', {
        org_id: orgId,
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

  /***
   * This action returns all compliance definitions
   * @param bpc
   */
  async getAll(): Promise<compliance_definitions[]> {
    const deflist = await this.definitions.getComplianceDefinitions();

    if (!Array.isArray(deflist) || deflist.length < 1) {
      throw new NotFoundException(`Unable to find any compliance definitions`);
    }

    return deflist;
  }

  /***
   * This action returns all compliance definitions for an org
   * @param bpc
   */
  async getAllByOrg(req: any, bpc: boolean): Promise<compliance_definitions[]> {
    const deflist = await this.definitions.getComplianceDefinitionsByOrgId(req, bpc);

    if (!Array.isArray(deflist) || deflist.length < 1) {
      throw new NotFoundException(`Unable to find any compliance definitions`);
    }

    return deflist;
  }

  /***
   * This action returns all compliances activated for an org
   * @param req
   * @param orgId
   * @param bpc
   */
  async findOrgCompliances(req: any, bpc?: boolean): Promise<OrgCompliance[]> {
    if (!bpc) {
      /*const cached = (await this.cache.get(`compliance_definitions:org:${orgId}`)) as OrgCompliance[];

      if (cached && cached.length) {
        return cached;
      }*/
    }

    this.logger.warn('compliance-definitions.findOrgCompliances() IS DEPRECATED', { organization: req.organization, user: req.user });

    const orgCompliances = (await this.prisma.organization_compliances_old.findMany({
      where: {
        organization_id: req.organization.id,
      },
      include: {
        organization: true,
        compliance_definition: true,
      },
    })) as unknown as OrgCompliance[];

    if (!orgCompliances || orgCompliances.length == 0) {
      return [];
    }

    orgCompliances.map((compliance: any) => {
      if (compliance.surveys_override) {
        compliance.compliance_definition.surveys = compliance.surveys_override;
      }
    });
    //await this.cache.set(`organizations:${req.organization.id}:compliance:${name}:legacy_org_compliance`, orgCompliances, { update: true });

    return orgCompliances;
  }

  /**
   * This action returns a compliance definition by name
   * @param name
   * @param req
   * @param bypassCache
   */
  async findOne(name: string, req: any, bypassCache?: boolean): Promise<ComplianceDefinition> {
    const { user, organization } = req;
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
        throw new NotFoundException({ organization, user }, `Unable to find compliance definition with name: ${name}`);
      }

      await this.cache.set(`compliance:${name}`, def, { update: true });

      return def;
    } catch (e) {
      this.logger.error(e.message, { error: e, organization, user });
      throw e;
    }
  }

  /***
   * This action updates a named compliance definition
   * @param name
   * @param complianceDefinition
   * @param req
   */
  async update(name: string, complianceDefinition: ComplianceDefinition, req: any): Promise<ComplianceDefinition> {
    const { user, url, organization, method } = req;
    this.setTags({
      user: user.coldclimate_claims,
      compliance_definition: complianceDefinition,
    });

    try {
      await this.cache.delete(`compliance:${name}`, true);

      const def = await this.findOne(name, req, true);

      if (!def) {
        throw new NotFoundException({ url, method, organization, user }, `Unable to find compliance definition with name: ${name}`);
      }

      const definition = await this.prisma.compliance_definitions.update({
        where: { name: name },
        data: complianceDefinition,
      });

      this.setTags({ status: 'completed' });

      this.logger.info('updated definition', { organization, user, definition: pick(definition, ['name', 'title', 'version']) });

      this.metrics.increment('cold.api.surveys.update', 1, this.tags);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'update',
        status: 'complete',
        data: {
          user,
          organization,
          definition: pick(definition, ['name', 'title', 'version']),
        },
      });

      return definition as unknown as ComplianceDefinition;
    } catch (e) {
      this.logger.error(e.message, { error: e, organization, user });

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          error: e.message,
          organization,
          user,
          definition: pick(complianceDefinition, ['name', 'title', 'version']),
        },
      });

      throw e;
    }
  }

  /***
   * This action removes a named compliance definition
   * @param name
   * @param req
   */
  async remove(name: string, req: any) {
    const { user, url, organization } = req;
    this.setTags({
      compliance_definition_name: name,
      organization,
      user: user.coldclimate_claims,
      ...this.tags,
    });

    try {
      await this.cache.delete(`compliance:${name}`, true);

      await this.prisma.compliance_definitions.delete({ where: { name: name } });

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'delete',
        status: 'complete',
        data: {},
      });

      this.logger.info(`deleted compliance definition: ${name}`, { compliance_name: name, organization, user });
    } catch (e) {
      this.logger.error(e.message, { error: e, organization, user });

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'delete',
        status: 'failed',
        data: {
          error: e.message,
        },
      });

      throw e;
    }
  }

  /***
   * This action deactivates a named compliance for an org
   * @param name
   * @param orgId
   * @param req
   * @param bpc
   */
  async deactivate(name: string, orgId: string, req: any, bpc?: boolean) {
    const { user, url, organization } = req;
    this.setTags({
      compliance_definition_name: name,
      user: user.coldclimate_claims,
      organization,
      ...this.tags,
    });
    let compliance: OrgCompliance;
    try {
      const def = await this.findOne(name, req, bpc);

      // Delete old Org Compliances first
      compliance = (await this.prisma.organization_compliances_old.findFirst({
        where: {
          organization_id: organization.id,
          compliance_id: def.id,
        },
      })) as OrgCompliance;

      if (!compliance) {
        throw new NotFoundException(`Unable to find compliance definition with name: ${name} and org: ${organization.id}`);
      }

      await this.prisma.organization_compliances_old.delete({ where: { id: compliance.id } });

      // Delete new Org Compliance record
      compliance = (await this.prisma.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: organization.id,
            compliance_definition_name: name,
          },
        },
      })) as unknown as OrgCompliance;

      if (compliance) {
        await this.prisma.organization_compliance.delete({ where: { id: compliance.id } });
      }

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'delete',
        status: 'complete',
        data: {},
      });

      this.logger.info(`deactivated compliance definition: ${name} for org: ${organization.id}`, { id: def.id, name: def.name, organization, user });
    } catch (e) {
      this.logger.error(e.message, { error: e, organization, user });

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'delete',
        status: 'failed',
        data: {
          error: e.message,
        },
      });

      throw e;
    }
  }
}
