import { Module, forwardRef } from '@nestjs/common';
import { ScoringService } from './scoring.service';
import { FilteringModule } from '../filtering';

@Module({
  imports: [FilteringModule],
  providers: [ScoringService],
  exports: [ScoringService],
})
export class ScoringModule {}
