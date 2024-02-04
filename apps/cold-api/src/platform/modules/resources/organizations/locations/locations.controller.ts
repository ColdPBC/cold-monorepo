import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BaseWorker, JwtAuthGuard, RolesGuard } from '@coldpbc/nest';
import { ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { bpcDecoratorOptions, orgIdDecoratorOptions } from '../../_global/global.params';
import { LocationBodyExample } from './examples/location_example';

@ApiTags('Organizations : Locations')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid'])
@Controller('organizations')
export class LocationsController extends BaseWorker {
  constructor(private readonly locationService: LocationsService) {
    super(LocationsController.name);
  }

  @Get('/:orgId/locations')
  getLocations(@Req() req: any, @Param('orgId') orgId: string) {
    return this.locationService.getOrganizationLocations(req, orgId);
  }

  @Post('/:orgId/locations')
  @ApiOperation({
    summary: 'Create Organization Location',
    operationId: 'createLocation',
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiBody(LocationBodyExample)
  createLocation(@Req() req: any, @Param('orgId') orgId: string, @Body() body: any) {
    return this.locationService.createOrganizationLocation(req, orgId, body);
  }
}
