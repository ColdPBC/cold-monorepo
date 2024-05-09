import { Injectable } from '@nestjs/common';
import { CreateComplianceQuestionDto } from './dto/create-compliance_question.dto';
import { UpdateComplianceQuestionDto } from './dto/update-compliance_question.dto';

@Injectable()
export class ComplianceQuestionsService {
  create(createComplianceQuestionDto: CreateComplianceQuestionDto) {
    return 'This action adds a new complianceQuestion';
  }

  findAll() {
    return `This action returns all complianceQuestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} complianceQuestion`;
  }

  update(id: number, updateComplianceQuestionDto: UpdateComplianceQuestionDto) {
    return `This action updates a #${id} complianceQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} complianceQuestion`;
  }
}
