import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ComplianceSectionGroupsService } from './compliance_section_groups.service';
import { CreateComplianceSectionGroupDto } from './dto/create-compliance_section_group.dto';
import { UpdateComplianceSectionGroupDto } from './dto/update-compliance_section_group.dto';

@Controller('compliance-section-groups')
export class ComplianceSectionGroupsController {
  constructor(private readonly complianceSectionGroupsService: ComplianceSectionGroupsService) {}

  @Post()
  create(@Body() createComplianceSectionGroupDto: CreateComplianceSectionGroupDto) {
    return this.complianceSectionGroupsService.create(createComplianceSectionGroupDto);
  }

  @Get()
  findAll() {
    return this.complianceSectionGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complianceSectionGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplianceSectionGroupDto: UpdateComplianceSectionGroupDto) {
    return this.complianceSectionGroupsService.update(+id, updateComplianceSectionGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complianceSectionGroupsService.remove(+id);
  }
}
