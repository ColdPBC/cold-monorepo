import { HttpException, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { merge } from 'lodash';
import { v4 } from 'uuid';
import {
  ActionTemplateSchema,
  ActionTemplatesEntity,
  BaseWorker,
  CacheService,
  IRequest,
  MqttService,
  PrismaService,
  ZodCreateActionTemplate,
  ZodCreateActionTemplateDto,
} from '@coldpbc/nest';

@Span()
@Injectable()
export class ActionTemplatesService extends BaseWorker {
  constructor(private readonly prisma: PrismaService, private readonly cacheService: CacheService, private readonly mqtt: MqttService) {
    super(ActionTemplatesService.name);
  }

  /**
   * This action returns all actions
   * @param req
   * @param {boolean} bpc
   * @returns {Promise<any>}
   */
  async getActionTemplates(req: IRequest, bpc?: boolean): Promise<ActionTemplatesEntity[]> {
    const { user } = req;
    this.setTags({ user: user.coldclimate_claims, bpc });

    try {
      if (!user.isColdAdmin) {
        this.logger.error(`${user.coldclimate_claims.email} attempted to get all actions`, {
          user: user.coldclimate_claims,
          bpc,
        });
        throw new UnauthorizedException(`You are not authorized to get actions`);
      }

      if (!bpc) {
        const cached = (await this.cacheService.get(`action-templates`)) as ActionTemplatesEntity[];
        if (cached) {
          return cached;
        }
      }

      const actions = (await this.prisma.action_templates.findMany()) as unknown as ActionTemplatesEntity[];

      this.cacheService.set(`action-templates`, actions, { ttl: 60 * 60 * 24 * 7, update: true });

      //re-cache all actions
      for (const a of actions) {
        this.cacheService.set(`action-templates:${a.id}`, a, { ttl: 60 * 60 * 24 * 7, update: true });
      }

      return actions;
    } catch (e) {
      this.logger.error(e, { user: user.coldclimate_claims, bpc });
      throw e;
    }
  }

  /**
   * This action returns an action by id
   * @param req
   * @param {string} id
   * @param {boolean} bpc
   * @returns {Promise<any>}
   */
  async getActionTemplate(req: IRequest, id: string, bpc?: boolean): Promise<ZodCreateActionTemplateDto> {
    const { user } = req;
    this.setTags({ user: user.coldclimate_claims, action_template_id: id, bpc });

    try {
      if (!user.isColdAdmin) {
        this.logger.error(`${user.coldclimate_claims.email} attempted to get action: ${id}`, {
          user: user.coldclimate_claims,
          bpc,
        });
        throw new UnauthorizedException(`You are not authorized to get actions`);
      }

      if (!bpc) {
        const cached = (await this.cacheService.get(`action-templates:${id}`)) as ZodCreateActionTemplateDto;
        if (cached) {
          return cached;
        }
      }

      const action = (await this.prisma.action_templates.findUnique({
        where: {
          id: id,
        },
      })) as unknown as ZodCreateActionTemplateDto;

      if (!action) {
        throw new NotFoundException(`Action ${id} not found`);
      }

      await this.cacheService.set(`action-templates:${id}`, action, { ttl: 60 * 60 * 24 * 7, update: true });

      return action;
    } catch (e) {
      this.logger.error(e);
      throw new NotFoundException(`Action ${id} not found`);
    }
  }

  /**
   * This action creates a new action template
   * @param req
   * @param {ActionDefinitionsCreate} data
   * @returns action_templates
   */
  async createActionTemplate(req: IRequest, data: ZodCreateActionTemplate) {
    const { user, url } = req;

    this.setTags({ user: user.coldclimate_claims, data });

    try {
      data.id = v4();
      ActionTemplateSchema.parse(data.template);

      this.setTags({ action_template_id: data.id });

      const action = await this.prisma.action_templates.create({
        data: {
          ...(data as any),
        },
      });

      // re-cache all actions
      this.getActionTemplates(req, true);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          action,
          user: user.coldclimate_claims,
        },
      });
      return action;
    } catch (e) {
      this.logger.error(e);

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
      throw new UnprocessableEntityException(e.message, e);
    }
  }

  /**
   * This action updates an action template
   * @param req
   * @param {string} id
   * @param {UpdateActionTemplatesDto} data
   * @returns {Promise<action_templates>}
   */
  async updateActionTemplate(req: IRequest, id: string, data: ZodCreateActionTemplate): Promise<ActionTemplatesEntity> {
    const { user, url } = req;

    this.setTags({ user: user.coldclimate_claims, action_template_id: id, data });

    try {
      if (!user.isColdAdmin) {
        this.logger.error(`${user.coldclimate_claims.email} attempted to update action: ${id}`);

        throw new UnauthorizedException(`You are not authorized to update actions`);
      }

      const existing = await this.getActionTemplate(req, id, true);

      const action = (await this.prisma.action_templates.update({
        where: {
          id: id,
        },
        data: { template: merge({ ...existing.template }, { ...data.template }) },
      })) as ActionTemplatesEntity;

      this.getActionTemplates(req, true);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'update',
        status: 'complete',
        data: {
          ...action,
        },
      });

      return action;
    } catch (e) {
      if (e.meta?.cause === 'Record to update not found.') {
        throw new NotFoundException(`Action ${id} not found`);
      }

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'update',
        status: 'failed',
        data: {
          error: e.message,
          ...data,
        },
      });
      this.logger.error(e);
      throw new UnprocessableEntityException(e.message, e);
    }
  }

  /**
   * This action deletes an action
   * @param req
   * @param {string} id
   */
  async deleteActionTemplate(req: IRequest, id: string) {
    const { user, url } = req;
    this.setTags({ user: user.coldclimate_claims, action_template_id: id });

    try {
      if (!user.isColdAdmin) {
        throw new UnauthorizedException(`You are not authorized to get actions`);
      }

      await this.prisma.action_templates.delete({
        where: {
          id: id,
        },
      });

      await this.cacheService.delete(`action-templates`, true);
      // re-cache all actions
      await this.getActionTemplates(req, true);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'delete',
        status: 'complete',
      });

      return `Action ${id} deleted`;
    } catch (e) {
      this.logger.error(e, { ...e });
      if (e.status == 204) {
        throw new HttpException(`Action ${id} deleted`, 204);
      }
      if (e.meta?.cause === 'Record to delete does not exist.') {
        throw new NotFoundException(`Action template ${id} not found`);
      } else {
        this.logger.error(e.message, { ...e });

        this.mqtt.publishMQTT('public', {
          swr_key: url,
          action: 'delete',
          status: 'failed',
          data: {
            error: e.message,
          },
        });
        throw new UnprocessableEntityException(e.meta?.cause, e);
      }
    }
  }
}
