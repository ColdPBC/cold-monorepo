import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BaseWorker, JwtAuthGuard, RolesGuard } from '@coldpbc/nest';
import { ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OrganizationLocationsService } from './organization_locations.service';
import { bpcDecoratorOptions, orgIdDecoratorOptions } from '../_global/global.params';
import { LocationBodyExample } from './examples/location_example';

@ApiTags('Organizations : Locations')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid'])
@Controller('organizations')
export class OrganizationLocationsController extends BaseWorker {
  constructor(private readonly locationService: OrganizationLocationsService) {
    super(OrganizationLocationsController.name);
  }

  @Get('/:orgId/locations')
  getOrganizationLocations(@Req() req: any, @Param('orgId') orgId: string) {
    return this.locationService.getOrganizationLocations(req.user, orgId);
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
    return this.locationService.createOrganizationLocation(req.user, orgId, body);
  }
}
