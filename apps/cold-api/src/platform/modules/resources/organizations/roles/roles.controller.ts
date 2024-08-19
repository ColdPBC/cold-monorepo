import { Controller, HttpCode, Param, Patch, Put, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BaseWorker, bpcDecoratorOptions, coldAndCompanyAdmins, IRequest, orgIdDecoratorOptions, roleNameDecoratorOptions, Roles, userIdDecoratorOptions } from '@coldpbc/nest';
import { OrgRolesService } from './roles.service';
import { MembersService } from '../members/members.service';

@Controller('organizations')
export class OrgRolesController extends BaseWorker {
  constructor(private readonly roles: OrgRolesService, private readonly members: MembersService) {
    super(OrgRolesController.name);
  }

  /***
   * **Internal Use Only** : Add User to Organization and assign them to a role in Auth0
   */
  @ApiOperation({
    summary: 'Add Member By ID',
    operationId: 'AddMemberByID',
    description: 'Add an existing member to the organization',
  })
  @Put(':orgId/roles/:roleName/members/:userId')
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
   * **Internal Use Only** : Add member to organization roles in Auth0
   * @param orgId
   * @param userId
   * @param roleName
   * @param req
   * @param bpc
   */
  @ApiOperation({
    summary: 'Add Member To Role',
    operationId: 'AddOrgMemberToRole',
    description: 'Adds org member to a role',
  })
  @Patch(':orgId/roles/:roleName/members/:userId')
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiParam(roleNameDecoratorOptions)
  @ApiParam(userIdDecoratorOptions)
  @Roles(...coldAndCompanyAdmins)
  @HttpCode(201)
  async updateOrgUserRoles(
    @Req()
    req: IRequest,
    @Param('orgId') orgId: string,
    @Param('roleName') roleName: string,
    @Param('userId') userId: string,
    @Query('bpc') bpc?: boolean,
  ) {
    this.logger.info('update user roles', { orgId, userId, roleName });

    return await this.roles.updateOrgUserRoles(orgId, userId, req, roleName, bpc);
  }
}
