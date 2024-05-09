import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrganizationComplianceResponsesService } from './organization_compliance_responses.service';
import { CreateOrganizationComplianceResponseDto } from './dto/create-organization_compliance_response.dto';
import { UpdateOrganizationComplianceResponseDto } from './dto/update-organization_compliance_response.dto';

@Controller('organization-compliance-responses')
export class OrganizationComplianceResponsesController {
  constructor(private readonly organizationComplianceResponsesService: OrganizationComplianceResponsesService) {}

  @Post()
  create(@Body() createOrganizationComplianceResponseDto: CreateOrganizationComplianceResponseDto) {
    return this.organizationComplianceResponsesService.create(createOrganizationComplianceResponseDto);
  }

  @Get()
  findAll() {
    return this.organizationComplianceResponsesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationComplianceResponsesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationComplianceResponseDto: UpdateOrganizationComplianceResponseDto) {
    return this.organizationComplianceResponsesService.update(+id, updateOrganizationComplianceResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationComplianceResponsesService.remove(+id);
  }
}
