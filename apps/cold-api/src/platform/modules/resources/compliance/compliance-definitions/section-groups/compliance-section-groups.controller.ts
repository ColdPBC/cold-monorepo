import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ComplianceSectionGroupsService } from './compliance-section-groups.service';
import { ComplianceQuestionsService } from './sections/questions/compliance-questions.service';
import { ComplianceSectionsService } from './sections/compliance-sections.service';
import { ComplianceSectionGroupsExtendedDto, GeneratorService, HttpExceptionFilter, IRequest, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { coldAdminOnly } from '../../../_global/global.params';
import { ApiBody, ApiTags } from '@nestjs/swagger';

const genService = new GeneratorService();

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(...coldAdminOnly)
@ApiTags('Section Groups')
@UseFilters(new HttpExceptionFilter(ComplianceSectionGroupsController.name))
@Controller('compliance/:name/section_groups')
export class ComplianceSectionGroupsController {
  constructor(
    readonly complianceSectionGroupsService: ComplianceSectionGroupsService,
    readonly complianceSections: ComplianceSectionsService,
    readonly complianceQuestions: ComplianceQuestionsService,
  ) {}

  @Post()
  @ApiBody({
    type: 'object',
    schema: {
      example: genService.genComplianceSectionGroup(),
    },
  })
  create(@Param('name') name: string, @Body() sectionGroup: ComplianceSectionGroupsExtendedDto) {
    return this.complianceSectionGroupsService.create(sectionGroup);
  }

  @Get()
  findAllSectionGroups(@Param('name') name: string, @Query('fq') filter: boolean, @Query('iq') questions: boolean) {
    return this.complianceSectionGroupsService.findAll(name, filter, questions);
  }

  @Get(':sgId/sections/key/:key')
  findSectionByKey(
    @Param('sgId') groupId: string,
    @Param('name') name: string,
    @Param('key') key: string,
    @Req() req: IRequest,
    @Query('fq') filter: boolean,
    @Query('iq') questions: boolean,
  ) {
    return this.complianceSections.findOneByKeyAndName(groupId, name, req.user, key, filter, questions);
  }

  @Get(':sgId')
  findOne(@Param('name') name: string, @Param('sgId') id: string, @Query('fq') filter: boolean, @Query('iq') questions: boolean) {
    return this.complianceSectionGroupsService.findOne(name, id, filter, questions);
  }

  @Patch(':sgId')
  update(@Param('name') name: string, @Param('sgId') id: string, @Body() data: ComplianceSectionGroupsExtendedDto) {
    return this.complianceSectionGroupsService.update(name, id, data);
  }

  @Delete(':sgId')
  remove(@Param('name') name: string, @Param('sgId') id: string) {
    return this.complianceSectionGroupsService.remove(name, id);
  }
}
