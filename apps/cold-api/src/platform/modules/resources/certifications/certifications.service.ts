import { Injectable } from '@nestjs/common';
import { BaseWorker, IAuthenticatedUser, CertificationsRepository } from '@coldpbc/nest';
import { certifications, organizations } from '@prisma/client';

@Injectable()
export class CertificationsService extends BaseWorker {
  constructor(private readonly certificationRepository: CertificationsRepository) {
    super(CertificationsService.name);
  }

  create(org: organizations, user: IAuthenticatedUser, createCertificationDto: certifications) {
    return this.certificationRepository.createCertification(org, user, createCertificationDto);
  }

  update(org: organizations, user: IAuthenticatedUser, updateCertificationDto: certifications) {
    return this.certificationRepository.updateCertification(org, user, updateCertificationDto);
  }

  findAll() {
    return this.certificationRepository.findAll();
  }

  findById(org: organizations, user: IAuthenticatedUser, id: string) {
    return this.certificationRepository.findOne(org, user, { id });
  }

  findByName(org: organizations, user: IAuthenticatedUser, name: string) {
    return this.certificationRepository.findOne(org, user, { name });
  }

  remove(org: organizations, user: IAuthenticatedUser, id: string) {
    return this.certificationRepository.deleteCertification(org, user, id);
  }
}
