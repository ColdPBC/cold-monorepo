import { Module } from '@nestjs/common';
import { CertificationsController } from './certifications.controller';
import { CertificationsService } from './certifications.service';
import { CertificationsRepository } from '@coldpbc/nest';
import { ClaimsModule } from './claims/claims.module';

@Module({
  controllers: [CertificationsController, ClaimsModule],
  providers: [CertificationsService, CertificationsRepository],
  exports: [],
  imports: [ClaimsModule],
})
export class CertificationsModule {}
