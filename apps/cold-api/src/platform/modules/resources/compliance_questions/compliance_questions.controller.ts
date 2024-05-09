import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ComplianceQuestionsService } from './compliance_questions.service';
import { UpdateComplianceQuestionDto } from './dto/update-compliance_question.dto';
import { compliance_questions } from '@prisma/client';

@Controller('compliance-questions')
export class ComplianceQuestionsController {
  constructor(private readonly complianceQuestionsService: ComplianceQuestionsService) {}

  @Post()
  create(@Body() createComplianceQuestionDto: compliance_questions) {
    return this.complianceQuestionsService.create(createComplianceQuestionDto);
  }

  @Get()
  findAll() {
    return this.complianceQuestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complianceQuestionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplianceQuestionDto: UpdateComplianceQuestionDto) {
    return this.complianceQuestionsService.update(+id, updateComplianceQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complianceQuestionsService.remove(+id);
  }
}
