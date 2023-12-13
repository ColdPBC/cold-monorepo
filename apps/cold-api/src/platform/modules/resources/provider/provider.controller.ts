import { Controller, ParseBoolPipe, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { AuthenticatedUser, BaseWorker, HttpExceptionFilter, JwtAuthGuard, RolesGuard } from '@coldpbc/nest';
import { bpcDecoratorOptions } from '../_global/global.params';

import { ProviderService } from './provider.service';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid'])
@ApiTags('News')
@UseFilters(new HttpExceptionFilter(ProviderController.name))
@Controller('provider')
export class ProviderController extends BaseWorker {
  constructor(private readonly providerService: ProviderService) {
    super(ProviderService.name);
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
