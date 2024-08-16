import { Controller, Get, Param, Req, UseFilters, UseGuards } from '@nestjs/common';
import { BaseWorker, HttpExceptionFilter, IAuthenticatedUser, IRequest, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { Span } from 'nestjs-ddtrace';
import { ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ServiceDefinitionsService } from './service_definitions.service';
import { allRoles, bpcDecoratorOptions, nameDecoratorOptions } from '../_global/global.params';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid'])
@ApiTags('Service Definitions')
@UseFilters(new HttpExceptionFilter(ServiceDefinitionsController.name))
@Controller('service_definitions')
export class ServiceDefinitionsController extends BaseWorker {
  constructor(readonly serviceDefinitions: ServiceDefinitionsService) {
    super(ServiceDefinitionsService.name);
  }

  @Get(':name')
  @ApiOperation({
    summary: 'Get Service Definition By Name',
    operationId: 'getServiceDefinition',
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(nameDecoratorOptions)
  @Roles(...allRoles)
  async getServiceDefinition(
    @Req()
    req: IRequest,
    @Param('name') name: string,
  ) {
    return await this.serviceDefinitions.getService(req.user, name);
  }

  @Get()
  @Roles(...allRoles)
  @ApiOperation({
    summary: 'Get All Service Definitions',
    operationId: 'getAllServiceDefinitions',
  })
  @ApiQuery(bpcDecoratorOptions)
  @Roles(...allRoles)
  async getAllServiceDefinitions(@Req() req: { body: any; headers: any; query: any; user: IAuthenticatedUser }) {
    return await this.serviceDefinitions.getServices(req.user);
  }
}
