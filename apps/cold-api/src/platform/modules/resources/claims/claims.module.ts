import { Module } from '@nestjs/common';
import { ClaimsController } from './claims.controller';
import { CertificationsService } from './claims.service';
import { OrganizationClaimsRepository, ComplianceCertificationRepository } from '@coldpbc/nest';
import { ClaimsModule } from './organization_claims/organization_claims.module';

@Module({
  imports: [ClaimsModule],
  controllers: [ClaimsController],
  providers: [CertificationsService, OrganizationClaimsRepository, ComplianceCertificationRepository],
  exports: [],
})
export class ClaimsModule {}
