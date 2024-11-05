import { BadRequestException, Global, HttpException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { organizations, survey_status_types, survey_types } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { isUUID } from 'class-validator';
import { diff } from 'deep-object-diff';
import { filter, find, map, merge, omit, set } from 'lodash';
import { Span } from 'nestjs-ddtrace';
import { v4 } from 'uuid';
import {
  BaseWorker,
  CacheService,
  DarklyService,
  IRequest,
  MqttService,
  PrismaService,
  SurveyDefinitionsEntity,
  UpdateSurveyDefinitionsDto,
  ZodSurveyResponseDto,
} from '@coldpbc/nest';
import { SurveyFilterService } from './filter/survey.filter.service';
import { ScoringService } from './scoring/scoring.service';
import { OrgSurveysService } from '../organizations/surveys/orgSurveys.service';

@Span()
@Global()
@Injectable()
export class SurveysService extends BaseWorker {
  exclude_orgs: Array<{ id: string; name: string; display_name: string }>;

  constructor(
    readonly darkly: DarklyService,
    readonly config: ConfigService,
    readonly prisma: PrismaService,
    readonly cache: CacheService,
    readonly mqtt: MqttService,
    readonly filterService: SurveyFilterService,
    readonly scoreService: ScoringService,
    readonly surveyStatus: OrgSurveysService,
  ) {
    super('SurveysService');
  }

  override async onModuleInit() {
    this.darkly.subscribeToJsonFlagChanges('dynamic-org-white-list', value => {
      this.exclude_orgs = value;
    });
    // await this.initListener();
  }

  /***
   * This action returns a survey definition by type
   * @param req
   * @param type
   * @param bpc
   */
  async findDefinitionByType(req: IRequest, type: survey_types, bpc?: boolean): Promise<ZodSurveyResponseDto[]> {
    const { user } = req;
    this.logger.tags = merge(this.tags, { survey_type: type, user: user.coldclimate_claims });

    try {
      const cached: any = await this.cache.get(`survey_definitions:type:${type}`);

      if (cached && !bpc) {
        return cached;
      }

      const surveys = (await this.prisma.survey_definitions.findMany({
        where: { type: type },
      })) as unknown as ZodSurveyResponseDto[];

      await this.cache.set(`survey_definitions:type:${type}`, surveys, {
        ttl: 1000 * 60 * 60, // persist since it will be fairly static
      });

      return surveys;
    } catch (e) {
      this.logger.error(e.message, { error: e });
      throw new UnprocessableEntityException(e);
    }
  }

  async findAllDefinitions(req: IRequest, bpc?: boolean): Promise<ZodSurveyResponseDto[]> {
    const { user } = req;
    this.setTags({ user: user.coldclimate_claims });

    try {
      const cached: any = await this.cache.get(`survey_definitions`);

      if (cached && !bpc) {
        return cached;
      }

      const surveys = (await this.prisma.survey_definitions.findMany()) as unknown as ZodSurveyResponseDto[];

      await this.cache.set(`survey_definitions`, surveys, {
        ttl: 1000 * 60 * 60 * 24, // persist since it will be fairly static
      });

      return surveys;
    } catch (e) {
      this.logger.error(e.message, { error: e });
      throw new UnprocessableEntityException(e);
    }
  }

  async findDefinitionByName(req: IRequest, name: string, bpc?: boolean): Promise<ZodSurveyResponseDto[]> {
    const { user } = req;
    this.setTags({ user: user.coldclimate_claims });

    try {
      let def: any;

      if (bpc) {
        def = (await this.prisma.survey_definitions.findUnique({
          where: { name: name },
        })) as unknown as ZodSurveyResponseDto[];

        await this.cache.set(`survey_definitions:name:${name}`, def, {
          ttl: 1000 * 60 * 60 * 24, // persist since it will be fairly static
        });
      } else {
        def = await this.cache.get(`survey_definitions:name:${name}`);
      }

      if (!def) {
        throw new NotFoundException(`Unable to find survey definition with name: ${name}`);
      }

      return def;
    } catch (e) {
      this.logger.error(e.message, { error: e });
      throw new UnprocessableEntityException(e);
    }
  }

  /***
   * This action creates a new survey definition
   * @param createSurveyDefinitionDto
   * @param req
   */
  async create(createSurveyDefinitionDto: Partial<SurveyDefinitionsEntity>, req: IRequest): Promise<ZodSurveyResponseDto> {
    const { user, url } = req;
    const org = (await this.cache.get(`organizations:${user.coldclimate_claims.org_id}`)) as organizations;

    this.setTags({
      organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']),
      user: user.coldclimate_claims,
    });

    try {
      const existing = (await this.prisma.survey_definitions.findFirst({
        where: {
          name: createSurveyDefinitionDto.name,
        },
      })) as SurveyDefinitionsEntity;

      if (existing) {
        throw new BadRequestException(`A survey with the name ${createSurveyDefinitionDto.name} already exists`);
      }

      // delete cached definitions by type
      await this.cache.delete(`survey_definitions`, true);
      await this.cache.delete(`survey_definitions:type:${createSurveyDefinitionDto.type}`, true);
      await this.cache.delete(`survey_definitions:name:${createSurveyDefinitionDto.name}`, true);

      const definition = createSurveyDefinitionDto;

      if (!definition.definition) {
        throw new BadRequestException(`A survey definition must have a definition`);
      }

      definition.created_at = new Date();

      const response = (await this.prisma.survey_definitions.create({
        data: definition as any,
      })) as ZodSurveyResponseDto;

      this.logger.info('created definition', definition);

      //rebuild cache async
      this.findDefinitionByType(req, response.type, true);
      this.findDefinitionByName(req, response.name, true);
      this.findAllDefinitions(req, true);

      this.metrics.increment('cold.api.surveys.create', this.tags);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          createSurveyDefinitionDto,
          user: user.coldclimate_claims,
        },
      });

      return response;
    } catch (e) {
      if (e.message.includes('Unique constraint failed on the fields')) {
        throw new BadRequestException(e, `A survey definition with the name ${createSurveyDefinitionDto.name} already exists`);
      }

      this.setTags({
        status: 'failed',
        survey_name: createSurveyDefinitionDto?.name,
        organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']),
      });

      this.metrics.increment('cold.api.surveys.create', this.tags);

      this.logger.error(e.message, { error: e, data: createSurveyDefinitionDto });

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          error: e.message,
          createSurveyDefinitionDto,
          user: user.coldclimate_claims,
        },
      });

      throw e;
    }
  }

  /**
   * This action returns all survey results for an organization
   * @param req
   * @param surveyFilter
   * @param bpc
   */
  async findAllSubmittedSurveysByOrg(
    req: IRequest,
    surveyFilter?: {
      name: string;
      type: string;
    },
    bpc?: boolean,
  ): Promise<ZodSurveyResponseDto[]> {
    const { user, organization } = req;
    this.setTags({ user: user.coldclimate_claims, bpc, organization });

    let surveys = [] as ZodSurveyResponseDto[];

    if (organization) {
      const surveyData = await this.prisma.survey_data.findMany({
        where: {
          organization_id: organization.id,
        },
      });

      for (const item of surveyData) {
        const def = await this.prisma.survey_definitions.findUnique({
          where: {
            id: item.survey_definition_id,
          },
        });

        if (def) {
          const survey = await this.findOne(def.name, req, bpc, organization.id);
          if (survey) {
            surveys.push(survey);
          }
        }
      }

      if (surveyFilter?.name || surveyFilter?.type) {
        surveys = filter(surveys, survey => {
          if (surveyFilter.name && surveyFilter.type) {
            return survey.name === surveyFilter.name && survey.type === surveyFilter.type;
          } else if (surveyFilter.name) {
            return survey.name === surveyFilter.name;
          } else if (surveyFilter.type) {
            return survey.type === surveyFilter.type;
          } else {
            return true;
          }
        });

        if (surveys.length === 0) {
          throw new HttpException(`No surveys found with supplied filter`, 404);
        }
      }

      this.logger.info(`found ${surveys.length} surveys for org: ${organization.name}`, { surveys: map(surveys, 'id') });
    }

    return surveys;
  }

  /***
   * This action returns all survey definitions
   * @param req
   * @param surveyFilter
   * @param bpc
   */
  async findAll(
    req: IRequest,
    surveyFilter?: {
      name: string;
      type: string;
    },
    bpc?: boolean,
  ): Promise<ZodSurveyResponseDto[]> {
    const { user, organization } = req;
    this.setTags({ user: user.coldclimate_claims, bpc, organization });
    let surveys = [] as ZodSurveyResponseDto[];

    surveys = (await this.prisma.survey_definitions.findMany()) as ZodSurveyResponseDto[];
    this.logger.info(`found ${surveys.length} surveys`);

    if (surveyFilter?.name || surveyFilter?.type) {
      surveys = filter(surveys, survey => {
        if (surveyFilter.name && surveyFilter.type) {
          return survey.name === surveyFilter.name && survey.type === surveyFilter.type;
        } else if (surveyFilter.name) {
          return survey.name === surveyFilter.name;
        } else if (surveyFilter.type) {
          return survey.type === surveyFilter.type;
        } else {
          return true;
        }
      });

      if (surveys.length === 0) {
        throw new HttpException(`No surveys found with supplied filter`, 404);
      }
    }

    return surveys;
  }

  /**
   * This action returns a survey by name
   * @param name
   * @param req
   * @param bpc
   * @param impersonateOrg
   */
  async findOne(name: string, req: IRequest, bpc?: boolean, impersonateOrg?: string): Promise<ZodSurveyResponseDto> {
    const { user, organization } = req;
    const isID = isUUID(name);

    if (isID) {
      this.setTags({ survey_id: name });
    } else {
      this.setTags({ survey_name: name });
    }

    this.setTags({ user: user.coldclimate_claims, bpc, organization });

    let def, cached;

    try {
      if (!bpc) {
        const surveyCacheKey = this.getSurveyCacheKey(organization.name, req, name, isID);
        cached = (await this.cache.get(surveyCacheKey)) as ZodSurveyResponseDto;
      }

      if (!cached) {
        // Get Definition
        const filter = isID ? { id: name } : { name: name };
        def = (await this.prisma.survey_definitions.findUnique({
          where: filter,
        })) as ZodSurveyResponseDto;
      } else {
        def = cached;
      }

      if (!def) {
        throw new NotFoundException(`Unable to find survey definition by ${isID ? 'id' : 'name'}: ${name}`);
      }

      //TODO: WE NEED TO MAKE SURVEYS REQUIRE ORG COMPLIANCE SET

      // Get Submission Results
      if ((user.isColdAdmin && impersonateOrg) || !user.isColdAdmin) {
        const submission = await this.prisma.survey_data.findFirst({
          where: {
            survey_definition_id: def.id,
            organization_id: organization.id,
          },
        });

        def.definition = merge(def.definition, submission?.data);

        this.setTags({ survey_data_id: submission?.id });
      }

      const scored = await this.filterService.filterDependencies(this.scoreService.scoreSurvey(def));

      const statuses = await this.prisma.survey_status.findMany({
        where: {
          survey_name: name,
          organization_id: organization.id,
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      set(
        scored,
        'survey_statuses',
        statuses.map(survey_status => ({
          name: survey_status.status,
          datetime: survey_status.created_at,
          email: survey_status.email,
        })),
      );

      return scored;
    } catch (e) {
      this.logger.error(e.message, { error: e });
      throw e;
    }
  }

  // get the cache key for the survey type
  private getSurveyTypeCacheKey(impersonateOrg: string | undefined, req: IRequest, def: any) {
    const { user, organization } = req;

    const key = `survey_definitions:type:${def?.type}`;

    this.setTags({ user: user.coldclimate_claims, survey_type: def.type, survey_type_cache_key: key, organization });

    return key;
  }

  // get the cache key for the survey name
  private getSurveyCacheKey(impersonateOrg: string | undefined, req: IRequest, name: string, isId?: boolean) {
    const { user, organization } = req;

    const key = `survey_definitions:${isId ? 'id' : 'name'}:${name}`;

    this.setTags({ user: user.coldclimate_claims, survey_name: name, survey_name_cache_key: key, organization });

    return key;
  }

  /***
   * This action stores survey results for a named survey
   * @param name
   * @param submission
   * @param req
   * @param impersonateOrg
   */
  async submitResults(name: string, submission: any, req: IRequest, impersonateOrg?: string): Promise<ZodSurveyResponseDto> {
    if (!req.organization && impersonateOrg) {
      req.organization = (await this.prisma.organizations.findUnique({
        where: {
          id: impersonateOrg,
        },
      })) as organizations;

      if (!req.organization) {
        throw new NotFoundException(`Organization with id: ${impersonateOrg} does not exist`);
      }

      this.setTags({ organization: omit(req.organization, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']) });
    }

    const { user, url, organization } = req;
    const org = organization;

    const orgId = org.id;

    this.setTags({
      organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']),
      user: user.coldclimate_claims,
    });

    try {
      await this.surveyStatus.createSurveyStatus(name, orgId, survey_status_types.draft, user);

      const def = await this.prisma.survey_definitions.findUnique({
        where: {
          name: name,
        },
      });

      this.setTags({ survey_name: name, survey_definition_id: def?.id });

      if (!def) {
        throw new NotFoundException(`Unable to find survey definition with name: ${name}`);
      }

      const difference = omit(diff(def.definition as any, submission.definition), ['id', 'created_at', 'updated_at', 'survey_definition_id', 'organization_id']);
      let existing = (await this.prisma.survey_data.findFirst({
        where: {
          survey_definition_id: def.id,
          organization_id: org.id,
        },
      })) as any;

      if (existing) {
        this.setTags({ submission_id: existing?.id, name: existing.name });
        existing.data = merge(existing?.data, difference);
        await this.prisma.survey_data.update({
          where: {
            id: existing.id,
          },
          data: existing,
        });
      } else {
        existing = await this.prisma.survey_data.create({
          data: {
            id: v4(),
            created_at: new Date(),
            organization_id: org.id,
            survey_definition_id: def.id,
            data: difference,
          },
        });
      }

      if (!find(this.exclude_orgs, { id: org.id })) {
        if (submission?.definition?.submitted) {
          this.setTags({ status: 'completed' });

          this.metrics.event(
            `${existing?.name} survey for ${org?.display_name} was completed`,
            `${user.coldclimate_claims.email} completed ${existing?.name} survey for ${org?.display_name}`,
            {
              alert_type: 'success',
              date_happened: new Date(),
              source_type_name: 'cold-api',
              priority: 'normal',
            },
            this.tags,
          );

          this.metrics.increment('cold.api.surveys.submission', this.tags);
          this.logger.info('completed survey submission', difference);
        } else {
          this.setTags({ status: 'updated' });
          this.logger.info('updated survey submission', { name: name, org });
        }
      }

      this.setTags({ status: 'created' });

      this.metrics.increment('cold.api.surveys.submission', this.tags);
      this.logger.info('created survey submission', existing);

      this.mqtt.publishMQTT('ui', {
        org_id: orgId,
        user: user,
        swr_key: url || `/organizations/${orgId}/surveys/${name}`,
        action: 'update',
        status: 'complete',
        data: 'data too large to log',
      });

      return await this.findOne(name, req, true, impersonateOrg);
    } catch (e) {
      this.setTags({ status: 'failed' });

      this.metrics.event(
        `Attempt to submit survey results failed`,
        `${user.coldclimate_claims.email} failed to submit results for ${submission.name} survey`,
        {
          alert_type: 'error',
          date_happened: new Date(),
          source_type_name: 'cold-api',
          priority: 'normal',
        },
        this.tags,
      );

      this.logger.error(e.message, { error: e });

      this.mqtt.publishMQTT('ui', {
        org_id: orgId,
        user: user,
        swr_key: url,
        action: 'update',
        status: 'failed',
        data: {
          error: e.message,
        },
      });
      throw new UnprocessableEntityException(e);
    }
  }

  /***
   * This action updates a named component definition
   * @param name
   * @param updateSurveyDefinitionDto
   * @param user
   */
  async update(name: string, updateSurveyDefinitionDto: UpdateSurveyDefinitionsDto, req: IRequest): Promise<ZodSurveyResponseDto> {
    const { user, url, organization } = req;
    const org = organization;

    this.setTags({
      organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']),
      user: user?.coldclimate_claims,
      survey_name: updateSurveyDefinitionDto?.name,
    });

    try {
      const def = await this.findOne(name, req);
      if (def) {
        await this.cache.delete(`survey_definitions:name:${def.name}`);
        await this.cache.delete(`survey_definitions:type:${def.type}`);
      }

      const definition = await this.prisma.survey_definitions.update({
        where: { name: name },
        data: updateSurveyDefinitionDto,
      });

      if (!definition) {
        throw new NotFoundException(`Unable to find survey definition with name: ${name}`);
      }

      this.setTags({ status: 'completed' });

      this.logger.info('updated definition', { name: definition.name, id: definition.id, type: definition.type });

      this.metrics.increment('cold.api.surveys.update', 1, this.tags);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'update',
        status: 'complete',
        data: {},
      });

      return this.findOne(name, req);
    } catch (e) {
      this.setTags({ status: 'failed' });

      this.metrics.event(
        `Update ${updateSurveyDefinitionDto?.name} survey definition request failed`,
        `${user?.coldclimate_claims?.email} failed to update ${updateSurveyDefinitionDto?.name} survey definition`,
        {
          alert_type: 'error',
          date_happened: new Date(),
          source_type_name: 'cold-api',
          priority: 'normal',
        },
        this.tags,
      );

      this.metrics.increment('cold.api.surveys.update', 1, this.tags);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'update',
        status: 'failed',
        data: {
          survey: name,
          error: e.message,
        },
      });

      if (e.message.includes('Unable to find survey definition')) {
        throw new NotFoundException(e);
      } else {
        throw new UnprocessableEntityException(e);
      }
    }
  }

  /***
   * This action removes a named survey definition
   * @param name
   * @param user
   */
  async remove(name: string, req: IRequest) {
    const { user, url, organization } = req;
    const org = organization;

    const tags: { [p: string]: any } | string[] = {
      survey_name: name,
      organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']),
      user: user.coldclimate_claims,
      ...this.tags,
    };

    try {
      const def = await this.findOne(name, req);
      if (def) {
        await this.cache.delete(`survey_definitions:name:${def.name}`);
        await this.cache.delete(`survey_definitions:type:${def.type}`);
      }

      await this.prisma.survey_definitions.delete({ where: { name: name } });

      this.logger.info(`deleted survey ${name}`, { id: def.id, name: def.name, type: def.type });

      this.metrics.increment('cold.api.surveys.delete', 1, tags);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'delete',
        status: 'complete',
        data: {
          survey: name,
          user: user.coldclimate_claims,
        },
      });

      //rebuild type cache
      await this.findDefinitionByType(req, def.type);
    } catch (e) {
      if (e.message.includes('Survey definition does not exist')) {
        throw new NotFoundException(`${user.coldclimate_claims.email} attempted to delete a survey definition that does not exist: ${name}`);
      }

      tags.status = 'failed';

      this.metrics.event(`Delete ${name} survey definition request failed`, `${user.coldclimate_claims.email} failed to update ${name} survey definition`, tags);

      this.metrics.increment('cold.api.surveys.delete', 1, tags);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'delete',
        status: 'failed',
        data: {
          survey: name,
          error: e.message,
          user,
        },
      });

      throw e;
    }
  }

  /***
   * This action removes an organization's named survey definition
   * @param id
   * @param orgId
   * @param req
   */
  async delete(name: string, orgId: string, req: IRequest) {
    const { user, url } = req;

    const org = await this.prisma.organizations.findUnique({
      where: {
        id: orgId,
      },
    });

    const tags: { [p: string]: any } | string[] = {
      survey_name: name,
      organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']),
      user: user.coldclimate_claims,
      ...this.tags,
    };

    if (!org) {
      throw new NotFoundException(`Organization with id: ${orgId} does not exist`);
    }

    try {
      const def = await this.findOne(name, req);

      if (!def) {
        throw new NotFoundException(`Unable to find survey definition with name: ${name}`);
      }

      if (!def) {
        throw new NotFoundException(`Survey ${name} does not exist`);
      }
      const surveyData = await this.prisma.survey_data.findFirst({
        where: {
          survey_definition_id: def.id,
          organization_id: orgId,
        },
      });

      if (!surveyData) {
        throw new NotFoundException(`Unable to find survey data with survey definition id: ${def.id} and organization id: ${orgId}`);
      }

      await this.prisma.survey_data.delete({
        where: {
          id: surveyData.id,
        },
      });

      this.logger.info(`deleted survey data for ${org.name}: ${def.id}`, {
        id: def.id,
        name: def.name,
        type: def.type,
        organization: org,
      });

      this.metrics.increment('cold.api.surveys.delete', 1, tags);
      ///organizations/:orgId/surveys/:name
      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'delete',
        status: 'complete',
        data: {
          survey: name,
          user: user.coldclimate_claims,
        },
      });

      this.mqtt.publishMQTT('public', {
        swr_key: `organizations/${orgId}/surveys/${def.name}`,
        action: 'delete',
        status: 'complete',
        data: {
          survey: name,
          user: user.coldclimate_claims,
        },
      });

      this.mqtt.publishMQTT('public', {
        swr_key: `organizations/${orgId}/surveys`,
        action: 'delete',
        status: 'complete',
        data: {
          survey: name,
          user: user.coldclimate_claims,
        },
      });

      //rebuild type cache
      await this.findDefinitionByType(req, def.type);
    } catch (e) {
      if (e.message.includes('Survey definition does not exist')) {
        throw new NotFoundException(`${user.coldclimate_claims.email} attempted to delete a survey definition that does not exist: ${name}`);
      }

      tags.status = 'failed';

      this.metrics.event(`Delete ${name} survey definition request failed`, `${user.coldclimate_claims.email} failed to update ${name} survey definition`, tags);

      this.metrics.increment('cold.api.surveys.delete', 1, tags);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'delete',
        status: 'failed',
        data: {
          survey: name,
          error: e.message,
          user,
        },
      });

      throw e;
    }
  }
}
