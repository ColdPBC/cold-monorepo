import { Body, Controller, Delete, Get, Param, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ComplianceQuestionBookmarkService } from './compliance-question-bookmarks.service';
import { organization_compliance_question_bookmarks } from '@prisma/client';
import { allRoles, coldAdminOnly, HttpExceptionFilter, IRequest, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(ComplianceQuestionBookmarkController.name))
@ApiTags('Compliance', 'Organization', 'Question', 'Bookmarks')
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
export class ComplianceQuestionBookmarkController {
  constructor(private readonly organizationComplianceBookmarksService: ComplianceQuestionBookmarkService) {}

  @Post(`questions/:qId/bookmarks`)
  @Roles(...allRoles)
  createBookmark(@Param('name') name: string, @Param('qId') qId: string, @Body() bookMark: Partial<organization_compliance_question_bookmarks>, @Req() req: IRequest) {
    return this.organizationComplianceBookmarksService.upsert(name, qId, bookMark, req);
  }

  @Get('bookmarks')
  @Roles(...allRoles)
  getBookmarks(@Param('name') name: string, @Req() req: IRequest) {
    return this.organizationComplianceBookmarksService.findAllByEmail(name, req);
  }

  @Get('questions/:qId/bookmarks')
  @ApiParam({
    name: 'qId',
    required: true,
    description: 'Question Id',
    type: 'string',
    example: 'cq_', // Example value
  })
  @Roles(...allRoles)
  getBookmarkByQuestionId(@Param('name') name: string, @Param('qId') id: string, @Req() req: IRequest) {
    return this.organizationComplianceBookmarksService.findByQuestionIdAndEmail(name, id, req);
  }

  @Get('bookmarks/all')
  @Roles(...coldAdminOnly)
  getAllBookmarkByQuestionId(@Param('name') name: string, @Req() req: IRequest) {
    return this.organizationComplianceBookmarksService.findAllOrgBookmarks(name, req);
  }

  @Delete('questions/:qId/bookmarks')
  @ApiParam({
    name: 'qId',
    required: true,
    description: 'Question Id',
    type: 'string',
    example: 'cq_', // Example value
  })
  @Roles(...allRoles)
  deleteBookmark(@Param('qId') qId: string, @Req() req: IRequest) {
    return this.organizationComplianceBookmarksService.remove(qId, req);
  }
}
