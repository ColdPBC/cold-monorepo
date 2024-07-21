import { Injectable } from '@nestjs/common';
import { BaseWorker, IAuthenticatedUser } from '@coldpbc/nest';
import { ComplianceCertificationClaimsRepository } from '@coldpbc/nest';
import { certification_claims, organizations } from '@prisma/client';

@Injectable()
export class ClaimsService extends BaseWorker {
  constructor(readonly claimsRepository: ComplianceCertificationClaimsRepository) {
    super(ClaimsService.name);
  }
  create(org: organizations, user: IAuthenticatedUser, createClaimDto: certification_claims) {
    return this.claimsRepository.createClaim(org, user, createClaimDto);
  }

  findAll(org: organizations, user: IAuthenticatedUser) {
    return this.claimsRepository.findAll(org);
  }

  findByName(org: organizations, user: IAuthenticatedUser, name: string) {
    return this.claimsRepository.findOne(org, user, { name });
  }

  update(org: organizations, user: IAuthenticatedUser, id: string, updateClaimDto: certification_claims) {
    return this.claimsRepository.updateClaim(org, user, id, updateClaimDto);
  }

  remove(org: organizations, user: IAuthenticatedUser, id: string) {
    return this.claimsRepository.deleteClaim(org, user, id);
  }
}
