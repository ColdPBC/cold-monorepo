import { Body, Controller, Delete, Get, HttpCode, Param, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  allRoles,
  BaseWorker,
  bpcDecoratorOptions,
  coldAdminOnly,
  coldAndCompanyAdmins,
  IRequest,
  JwtAuthGuard,
  orgIdDecoratorOptions,
  OrgUserInterceptor,
  roleNameDecoratorOptions,
  Roles,
  RolesGuard,
  userIdDecoratorOptions,
} from '@coldpbc/nest';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { OrgRolesService } from '../roles/roles.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@Controller('organizations/:orgId/members')
export class MembersController extends BaseWorker {
  constructor(private readonly members: MembersService, private readonly roles: OrgRolesService) {
    super(MembersController.name);
  }

  /***
   * Get members for an organization
   * @param orgId
   * @param req
   * @param bpc
   */
  @ApiOperation({
    summary: 'Get Organization Members',
    operationId: 'GetOrganizationMembers',
  })
  @Get()
  @Roles(...allRoles)
  @ApiParam(orgIdDecoratorOptions)
  @ApiQuery(bpcDecoratorOptions)
  getOrgMembers(
    @Param('orgId') orgId: string,
    @Req()
    req: IRequest,
    @Query('bpc') bpc?: boolean,
  ) {
    if (!orgId) throw new Error('orgId is required');
    return this.members.getOrganizationMembers(orgId, req, bpc);
  }

  /***
   * Get User roles in an organization
   */
  @ApiOperation({
    summary: 'Get Member Roles',
    operationId: 'GetOrgMemberRoles',
    description: 'Returns all the organization roles for a member',
  })
  @Get(':userId/roles')
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiParam(userIdDecoratorOptions)
  @Roles(...coldAdminOnly)
  @HttpCode(200)
  getOrgUsersRoles(
    @Req()
    req: IRequest,
    @Param('orgId') orgId: string,
    @Param('userId') userId: string,
    @Query('bpc') bpc?: boolean,
  ) {
    return this.roles.getOrgUserRoles(orgId, userId, req, bpc);
  }

  /***
   * **Internal Use Only** : Add User to Organization and assign them to a role in Auth0
   */
  @ApiOperation({
    summary: 'Add Member By ID',
    operationId: 'AddMemberByID',
    description: 'Add an existing member to the organization',
  })
  @Put(':userId/roles/:roleName')
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiParam(roleNameDecoratorOptions)
  @ApiParam(userIdDecoratorOptions)
  @Roles(...coldAndCompanyAdmins)
  @HttpCode(201)
  async addMemberToOrganizationAndRole(
    @Param('orgId') orgId: string,
    @Param('roleName') roleName: string,
    @Param('userId') userId: string,
    @Req()
    req: IRequest,
    @Query('bpc') bpc?: boolean,
  ) {
    this.logger.info('adding user to organization with role', {
      orgId,
      userId,
      roleName,
    });

    return await this.members.addUserToOrganization(orgId, userId, req, roleName, bpc);
  }

  /***
   * Delete members of a company
   * @param orgId
   * @param body
   * @param req
   * @param bpc
   */
  @ApiOperation({
    summary: 'Delete Members',
    operationId: 'DeleteOrgMembers',
    description: 'Deletes specified member ids from organization',
  })
  @Delete()
  @ApiBody({
    schema: {
      type: 'object',
      example: { members: ['{{example_member_id}}'] },
      description: 'Array of member ids',
    },
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @Roles(...coldAndCompanyAdmins)
  @HttpCode(204)
  async removeMembers(
    @Param('orgId') orgId: string,
    @Body() body: { members: string[] },
    @Req()
    req: IRequest,
  ) {
    return await this.members.removeUserFromOrganization(orgId, body, req);
  }
}
