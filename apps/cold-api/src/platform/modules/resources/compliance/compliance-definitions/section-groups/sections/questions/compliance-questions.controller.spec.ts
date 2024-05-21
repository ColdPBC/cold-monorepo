import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceQuestionsController } from './compliance-questions.controller';
import { ComplianceQuestionsService } from './compliance-questions.service';

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
