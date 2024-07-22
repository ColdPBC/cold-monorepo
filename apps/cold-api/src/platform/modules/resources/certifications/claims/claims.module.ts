import { Module } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { ComplianceCertificationClaimsRepository } from '@coldpbc/nest';

@Module({
  controllers: [ClaimsController],
  providers: [ClaimsService, ComplianceCertificationClaimsRepository],
  exports: [ClaimsService, ComplianceCertificationClaimsRepository],
})
export class ClaimsModule {}
