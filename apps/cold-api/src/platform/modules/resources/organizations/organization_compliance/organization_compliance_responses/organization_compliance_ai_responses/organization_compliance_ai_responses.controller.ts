import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrganizationComplianceAiResponsesService } from './organization_compliance_ai_responses.service';
import { allRoles, HttpExceptionFilter, IRequest, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';
import { coldAdminOnly } from '../../../../_global/global.params';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { organization_compliance_ai_responses } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@UseFilters(new HttpExceptionFilter(OrganizationComplianceAiResponsesController.name))
@ApiTags('Organization Compliance Ai Response')
@Controller('compliance/:name/organizations/:orgId/responses/ai')
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
  create(@Param('orgId') orgId: string, @Param('name') name: string, @Body() aiResponseData: organization_compliance_ai_responses, @Req() req: IRequest) {
    return this.organizationComplianceAiResponsesService.createAiResponse(req.organization, name, aiResponseData, req.user);
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
  findAllAiResponses(@Param('orgId') orgId: string, @Param('name') name: string, @Req() req: IRequest) {
    return this.organizationComplianceAiResponsesService.findAllAiResponses(req.organization, name, req.user);
  }

  @Get(':aiId')
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
  findOneAiResponse(@Param('orgId') orgId: string, @Param('name') name: string, @Param('aiId') id: string, @Req() req: IRequest) {
    return this.organizationComplianceAiResponsesService.findOneAiResponse(req.organization, name, id, req.user);
  }

  @Patch(':aiId')
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
  updateAiResponse(
    @Param('orgId') orgId: string,
    @Param('name') name: string,
    @Param('aiId') id: string,
    @Body() aiResponseData: organization_compliance_ai_responses,
    @Req() req: IRequest,
  ) {
    return this.organizationComplianceAiResponsesService.updateAiResponse(req.organization, name, id, aiResponseData, req.user);
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
  removeAllAiResponses(@Param('orgId') orgId: string, @Param('name') name: string, @Req() req: IRequest) {
    return this.organizationComplianceAiResponsesService.removeAllAiResponses(req.organization, name, req.user);
  }

  @Delete(':aiId')
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
  removeAiResponse(@Param('orgId') orgId: string, @Param('name') name: string, @Param('aiId') id: string, @Req() req: IRequest) {
    return this.organizationComplianceAiResponsesService.removeAiResponse(req.organization, name, id, req.user);
  }
}
