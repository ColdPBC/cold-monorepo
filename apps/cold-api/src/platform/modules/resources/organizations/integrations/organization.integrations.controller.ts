import { Body, Controller, Get, HttpCode, Param, ParseBoolPipe, Post, Put, Query, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { bpcDecoratorOptions, coldAndCompanyAdmins, orgIdDecoratorOptions } from '../../_global/global.params';
import { BaseWorker, IAuthenticatedUser, Roles } from '@coldpbc/nest';
import { IntegrationBodySchema } from '../../integrations/examples/integration_examples';
import { OrganizationIntegrationsService } from './organization.integrations.service';

@Controller()
export class OrganizationIntegrationsController extends BaseWorker {
  constructor(private readonly orgIntegrationsService: OrganizationIntegrationsService) {
    super(OrganizationIntegrationsController.name);
  }

  @ApiOperation({
    summary: 'Get Organization Integrations',
    operationId: 'getOrganizationIntegrations',
  })
  @ApiTags('Organizations : Integrations')
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @Roles(...coldAndCompanyAdmins)
  @HttpCode(200)
  @Get('organizations/:orgId/integrations')
  getOrganizationIntegrations(
    @Param('orgId') orgId: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Query('bpc', new ParseBoolPipe({ optional: true })) bpc: boolean,
  ) {
    if (!bpc) bpc = false;

    return this.orgIntegrationsService.getOrganizationIntegrations(req, orgId, bpc);
  }

  @ApiOperation({
    summary: 'Create Organization Integration',
    operationId: 'createOrganizationIntegration',
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiBody(IntegrationBodySchema)
  @Post('organizations/:orgId/integrations')
  @HttpCode(201)
  createIntegration(
    @Param('orgId') orgId: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Body()
    body: {
      organization_id: string;
      service_definition_id: string;
      metadata: any;
    },
  ) {
    return this.orgIntegrationsService.createIntegration(req, orgId, body);
  }

  @ApiOperation({
    summary: 'Create Organization Integration',
    operationId: 'createOrganizationIntegration',
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiBody(IntegrationBodySchema)
  @Put('organizations/:orgId/integrations')
  @HttpCode(201)
  activateIntegration(
    @Param('orgId') orgId: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Body()
    body: {
      organization_id: string;
      service_definition_id: string;
      metadata: any;
    },
  ) {
    return this.orgIntegrationsService.enableIntegration(req, orgId, body);
  }

  @ApiOperation({
    summary: 'Create Organization Facility Integration',
    operationId: 'createFacilityIntegration',
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiBody(IntegrationBodySchema)
  @Post('organizations/:orgId/facilities/:facId/integrations')
  @HttpCode(201)
  createFacilityIntegration(
    @Param('orgId') orgId: string,
    @Param('facId') facId: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Body()
    body: {
      organization_id: string;
      service_definition_id: string;
      metadata: any;
    },
  ) {
    return this.orgIntegrationsService.createFacilityIntegration(req, orgId, facId, body);
  }
}
