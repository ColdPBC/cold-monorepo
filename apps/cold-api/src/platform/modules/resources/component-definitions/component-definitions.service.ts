import { BadRequestException, ConflictException, Injectable, NotFoundException, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { filter, set } from 'lodash';
import { Span } from 'nestjs-ddtrace';
import { component_definition_types } from 'prisma/prisma-client';
import { BaseWorker, CacheService, DarklyService, IRequest, MqttService, PrismaService } from '@coldpbc/nest';
import { filterItemsByRole } from './component-definitions.utils';

@Span()
@Injectable()
export class ComponentDefinitionsService extends BaseWorker implements OnModuleInit {
  private test_orgs: any;

  constructor(readonly darkly: DarklyService, readonly prisma: PrismaService, readonly cache: CacheService, readonly mqtt: MqttService) {
    super('ComponentDefinitionsService');
  }

  async onModuleInit() {
    this.darkly.subscribeToJsonFlagChanges('dynamic-org-white-list', value => {
      this.test_orgs = value;
    });
  }

  async getTestOrgs() {
    return this.test_orgs;
  }

  /***
   * This action returns a component definition by type
   * @param req
   * @param type
   */
  async findByType(req: IRequest, type: component_definition_types): Promise<any[]> {
    const { user } = req;
    try {
      const cached: any = await this.cache.get(`component_definitions:type:${type}`);

      if (cached) {
        return cached;
      }

      const data = (await this.prisma.component_definitions.findMany({
        where: { type: type },
      })) as any[];

      await this.cache.set(`component_definitions:type:${type}`, data, {
        ttl: 0, // persist since it will be fairly static
      });

      return data;
    } catch (e) {
      this.logger.error(e, { user: user.coldclimate_claims });
      if (e.name === 'PrismaClientValidationError') {
        throw new BadRequestException(`Invalid Type: ${type}`, e);
      }

      throw e;
    }
  }

  /***
   * This action creates a new component definition
   * @param createComponentDefinitionDto
   * @param req
   */
  async create(createComponentDefinitionDto: any, req: IRequest): Promise<any> {
    const { user, url } = req;
    try {
      // delete cached definitions by type
      await this.cache.delete(`form_definitions:type:${createComponentDefinitionDto.type}`);

      createComponentDefinitionDto.created_at = new Date();

      const definition = (await this.prisma.component_definitions.create({
        data: createComponentDefinitionDto as any,
      })) as any;

      this.logger.info('created definition', definition);

      //rebuild cache async
      await this.findByType(req, createComponentDefinitionDto.type);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          ...definition,
        },
      });

      return definition;
    } catch (e) {
      this.logger.error(e, { user: user.coldclimate_claims, createComponentDefinitionDto });
      if (e.message.includes('Unique constraint failed on the fields')) {
        throw new ConflictException(`A component definition with the name ${createComponentDefinitionDto.name} already exists`);
      }
      if (e.name === 'PrismaClientValidationError') {
        throw new UnprocessableEntityException(`Some properties not valid : ${e.message}`, e);
      }

      this.mqtt.publishMQTT('public', {
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
   * this action retunrs all component definitions
   * @param req
   */
  async findAll(req: IRequest): Promise<any[]> {
    const { user } = req;
    const definitions = (await this.prisma.component_definitions.findMany()) as any[];

    const filtered = filter(definitions, obj => {
      if (!obj.definition?.items) {
        return true;
      }

      return filterItemsByRole(obj.definition.items, user.coldclimate_claims.roles);
    });

    return filtered;
  }

  /**
   * This action returns a named component definition
   * @param name
   * @param req
   * @param bypassCache
   */
  async findOne(name: string, req: IRequest, bypassCache?: boolean): Promise<any> {
    const { user } = req;
    try {
      let def: any;

      if (!bypassCache) {
        def = await this.cache.get(`component_definitions:name:${name}`);

        if (def) {
          return def;
        }
      }

      def = await this.prisma.component_definitions.findUnique({
        where: { name: name },
      });

      if (!def) {
        throw new NotFoundException(`Unable to find component definition with name: ${name}`);
      }
      const { items } = def.definition as any;

      const filteredItems = filterItemsByRole(items, user.coldclimate_claims.roles);

      set(def.definition, 'items', filteredItems);

      await this.cache.set(`component_definitions:name:${name}`, def, {
        ttl: 0,
      });

      await this.cache.set(`component_definitions:type:${def.type}`, def, {
        ttl: 0,
      });

      return def;
    } catch (e) {
      this.logger.error(e, { user: user.coldclimate_claims, name, bypassCache });

      if (e.name === 'PrismaClientValidationError') {
        throw new UnprocessableEntityException(`Some properties not valid : ${e.message}`, e);
      }
      throw e;
    }
  }

  /***
   * This action updates a named component definition
   * @param name
   * @param updateComponentDefinitionDto
   * @param req
   */
  async update(name: string, updateComponentDefinitionDto: any, req: IRequest): Promise<any> {
    const { url } = req;
    try {
      const def = await this.findOne(name, req);
      if (def) {
        await this.cache.delete(`component_definitions:name:${def.name}`);
        await this.cache.delete(`component_definitions:type:${def.type}`);
      }

      const definition = (await this.prisma.component_definitions.update({
        where: { name: name },
        data: updateComponentDefinitionDto,
      })) as any;

      if (!definition) {
        throw new NotFoundException(`Unable to find component definition with name: ${name}`);
      }

      this.logger.info('updated definition', definition);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'update',
        status: 'complete',
        data: {
          ...definition,
        },
      });

      return definition;
    } catch (e) {
      if (e.status !== 404) {
        throw new UnprocessableEntityException(e.message, e);
      }

      this.mqtt.publishMQTT('public', {
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
   * This action removes a named component definition
   * @param name
   * @param req
   */
  async remove(name: string, req: IRequest) {
    const { user, url } = req;
    try {
      const def = await this.findOne(name, req);
      if (def) {
        await this.cache.delete(`component_definitions:name:${def.name}`);
        await this.cache.delete(`component_definitions:type:${def.type}`);
      }

      //rebuild type cache
      await this.findByType(req, def.type);

      await this.prisma.component_definitions.delete({ where: { name: name } });

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'delete',
        status: 'complete',
        data: {},
      });
    } catch (e) {
      if (e.message.includes('Record to delete does not exist')) {
        throw new NotFoundException(`${user.coldclimate_claims.email} attempted to delete a component definition that does not exist: ${name}`);
      }

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
