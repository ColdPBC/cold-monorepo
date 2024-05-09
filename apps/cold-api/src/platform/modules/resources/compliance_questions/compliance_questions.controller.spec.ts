import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceQuestionsController } from './compliance_questions.controller';
import { ComplianceQuestionsService } from './compliance_questions.service';

describe('ComplianceQuestionsController', () => {
  let controller: ComplianceQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplianceQuestionsController],
      providers: [ComplianceQuestionsService],
    }).compile();

    controller = module.get<ComplianceQuestionsController>(ComplianceQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
