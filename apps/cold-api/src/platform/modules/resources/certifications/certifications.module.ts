import { Module } from '@nestjs/common';
import { CertificationsController } from './certifications.controller';
import { CertificationsService } from './certifications.service';
import { ComplianceCertificationClaimsRepository, ComplianceCertificationRepository } from '@coldpbc/nest';
import { ClaimsModule } from './claims/claims.module';

@Module({
  controllers: [CertificationsController, ClaimsModule],
  providers: [CertificationsService, ComplianceCertificationClaimsRepository, ComplianceCertificationRepository],
  exports: [],
  imports: [ClaimsModule],
})
export class CertificationsModule {}
