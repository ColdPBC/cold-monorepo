import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { v4 } from 'uuid';
import { merge } from 'lodash';
import { BaseWorker, CacheService, CreateActionTemplatesDto, IRequest, MqttService, PrismaService, ZodCreateActionDto } from '@coldpbc/nest';
import { SurveysService } from '../surveys/surveys.service';

@Span()
@Injectable()
export class ActionsService extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly cacheService: CacheService, readonly surveys: SurveysService, readonly mqtt: MqttService) {
    super(ActionsService.name);
  }

  /**
   * This action returns all actions for an organization
   * @param req
   * @param {string} orgId
   * @param {boolean} bpc
   * @returns {Promise<any>}
   */
  async getActions(req: IRequest, orgId: string, bpc?: boolean) {
    const { user } = req;
    try {
      if (!user.isColdAdmin && user.coldclimate_claims.org_id !== orgId) {
        this.logger.error(`User ${user.coldclimate_claims.email} attempted to get assignments for org ${orgId}`);

        throw new UnauthorizedException(`You are not authorized to get assignments for this organization`);
      }

      const actions = await this.prisma.actions.findMany({
        where: {
          organization_id: orgId,
        },
      });

      this.cacheService.set(`organizations:${orgId}:actions`, actions, { ttl: 60 * 60 * 24, update: true });

      for (const actionItem of actions) {
        if (actionItem.action === null) continue;

        actionItem.action = await this.filterDependentSurveys(actionItem.action as any, req, orgId);

        this.cacheService.set(`organizations:${orgId}:actions:${actionItem.id}`, actionItem, {
          ttl: 60 * 60 * 24,
          update: true,
        });
      }

      return actions;
    } catch (e) {
      this.logger.error(e, { user: user.coldclimate_claims, bpc });
      return e;
    }
  }

  private async filterDependentSurveys(action, req: IRequest, orgId: string) {
    const { user } = req;
    const dep_surveys: any[] = [];

    if (!action.dependent_surveys || action.dependent_surveys.length < 1) {
      return action;
    }

    for (const a of action.dependent_surveys) {
      try {
        const surveyResults = (await this.surveys.findOne(a.name, req, false, orgId)) as any;
        dep_surveys.push({
          name: surveyResults.name,
          title: surveyResults.definition.title,
          submitted: surveyResults.definition.submitted == true,
        });
      } catch (e) {
        this.logger.warn(e.message, { user: user.coldclimate_claims, orgId, a });
      }
    }

    action.dependent_surveys = dep_surveys;

    return action;
  }

  /**
   * This action returns an org's action by ID
   * @param req
   * @param {string} id
   * @param {string} orgId
   * @param {boolean} bpc
   * @returns {Promise<unknown>}
   */
  async getAction(req: IRequest, orgId: string, id: string, bpc?: boolean) {
    const { user } = req;
    try {
      if (!user.isColdAdmin && user.coldclimate_claims.org_id !== orgId) {
        this.logger.error(`User ${user.coldclimate_claims.email} attempted to get action: ${id} for org ${orgId}`);

        throw new UnauthorizedException(`You are not authorized to get actions for this organization`);
      }

      if (!bpc) {
        const cached = await this.cacheService.get(`organizations:${orgId}:actions:${id}`);
        if (cached) {
          return cached;
        }
      }

      const item = (await this.prisma.actions.findUnique({
        where: {
          id: id,
          organization_id: orgId,
        },
      })) as any;

      if (!item) {
        throw new NotFoundException(`Action ${id} not found`);
      }

      await this.filterDependentSurveys(item.action, req, orgId);

      await this.cacheService.set(`organizations:${orgId}:actions:${id}`, item, { ttl: 60 * 60 * 24, update: true });

      return item;
    } catch (e) {
      this.logger.error(e, { user: user.coldclimate_claims, orgId, id, bpc });
      throw e;
    }
  }

  /**
   * This action assigns an action template to an organization
   * @param req
   * @param {string} id - action template id
   * @param {string} orgId - organization id
   * @param {actionsPartial} data - data to merge with action template
   * @param bpc
   * @returns {Promise<unknown>}
   */
  async createActionFromTemplate(req: IRequest, orgId: string, id: string, data: CreateActionTemplatesDto, bpc?: boolean) {
    let action: any;
    const { user, url } = req;
    try {
      if (!user.isColdAdmin && user.coldclimate_claims.org_id !== orgId) {
        this.logger.error(`User ${user.coldclimate_claims.email} attempted to create an action for org ${orgId}`);

        throw new UnauthorizedException(`You are not authorized to create actions for this organization`);
      }

      if (!bpc) {
        action = await this.cacheService.get(`actions:${id}`);
      }

      if (!action) {
        action = await this.prisma.action_templates.findUnique({
          where: {
            id: id,
          },
        });
        if (!action) {
          throw new NotFoundException(`Action template ${id} not found`);
        }
      }

      const mergedData = {
        id: v4(),
        organization_id: orgId,
        action_template_id: id,
        action: merge(action.template, data.template),
        created_at: new Date().toISOString(),
      };

      const mergedAssignment = await this.prisma.actions.create({
        data: mergedData,
      });

      this.getActions(req, orgId, true);

      this.mqtt.publishMQTT('ui', {
        org_id: user.coldclimate_claims.org_id,
        user: user,
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          ...mergedData,
        },
      });

      return mergedAssignment;
    } catch (e) {
      this.logger.error(e, { user: user.coldclimate_claims, orgId, id, data, bpc });

      this.mqtt.publishMQTT('ui', {
        org_id: user.coldclimate_claims.org_id,
        user: user,
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          error: e.message,
          ...data,
        },
      });
      throw e;
    }
  }

  async updateAction(
    req: IRequest,
    orgId: string,
    id: string,
    data: {
      action: ZodCreateActionDto;
    },
    bpc?: boolean,
  ) {
    const { user, url } = req;
    try {
      if (!user.isColdAdmin && user.coldclimate_claims.org_id !== orgId) {
        this.logger.error(`User ${user.coldclimate_claims.email} attempted to create action for org ${orgId}`);

        throw new UnauthorizedException(`You are not authorized to create actions for this organization`);
      }

      const item = await this.prisma.actions.findUnique({
        where: {
          id: id,
        },
      });

      if (!item?.action) {
        throw new NotFoundException(`Action ${id} not found`);
      }

      const mergedData = merge(item.action, data);

      const updated = await this.prisma.actions.update({
        where: {
          id: item.id,
        },
        data: { action: mergedData },
      });

      this.getActions(req, orgId, true);

      this.mqtt.publishMQTT('ui', {
        org_id: user.coldclimate_claims.org_id,
        user: user,
        swr_key: url,
        action: 'update',
        status: 'complete',
        data: {
          ...data,
        },
      });

      return updated;
    } catch (e) {
      this.logger.error(e, { user: user.coldclimate_claims, orgId, id, data, bpc });
      this.mqtt.publishMQTT('ui', {
        org_id: user.coldclimate_claims.org_id,
        user: user,
        swr_key: url,
        action: 'update',
        status: 'failed',
        data: {
          error: e.message,
          ...data,
        },
      });
      return e;
    }
  }

  /**
   * This action deletes an action
   * @param req
   * @param {string} orgId
   * @param {string} id
   * @returns {Promise<unknown>}
   */
  async deleteAction(req: IRequest, orgId: string, id: string) {
    const { user, url } = req;
    try {
      if (!user.isColdAdmin && user.coldclimate_claims.org_id !== orgId) {
        this.logger.error(`User ${user.coldclimate_claims.email} attempted to delete action for org ${orgId}`);

        throw new UnauthorizedException(`You are not authorized to delete actions for this organization`);
      }

      const assignment = await this.prisma.action_templates.delete({
        where: {
          id: id,
        },
      });

      this.cacheService.delete(`organizations:${orgId}:actions`, true);

      // refresh cache
      this.getActions(req, orgId, true);

      this.mqtt.publishMQTT('ui', {
        org_id: user.coldclimate_claims.org_id,
        user: user,
        swr_key: url,
        action: 'delete',
        status: 'complete',
      });

      return assignment;
    } catch (e) {
      this.logger.error(e, { user: user.coldclimate_claims, orgId, id });

      this.mqtt.publishMQTT('ui', {
        org_id: user.coldclimate_claims.org_id,
        user: user,
        swr_key: url,
        action: 'delete',
        status: 'failed',
        data: {
          error: e.message,
        },
      });

      return e;
    }
  }
}
