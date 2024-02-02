import { Body, Controller, Get, HttpCode, Param, ParseBoolPipe, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { BaseWorker, HttpExceptionFilter, IAuthenticatedUser, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { bpcDecoratorOptions, coldAdminOnly, coldAndCompanyAdmins, orgIdDecoratorOptions } from '../_global/global.params';

import { IntegrationsService } from './integrations.service';
import { IntegrationBodySchema } from './examples/integration_examples';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid'])
@ApiTags('Integrations')
@UseFilters(new HttpExceptionFilter(IntegrationsController.name))
@Controller()
export class IntegrationsController extends BaseWorker {
  constructor(private readonly providerService: IntegrationsService) {
    super(IntegrationsService.name);
  }

  @ApiOperation({
    summary: 'Get Integrations',
    operationId: 'GetAllIntegrations',
  })
  @ApiTags('Integrations')
  @Get('/integrations')
  @Roles(...coldAdminOnly)
  @ApiQuery(bpcDecoratorOptions)
  getAllIntegrations(
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

    return this.providerService.getAllIntegrations(req, req.body, bpc);
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

    return this.providerService.getOrganizationIntegrations(req, orgId, bpc);
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
    return this.providerService.createIntegration(req, orgId, body);
  }

  @ApiOperation({
    summary: 'Create Organization Location Specific Integration',
    operationId: 'createLocationIntegration',
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiBody(IntegrationBodySchema)
  @Post('organizations/:orgId/locations/:locId/integrations')
  @HttpCode(201)
  createLocationIntegration(
    @Param('orgId') orgId: string,
    @Param('locId') locId: string,
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
    return this.providerService.createLocationIntegration(req, orgId, locId, body);
  }
}
