import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { ResourceValidationPipe } from '../../../pipes/resource.pipe';
import { allRoles, bpcDecoratorOptions, coldAdminOnly, orgIdDecoratorOptions } from '../_global/global.params';
import { postOrganizationExample } from './examples/organization.examples';
import { OrganizationService } from './organization.service';
import { ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseWorker, HttpExceptionFilter, IAuthenticatedUser, JwtAuthGuard, OrganizationsSchema, Roles, RolesGuard } from '@coldpbc/nest';
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
    @Body(new ResourceValidationPipe(OrganizationsSchema.partial(), 'POST')) createOrganizationDTO: CreateOrganizationDto,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    return this.orgService.createColdOrg(createOrganizationDTO, req);
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
      user: IAuthenticatedUser;
    },
    @Query('bpc') bpc?: boolean,
  ) {
    this.logger.info('getting organization', { orgId });

    return await this.orgService.getOrganization(orgId, req, bpc);
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
      user: IAuthenticatedUser;
    },
  ) {
    return this.orgService.deleteOrganization(orgId, req);
  }
}
