import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrganizationComplianceNoteFilesService } from './organization_compliance_note_files.service';
import { organization_compliance_notes } from '@prisma/client';

@Controller('organization-compliance-note-files')
export class OrganizationComplianceNoteFilesController {
  constructor(private readonly organizationComplianceNoteFilesService: OrganizationComplianceNoteFilesService) {}

  @Post()
  create(@Body() createOrganizationComplianceNoteFileDto: organization_compliance_notes) {
    return this.organizationComplianceNoteFilesService.create(createOrganizationComplianceNoteFileDto);
  }

  @Get()
  findAll() {
    return this.organizationComplianceNoteFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationComplianceNoteFilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationComplianceNoteFileDto: organization_compliance_notes) {
    return this.organizationComplianceNoteFilesService.update(+id, updateOrganizationComplianceNoteFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationComplianceNoteFilesService.remove(+id);
  }
}
