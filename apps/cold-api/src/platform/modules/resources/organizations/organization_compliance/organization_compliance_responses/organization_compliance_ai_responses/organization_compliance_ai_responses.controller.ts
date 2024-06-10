import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { OrganizationComplianceAiResponsesService } from './organization_compliance_ai_responses.service';
import { allRoles, HttpExceptionFilter, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { coldAdminOnly } from '../../../../_global/global.params';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { organization_compliance_ai_responses } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(OrganizationComplianceAiResponsesController.name))
@ApiTags('Organization Compliance Ai Response')
@Controller('organizations/:orgId/compliance/:name/ai-responses')
export class OrganizationComplianceAiResponsesController {
  constructor(private readonly organizationComplianceAiResponsesService: OrganizationComplianceAiResponsesService) {}

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
  @Roles(...coldAdminOnly)
  create(@Param('orgId') orgId: string, @Param('name') name: string, @Body() aiResponseData: organization_compliance_ai_responses, @Req() req: any) {
    return this.organizationComplianceAiResponsesService.createAiResponse(orgId, name, aiResponseData, req.user);
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
  @Roles(...allRoles)
  findAllAiResponses(@Param('orgId') orgId: string, @Param('name') name: string, @Req() req: any) {
    return this.organizationComplianceAiResponsesService.findAllAiResponses(orgId, name, req.user);
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
    name: 'id',
    description: 'Ai Response file Id',
    required: true,
    type: 'string',
    example: 'cairf_',
  })
  @Roles(...allRoles)
  findOneAiResponse(@Param('orgId') orgId: string, @Param('name') name: string, @Param('id') id: string, @Req() req: any) {
    return this.organizationComplianceAiResponsesService.findOneAiResponse(orgId, name, id, req.user);
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
    name: 'id',
    description: 'Ai Response file Id',
    required: true,
    type: 'string',
    example: 'cairf_',
  })
  @Roles(...coldAdminOnly)
  updateAiResponse(
    @Param('orgId') orgId: string,
    @Param('name') name: string,
    @Param('id') id: string,
    @Body() aiResponseData: organization_compliance_ai_responses,
    @Req() req: any,
  ) {
    return this.organizationComplianceAiResponsesService.updateAiResponse(orgId, name, id, aiResponseData, req.user);
  }

  @Delete()
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
  @Roles(...coldAdminOnly)
  removeAllAiResponses(@Param('orgId') orgId: string, @Param('name') name: string, @Req() req: any) {
    return this.organizationComplianceAiResponsesService.removeAllAiResponses(orgId, name, req.user);
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
    name: 'id',
    description: 'Ai Response file Id',
    required: true,
    type: 'string',
    example: 'cairf_',
  })
  @Roles(...coldAdminOnly)
  removeAiResponse(@Param('orgId') orgId: string, @Param('name') name: string, @Param('id') id: string, @Req() req: any) {
    return this.organizationComplianceAiResponsesService.removeAiResponse(orgId, name, id, req.user);
  }
}
