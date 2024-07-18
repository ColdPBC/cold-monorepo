import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters, UseGuards } from '@nestjs/common';
import { ComplianceQuestionsService } from './compliance-questions.service';
import { compliance_questions } from '@prisma/client';
import { GeneratorService, HttpExceptionFilter, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { coldAdminOnly } from '../../../../../_global/global.params';

const genService = new GeneratorService();

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(...coldAdminOnly)
@ApiTags('Compliance Questions')
@UseFilters(new HttpExceptionFilter(ComplianceQuestionsController.name))
@Controller('compliance/:name/section_groups/:sgId/sections/:sId/questions')
export class ComplianceQuestionsController {
  constructor(private readonly complianceQuestionsService: ComplianceQuestionsService) {}

  @Post('batch')
  @ApiBody({
    type: 'object',
    schema: {
      example: [genService.genComplianceQuestion(), genService.genComplianceQuestion()],
    },
  })
  createMany(@Param('name') name: string, @Param('sgId') groupId: string, @Param('sId') sId: string, @Body() createComplianceQuestionDto: compliance_questions[]) {
    return this.complianceQuestionsService.createMany(createComplianceQuestionDto);
  }

  @Post()
  @ApiBody({
    type: 'object',
    schema: {
      example: genService.genComplianceQuestion(),
    },
  })
  create(@Param('name') name: string, @Param('sgId') groupId: string, @Param('sId') sId: string, @Body() createComplianceQuestionDto: compliance_questions) {
    createComplianceQuestionDto.compliance_definition_name = name;
    createComplianceQuestionDto.compliance_section_id = sId;
    return this.complianceQuestionsService.create(createComplianceQuestionDto);
  }

  @Get()
  findBySection(@Param('name') compliance_definition_name: string, @Param('sgId') groupId: string, @Param('sId') sId: string) {
    return this.complianceQuestionsService.findAll({ compliance_definition_name, compliance_section_id: sId, compliance_section_group_id: groupId });
  }

  @Get(':id')
  findOne(@Param('name') name: string, @Param('sgId') groupId: string, @Param('sId') sId: string, @Param('id') id: string) {
    return this.complianceQuestionsService.findOne({ id });
  }

  @Get('key/:key')
  findByKeyAndName(@Param('sgId') groupId: string, @Param('sId') sId: string, @Param('name') compliance_definition_name: string, @Param('key') key: string) {
    return this.complianceQuestionsService.findOne({ compliance_definition_name, key });
  }

  @Patch(':id')
  @ApiBody({
    type: 'object',
    schema: {
      example: genService.genComplianceQuestion(),
    },
  })
  update(
    @Param('name') name: string,
    @Param('sgId') groupId: string,
    @Param('sId') sId: string,
    @Param('id') id: string,
    @Body() updateComplianceQuestionDto: compliance_questions,
  ) {
    if (id) {
      updateComplianceQuestionDto.id = id;
    }
    return this.complianceQuestionsService.update(updateComplianceQuestionDto);
  }

  @Delete(':id')
  remove(@Param('name') name: string, @Param('sgId') groupId: string, @Param('sId') sId: string, @Param('id') id: string) {
    return this.complianceQuestionsService.remove(id);
  }
}
