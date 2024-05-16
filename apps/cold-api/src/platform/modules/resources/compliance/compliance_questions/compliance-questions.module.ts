import { Module } from '@nestjs/common';
import { ComplianceQuestionsService } from './compliance-questions.service';
import { ComplianceQuestionsController } from './compliance-questions.controller';
import { ComplianceRepositoryModule } from '@coldpbc/nest';

@Module({
  imports: [ComplianceRepositoryModule],
  controllers: [ComplianceQuestionsController],
  providers: [ComplianceQuestionsService],
  exports: [ComplianceQuestionsService],
})
export class ComplianceQuestionsModule {}
