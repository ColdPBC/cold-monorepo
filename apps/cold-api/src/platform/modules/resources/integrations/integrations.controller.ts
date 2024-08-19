import { Controller, Get, ParseBoolPipe, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { BaseWorker, HttpExceptionFilter, IRequest, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { bpcDecoratorOptions, coldAdminOnly } from '../_global/global.params';

import { IntegrationsService } from './integrations.service';

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
    req: IRequest,
    @Query('bpc', new ParseBoolPipe({ optional: true })) bpc: boolean,
  ) {
    if (!bpc) bpc = false;

    return this.providerService.getAllIntegrations(req, req.body, bpc);
  }
}
