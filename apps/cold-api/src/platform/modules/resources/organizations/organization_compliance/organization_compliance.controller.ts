import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { OrganizationComplianceService } from './organization_compliance.service';
import { coldAdminOnly, allRoles, HttpExceptionFilter, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { ApiTags } from '@nestjs/swagger';
import { organization_compliance } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(OrganizationComplianceController.name))
@ApiTags('Compliance')
@Controller('compliance/:name/organizations')
export class OrganizationComplianceController {
  constructor(readonly organizationComplianceService: OrganizationComplianceService) {}

  @Get()
  @Roles(...coldAdminOnly)
  findAll(@Param('name') name: string, @Req() req: any) {
    return this.organizationComplianceService.findAll(name, req);
  }

  @Post(':orgId')
  @Roles(...allRoles)
  create(@Param('name') name: string, @Param('orgId') orgId: string, @Body() orgComplianceData: organization_compliance, @Req() req: any) {
    return this.organizationComplianceService.create(name, orgComplianceData, req);
  }

  @Put(':orgId')
  @Roles(...allRoles)
  activateAi(@Param('name') name: string, @Param('orgId') orgId: string, @Req() req: any) {
    return this.organizationComplianceService.activateAi(orgId, name, req);
  }

  @Get(':orgId')
  @Roles(...coldAdminOnly)
  findOne(@Param('name') name: string, @Param('orgId') orgId: string, @Req() req: any) {
    return this.organizationComplianceService.findOneByName(name, req);
  }

  @Patch(':orgId')
  @Roles(...coldAdminOnly)
  update(@Param('name') name: string, @Param('orgId') orgId: string, @Body() orgComplianceData: organization_compliance, @Req() req: any) {
    return this.organizationComplianceService.update(name, orgComplianceData, req);
  }

  @Delete(':orgId')
  @Roles(...coldAdminOnly)
  remove(@Param('name') name: string, @Param('orgId') orgId: string, @Req() req: any) {
    return this.organizationComplianceService.remove(name, req);
  }
}
