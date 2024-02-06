import { BaseWorker, bpcDecoratorOptions, coldAndCompanyAdmins, IAuthenticatedUser, invIdDecoratorOptions, orgIdDecoratorOptions, Roles } from '@coldpbc/nest';
import { Body, Controller, Delete, HttpCode, Param, Post, Query, Req } from '@nestjs/common';
import { postInviteOwnerExample } from '../examples/organization.examples';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { InvitationsService } from './invitations.service';

@Controller('organizations')
export class InvitationsController extends BaseWorker {
  constructor(private readonly inviteService: InvitationsService) {
    super(InvitationsController.name);
  }

  /***
   * Invite a user to a company
   * @param req
   * @param bpc
   * @param orgId
   * @param inviteUserDto
   * @param suppressEmail
   */
  @Post(`:orgId/invitation`)
  @Roles(...coldAndCompanyAdmins)
  @ApiOperation({
    summary: 'Invite User',
    operationId: 'InviteUser',
  })
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
      user: IAuthenticatedUser;
    },
    @Body() inviteUserDto: { user_email: string; inviter_name: string; roleId: string },
    @Param('orgId') orgId: string,
    @Query('bpc') bpc?: boolean,
    @Query('suppressEmail') suppressEmail?: boolean,
  ) {
    return this.inviteService.inviteUser(orgId, inviteUserDto.user_email, inviteUserDto.inviter_name, inviteUserDto.roleId, suppressEmail, req, bpc);
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
      user: IAuthenticatedUser;
    },
  ) {
    this.logger.log(`Removing organization (${orgId}) invite in Auth0`, { orgId, invId, ...req.user });

    return this.inviteService.deleteInvitation(orgId, invId, req);
  }
}
