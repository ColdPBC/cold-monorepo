import { Controller, Get, Param, Patch, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { coldAdminOnly } from '../../_global/global.params';
import { MemberService } from './member.service';

import { BaseWorker, HttpExceptionFilter, IRequest, JwtAuthGuard, JwtStrategy, PermissionsGuard, Roles, RolesGuard } from '@coldpbc/nest';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@ApiOAuth2(['openid'])
@UseFilters(new HttpExceptionFilter(MemberController.name))
@Controller('members')
@ApiTags('Members')
export class MemberController extends BaseWorker {
  constructor(private readonly jwtStrategy: JwtStrategy, private readonly membersService: MemberService) {
    super('MemberController');
  }

  /***
   * Get member from Auth0 by email address
   */
  @Get(':email')
  @ApiOperation({
    summary: 'Get Member',
    operationId: 'GetMember',
  })
  async getByEmails(
    @Req()
    req: IRequest,
    @Param('email') email: string,
    @Query('bpc') bpc?: boolean,
  ) {
    return this.membersService.getMemberByEmail(email, req, bpc);
  }

  /***
   * Update member from Auth0 by email address
   */
  @Patch(':email')
  @ApiOperation({
    summary: 'Update Member',
    operationId: 'UpdateMember',
  })
  async updateUser(
    @Req()
    req: IRequest,
    @Param('email') email: string,
  ) {
    return this.membersService.updateUser(req, email, req.body);
  }

  /***
   * Update member from Auth0 by email address
   */
  @Post()
  @ApiOperation({
    summary: 'Add Member',
    operationId: 'UpdateMember',
  })
  @Roles(...coldAdminOnly)
  async createUser(
    @Req()
    req: IRequest,
  ) {
    return this.membersService.createMember(req, req.body);
  }
}
