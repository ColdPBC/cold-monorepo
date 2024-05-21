import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters, UseGuards } from '@nestjs/common';
import { ComplianceQuestionsService } from './compliance-questions.service';
import { compliance_questions } from '@prisma/client';
import { HttpExceptionFilter, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { coldAdminOnly } from '../../../../../_global/global.params';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid'])
@ApiTags('Compliance Questions')
@UseFilters(new HttpExceptionFilter(ComplianceQuestionsController.name))
@Controller('complianceDefinitions/:name/sectionGroups/:sectionGroupId/sections/:sectionId')
export class ComplianceQuestionsController {
  constructor(private readonly complianceQuestionsService: ComplianceQuestionsService) {}

  @Post('questions/batch')
  @Roles(...coldAdminOnly)
  createMany(
    @Param('name') name: string,
    @Param('sectionGroupId') groupId: string,
    @Param('sectionId') sectionId: string,
    @Body() createComplianceQuestionDto: compliance_questions[],
  ) {
    return this.complianceQuestionsService.createMany(createComplianceQuestionDto);
  }

  @Post('questions')
  @Roles(...coldAdminOnly)
  create(@Param('name') name: string, @Param('sectionGroupId') groupId: string, @Param('sectionId') sectionId: string, @Body() createComplianceQuestionDto: compliance_questions) {
    return this.complianceQuestionsService.create(createComplianceQuestionDto);
  }

  @Get('questions')
  @Roles(...coldAdminOnly)
  findBySection(@Param('name') compliance_definition_name: string, @Param('sectionGroupId') groupId: string, @Param('sectionId') sectionId: string) {
    return this.complianceQuestionsService.findAll({ compliance_definition_name, compliance_section_id: sectionId, compliance_section_group_id: groupId });
  }

  @Get('questions/:id')
  @Roles(...coldAdminOnly)
  findOne(@Param('name') name: string, @Param('sectionGroupId') groupId: string, @Param('sectionId') sectionId: string, @Param('id') id: string) {
    return this.complianceQuestionsService.findOne({ id });
  }

  @Get('questions/key/:key')
  @Roles(...coldAdminOnly)
  findByKeyAndName(@Param('sectionGroupId') groupId: string, @Param('sectionId') sectionId: string, @Param('name') compliance_definition_name: string, @Param('key') key: string) {
    return this.complianceQuestionsService.findOne({ compliance_definition_name, key });
  }

  @Patch(':id')
  @Roles(...coldAdminOnly)
  update(
    @Param('name') name: string,
    @Param('sectionGroupId') groupId: string,
    @Param('sectionId') sectionId: string,
    @Param('id') id: string,
    @Body() updateComplianceQuestionDto: compliance_questions,
  ) {
    if (id) {
      updateComplianceQuestionDto.id = id;
    }
    return this.complianceQuestionsService.update(updateComplianceQuestionDto);
  }

  @Delete(':id')
  @Roles(...coldAdminOnly)
  remove(@Param('name') name: string, @Param('sectionGroupId') groupId: string, @Param('sectionId') sectionId: string, @Param('id') id: string) {
    return this.complianceQuestionsService.remove(id);
  }
}
