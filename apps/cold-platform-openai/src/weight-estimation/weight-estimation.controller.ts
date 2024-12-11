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
import { WeightEstimationService } from './weight-estimation.service';
import { ApiOAuth2 } from '@nestjs/swagger';
import {
  WeightEstimationRequest,
  WeightEstimationResponse
} from '../schemas';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@ApiOAuth2(['openid', 'email', 'profile'])
@Controller('weight-estimation')
@UseFilters(new HttpExceptionFilter(WeightEstimationController.name))
export class WeightEstimationController {
  constructor(
    private readonly weightEstimationService: WeightEstimationService,
  ) {}

  @Post()
  async estimateWeights(
    @Body() request: WeightEstimationRequest,
    @Req() req: IRequest,
  ): Promise<WeightEstimationResponse> {
    return this.weightEstimationService.estimateWeights(request, req.user);
  }
}
