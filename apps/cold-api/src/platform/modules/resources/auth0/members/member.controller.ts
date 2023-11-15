import { Controller, Get, Param, Patch, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { Roles } from '../../../../authorization/decorators/roles.decorator';
import { HttpExceptionFilter } from '../../../../filters/http-exception.filter';
import { AuthenticatedUser } from '../../../../primitives/interfaces/user.interface';
import { BaseWorker } from '../../../../worker/worker.class';
import { JwtAuthGuard } from '../../../../authorization/guards/jwtAuth.guard';
import { PermissionsGuard } from '../../../../authorization/guards/permissions.guard';
import { RolesGuard } from '../../../../authorization/guards/roles.guard';
import { JwtStrategy } from '../../../../authorization/jwt.strategy';
import { coldAdminOnly } from '../../_global/global.params';
import { MemberService } from './member.service';

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
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Param('email') email: string,
    @Query('bpc') bpc?: boolean,
  ) {
    return this.membersService.getMemberByEmail(email, req.user, bpc);
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
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Param('email') email: string,
  ) {
    return this.membersService.updateUser(req.user, email, req.body);
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
    req: {
      body: {
        email_verified?: boolean;
        given_name?: string;
        picture?: string;
        password?: string;
        blocked?: boolean;
        name?: string;
        nickname?: string;
        connection?: string;
        family_name?: string;
        email: string;
      };
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
  ) {
    return this.membersService.createMember(req.body);
  }
}
