import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrganizationComplianceAiResponseFilesService } from './organization_compliance_ai_response_files.service';
import { CreateOrganizationComplianceAiResponseFileDto } from './dto/create-organization_compliance_ai_response_file.dto';
import { UpdateOrganizationComplianceAiResponseFileDto } from './dto/update-organization_compliance_ai_response_file.dto';

@Controller('organization-compliance-ai-response-files')
export class OrganizationComplianceAiResponseFilesController {
  constructor(private readonly organizationComplianceAiResponseFilesService: OrganizationComplianceAiResponseFilesService) {}

  @Post()
  create(@Body() createOrganizationComplianceAiResponseFileDto: CreateOrganizationComplianceAiResponseFileDto) {
    return this.organizationComplianceAiResponseFilesService.create(createOrganizationComplianceAiResponseFileDto);
  }

  @Get()
  findAll() {
    return this.organizationComplianceAiResponseFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationComplianceAiResponseFilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationComplianceAiResponseFileDto: UpdateOrganizationComplianceAiResponseFileDto) {
    return this.organizationComplianceAiResponseFilesService.update(+id, updateOrganizationComplianceAiResponseFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationComplianceAiResponseFilesService.remove(+id);
  }
}
