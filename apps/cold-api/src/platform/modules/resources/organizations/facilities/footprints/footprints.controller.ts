import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { FootprintsService } from './footprints.service';
import { FacilityFootprint } from './entities/footprint.entity';
import { allRoles, coldAdminOnly, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
export class FootprintsController {
  constructor(private readonly footprintsService: FootprintsService) {}

  @Get('footprints')
  @Roles(...coldAdminOnly)
  findAll() {
    return this.footprintsService.findAll();
  }

  @Post('organizations/:orgId/footprints')
  @Roles(...coldAdminOnly)
  create(
    @Param('orgId') orgId: string,
    @Body()
    createFootprintDto: Array<{
      facility_id: string;
      facility_name: string;
      periods: Array<FacilityFootprint>;
    }>,
  ) {
    return this.footprintsService.create(orgId, createFootprintDto);
  }

  @Get('organizations/:orgId/footprints')
  @Roles(...allRoles)
  findAllByOrg(@Param('orgId') orgId: string) {
    return this.footprintsService.findAllByOrg(orgId);
  }

  @Get('organizations/:orgId/facilities/:facId/footprints')
  @Roles(...allRoles)
  findAllByOrgFacility(@Param('orgId') orgId: string, @Param('facId') facId: string) {
    return this.footprintsService.findAllByOrgFacility(orgId, facId);
  }

  @Get('organizations/:orgId/facilities/:facId/footprints/:id')
  @Roles(...allRoles)
  findOne(@Param('orgId') orgId: string, @Param('facId') facId: string, @Param('id') id: string) {
    return this.footprintsService.findOne(orgId, facId, id);
  }

  @Delete('organizations/:orgId/facilities/:facId/footprints/:id')
  @Roles(...coldAdminOnly)
  remove(@Param('orgId') orgId: string, @Param('facId') facId: string, @Param('id') id: string) {
    return this.footprintsService.remove(orgId, facId, id);
  }
}
