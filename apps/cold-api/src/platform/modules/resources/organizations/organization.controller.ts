import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { Response } from 'express';
import { ResourceValidationPipe } from '../../../pipes/resource.pipe';
import {
  allRoles,
  bpcDecoratorOptions,
  coldAdminOnly,
  coldAndCompanyAdmins,
  invIdDecoratorOptions,
  orgIdDecoratorOptions,
  roleNameDecoratorOptions,
  userIdDecoratorOptions,
} from '../_global/global.params';
import { postInviteOwnerExample, postOrganizationExample } from './examples/organization.examples';
import { OrganizationService } from './organization.service';
import { ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles, JwtAuthGuard, RolesGuard, HttpExceptionFilter, BaseWorker, AuthenticatedUser } from 'nest';
import { organizationsSchema } from 'validation';
import { CreateOrganizationDto } from './dto/organization.dto';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Organizations')
@UseFilters(new HttpExceptionFilter(OrganizationController.name))
@Controller('organizations')
export class OrganizationController extends BaseWorker {
  constructor(private readonly orgService: OrganizationService) {
    super('OrganizationController');
  }

  /***
   * Create organization
   * @param query
   * @param createOrganizationDTO
   * @param req
   * @param orgId
   * @param bpc
   */
  @ApiOperation({
    summary: 'Create Organization',
    operationId: 'CreateOrganization',
  })
  @Post()
  @Roles(...coldAdminOnly)
  @ApiQuery(bpcDecoratorOptions)
  @ApiBody({
    type: CreateOrganizationDto,
    schema: {
      example: postOrganizationExample,
    },
  })
  @HttpCode(201)
  async createOrganization(
    @Query() query,
    @Body(new ResourceValidationPipe(organizationsSchema.partial(), 'POST')) createOrganizationDTO: CreateOrganizationDto,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
  ) {
    return this.orgService.createColdOrg(createOrganizationDTO, req.user);
  }

  /***
   * Invite a user to a company
   * @param req
   * @param bpc
   * @param orgId
   * @param inviteUserDto
   * @param suppressEmail
   */
  @ApiOperation({
    summary: 'Invite User',
    operationId: 'InviteUser',
  })
  @Post(`:orgId/invitation`)
  @Roles(...coldAndCompanyAdmins)
  @ApiBody({
    schema: {
      example: postInviteOwnerExample,
    },
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiQuery({
    name: 'suppressEmail',
    required: false,
    description: 'Suppress Email',
    type: Boolean,
  })
  @HttpCode(201)
  inviteUser(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Body() inviteUserDto: { user_email: string; inviter_name: string; roleId: string },
    @Param('orgId') orgId: string,
    @Query('bpc') bpc?: boolean,
    @Query('suppressEmail') suppressEmail?: boolean,
  ) {
    return this.orgService.inviteUser(orgId, inviteUserDto.user_email, inviteUserDto.inviter_name, inviteUserDto.roleId, suppressEmail, req.user, bpc);
  }

  /***
   * **Internal Use Only** : Get all organizations from Auth0
   */
  @ApiOperation({
    summary: 'Get Organizations',
    operationId: 'GetOrganizations',
  })
  @Get()
  @Roles(...coldAdminOnly)
  @ApiQuery(bpcDecoratorOptions)
  @ApiQuery({
    name: 'filter',
    required: false,
    deprecated: true,
    description: 'Optional: provide either tha name or the id to filter results',
    example: { name: '{{test_company_name}}', id: '{{test_company_id}}' },
  })
  getOrganizations(@Query('bpc') bpc?: boolean, @Query('filter') filter?: { name: string; id: string }) {
    return this.orgService.getOrganizations(bpc, filter);
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
  @Get(':orgId/members')
  @Roles(...allRoles)
  @ApiParam(orgIdDecoratorOptions)
  @ApiQuery(bpcDecoratorOptions)
  getOrgMembers(
    @Param('orgId') orgId: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Query('bpc') bpc?: boolean,
  ) {
    if (!orgId) throw new Error('orgId is required');
    return this.orgService.getOrganizationMembers(orgId, req.user, bpc);
  }

  /***
   * **Internal Use Only** : Get organization from Auth0 by Name/ID
   */
  @ApiOperation({
    summary: 'Get Organization',
    operationId: 'GetOrganization',
    description: 'Get Organization by Name or ID',
  })
  @Get(':orgId')
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @Roles(...allRoles)
  async getOrganization(
    @Param('orgId') orgId: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Query('bpc') bpc?: boolean,
  ) {
    this.logger.info('getting organization', { orgId });

    return await this.orgService.getOrganization(orgId, req.user, bpc);
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
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Query('bpc') bpc?: boolean,
  ) {
    this.logger.info('adding user to organization with role', {
      orgId,
      userId,
      roleName,
    });

    return await this.orgService.addUserToOrganization(orgId, userId, req.user, roleName, bpc);
  }

  /***
   * Get User roles in an organization
   */
  @ApiOperation({
    summary: 'Get Member Roles',
    operationId: 'GetOrgMemberRoles',
    description: 'Returns all the organization roles for a member',
  })
  @Get(':orgId/members/:userId/roles')
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiParam(userIdDecoratorOptions)
  @Roles(...coldAdminOnly)
  @HttpCode(200)
  getOrgUsersRoles(
    @Req()
    req: {
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Param('orgId') orgId: string,
    @Param('userId') userId: string,
    @Query('bpc') bpc?: boolean,
  ) {
    return this.orgService.getOrgUserRoles(orgId, userId, req.user, bpc);
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
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Param('orgId') orgId: string,
    @Param('roleName') roleName: string,
    @Param('userId') userId: string,
    @Query('bpc') bpc?: boolean,
  ) {
    this.logger.info('update user roles', { orgId, userId, roleName });

    return await this.orgService.updateOrgUserRoles(orgId, userId, req.user, roleName, bpc);
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
  @Delete(':orgId/members')
  @ApiBody({
    schema: {
      type: 'array',
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
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
  ) {
    return await this.orgService.removeUserFromOrganization(orgId, body, req.user);
  }

  /***
   * **Internal Use Only** : Delete an organization by ID
   * @param res
   * @param orgId
   * @param req
   * @param bpc
   */
  @ApiOperation({
    summary: 'Delete Organization',
    operationId: 'DeleteOrg',
    description: 'Deletes specified organization',
  })
  @Delete(':orgId')
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @Roles(...coldAdminOnly)
  @HttpCode(204)
  async removeOrg(
    @Param('orgId') orgId: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
  ) {
    return this.orgService.deleteOrganization(orgId, req.user);
  }

  /***
   * Delete an invitation by ID
   * @param orgId
   * @param invId
   * @param req
   * @param bpc
   */
  @Delete(':orgId/invitations/:invId')
  @ApiParam(orgIdDecoratorOptions)
  @ApiParam(invIdDecoratorOptions)
  @ApiQuery(bpcDecoratorOptions)
  @Roles(...coldAndCompanyAdmins)
  @HttpCode(204)
  removeInvitation(
    @Param('orgId') orgId: string,
    @Param('invId') invId: string,
    @Req()
    req: {
      user: AuthenticatedUser;
    },
  ) {
    this.logger.log(`Removing organization ${orgId} in Auth0`);

    return this.orgService.deleteInvitation(orgId, invId, req.user);
  }
}
