import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrganizationComplianceAiResponseFilesService } from './organization_compliance_ai_response_files.service';
import { HttpExceptionFilter, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';
import { allRoles, coldAdminOnly } from '../../../../_global/global.params';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@UseFilters(new HttpExceptionFilter(OrganizationComplianceAiResponseFilesController.name))
@ApiTags('Organization Compliance Ai Response Files')
@Controller('compliance/:name/organizations/:orgId/responses/ai/:aiId/files')
export class OrganizationComplianceAiResponseFilesController {
  constructor(private readonly organizationComplianceAiResponseFilesService: OrganizationComplianceAiResponseFilesService) {}

  @Post()
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'aiId',
    description: 'Ai Response Id',
    required: true,
    type: 'string',
    example: 'cair_',
  })
  @Roles(...coldAdminOnly)
  create(@Param('orgId') orgId: string, @Param('name') complianceName: string, @Param('aiId') responseId: string, @Body() aiResponseFileData: any, @Req() req: any) {
    return this.organizationComplianceAiResponseFilesService.create(req.org, complianceName, responseId, aiResponseFileData, req.user);
  }

  @Get()
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'aiId',
    description: 'Ai Response Id',
    required: true,
    type: 'string',
    example: 'cair_',
  })
  @Roles(...allRoles)
  findAll(@Param('orgId') orgId: string, @Param('name') complianceName: string, @Param('aiId') responseId: string, @Req() req: any) {
    return this.organizationComplianceAiResponseFilesService.findAll(req.org, complianceName, responseId, req.user);
  }

  @Get(':id')
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'aiId',
    description: 'Ai Response Id',
    required: true,
    type: 'string',
    example: 'cair_',
  })
  @ApiParam({
    name: 'id',
    description: 'Ai Response file Id',
    required: true,
    type: 'string',
    example: 'cairf_',
  })
  @Roles(...allRoles)
  findOne(@Param('orgId') orgId: string, @Param('name') complianceName: string, @Param('aiId') responseId: string, @Param('id') id: string, @Req() req: any) {
    return this.organizationComplianceAiResponseFilesService.findOne(req.org, complianceName, responseId, id, req.user);
  }

  @Patch(':id')
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'aiId',
    description: 'Ai Response Id',
    required: true,
    type: 'string',
    example: 'cair_',
  })
  @ApiParam({
    name: 'id',
    description: 'Ai Response file Id',
    required: true,
    type: 'string',
    example: 'cairf_',
  })
  @Roles(...coldAdminOnly)
  update(
    @Param('orgId') orgId: string,
    @Param('name') complianceName: string,
    @Param('aiId') responseId: string,
    @Param('id') id: string,
    @Body() aiResponseFileData: any,
    @Req() req: any,
  ) {
    return this.organizationComplianceAiResponseFilesService.update(req.org, complianceName, responseId, id, aiResponseFileData, req.user);
  }

  @Delete(':id')
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'aiId',
    description: 'Ai Response Id',
    required: true,
    type: 'string',
    example: 'cair_',
  })
  @ApiParam({
    name: 'id',
    description: 'Ai Response file Id',
    required: true,
    type: 'string',
    example: 'cairf_',
  })
  @Roles(...coldAdminOnly)
  remove(@Param('orgId') orgId: string, @Param('name') complianceName: string, @Param('aiId') responseId: string, @Param('id') id: string, @Req() req: any) {
    return this.organizationComplianceAiResponseFilesService.remove(req.org, complianceName, responseId, id, req.user);
  }
}
