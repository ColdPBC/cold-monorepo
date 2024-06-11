import { Module } from '@nestjs/common';
import { ScoringModule } from './scoring';
import { ComplianceRepositoryModule } from './repositories';
import { FilteringModule } from './filtering';

@Module({
  imports: [ComplianceRepositoryModule, ScoringModule, FilteringModule],
})
export class ComplianceDataModule {}
