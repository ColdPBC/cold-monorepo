import { Controller, Get, Param, ParseIntPipe, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiParam, ApiTags } from '@nestjs/swagger';
import { BaseWorker, HttpExceptionFilter, IRequest, JwtAuthGuard, Public, Roles, RolesGuard } from '@coldpbc/nest';
import { coldAdminOnly } from '../_global/global.params';
import { Policy_definitionsService } from './policy_definitions.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid'])
@ApiTags('Policies')
@UseFilters(new HttpExceptionFilter(Policy_definitionsController.name))
@Controller('policies')
export class Policy_definitionsController extends BaseWorker {
  constructor(readonly policyDefinitionsService: Policy_definitionsService) {
    super(Policy_definitionsService.name);
  }

  /**
   * Get All Policies
   * @param {{body: any, headers: any, query: any, user: IAuthenticatedUser}} req
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
   * @param {{body: any, headers: any, query: any, user: IAuthenticatedUser}} req
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
   * @param {{headers: any, query: any, user: IAuthenticatedUser}} req
   * @returns {Promise<CreatePolicyDataDto>}
   */
  @Post(':id/signed')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  signPolicy(
    @Param('id', new ParseIntPipe()) id: number,
    @Req()
    req: IRequest,
  ) {
    return this.policyDefinitionsService.createSignedData(id, req);
  }

  /**
   * Get all signed policy data for user
   * @param {{body: any, headers: any, query: any, user: IAuthenticatedUser}} req
   * @returns {Promise<PolicyDefinitionDto[]>}
   */
  @Get('signed/user')
  findSigned(
    @Req()
    req: IRequest,
  ) {
    return this.policyDefinitionsService.findSignedDataByEmail(req);
  }
}
