import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Put, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrganizationComplianceResponsesService } from './organization_compliance_responses.service';
import { allRoles, coldAdminOnly, HttpExceptionFilter, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { compliance_responses } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
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

  // Use PUT instead of POST since we are upserting the org response
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
  @Roles(...allRoles)
  upsertOrgComplianceResponse(
    @Param('name') name: string,
    @Param('sgId') sgId: string,
    @Param('sId') sId: string,
    @Param('qId') qId: string,
    @Body() compliance_response: compliance_responses,
    @Req() req: any,
  ) {
    return this.organizationComplianceResponsesService.upsert(name, sgId, sId, qId, compliance_response, req);
  }

  @Get('section_groups/responses')
  @Roles(...allRoles)
  getGroupResponses(
    @Param('name') name: string,
    @Req() req: any,
    @Query('take', new ParseIntPipe({ optional: true })) take: number = 100,
    @Query('skip', new ParseIntPipe({ optional: true })) skip: number = 0,
    @Query('responses', new ParseBoolPipe({ optional: true })) responses: boolean,
    @Query('references', new ParseBoolPipe({ optional: true })) references: boolean,
    @Query('bpc', new ParseBoolPipe({ optional: true })) bpc: boolean,
  ) {
    return this.organizationComplianceResponsesService.findAllByCompliance(name, req, {
      references,
      responses,
      take,
      skip,
      bpc,
    });
  }

  @Get('section_groups/:sgId/responses')
  @ApiParam({
    name: 'sgId',
    required: true,
    description: 'Section Group Id',
    type: 'string',
    example: 'csg_', // Example value
  })
  @Roles(...allRoles)
  getResponsesByGroup(
    @Param('name') name: string,
    @Param('sgId') sgId: string,
    @Req() req: any,
    @Query('take', new ParseIntPipe({ optional: true })) take: number = 100,
    @Query('skip', new ParseIntPipe({ optional: true })) skip: number = 0,
    @Query('references', new ParseBoolPipe({ optional: true })) references: boolean,
    @Query('responses', new ParseBoolPipe({ optional: true })) responses: boolean,
  ) {
    return this.organizationComplianceResponsesService.findAllByGroupId(name, sgId, req, {
      references,
      responses,
      take,
      skip,
    });
  }

  @Get('section_groups/:sgId/sections/:sId/responses')
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
  @Roles(...allRoles)
  findQuestionsBySectionId(
    @Param('name') name: string,
    @Param('sgId') sgId: string,
    @Param('sId') sId: string,
    @Req() req: any,
    @Query('take', new ParseIntPipe({ optional: true })) take: number = 100,
    @Query('skip', new ParseIntPipe({ optional: true })) skip: number = 0,
    @Query('responses', new ParseBoolPipe({ optional: true })) responses: boolean = true,
  ) {
    return this.organizationComplianceResponsesService.getQuestionsBySectionId(name, sgId, sId, req, {
      responses,
      take,
      skip,
    });
  }

  @Get('section_groups/:sgId/sections/:sId/questions/:qId/responses')
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
    example: 'cs_', // Example value
  })
  @Roles(...allRoles)
  getResponseDetailsById(
    @Param('name') name: string,
    @Param('sgId') sgId: string,
    @Param('sId') sId: string,
    @Param('qId') qId: string,
    @Req() req: any,
    @Query('responses', new ParseBoolPipe({ optional: true })) responses: boolean = true,
    @Query('references', new ParseBoolPipe({ optional: true })) references: boolean = true,
  ) {
    return this.organizationComplianceResponsesService.getQuestionResponseById(name, sgId, sId, qId, req, { responses, references });
  }

  @Delete('section_groups/:sgId/sections/:sId/questions/:qId/responses')
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
    example: 'cs_', // Example value
  })
  @Roles(...allRoles)
  deleteQuestionResponseByType(
    @Param('name') name: string,
    @Param('sgId') sgId: string,
    @Param('sId') sId: string,
    @Param('qId') qId: string,
    @Req() req: any,
    @Query('type') type: 'ai' | 'org' | 'all',
  ) {
    return this.organizationComplianceResponsesService.deleteReponseByType(name, sgId, sId, qId, req, type);
  }

  @Get('responses')
  @Roles(...allRoles)
  findAllComplianceResponses(@Param('name') name: string, @Req() req: any, @Query('take') take: number, @Query('skip') skip: number, @Query('bpc') bpc: boolean) {
    return this.organizationComplianceResponsesService.findAllByCompliance(name, req, { take, skip, bpc });
  }

  //@UseInterceptors(ColdCacheInterceptor)
  //@CacheTTL(50)
  @Get('responses/counts')
  @Roles(...allRoles)
  async getComplianceResponsesCounts(@Param('name') name: string, @Req() req: any, @Query('bpc') bpc: boolean) {
    const response = await this.organizationComplianceResponsesService.findAllByCompliance(name, req, { onlyCounts: true, bpc });
    // return response.counts;
    return response;
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
  findById(@Param('name') name: string, @Param('id') id: number, @Req() req: any) {
    return this.organizationComplianceResponsesService.findOne(name, +id, req);
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
