import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrganizationComplianceNoteLinksService } from './organization_compliance_note_links.service';

@Controller('organization-compliance-note-links')
export class OrganizationComplianceNoteLinksController {
  constructor(private readonly organizationComplianceNoteLinksService: OrganizationComplianceNoteLinksService) {}

  @Post()
  create(@Body() createOrganizationComplianceNoteLinkDto: any) {
    return this.organizationComplianceNoteLinksService.create(createOrganizationComplianceNoteLinkDto);
  }

  @Get()
  findAll() {
    return this.organizationComplianceNoteLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationComplianceNoteLinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationComplianceNoteLinkDto: any) {
    return this.organizationComplianceNoteLinksService.update(+id, updateOrganizationComplianceNoteLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationComplianceNoteLinksService.remove(+id);
  }
}
