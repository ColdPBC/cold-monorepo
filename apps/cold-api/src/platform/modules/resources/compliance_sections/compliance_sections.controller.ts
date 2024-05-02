import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ComplianceSectionsService } from './compliance_sections.service';
import { CreateComplianceSectionDto } from './dto/create-compliance_section.dto';
import { UpdateComplianceSectionDto } from './dto/update-compliance_section.dto';

@Controller('compliance-sections')
export class ComplianceSectionsController {
  constructor(private readonly complianceSectionsService: ComplianceSectionsService) {}

  @Post()
  create(@Body() createComplianceSectionDto: CreateComplianceSectionDto) {
    return this.complianceSectionsService.create(createComplianceSectionDto);
  }

  @Get()
  findAll() {
    return this.complianceSectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complianceSectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplianceSectionDto: UpdateComplianceSectionDto) {
    return this.complianceSectionsService.update(+id, updateComplianceSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complianceSectionsService.remove(+id);
  }
}
