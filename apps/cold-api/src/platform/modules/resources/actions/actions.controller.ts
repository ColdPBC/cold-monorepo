import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { BaseWorker, CreateActionTemplatesDto, HttpExceptionFilter, IRequest, JwtAuthGuard, Role, Roles, RolesGuard, ZodCreateActionDto } from '@coldpbc/nest';
import { allRoles } from '../_global/global.params';
import { ActionsService } from './actions.service';

@Controller()
@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(ActionsController.name))
export class ActionsController extends BaseWorker {
  constructor(private readonly assignments: ActionsService) {
    super(ActionsController.name);
  }

  /**
   * This action returns all assignments for an organization
   * @param {string} orgId
   * @param {{body: any, headers: any, query: any, user: IAuthenticatedUser}} req
   * @param {boolean} bpc
   * @returns {Promise<Actions>}
   */

  @ApiTags('Organizations : Actions')
  @Get('organizations/:orgId/actions')
  @Roles(...allRoles)
  public getActions(
    @Param('orgId') orgId: string,
    @Req()
    req: IRequest,
    @Query('bpc') bpc?: boolean,
  ) {
    return this.assignments.getActions(req, orgId, bpc);
  }

  /**
   * This action returns an action assignment by ID
   * @param {string} orgId
   * @param {string} id
   * @param {boolean} bpc
   * @returns {Promise<unknown>}
   */
  @ApiTags('Organizations : Actions')
  @Get('organizations/:orgId/actions/:id')
  @Roles(...allRoles)
  public getAction(
    @Param('orgId') orgId: string,
    @Param('id') id: string,
    @Req()
    req: IRequest,
    @Query('bpc') bpc?: boolean,
  ) {
    return this.assignments.getAction(req, orgId, id, bpc);
  }

  /**
   * This action creates a new assignment from template by id
   * @param {string} orgId
   * @param {string} id
   * @param {{body: any, headers: any, query: any, user: IAuthenticatedUser}} req
   * @param {actionsPartial} dto
   * @returns {Promise<unknown>}
   */
  @ApiTags('Organizations : Action-Templates')
  @Post(`organizations/:orgId/action-templates/:id`)
  @Roles(Role.ColdAdmin)
  /*@UsePipes(
    new ZodValidationPipe(
      z
        .object({ ...actionsPartialSchema.shape, action_template_id: string().uuid(), organization_id: string().uuid() })
        .optional()
        .nullable(),
    ),
  )*/
  public createAction(
    @Param('orgId') orgId: string,
    @Param('id') id: string,
    @Req()
    req: IRequest,
    @Body() dto: CreateActionTemplatesDto,
  ) {
    return this.assignments.createActionFromTemplate(req, orgId, id, dto);
  }

  /**
   * This function updates an action by id
   * @param {string} orgId
   * @param {string} id
   * @param {{body: {name?: string}, headers: any, query: any, user: IAuthenticatedUser}} req
   * @param {actions} dto
   * @returns {Promise<any>}
   */
  @ApiTags('Organizations : Actions')
  @Patch('organizations/:orgId/actions/:id')
  @Roles(...allRoles)
  public updateAction(
    @Param('orgId') orgId: string,
    @Param('id') id: string,
    @Req()
    req: IRequest,
    @Body() dto: { action: ZodCreateActionDto },
  ) {
    return this.assignments.updateAction(req, orgId, id, dto);
  }
}
