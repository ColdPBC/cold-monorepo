import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { OrganizationComplianceAiResponseFilesService } from './organization_compliance_ai_response_files.service';
import { HttpExceptionFilter, JwtAuthGuard, Roles, RolesGuard, testOrgIdExample } from '@coldpbc/nest';
import { allRoles, coldAdminOnly } from '../../../../_global/global.params';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(OrganizationComplianceAiResponseFilesController.name))
@ApiTags('Organization Compliance Ai Response Files')
@Controller('organizations/:orgId/compliance/:name/ai-responses/:airId/files')
export class OrganizationComplianceAiResponseFilesController {
  constructor(private readonly organizationComplianceAiResponseFilesService: OrganizationComplianceAiResponseFilesService) {}

  @Post()
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: testOrgIdExample,
  })
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'airId',
    description: 'Ai Response Id',
    required: true,
    type: 'string',
    example: 'cair_',
  })
  @Roles(...coldAdminOnly)
  create(@Param('orgId') orgId: string, @Param('name') complianceName: string, @Param('airId') responseId: string, @Body() aiResponseFileData: any, @Req() req: any) {
    return this.organizationComplianceAiResponseFilesService.create(orgId, complianceName, responseId, aiResponseFileData, req.user);
  }

  @Get()
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: testOrgIdExample,
  })
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'airId',
    description: 'Ai Response Id',
    required: true,
    type: 'string',
    example: 'cair_',
  })
  @Roles(...allRoles)
  findAll(@Param('orgId') orgId: string, @Param('name') complianceName: string, @Param('airId') responseId: string, @Req() req: any) {
    return this.organizationComplianceAiResponseFilesService.findAll(orgId, complianceName, responseId, req.user);
  }

  @Get(':id')
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: testOrgIdExample,
  })
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'airId',
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
  findOne(@Param('orgId') orgId: string, @Param('name') complianceName: string, @Param('airId') responseId: string, @Param('id') id: string, @Req() req: any) {
    return this.organizationComplianceAiResponseFilesService.findOne(orgId, complianceName, responseId, id, req.user);
  }

  @Patch(':id')
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: testOrgIdExample,
  })
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'airId',
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
    @Param('airId') responseId: string,
    @Param('id') id: string,
    @Body() aiResponseFileData: any,
    @Req() req: any,
  ) {
    return this.organizationComplianceAiResponseFilesService.update(orgId, complianceName, responseId, id, aiResponseFileData, req.user);
  }

  @Delete(':id')
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: testOrgIdExample,
  })
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'airId',
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
  remove(@Param('orgId') orgId: string, @Param('name') complianceName: string, @Param('airId') responseId: string, @Param('id') id: string, @Req() req: any) {
    return this.organizationComplianceAiResponseFilesService.remove(orgId, complianceName, responseId, id, req.user);
  }
}
