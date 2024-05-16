import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
import { ComplianceQuestionsService } from './compliance-questions.service';
import { compliance_questions } from '@prisma/client';
import { HttpExceptionFilter, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { coldAdminOnly } from '../../_global/global.params';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid'])
@ApiTags('Compliance Questions')
@UseFilters(new HttpExceptionFilter(ComplianceQuestionsController.name))
@Controller('compliance-questions')
export class ComplianceQuestionsController {
  constructor(private readonly complianceQuestionsService: ComplianceQuestionsService) {}

  @Post('batch')
  @Roles(...coldAdminOnly)
  createMany(@Body() createComplianceQuestionDto: compliance_questions[]) {
    return this.complianceQuestionsService.createMany(createComplianceQuestionDto);
  }

  @Post()
  @Roles(...coldAdminOnly)
  create(@Body() createComplianceQuestionDto: compliance_questions) {
    return this.complianceQuestionsService.create(createComplianceQuestionDto);
  }

  @Get('compliance_definition/:compliance_definition_name')
  @Roles(...coldAdminOnly)
  findAll(@Param('compliance_definition_name') compliance_definition_name: string, @Query('filter') filter: boolean) {
    return this.complianceQuestionsService.findAll({ compliance_definition_name, filter });
  }

  @Get('compliance_section/:id')
  @Roles(...coldAdminOnly)
  findBySection(@Param('id') id: string) {
    return this.complianceQuestionsService.findAll({ compliance_section_id: id });
  }

  @Get(':id')
  @Roles(...coldAdminOnly)
  findOne(@Param('id') id: string) {
    return this.complianceQuestionsService.findOne({ id });
  }

  @Get('compliance_definition/:compliance_definition_name/key/:key')
  @Roles(...coldAdminOnly)
  findByKeyAndName(@Param('compliance_definition_name') compliance_definition_name: string, @Param('key') key: string) {
    return this.complianceQuestionsService.findOne({ compliance_definition_name, key });
  }

  @Patch(':id')
  @Roles(...coldAdminOnly)
  update(@Param('id') id: string, @Body() updateComplianceQuestionDto: compliance_questions) {
    if (id) {
      updateComplianceQuestionDto.id = id;
    }
    return this.complianceQuestionsService.update(updateComplianceQuestionDto);
  }

  @Delete(':id')
  @Roles(...coldAdminOnly)
  remove(@Param('id') id: string) {
    return this.complianceQuestionsService.remove(id);
  }
}
