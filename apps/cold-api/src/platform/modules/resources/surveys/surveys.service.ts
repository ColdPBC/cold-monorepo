import { BadRequestException, HttpException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { organizations, survey_types } from '@prisma/client';
import { isUUID } from 'class-validator';
import { diff } from 'deep-object-diff';
import { find, merge, omit, map, filter } from 'lodash';
import { Span, TraceService } from 'nestjs-ddtrace';
import { v4 } from 'uuid';
import { ZodSurveyResponseDto } from 'validation';
import { CacheService, DarklyService, PrismaService, BaseWorker, AuthenticatedUser, UpdateSurveyDefinitionsDto, SurveyDefinitionsEntity } from 'nest';

@Span()
@Injectable()
export class SurveysService extends BaseWorker {
  exclude_orgs: Array<{ id: string; name: string; display_name: string }>;

  constructor(readonly darkly: DarklyService, private prisma: PrismaService, private readonly cache: CacheService) {
    super('SurveysService');

    this.init();
  }

  async init() {
    this.exclude_orgs = await this.darkly.getJSONFlag('org-whitelist');
  }

  /***
   * This action returns a component definition by type
   * @param user
   * @param type
   */
  async findByType(user: AuthenticatedUser, type: survey_types): Promise<ZodSurveyResponseDto[]> {
    this.logger.tags = merge(this.tags, { survey_type: type, user: user.coldclimate_claims });

    try {
      const cached: any = await this.cache.get(`survey_definitions:type:${type}`);

      if (cached) {
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

  /***
   * This action creates a new survey definition
   * @param createSurveyDefinitionDto
   * @param user
   */
  async create(createSurveyDefinitionDto: Partial<SurveyDefinitionsEntity>, user: AuthenticatedUser): Promise<ZodSurveyResponseDto> {
    const org = (await this.cache.get(`organizations:${user.coldclimate_claims.org_id}`)) as organizations;

    this.setTags({ organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']), user: user.coldclimate_claims });

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
      await this.findByType(user, response.type);

      this.metrics.increment('cold.api.surveys.create', this.tags);

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
      throw e;
    }
  }

  /***
   * This action returns all survey definitions
   * @param user
   * @param surveyFilter
   * @param bpc
   * @param impersonateOrg
   */
  async findAll(user: AuthenticatedUser, surveyFilter?: { name: string; type: string }, bpc?: boolean, impersonateOrg?: string): Promise<ZodSurveyResponseDto[]> {
    this.setTags({ user: user.coldclimate_claims, bpc, impersonateOrg });
    let surveys = [] as ZodSurveyResponseDto[];

    if (impersonateOrg && user.isColdAdmin) {
      const surveyData = await this.prisma.survey_data.findMany({
        where: {
          organization_id: impersonateOrg,
        },
      });

      for (const item of surveyData) {
        const def = await this.findOne(item.survey_definition_id, user, bpc, impersonateOrg);
        if (def) {
          surveys.push(def);
        }
      }

      this.logger.info(`found ${surveys.length} surveys for org: ${impersonateOrg}`, { surveys: map(surveys, 'id') });
    } else {
      const surveys = (await this.prisma.survey_definitions.findMany()) as ZodSurveyResponseDto[];
      this.logger.info(`found ${surveys.length} surveys`);
    }

    if (surveyFilter) {
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
   * @param user
   * @param bypassCache
   * @param impersonateOrg
   */
  async findOne(name: string, user: AuthenticatedUser, bypassCache?: boolean, impersonateOrg?: string): Promise<ZodSurveyResponseDto> {
    const isID = isUUID(name);

    if (isID) {
      this.setTags({ survey_id: name });
    } else {
      this.setTags({ survey_name: name });
    }

    this.setTags({ user: user.coldclimate_claims, bpc: bypassCache, impersonateOrg });

    const surveyNameCacheKey = this.getSurveyNameCacheKey(impersonateOrg, user, name);

    this.setTags({ survey_name_cache_key: surveyNameCacheKey });

    if (!bypassCache) {
      const cached = (await this.cache.get(surveyNameCacheKey)) as ZodSurveyResponseDto;

      if (cached) {
        return cached;
      }
    }
    try {
      const filter = isID ? { id: name } : { name: name };
      // Get Definition
      const def = (await this.prisma.survey_definitions.findUnique({
        where: filter,
      })) as ZodSurveyResponseDto;

      if (!def) {
        throw new NotFoundException(`Unable to find survey definition with name: ${name}`);
      }

      const surveyTypeCacheKey = this.getSurveyTypeCacheKey(impersonateOrg, user, name, def);

      // Get Submission Results
      if ((user.isColdAdmin && impersonateOrg) || !user.isColdAdmin) {
        const submission = await this.prisma.survey_data.findFirst({
          where: {
            survey_definition_id: def.id,
            organization_id: user.isColdAdmin && impersonateOrg ? impersonateOrg : user.coldclimate_claims.org_id,
          },
        });

        def.definition = merge(def.definition, submission?.data);

        this.setTags({ survey_data_id: submission?.id });
      }

      await this.cache.set(surveyNameCacheKey, def, {
        update: true,
      });

      await this.cache.set(surveyTypeCacheKey, def, {
        update: true,
      });

      return def;
    } catch (e) {
      this.logger.error(e.message, { error: e });
      throw e;
    }
  }

  // get the cache key for the survey type
  private getSurveyTypeCacheKey(impersonateOrg: string | undefined, user: AuthenticatedUser, name: string, def: any) {
    let key: string;
    if (impersonateOrg && user.isColdAdmin) {
      // get cache data as impersonated org
      key = `survey_definitions:org:${impersonateOrg}:type:${def?.type}`;
    } else {
      // get cache data if cold admin else as org user
      key = user.isColdAdmin ? `survey_definitions:type:${def.type}` : `survey_definitions:org:${user.coldclimate_claims.org_id}:name:${name}`;
    }

    this.setTags({ survey_type: def.type, survey_type_cache_key: key });

    return key;
  }

  // get the cache key for the survey name
  private getSurveyNameCacheKey(impersonateOrg: string | undefined, user: AuthenticatedUser, name: string, isId?: boolean) {
    let key: string;
    if (impersonateOrg && user.isColdAdmin) {
      key = `survey_definitions:org:${impersonateOrg}:${isId ? 'id' : 'name'}:${name}`;
    } else {
      key = user.isColdAdmin ? `survey_definitions:${isId ? 'id' : 'name'}:${name}` : `survey_definitions:org:${user.coldclimate_claims.org_id}:${isId ? 'id' : 'name'}:${name}`;
    }

    this.setTags({ survey_name: name, survey_name_cache_key: key });

    return key;
  }

  /***
   * This action stores survey results for a named survey
   * @param name
   * @param submission
   * @param user
   * @param impersonateOrg
   */
  async submitResults(name: string, submission: any, user: AuthenticatedUser, impersonateOrg?: string): Promise<ZodSurveyResponseDto> {
    const org = (await this.cache.get(`organizations:${impersonateOrg && user.isColdAdmin ? impersonateOrg : user.coldclimate_claims.org_id}`)) as organizations;

    this.setTags({ organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']), user: user.coldclimate_claims });

    try {
      const surveyCacheKey = () => {
        let key: string;
        if (impersonateOrg && user.isColdAdmin) {
          key = `survey_definitions:org:${impersonateOrg}`;
        } else {
          key = `survey_definitions:org:${user.coldclimate_claims.org_id}`;
        }

        this.setTags({ survey_cache_key: key });

        return key;
      };

      const def = await this.prisma.survey_definitions.findUnique({
        where: { name: name },
      });

      this.setTags({ survey_name: name, survey_definition_id: def?.id });

      if (!def) {
        throw new NotFoundException(`Unable to find survey definition with name: ${name}`);
      }

      await this.cache.delete(surveyCacheKey(), true);

      const difference = omit(diff(def.definition as any, submission.definition), ['id', 'created_at', 'updated_at', 'survey_definition_id', 'organization_id']);
      const existing = (await this.prisma.survey_data.findFirst({
        where: {
          survey_definition_id: def.id,
          organization_id: user.isColdAdmin && impersonateOrg ? impersonateOrg : user.coldclimate_claims.org_id,
        },
      })) as any;

      if (existing) {
        this.setTags({ submission_id: existing.id, name: existing.name });

        existing.data = merge(existing.data, difference);

        await this.prisma.survey_data.update({
          where: {
            id: existing.id,
          },
          data: existing,
        });

        if (!find(this.exclude_orgs, { id: user.coldclimate_claims.org_id })) {
          if (submission?.definition?.submitted) {
            this.setTags({ status: 'completed' });

            this.metrics.event(
              `${existing?.name} survey for ${org.display_name} was completed`,
              `${user.coldclimate_claims.email} completed ${existing?.name} survey for ${org.display_name}`,
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
            this.logger.info('updated survey submission', difference);
          }
        }
      } else {
        const response = {
          id: v4(),
          created_at: new Date(),
          organization_id: user.isColdAdmin && impersonateOrg ? impersonateOrg : user.coldclimate_claims.org_id,
          survey_definition_id: def.id,
          data: difference,
        };

        await this.prisma.survey_data.create({
          data: response,
        });

        if (!find(this.exclude_orgs, { id: user.coldclimate_claims.org_id })) {
          this.setTags({ status: 'created' });

          this.metrics.increment('cold.api.surveys.submission', this.tags);
        }

        this.logger.info('created survey submission', response);
      }

      return await this.findOne(name, user, true, impersonateOrg);
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

      throw new UnprocessableEntityException(e);
    }
  }

  /***
   * This action updates a named component definition
   * @param name
   * @param updateSurveyDefinitionDto
   * @param user
   */
  async update(name: string, updateSurveyDefinitionDto: UpdateSurveyDefinitionsDto, user: AuthenticatedUser): Promise<ZodSurveyResponseDto> {
    const org = (await this.cache.get(`organizations:${user.coldclimate_claims.org_id}`)) as organizations;

    this.setTags({
      organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']),
      user: user.coldclimate_claims,
      survey_name: updateSurveyDefinitionDto?.name,
    });

    try {
      const def = await this.findOne(name, user);
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

      return this.findOne(name, user);
    } catch (e) {
      this.setTags({ status: 'failed' });

      this.metrics.event(
        `Update ${updateSurveyDefinitionDto?.name} survey definition request failed`,
        `${user.coldclimate_claims.email} failed to update ${updateSurveyDefinitionDto?.name} survey definition`,
        {
          alert_type: 'error',
          date_happened: new Date(),
          source_type_name: 'cold-api',
          priority: 'normal',
        },
        this.tags,
      );

      this.metrics.increment('cold.api.surveys.update', 1, this.tags);

      throw new UnprocessableEntityException(e);
    }
  }

  /***
   * This action removes a named survey definition
   * @param name
   * @param user
   */
  async remove(name: string, user: AuthenticatedUser) {
    const org = (await this.cache.get(`organizations:${user.coldclimate_claims.org_id}`)) as organizations;
    const tags: { [p: string]: any } | string[] = {
      survey_name: name,
      organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']),
      user: user.coldclimate_claims,
      ...this.tags,
    };

    try {
      const def = await this.findOne(name, user);
      if (def) {
        await this.cache.delete(`survey_definitions:name:${def.name}`);
        await this.cache.delete(`survey_definitions:type:${def.type}`);
      }

      await this.prisma.survey_definitions.delete({ where: { name: name } });

      this.logger.info(`deleted survey ${name}`, { id: def.id, name: def.name, type: def.type });

      this.metrics.increment('cold.api.surveys.delete', 1, tags);

      //rebuild type cache
      await this.findByType(user, def.type);
    } catch (e) {
      if (e.message.includes('Survey definition does not exist')) {
        throw new NotFoundException(`${user.coldclimate_claims.email} attempted to delete a survey definition that does not exist: ${name}`);
      }

      tags.status = 'failed';

      this.metrics.event(`Delete ${name} survey definition request failed`, `${user.coldclimate_claims.email} failed to update ${name} survey definition`, tags);

      this.metrics.increment('cold.api.surveys.delete', 1, tags);

      throw e;
    }
  }
}
