import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { OrganizationComplianceNotesService } from './organization_compliance_notes.service';
import { HttpExceptionFilter, IRequest, JwtAuthGuard, RolesGuard } from '@coldpbc/nest';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(OrganizationComplianceNotesController.name))
@ApiTags('Compliance', 'Organization', 'Question', 'Notes')
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
  name: 'qId',
  required: true,
  description: 'Question Id',
  type: 'string',
  example: 'cq_', // Example value
})
@Controller('compliance/:name/organizations/:orgId')
export class OrganizationComplianceNotesController {
  constructor(private readonly organizationComplianceNotesService: OrganizationComplianceNotesService) {}

  @Get('/questions/:qId/notes')
  findAllByQuestion(@Req() req: IRequest, @Param('name') name: string, @Param('qId') qId: string) {
    return this.organizationComplianceNotesService.findAll(name, qId, req);
  }

  @Post('/questions/:qId/notes')
  create(@Req() req: IRequest, @Param('name') name: string, @Param('qId') qId: string, @Body() body: { note: string }) {
    return this.organizationComplianceNotesService.create(name, qId, body.note, req);
  }

  @Patch('/questions/:qId/notes/:id')
  update(@Req() req: IRequest, @Param('name') name: string, @Param('id') id: string, @Param('qId') qId: string, @Body() body: { note: string }) {
    return this.organizationComplianceNotesService.update(name, qId, id, body.note, req);
  }

  @Delete('/questions/:qId/notes/:id')
  remove(@Req() req: IRequest, @Param('name') name: string, @Param('id') id: string, @Param('qId') qId: string) {
    return this.organizationComplianceNotesService.remove(name, qId, id, req);
  }
}
