import { Body, Controller, Delete, Get, Param, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { OrganizationComplianceResponsesService } from './organization_compliance_responses.service';
import { coldAdminOnly, HttpExceptionFilter, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { compliance_responses } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(OrganizationComplianceResponsesController.name))
@ApiTags('Organizations', 'Compliance', 'Compliance Responses')
@ApiParam({
  name: 'orgId',
  required: true,
  type: 'string',
  example: `{{test_organization_id}}`,
})
@ApiParam({
  name: 'name',
  required: true,
  type: 'string',
  example: 'b_corp_2024',
})
@Controller('compliance/:name/organizations/:orgId')
export class OrganizationComplianceResponsesController {
  constructor(private readonly organizationComplianceResponsesService: OrganizationComplianceResponsesService) {}

  // Use PUT instead of POST since we are upserting the compliance response
  @Put('section_groups/:sgId/sections/:sId/questions/:qId/responses')
  @ApiParam({
    name: 'sgId',
    required: true,
    description: 'Section Group Id',
    type: 'string',
    example: 'csg_', // Example value
  })
  @ApiParam({
    name: 'sId',
    required: true,
    description: 'Section Id',
    type: 'string',
    example: 'cs_', // Example value
  })
  @ApiParam({
    name: 'qId',
    required: true,
    description: 'Question Id',
    type: 'string',
    example: 'cq_', // Example value
  })
  @Roles(...coldAdminOnly)
  upsertOrgComplianceResponse(
    @Param('orgId') orgId: string,
    @Param('name') name: string,
    @Param('sgId') sgId: string,
    @Param('sId') sId: string,
    @Param('qId') qId: string,
    @Body() compliance_response: compliance_responses,
    @Req() req: any,
  ) {
    return this.organizationComplianceResponsesService.upsert(orgId, name, sgId, sId, qId, compliance_response, req.user);
  }

  @Get('section_groups/:sgId/responses')
  @ApiParam({
    name: 'sgId',
    required: true,
    description: 'Section Group Id',
    type: 'string',
    example: 'csg_', // Example value
  })
  @Roles(...coldAdminOnly)
  findALlByGroupId(@Param('orgId') orgId: string, @Param('name') name: string, @Param('sgId') sgId: string, @Req() req: any) {
    return this.organizationComplianceResponsesService.findAllByGroupId(orgId, name, sgId, req.user);
  }

  @Get('section_groups/:sgId/sections/:csId/responses')
  @ApiParam({
    name: 'csgId',
    required: true,
    description: 'Section Group Id',
    type: 'string',
    example: 'csg_', // Example value
  })
  @ApiParam({
    name: 'sId',
    required: true,
    description: 'Section Id',
    type: 'string',
    example: 'cs_', // Example value
  })
  @Roles(...coldAdminOnly)
  findAllBySectionId(@Param('orgId') orgId: string, @Param('name') name: string, @Param('sgId') csgId: string, @Param('sId') csId: string, @Req() req: any) {
    return this.organizationComplianceResponsesService.findAllBySectionId(orgId, name, csgId, csId, req.user);
  }

  @Get('responses')
  @Roles(...coldAdminOnly)
  findAllComplianceResponses(@Param('orgId') orgId: string, @Param('name') name: string, @Req() req: any) {
    return this.organizationComplianceResponsesService.findAllByCompliance(orgId, name, req.user);
  }

  @Get('responses/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Compliance Response Id',
    type: 'string',
    example: 'cr_', // Example value
  })
  @Roles(...coldAdminOnly)
  findById(@Param('orgId') orgId: string, @Param('name') name: string, @Param('id') id: string) {
    return this.organizationComplianceResponsesService.findOne(+id);
  }

  @Delete('responses/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Compliance Response Id',
    type: 'string',
    example: 'cr_', // Example value
  })
  @Roles(...coldAdminOnly)
  remove(@Param('orgId') orgId: string, @Param('name') name: string, @Param('id') id: string) {
    return this.organizationComplianceResponsesService.remove(+id);
  }
}
