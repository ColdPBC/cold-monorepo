import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { FootprintsService } from './footprints.service';
import { FacilityFootprint } from './entities/footprint.entity';
import { allRoles, coldAdminOnly, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';

@Controller('organizations/:orgId/facilities/:facId')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
export class FootprintsController {
  constructor(private readonly footprintsService: FootprintsService) {}

  @Get('footprints')
  @Roles(...coldAdminOnly)
  findAll() {
    return this.footprintsService.findAll();
  }

  @Post('footprints')
  @Roles(...coldAdminOnly)
  create(
    @Param('orgId') orgId: string,
    @Param('facId') facId: string,
    @Body()
    createFootprintDto: Array<{
      facility_id: string;
      facility_name: string;
      periods: Array<FacilityFootprint>;
    }>,
  ) {
    createFootprintDto.forEach(footprint => {
      footprint.facility_id = facId;
    });
    return this.footprintsService.create(orgId, createFootprintDto);
  }

  @Get('footprints')
  @Roles(...allRoles)
  findAllByOrgFacility(@Param('orgId') orgId: string, @Param('facId') facId: string) {
    return this.footprintsService.findAllByOrgFacility(orgId, facId);
  }

  @Get('footprints/:id')
  @Roles(...allRoles)
  findOne(@Param('orgId') orgId: string, @Param('facId') facId: string, @Param('id') id: string) {
    return this.footprintsService.findOne(orgId, facId, id);
  }

  @Delete('footprints/:id')
  @Roles(...coldAdminOnly)
  remove(@Param('orgId') orgId: string, @Param('facId') facId: string, @Param('id') id: string) {
    return this.footprintsService.remove(orgId, facId, id);
  }
}
