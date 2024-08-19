import { Body, Controller, Get, Param, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { OrganizationComplianceStatusesService } from './organization_compliance_statuses.service';
import { survey_status_types } from '@prisma/client';
import { HttpExceptionFilter, JwtAuthGuard, Roles, RolesGuard, allRoles, IRequest } from '@coldpbc/nest';
import { ApiTags } from '@nestjs/swagger';
import { coldAdminOnly } from '../../../_global/global.params';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(OrganizationComplianceStatusesController.name))
@ApiTags('Compliance', 'Organizations')
@Controller('compliance/:name/organizations/:orgId/statuses')
export class OrganizationComplianceStatusesController {
  constructor(private readonly organizationComplianceStatusesService: OrganizationComplianceStatusesService) {}

  @Post()
  @Roles(...coldAdminOnly)
  create(@Param('name') name: string, @Param('orgId') orgId: string, @Body() statusData: { type: survey_status_types }, @Req() req: IRequest) {
    return this.organizationComplianceStatusesService.create(orgId, name, statusData.type, req);
  }

  @Get()
  @Roles(...allRoles)
  findAll(@Param('name') name: string, @Param('orgId') orgId: string, @Req() req: IRequest) {
    return this.organizationComplianceStatusesService.findByOrgComplianceName(name, req);
  }

  @Get(':statusId')
  @Roles(...allRoles)
  findOne(@Param('name') name: string, @Param('orgId') orgId: string, @Param('statusId') statusId: string, @Req() req: IRequest) {
    return this.organizationComplianceStatusesService.findOne(name, statusId, req);
  }
}
