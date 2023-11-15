import { HttpException, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { merge } from 'lodash';
import { v4 } from 'uuid';
import { AuthenticatedUser } from '../../../primitives/interfaces/user.interface';
import { BaseWorker } from '../../../worker/worker.class';
import { CacheService } from '../../cache/cache.service';
import { ActionTemplatesEntity } from '../../dto/action-templates/entities';
import { PrismaService } from '../../vendor/prisma/prisma.service';
import { ZodCreateActionTemplate } from '../../zod/custom';
import { action_templates, action_templatesSchema } from '../../zod/generated';

@Span()
@Injectable()
export class ActionTemplatesService extends BaseWorker {
  constructor(private readonly prisma: PrismaService, private readonly cacheService: CacheService) {
    super(ActionTemplatesService.name);
  }

  /**
   * This action returns all actions
   * @param {AuthenticatedUser} user
   * @param {boolean} bpc
   * @returns {Promise<any>}
   */
  async getActionTemplates(user: AuthenticatedUser, bpc?: boolean): Promise<action_templates[]> {
    this.setTags({ user: user.coldclimate_claims, bpc });

    try {
      if (!user.isColdAdmin) {
        this.logger.error(`${user.coldclimate_claims.email} attempted to get all actions`, { user: user.coldclimate_claims, bpc });
        throw new UnauthorizedException(`You are not authorized to get actions`);
      }

      if (!bpc) {
        const cached = (await this.cacheService.get(`action-templates`)) as action_templates[];
        if (cached) {
          return cached;
        }
      }

      const actions = (await this.prisma.action_templates.findMany()) as unknown as action_templates[];

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
   * @param {AuthenticatedUser} user
   * @param {string} id
   * @param {boolean} bpc
   * @returns {Promise<any>}
   */
  async getActionTemplate(user: AuthenticatedUser, id: string, bpc?: boolean): Promise<action_templates> {
    this.setTags({ user: user.coldclimate_claims, action_template_id: id, bpc });

    try {
      if (!user.isColdAdmin) {
        this.logger.error(`${user.coldclimate_claims.email} attempted to get action: ${id}`, { user: user.coldclimate_claims, bpc });
        throw new UnauthorizedException(`You are not authorized to get actions`);
      }

      if (!bpc) {
        const cached = (await this.cacheService.get(`action-templates:${id}`)) as action_templates;
        if (cached) {
          return cached;
        }
      }

      const action = (await this.prisma.action_templates.findUnique({
        where: {
          id: id,
        },
      })) as unknown as action_templates;

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
   * @param {AuthenticatedUser} user
   * @param {ActionDefinitionsCreate} data
   * @returns action_templates
   */
  async createActionTemplate(user: AuthenticatedUser, data: ZodCreateActionTemplate) {
    this.setTags({ user: user.coldclimate_claims, data });

    try {
      data.id = v4();
      action_templatesSchema.parse(data);

      this.setTags({ action_template_id: data.id });

      const action = await this.prisma.action_templates.create({
        data: {
          ...(data as any),
        },
      });

      // re-cache all actions
      this.getActionTemplates(user, true);

      return action;
    } catch (e) {
      this.logger.error(e);
      throw new UnprocessableEntityException(e.message, e);
    }
  }

  /**
   * This action updates an action template
   * @param {AuthenticatedUser} user
   * @param {string} id
   * @param {UpdateActionTemplatesDto} data
   * @returns {Promise<action_templates>}
   */
  async updateActionTemplate(user: AuthenticatedUser, id: string, data: ZodCreateActionTemplate): Promise<ActionTemplatesEntity> {
    this.setTags({ user: user.coldclimate_claims, action_template_id: id, data });

    try {
      if (!user.isColdAdmin) {
        this.logger.error(`${user.coldclimate_claims.email} attempted to update action: ${id}`);

        throw new UnauthorizedException(`You are not authorized to update actions`);
      }

      const existing = await this.getActionTemplate(user, id, true);

      const action = (await this.prisma.action_templates.update({
        where: {
          id: id,
        },
        data: { template: merge({ ...existing.template }, { ...data.template }) },
      })) as ActionTemplatesEntity;

      this.getActionTemplates(user, true);

      return action;
    } catch (e) {
      if (e.meta?.cause === 'Record to update not found.') {
        throw new NotFoundException(`Action ${id} not found`);
      }
      this.logger.error(e);
      throw new UnprocessableEntityException(e.message, e);
    }
  }

  /**
   * This action deletes an action
   * @param {AuthenticatedUser} user
   * @param {string} id
   */
  async deleteActionTemplate(user: AuthenticatedUser, id: string) {
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
      await this.getActionTemplates(user, true);

      throw new HttpException(`Action ${id} deleted`, 204);
    } catch (e) {
      this.logger.error(e, { ...e });
      if (e.status == 204) {
        throw new HttpException(`Action ${id} deleted`, 204);
      }
      if (e.meta?.cause === 'Record to delete does not exist.') {
        throw new NotFoundException(`Action template ${id} not found`);
      } else {
        this.logger.error(e.message, { ...e });
        throw new UnprocessableEntityException(e.meta?.cause, e);
      }
    }
  }
}
