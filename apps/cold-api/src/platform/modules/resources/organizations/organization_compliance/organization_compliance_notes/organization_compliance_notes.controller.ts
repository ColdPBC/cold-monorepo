import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrganizationComplianceNotesService } from './organization_compliance_notes.service';
import { organization_compliance_notes } from '@prisma/client';

@Controller('organization-compliance-notes')
export class OrganizationComplianceNotesController {
  constructor(private readonly organizationComplianceNotesService: OrganizationComplianceNotesService) {}

  @Post()
  create(@Body() createOrganizationComplianceNoteDto: organization_compliance_notes) {
    return this.organizationComplianceNotesService.create(createOrganizationComplianceNoteDto);
  }

  @Get()
  findAll() {
    return this.organizationComplianceNotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationComplianceNotesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationComplianceNoteDto: organization_compliance_notes) {
    return this.organizationComplianceNotesService.update(+id, updateOrganizationComplianceNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationComplianceNotesService.remove(+id);
  }
}
