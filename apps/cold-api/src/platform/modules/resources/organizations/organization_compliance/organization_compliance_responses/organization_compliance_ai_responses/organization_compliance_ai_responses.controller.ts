import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrganizationComplianceAiResponsesService } from './organization_compliance_ai_responses.service';
import { CreateOrganizationComplianceAiResponseDto } from './dto/create-organization_compliance_ai_response.dto';
import { UpdateOrganizationComplianceAiResponseDto } from './dto/update-organization_compliance_ai_response.dto';

@Controller('organization-compliance-ai-responses')
export class OrganizationComplianceAiResponsesController {
  constructor(private readonly organizationComplianceAiResponsesService: OrganizationComplianceAiResponsesService) {}

  @Post()
  create(@Body() createOrganizationComplianceAiResponseDto: CreateOrganizationComplianceAiResponseDto) {
    return this.organizationComplianceAiResponsesService.create(createOrganizationComplianceAiResponseDto);
  }

  @Get()
  findAll() {
    return this.organizationComplianceAiResponsesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationComplianceAiResponsesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationComplianceAiResponseDto: UpdateOrganizationComplianceAiResponseDto) {
    return this.organizationComplianceAiResponsesService.update(+id, updateOrganizationComplianceAiResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationComplianceAiResponsesService.remove(+id);
  }
}
