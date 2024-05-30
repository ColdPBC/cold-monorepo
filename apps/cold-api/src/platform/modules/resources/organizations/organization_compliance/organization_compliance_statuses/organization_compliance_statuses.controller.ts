import { Body, Controller, Get, Param, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { OrganizationComplianceStatusesService } from './organization_compliance_statuses.service';
import { survey_status_types } from '@prisma/client';
import { HttpExceptionFilter, JwtAuthGuard, Roles, RolesGuard, allRoles } from '@coldpbc/nest';
import { ApiTags } from '@nestjs/swagger';
import { coldAdminOnly } from '../../../_global/global.params';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(OrganizationComplianceStatusesController.name))
@ApiTags('Organization Compliance Status')
@Controller('organizations/:orgId/compliance/:name/statuses')
export class OrganizationComplianceStatusesController {
  constructor(private readonly organizationComplianceStatusesService: OrganizationComplianceStatusesService) {}

  @Post()
  @Roles(...coldAdminOnly)
  create(@Param('orgId') orgId: string, @Param('name') name: string, @Body() statusData: { type: survey_status_types }, @Req() req: any) {
    return this.organizationComplianceStatusesService.create(orgId, name, statusData.type, req.user);
  }

  @Get()
  @Roles(...allRoles)
  findAll(@Param('orgId') orgId: string, @Param('name') name: string, @Req() req: any) {
    return this.organizationComplianceStatusesService.findByOrgComplianceName(orgId, name, req.user);
  }

  @Get(':statusId')
  @Roles(...allRoles)
  findOne(@Param('orgId') orgId: string, @Param('name') name: string, @Param('statusId') statusId: string, @Req() req: any) {
    return this.organizationComplianceStatusesService.findOne(orgId, name, statusId, req.user);
  }
}
