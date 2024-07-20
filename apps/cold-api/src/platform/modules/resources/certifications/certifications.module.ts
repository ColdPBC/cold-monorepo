import { Module } from '@nestjs/common';
import { CertificationsController } from './certifications.controller';
import { CertificationsService } from './certifications.service';
import { CertificationsRepository } from '@coldpbc/nest';

@Module({
  controllers: [CertificationsController],
  providers: [CertificationsService, CertificationsRepository],
  exports: [],
})
export class CertificationsModule {}
