import { BadRequestException, ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { filter, set } from 'lodash';
import { Span } from 'nestjs-ddtrace';
import { component_definition_types } from 'prisma/prisma-client';
import { AuthenticatedUser, CacheService, BaseWorker, PrismaService, DarklyService } from '@coldpbc/nest';
import { filterItemsByRole } from './component-definitions.utils';

@Span()
@Injectable()
export class ComponentDefinitionsService extends BaseWorker {
  constructor(readonly darkly: DarklyService, private prisma: PrismaService, private readonly cache: CacheService) {
    super('ComponentDefinitionsService');
  }

  async getTestOrgs() {
    const response = await this.darkly.getJSONFlag('org-whitelist');
    return response;
  }
  /***
   * This action returns a component definition by type
   * @param user
   * @param type
   */
  async findByType(user: AuthenticatedUser, type: component_definition_types): Promise<any[]> {
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
   * @param user
   */
  async create(createComponentDefinitionDto: any, user: AuthenticatedUser): Promise<any> {
    try {
      // delete cached definitions by type
      await this.cache.delete(`form_definitions:type:${createComponentDefinitionDto.type}`);

      createComponentDefinitionDto.created_at = new Date();

      const definition = (await this.prisma.component_definitions.create({
        data: createComponentDefinitionDto as any,
      })) as any;

      this.logger.info('created definition', definition);

      //rebuild cache async
      await this.findByType(user, createComponentDefinitionDto.type);

      return definition;
    } catch (e) {
      this.logger.error(e, { user: user.coldclimate_claims, createComponentDefinitionDto });
      if (e.message.includes('Unique constraint failed on the fields')) {
        throw new ConflictException(`A component definition with the name ${createComponentDefinitionDto.name} already exists`);
      }
      if (e.name === 'PrismaClientValidationError') {
        throw new UnprocessableEntityException(`Some properties not valid : ${e.message}`, e);
      }

      throw e;
    }
  }

  /***
   * this action retunrs all component definitions
   * @param user
   */
  async findAll(user: AuthenticatedUser): Promise<any[]> {
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
   * @param user
   * @param bypassCache
   */
  async findOne(name: string, user: AuthenticatedUser, bypassCache?: boolean): Promise<any> {
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
   * @param user
   */
  async update(name: string, updateComponentDefinitionDto: any, user: AuthenticatedUser): Promise<any> {
    try {
      const def = await this.findOne(name, user);
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

      return definition;
    } catch (e) {
      if (e.status !== 404) {
        throw new UnprocessableEntityException(e.message, e);
      }
      throw e;
    }
  }

  /***
   * This action removes a named component definition
   * @param name
   * @param user
   */
  async remove(name: string, user: AuthenticatedUser) {
    try {
      const def = await this.findOne(name, user);
      if (def) {
        await this.cache.delete(`component_definitions:name:${def.name}`);
        await this.cache.delete(`component_definitions:type:${def.type}`);
      }

      //rebuild type cache
      await this.findByType(user, def.type);

      await this.prisma.component_definitions.delete({ where: { name: name } });
    } catch (e) {
      if (e.message.includes('Record to delete does not exist')) {
        throw new NotFoundException(`${user.coldclimate_claims.email} attempted to delete a component definition that does not exist: ${name}`);
      }
      throw e;
    }
  }
}
