import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { OrganizationComplianceNotesService } from './organization_compliance_notes.service';
import { organization_compliance_notes } from '@prisma/client';

@Controller('compliance/:name/organizations/:orgId/notes')
export class OrganizationComplianceNotesController {
  constructor(private readonly organizationComplianceNotesService: OrganizationComplianceNotesService) {}

  @Get()
  findAllByCompliance(@Req() req: any, @Param('name') name: string, @Param('orgId') orgId: string) {
    //return this.organizationComplianceNotesService.findAllByCompliance(req, name, orgId);
  }

  @Get('section_groups/:sgId')
  findAllBySectionGroup(@Req() req: any, @Param('orgId') orgId: string, @Param('name') name: string, @Param('sgId') sgId: string) {
    //return this.organizationComplianceNotesService.findAllBySectionGroup(req, orgId, name, sgId);
  }

  @Get('section_groups/:sgId/sections/:sId')
  findAllBySection(@Req() req: any, @Param('orgId') orgId: string, @Param('name') name: string, @Param('sgId') sgId: string, @Param('sId') sId: string) {
    //return this.organizationComplianceNotesService.findAllBySection(req, orgId, name, sgId, sId);
  }

  @Get('section_groups/:sgId/sections/:sId/questions/:qId')
  findOneByQuestion(
    @Req() req: any,
    @Param('orgId') orgId: string,
    @Param('name') name: string,
    @Param('sgId') sgId: string,
    @Param('sId') sId: string,
    @Param('qId') qId: string,
  ) {
    //return this.organizationComplianceNotesService.findOneByQuestion(req, orgId, name, sgId, sId, qId);
  }

  @Post('section_groups/:sgId/sections/:sId/questions/:qId')
  create(
    @Req() req: any,
    @Param('name') name: string,
    @Param('orgId') orgId: string,
    @Param('sgId') sgId: string,
    @Param('sId') sId: string,
    @Param('qId') qId: string,
    @Body() createOrganizationComplianceNoteDto: organization_compliance_notes,
  ) {
    return this.organizationComplianceNotesService.create(createOrganizationComplianceNoteDto);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.organizationComplianceNotesService.findOne(+id);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() updateOrganizationComplianceNoteDto: organization_compliance_notes) {
    return this.organizationComplianceNotesService.update(+id, updateOrganizationComplianceNoteDto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.organizationComplianceNotesService.remove(+id);
  }
}
