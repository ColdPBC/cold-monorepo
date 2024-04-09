import { Body, Controller, Get, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { BaseWorker, JwtAuthGuard, OrgUserInterceptor, RolesGuard } from '@coldpbc/nest';
import { ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FacilitiesService } from './facilities.service';
import { bpcDecoratorOptions, orgIdDecoratorOptions } from '../../_global/global.params';
import { FacilityBodyExample } from './examples/facility_example';

@ApiTags('Organizations : Facilities')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@ApiOAuth2(['openid'])
@Controller('organizations')
export class FacilitiesController extends BaseWorker {
  constructor(private readonly facilitiesService: FacilitiesService) {
    super(FacilitiesController.name);
  }

  @Get('/:orgId/facilities')
  getFacilities(@Req() req: any, @Param('orgId') orgId: string) {
    return this.facilitiesService.getOrganizationFacilities(req, orgId);
  }

  @Post('/:orgId/facilities')
  @ApiOperation({
    summary: 'Create Organization Facility',
    operationId: 'createFacility',
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiBody(FacilityBodyExample)
  createFacility(@Req() req: any, @Param('orgId') orgId: string, @Body() body: any) {
    return this.facilitiesService.createOrganizationFacility(req, orgId, body);
  }
}
