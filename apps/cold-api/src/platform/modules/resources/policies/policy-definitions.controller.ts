import { Controller, Get, Param, ParseIntPipe, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiParam, ApiTags } from '@nestjs/swagger';
import { RolesGuard, JwtAuthGuard, Roles, AuthenticatedUser, BaseWorker, HttpExceptionFilter, Public } from '@coldpbc/nest';
import { coldAdminOnly } from '../_global/global.params';
import { PolicyDefinitionsService } from './policy-definitions.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid'])
@ApiTags('Policies')
@UseFilters(new HttpExceptionFilter(PolicyDefinitionsController.name))
@Controller('policies')
export class PolicyDefinitionsController extends BaseWorker {
  constructor(private readonly policyDefinitionsService: PolicyDefinitionsService) {
    super(PolicyDefinitionsService.name);
  }

  /**
   * Get All Policies
   * @param {{body: any, headers: any, query: any, user: AuthenticatedUser}} req
   * @returns {Promise<PolicyDefinitionDto[]>}
   */
  @Get()
  @Roles(...coldAdminOnly)
  findAll() {
    return this.policyDefinitionsService.findAllPolicies();
  }

  /**
   * Get a Policy by name
   * @param {string} name
   * @param {{body: any, headers: any, query: any, user: AuthenticatedUser}} req
   * @returns {Promise<PolicyDefinitionDto | string>}
   */
  @Get(':id')
  findByName(@Param('id') name: string) {
    return this.policyDefinitionsService.findPolicyByName(name, {
      bypassCache: false,
      contentOnly: false,
    });
  }

  /**
   * Get a Policy content by name
   * @param {string} name
   * @returns {Promise<PolicyDefinitionDto | string>}
   */
  @Get(':id/content')
  @Public()
  findContentByName(@Param('id') name: string) {
    return this.policyDefinitionsService.findPolicyByName(name, {
      bypassCache: false,
      contentOnly: true,
    });
  }

  /**
   * Get signed policy data by policy id
   * @param {number} id
   * @param {{headers: any, query: any, user: AuthenticatedUser}} req
   * @returns {Promise<CreatePolicyDataDto>}
   */
  @Post(':id/signed')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  signPolicy(
    @Param('id', new ParseIntPipe()) id: number,
    @Req()
    req: {
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
  ) {
    return this.policyDefinitionsService.createSignedData(id, req.user);
  }

  /**
   * Get all signed policy data for user
   * @param {{body: any, headers: any, query: any, user: AuthenticatedUser}} req
   * @returns {Promise<PolicyDefinitionDto[]>}
   */
  @Get('signed/user')
  findSigned(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
  ) {
    return this.policyDefinitionsService.findSignedDataByEmail(req.user);
  }
}
