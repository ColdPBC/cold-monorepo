import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
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
@Controller()
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
  @Post('organizations')
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
  @Get('organizations')
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
  @Get('organizations/:orgId')
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
  @Delete('organizations/:orgId')
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
    const org = await this.orgService.getOrganization(orgId, req);
    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    return this.orgService.deleteOrganization(org, req);
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
  @Delete('organizations')
  @ApiQuery(bpcDecoratorOptions)
  @Roles(...coldAdminOnly)
  @HttpCode(204)
  async removeOrgs(
    @Req()
    req: {
      body: { organizations: string[] };
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    const { organizations } = req.body;
    for (const orgId of organizations) {
      try {
        const org = await this.orgService.getOrganization(orgId, req);
        await this.orgService.deleteOrganization(org, req);
      } catch (e) {
        this.logger.info('Organization not found', { orgId });
      }
    }
  }

  /***
   * **Internal Use Only** : Delete all test orgs
   * @param res
   * @param req
   */
  @ApiOperation({
    summary: 'Delete Test Organizations',
    operationId: 'DeleteTestOrgs',
    description: 'Deletes all test organizations',
  })
  @Delete('test')
  @Roles(...coldAdminOnly)
  @HttpCode(204)
  async deleteTestOrgs(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    const orgs = await this.orgService.getOrganizations(true, { isTest: true });
    if (orgs) {
      const deletePromises: any = [];
      for (const org of orgs) {
        deletePromises.push(this.orgService.deleteOrganization(org, req));
      }
      return await Promise.all(deletePromises);
    } else {
      throw new NotFoundException('No test organizations found');
    }
  }
}
