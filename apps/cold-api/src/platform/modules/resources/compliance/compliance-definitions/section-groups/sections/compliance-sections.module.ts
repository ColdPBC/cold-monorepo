import { Module } from '@nestjs/common';
import { ComplianceSectionsService } from './compliance-sections.service';
import { ComplianceSectionsController } from './compliance-sections.controller';
import { ComplianceRepositoryModule } from '@coldpbc/nest';

@Module({
  imports: [ComplianceRepositoryModule],
  controllers: [ComplianceSectionsController],
  providers: [ComplianceSectionsService],
  exports: [ComplianceSectionsService],
})
export class ComplianceSectionsModule {}
