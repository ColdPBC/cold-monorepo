import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UseFilters,
  Req
} from '@nestjs/common';
import {
  JwtAuthGuard,
  RolesGuard,
  HttpExceptionFilter,
  IRequest, OrgUserInterceptor,
} from '@coldpbc/nest';
import { YieldEstimationService } from './yield-estimation.service';
import { ApiOAuth2 } from '@nestjs/swagger';
import {
  YieldEstimationRequest,
  YieldEstimationResponse
} from '../schemas';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@ApiOAuth2(['openid', 'email', 'profile'])
@Controller('yield-estimation')
@UseFilters(new HttpExceptionFilter(YieldEstimationController.name))
export class YieldEstimationController {
  constructor(
    private readonly yieldEstimationService: YieldEstimationService,
  ) {}

  @Post()
  async estimateYields(
    @Body() request: YieldEstimationRequest,
    @Req() req: IRequest,
  ): Promise<YieldEstimationResponse> {
    return this.yieldEstimationService.estimateYields(request, req.user);
  }
}
