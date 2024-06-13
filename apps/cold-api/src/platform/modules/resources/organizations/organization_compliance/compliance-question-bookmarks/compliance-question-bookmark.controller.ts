import { Body, Controller, Delete, Get, Param, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ComplianceQuestionBookmarkService } from './compliance-question-bookmarks.service';
import { organization_compliance_question_bookmarks } from '@prisma/client';
import { allRoles, HttpExceptionFilter, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(ComplianceQuestionBookmarkController.name))
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
@Controller('compliance/:name/organizations/:orgId/questions/:qId/bookmarks')
export class ComplianceQuestionBookmarkController {
  constructor(private readonly organizationComplianceBookmarksService: ComplianceQuestionBookmarkService) {}

  @Post()
  @Roles(...allRoles)
  create(@Param('name') name: string, @Param('qId') qId: string, @Body() bookMark: Partial<organization_compliance_question_bookmarks>, @Req() req: any) {
    return this.organizationComplianceBookmarksService.upsert(name, qId, bookMark, req);
  }

  @Get('user')
  @Roles(...allRoles)
  findAll(@Param('name') name: string, @Req() req: any) {
    return this.organizationComplianceBookmarksService.findAll(name, req);
  }

  @Get(':id')
  @Roles(...allRoles)
  findOne(@Param('name') name: string, @Param('id') id: string, @Req() req: any) {
    return this.organizationComplianceBookmarksService.findOne(name, id, req);
  }

  @Delete(':id')
  @Roles(...allRoles)
  remove(@Param('name') name: string, @Param('id') id: string, @Req() req: any) {
    return this.organizationComplianceBookmarksService.remove(name, id, req);
  }
}
