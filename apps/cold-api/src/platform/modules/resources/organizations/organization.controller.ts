import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { ResourceValidationPipe } from '../../../pipes/resource.pipe';
import { allRoles, bpcDecoratorOptions, coldAdminOnly, orgIdDecoratorOptions } from '../_global/global.params';
import { OrganizationService } from './organization.service';
import { ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseWorker, HttpExceptionFilter, JwtAuthGuard, OrganizationsSchema, Roles, RolesGuard, GeneratorService, IRequest } from '@coldpbc/nest';
import { CreateOrganizationDto } from './dto/organization.dto';
import { FootprintsService } from './facilities/footprints/footprints.service';

const genService = new GeneratorService();

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Organizations')
@UseFilters(new HttpExceptionFilter(OrganizationController.name))
@Controller('organizations')
export class OrganizationController extends BaseWorker {
  constructor(readonly orgService: OrganizationService, readonly footprintsService: FootprintsService) {
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
    type: 'object',
    schema: {
      example: genService.genOrganization(),
    },
  })
  @HttpCode(201)
  async createOrganization(
    @Query() query,
    @Body(new ResourceValidationPipe(OrganizationsSchema.partial(), 'POST')) createOrganizationDTO: CreateOrganizationDto,
    @Req()
    req: IRequest,
  ) {
    return this.orgService.createColdOrg(createOrganizationDTO, req);
  }

  /***
   * Update organization
   * @param query
   * @param createOrganizationDTO
   * @param req
   * @param orgId
   * @param bpc
   */
  @ApiOperation({
    summary: 'Update Organization',
    operationId: 'UpdateOrganization',
  })
  @Patch(':orgId')
  @Roles(...coldAdminOnly)
  @ApiQuery(bpcDecoratorOptions)
  @ApiBody({
    type: 'object',
    schema: {
      example: genService.genOrganization(),
    },
  })
  @HttpCode(200)
  async updateOrganization(
    @Param('orgId') orgId: string,
    @Body(new ResourceValidationPipe(OrganizationsSchema.partial(), 'PATCH')) createOrganizationDTO: Partial<CreateOrganizationDto>,
    @Req()
    req: IRequest,
  ) {
    return this.orgService.updateOrganization(orgId, createOrganizationDTO, req);
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
  getOrganizations(@Req() req: IRequest, @Query('bpc') bpc?: boolean, @Query('filter') filter?: { name: string; id: string }) {
    return this.orgService.getOrganizations(bpc, req, filter);
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
    req: IRequest,
    @Query('bpc') bpc?: boolean,
  ) {
    this.logger.info('getting organization', { orgId });

    return await this.orgService.getOrganization(orgId, req, bpc);
  }

  @Get(':orgId/footprints')
  @Roles(...allRoles)
  findAllByOrg(@Param('orgId') orgId: string) {
    return this.footprintsService.findAllByOrg(orgId);
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
    req: IRequest,
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
  @Delete()
  @ApiQuery(bpcDecoratorOptions)
  @Roles(...coldAdminOnly)
  @HttpCode(204)
  async removeOrgs(
    @Req()
    req: IRequest,
  ) {
    const { organizations } = req.body;
    if (!Array.isArray(organizations)) {
      throw new BadRequestException('array of organization ids is required');
    }
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
    req: IRequest,
  ) {
    const orgs = await this.orgService.getOrganizations(true, req, { isTest: true });
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
