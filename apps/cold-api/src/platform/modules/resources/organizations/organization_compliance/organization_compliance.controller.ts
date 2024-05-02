import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrganizationComplianceService } from './organization_compliance.service';
import { CreateOrganizationComplianceDto } from './dto/create-organization_compliance.dto';
import { UpdateOrganizationComplianceDto } from './dto/update-organization_compliance.dto';

@Controller('organization-compliance')
export class OrganizationComplianceController {
  constructor(private readonly organizationComplianceService: OrganizationComplianceService) {}

  @Post()
  create(@Body() createOrganizationComplianceDto: CreateOrganizationComplianceDto) {
    return this.organizationComplianceService.create(createOrganizationComplianceDto);
  }

  @Get()
  findAll() {
    return this.organizationComplianceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationComplianceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationComplianceDto: UpdateOrganizationComplianceDto) {
    return this.organizationComplianceService.update(+id, updateOrganizationComplianceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationComplianceService.remove(+id);
  }
}
