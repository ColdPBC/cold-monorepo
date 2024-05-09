import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrganizationComplianceStatusesService } from './organization_compliance_statuses.service';
import { CreateOrganizationComplianceStatusDto } from './dto/create-organization_compliance_status.dto';
import { UpdateOrganizationComplianceStatusDto } from './dto/update-organization_compliance_status.dto';

@Controller('organization-compliance-statuses')
export class OrganizationComplianceStatusesController {
  constructor(private readonly organizationComplianceStatusesService: OrganizationComplianceStatusesService) {}

  @Post()
  create(@Body() createOrganizationComplianceStatusDto: CreateOrganizationComplianceStatusDto) {
    return this.organizationComplianceStatusesService.create(createOrganizationComplianceStatusDto);
  }

  @Get()
  findAll() {
    return this.organizationComplianceStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationComplianceStatusesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationComplianceStatusDto: UpdateOrganizationComplianceStatusDto) {
    return this.organizationComplianceStatusesService.update(+id, updateOrganizationComplianceStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationComplianceStatusesService.remove(+id);
  }
}
