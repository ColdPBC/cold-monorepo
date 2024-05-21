import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ComplianceSectionGroupsService } from './compliance-section-groups.service';
import { CreateComplianceSectionGroupDto } from './dto/create-compliance-section-group.dto';
import { UpdateComplianceSectionGroupDto } from './dto/update-compliance-section-group.dto';
import { ComplianceQuestionsService } from './sections/questions/compliance-questions.service';
import { ComplianceSectionsService } from './sections/compliance-sections.service';

@Controller('compliance_definitions/:name/section_groups')
export class ComplianceSectionGroupsController {
  constructor(
    readonly complianceSectionGroupsService: ComplianceSectionGroupsService,
    readonly complianceSections: ComplianceSectionsService,
    readonly complianceQuestions: ComplianceQuestionsService,
  ) {}

  @Post()
  create(@Param('name') name: string, @Body() createComplianceSectionGroupDto: CreateComplianceSectionGroupDto) {
    return this.complianceSectionGroupsService.create(createComplianceSectionGroupDto);
  }

  @Get()
  findAllSectionGroups(@Param('name') name: string, @Query('fq') filter: boolean, @Query('iq') questions: boolean) {
    return this.complianceSectionGroupsService.findAll(name, filter, questions);
  }

  @Get(':sectionGroupId/sections')
  findAllSections(@Param('name') name: string, @Param('sectionGroupId') id: string, @Query('fq') filter: boolean, @Query('iq') questions: boolean) {
    return this.complianceSections.findSectionsByGroup(name, id, filter, questions);
  }

  @Get(':sectionGroupId/sections/key/:key')
  findSectionByKey(
    @Param('sectionGroupId') groupId: string,
    @Param('name') name: string,
    @Param('key') key: string,
    @Query('fq') filter: boolean,
    @Query('iq') questions: boolean,
  ) {
    return this.complianceSections.findOneByKeyAndName(groupId, name, key, filter, questions);
  }

  @Get(':sectionGroupId')
  findOne(@Param('name') name: string, @Param('sectionGroupId') id: string, @Query('fq') filter: boolean, @Query('iq') questions: boolean) {
    return this.complianceSectionGroupsService.findOne(name, id, filter, questions);
  }

  @Patch(':sectionGroupId')
  update(@Param('name') name: string, @Param('sectionGroupId') id: string, @Body() updateComplianceSectionGroupDto: UpdateComplianceSectionGroupDto) {
    return this.complianceSectionGroupsService.update(id, updateComplianceSectionGroupDto);
  }

  @Delete(':sectionGroupId')
  remove(@Param('name') name: string, @Param('sectionGroupId') id: string) {
    return this.complianceSectionGroupsService.remove(id);
  }
}
