import { Module } from '@nestjs/common';
import { CertificationsController } from './certifications.controller';
import { CertificationsService } from './certifications.service';
import { ComplianceCertificationClaimsRepository, ComplianceCertificationRepository } from '@coldpbc/nest';
import { ClaimsModule } from './claims/claims.module';

@Module({
  imports: [ClaimsModule],
  controllers: [CertificationsController],
  providers: [CertificationsService, ComplianceCertificationClaimsRepository, ComplianceCertificationRepository],
  exports: [],
})
export class CertificationsModule {}
