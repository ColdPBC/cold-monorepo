import { Body, Controller, Delete, Get, Patch, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { allRoles, BaseWorker, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';
import { ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FacilitiesService } from './facilities.service';
import { bpcDecoratorOptions, orgIdDecoratorOptions } from '../../_global/global.params';
import { FacilityBodyExample } from './examples/facility_example';

@ApiTags('Organizations : Facilities')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@ApiOAuth2(['openid'])
@Controller('organizations/:orgId/facilities')
export class FacilitiesController extends BaseWorker {
  constructor(private readonly facilitiesService: FacilitiesService) {
    super(FacilitiesController.name);
  }

  @Get()
  @Roles(...allRoles)
  getFacilities(@Req() req: any, @Param('orgId') orgId: string) {
    return this.facilitiesService.getOrganizationFacilities(req, orgId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create Organization Facility',
    operationId: 'createFacility',
  })
  @Roles(...allRoles)
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiBody(FacilityBodyExample)
  createFacility(@Req() req: any, @Param('orgId') orgId: string, @Body() body: any) {
    return this.facilitiesService.createOrganizationFacility(req, orgId, body);
  }

  @Delete(':facilityId')
  @Roles(...allRoles)
  @ApiOperation({
    summary: 'Delete Organization Facility',
    operationId: 'deleteFacility',
  })
  deleteFacility(@Req() req: any, @Param('orgId') orgId: string, @Param('facilityId') facilityId: string) {
    return this.facilitiesService.deleteOrganizationFacility(req, facilityId);
  }

  @Patch(':facilityId')
  @Roles(...allRoles)
  @ApiOperation({
    summary: 'Delete Organization Facility',
    operationId: 'deleteFacility',
  })
  updateFacility(@Req() req: any, @Param('orgId') orgId: string, @Param('facilityId') facilityId: string, @Body() body: any) {
    return this.facilitiesService.update(req, facilityId, body);
  }
}
