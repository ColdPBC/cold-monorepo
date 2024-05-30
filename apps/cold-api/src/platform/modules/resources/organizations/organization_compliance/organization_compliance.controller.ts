import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { OrganizationComplianceService } from './organization_compliance.service';
import { coldAdminOnly, allRoles, HttpExceptionFilter, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { ApiTags } from '@nestjs/swagger';
import { organization_compliance } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(OrganizationComplianceController.name))
@ApiTags('Organization Compliance')
@Controller('organizations/:orgId/compliance/sets')
export class OrganizationComplianceController {
  constructor(readonly organizationComplianceService: OrganizationComplianceService) {}

  @Post(':name')
  @Roles(...coldAdminOnly)
  create(@Param('orgId') orgId: string, @Param('name') name: string, @Body() orgComplianceData: organization_compliance, @Req() req: any) {
    return this.organizationComplianceService.create(orgId, name, orgComplianceData, req);
  }

  @Get()
  @Roles(...allRoles)
  findAll(@Param('orgId') orgId: string, @Req() req: any) {
    return this.organizationComplianceService.findAll(orgId, req);
  }

  @Get(':name')
  @Roles(...allRoles)
  findOne(@Param('orgId') orgId: string, @Param('name') name: string, @Req() req: any) {
    return this.organizationComplianceService.findOneByName(orgId, name, req);
  }

  @Patch(':name')
  @Roles(...coldAdminOnly)
  update(@Param('orgId') orgId: string, @Param('name') name: string, @Body() orgComplianceData: organization_compliance, @Req() req: any) {
    return this.organizationComplianceService.update(orgId, name, orgComplianceData, req);
  }

  @Delete(':name')
  @Roles(...coldAdminOnly)
  remove(@Param('orgId') orgId: string, @Param('name') name: string, @Req() req: any) {
    return this.organizationComplianceService.remove(orgId, name, req);
  }
}
