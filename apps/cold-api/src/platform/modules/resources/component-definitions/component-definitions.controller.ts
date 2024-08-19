import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { component_definition_types } from 'prisma/prisma-client';
import { ResourceValidationPipe } from '../../../pipes/resource.pipe';
import { BaseWorker, HttpExceptionFilter, IRequest, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { allRoles, bpcDecoratorOptions, coldAdminOnly } from '../_global/global.params';
import { ComponentDefinitionsService } from './component-definitions.service';
import { ComponentDefinitionDto } from './dto/component-definition-dto';
import { postComponentExample } from './examples/component.examples';
// eslint-disable-next-line @nx/enforce-module-boundaries
import ComponentDefinitionSchema from '../../../../../../../libs/nest/src/validation/custom/componentDefinitionSchema';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid'])
@ApiTags('Components')
@UseFilters(new HttpExceptionFilter(ComponentDefinitionsController.name))
@Controller('components')
export class ComponentDefinitionsController extends BaseWorker {
  constructor(private readonly componentDefinitions: ComponentDefinitionsService) {
    super(ComponentDefinitionsController.name);
  }

  @ApiOperation({
    summary: 'Create Component Definition',
    operationId: 'CreateComponentDefinition',
  })
  @Post()
  @ApiBody({
    schema: {
      example: postComponentExample,
    },
    type: ComponentDefinitionDto,
  })
  @Roles(...coldAdminOnly)
  @HttpCode(201)
  create(
    @Req()
    req: IRequest,
    @Body(new ResourceValidationPipe(ComponentDefinitionSchema, 'POST')) createComponentDefinitionDto: ComponentDefinitionDto,
  ) {
    return this.componentDefinitions.create(createComponentDefinitionDto, req);
  }

  @ApiOperation({
    summary: 'Get Component Definitions',
    operationId: 'GetComponentDefinitions',
  })
  @Get()
  @ApiQuery(bpcDecoratorOptions)
  @Roles(...allRoles)
  findAll(
    @Req()
    req: IRequest,
  ) {
    return this.componentDefinitions.findAll(req);
  }

  @ApiOperation({
    summary: 'Get Component Definitions By Type',
    operationId: 'GetComponentDefinitionsByType',
  })
  @Get('types/:type')
  @Roles(...allRoles)
  @ApiParam({
    name: 'type',
    enum: component_definition_types,
  })
  async getAllByType(
    @Param('type') type: component_definition_types,
    @Req()
    req: IRequest,
  ) {
    const response = await this.componentDefinitions.findByType(req, type);
    return response;
  }

  @ApiOperation({
    summary: 'Get Component Definitions By Name',
    operationId: 'GetComponentDefinitionsByName',
  })
  @Get(':name')
  @Roles(...allRoles)
  @ApiParam({
    name: 'name',
    description: 'Component Name',
    example: '{{test_component_name}}',
  })
  async findOne(
    @Param('name') name: string,
    @Req()
    req: IRequest,
  ) {
    const response = await this.componentDefinitions.findOne(name, req);
    return response;
  }

  @ApiOperation({
    summary: 'Update Component Definitions By Name',
    operationId: 'UpdateComponentDefinitionsByName',
  })
  @Patch(':name')
  @HttpCode(201)
  @Roles(...coldAdminOnly)
  @ApiParam({
    name: 'name',
    description: 'Component Name',
    example: '{{test_component_name}}',
  })
  update(
    @Param('name') name: string,
    @Body(new ResourceValidationPipe(ComponentDefinitionSchema, 'PATCH')) updateComponentDefinitionDto: any,
    @Req()
    req: IRequest,
  ) {
    return this.componentDefinitions.update(name, updateComponentDefinitionDto, req);
  }

  @ApiOperation({
    summary: 'Delete Component Definitions By Name',
    operationId: 'DeleteComponentDefinitionsByName',
  })
  @Delete(':name')
  @HttpCode(204)
  @Roles(...coldAdminOnly)
  @ApiParam({
    name: 'name',
    description: 'Component Name',
    example: '{{test_component_name}}',
  })
  remove(
    @Param('name') name: string,
    @Req()
    req: IRequest,
  ) {
    return this.componentDefinitions.remove(name, req);
  }

  @ApiOperation({
    deprecated: true,
    summary: 'Get Test Orgs',
    description: 'Internal Use Only',
    operationId: 'GetDarklyTestOrgs',
  })
  @Get('darkly/testOrgs')
  @HttpCode(200)
  @Roles(...coldAdminOnly)
  testOrgs() {
    return this.componentDefinitions.getTestOrgs();
  }
}
