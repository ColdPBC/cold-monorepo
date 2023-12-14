import { Controller, Get, ParseBoolPipe, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { AuthenticatedUser, BaseWorker, HttpExceptionFilter, JwtAuthGuard, RolesGuard } from '@coldpbc/nest';
import { bpcDecoratorOptions } from '../_global/global.params';

import { IntegrationsService } from './integrations.service';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid'])
@ApiTags('Integrations')
@UseFilters(new HttpExceptionFilter(IntegrationsController.name))
@Controller('integrations')
export class IntegrationsController extends BaseWorker {
  constructor(private readonly providerService: IntegrationsService) {
    super(IntegrationsService.name);
  }

  @ApiOperation({
    summary: 'Get Integrations',
    operationId: 'GetAllIntegrations',
  })
  @Get()
  @ApiQuery(bpcDecoratorOptions)
  getAllIntegrations(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Query('bpc', new ParseBoolPipe({ optional: true })) bpc: boolean,
  ) {
    if (!bpc) bpc = false;

    return this.providerService.requestProviderDataRPC(req.user, req.body, bpc);
  }

  @ApiOperation({
    summary: 'Get Data From Provider',
    operationId: 'GetDataFromProvider',
  })
  @Post('rpc')
  @ApiQuery(bpcDecoratorOptions)
  requestFromProvider(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Query('bpc', new ParseBoolPipe({ optional: true })) bpc: boolean,
  ) {
    if (!bpc) bpc = false;

    return this.providerService.requestProviderDataRPC(req.user, req.body, bpc);
  }
}
