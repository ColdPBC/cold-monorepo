import { Module } from '@nestjs/common';
import { ComplianceQuestionsService } from './compliance_questions.service';
import { ComplianceQuestionsController } from './compliance_questions.controller';

@Module({
  controllers: [ComplianceQuestionsController],
  providers: [ComplianceQuestionsService],
})
export class ComplianceQuestionsModule {}
