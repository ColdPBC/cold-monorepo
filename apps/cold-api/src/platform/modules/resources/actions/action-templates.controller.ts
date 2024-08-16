import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { ZodSerializerDto } from 'nestjs-zod';
import { ResourceValidationPipe } from '../../../pipes/resource.pipe';
import {
  ActionTemplateSchema,
  BaseWorker,
  CreateActionTemplateItemSchema,
  HttpExceptionFilter,
  IRequest,
  JwtAuthGuard,
  Roles,
  RolesGuard,
  ZodCreateActionTemplate,
} from '@coldpbc/nest';
import { coldAdminOnly } from '../_global/global.params';
import { ActionTemplatesService } from './action-templates.service';
import { actionTemplatePatchExample, actionTemplatePostExample, testActionTemplateIdExample } from './examples/action-template.examples';

@Controller('action-templates')
@Span()
@ApiTags('Action Templates')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(ActionTemplatesController.name))
export class ActionTemplatesController extends BaseWorker {
  constructor(private readonly actions: ActionTemplatesService) {
    super(ActionTemplatesController.name);
  }

  /**
   * This action returns all action templates
   * @param {{body: any, headers: any, query: any, user: IAuthenticatedUser}} req
   * @param {boolean} bpc
   * @returns {Promise<any>}
   */
  @ApiOperation({
    summary: 'Get Action Templates',
    operationId: 'GetActionTemplates',
  })
  @Get()
  @Roles(...coldAdminOnly)
  public getActionTemplates(
    @Req()
    req: IRequest,
    @Query('bpc') bpc?: boolean,
  ): Promise<any> {
    return this.actions.getActionTemplates(req, bpc);
  }

  /**
   * This action returns an action template by ID
   * @param {string} id
   * @param {{body: any, headers: any, query: any, user: IAuthenticatedUser}} req
   * @param {boolean} bpc
   * @returns {Promise<any>}
   */
  @ApiOperation({
    summary: 'Get Action Template by ID',
    operationId: 'GetActionTemplateById',
  })
  @Get(`:id`)
  @Roles(...coldAdminOnly)
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    example: testActionTemplateIdExample,
  })
  @ZodSerializerDto(ActionTemplateSchema)
  public getActionTemplate(
    @Param('id', ParseUUIDPipe) id: string,
    @Req()
    req: IRequest,
    @Query('bpc') bpc?: boolean,
  ) {
    return this.actions.getActionTemplate(req, id, bpc);
  }

  /**
   * This action creates an action template
   * @param {{body: ActionDefinitionsCreate, headers: any, query: any, user: IAuthenticatedUser}} req
   * @param body
   * @returns {Promise<Prisma.Prisma__action_definitionsClient<GetResult<Prisma.$action_definitionsPayload<DefaultArgs>, {data: any}, "create">, never, DefaultArgs>>}
   */
  @ApiOperation({
    summary: 'Create Action Template',
    operationId: 'CreateActionTemplate',
  })
  @Post()
  @Roles(...coldAdminOnly)
  @UsePipes(new ResourceValidationPipe(CreateActionTemplateItemSchema))
  @ApiBody({
    schema: {
      example: actionTemplatePostExample,
    },
  })
  //@ZodSerializerDto(ActionTemplateDto)
  //@UsePipes(new ResourceValidationPipe()) /**
  public createActionTemplate(
    @Body(new ResourceValidationPipe(CreateActionTemplateItemSchema, 'POST')) body: ZodCreateActionTemplate,
    @Req()
    req: IRequest,
  ) {
    return this.actions.createActionTemplate(req, body);
  }

  /**
   * This action updates an action template
   * @param {string} id
   * @param body
   * @param {{body: ActionDefinitionsCreate, headers: any, query: any, user: IAuthenticatedUser}} req
   * @param {boolean} bpc
   * @returns {Promise<Prisma.Prisma__action_definitionsClient<GetResult<Prisma.$action_definitionsPayload<DefaultArgs>, {data: any, where: {id: string}}, "update">, never, DefaultArgs>>}
   */
  @ApiOperation({
    summary: 'Update Action Template',
    operationId: 'UpdateActionTemplate',
  })
  @Patch(`:id`)
  @Roles(...coldAdminOnly)
  @ZodSerializerDto(ActionTemplateSchema)
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    example: testActionTemplateIdExample,
  })
  @ApiBody({
    schema: {
      example: actionTemplatePatchExample,
    },
  })
  public updateActionTemplate(
    @Param('id') id: string,
    @Body(new ResourceValidationPipe(CreateActionTemplateItemSchema, 'PATCH')) body: ZodCreateActionTemplate,
    @Req()
    req: IRequest,
  ) {
    return this.actions.updateActionTemplate(req, id, body);
  }

  /**
   * This action deletes an action template
   * @param {string} id
   * @param {{body: any, headers: any, query: any, user: IAuthenticatedUser}} req
   * @returns {Promise<Prisma.Prisma__action_definitionsClient<GetResult<Prisma.$action_definitionsPayload<DefaultArgs>, {where: {id: string}}, "delete">, never, DefaultArgs>>}
   */
  @ApiOperation({
    summary: 'Delete Action Template',
    operationId: 'DeleteActionTemplate',
    responses: {
      204: {
        description: 'Action Template Deleted',
      },
    },
  })
  @Delete(`:id`)
  @Roles(...coldAdminOnly)
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    example: testActionTemplateIdExample,
  })
  @ApiResponse({
    status: 204,
  })
  public deleteActionTemplate(
    @Param('id', ParseUUIDPipe) id: string,
    @Req()
    req: IRequest,
  ) {
    return this.actions.deleteActionTemplate(req, id);
  }
}
