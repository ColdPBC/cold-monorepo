import { Injectable } from '@nestjs/common';
import { BaseWorker, ClaimsRepository, IAuthenticatedUser } from '@coldpbc/nest';
import { organizations, claims } from '@prisma/client';

@Injectable()
export class ClaimsService extends BaseWorker {
  constructor(private readonly claimsRepository: ClaimsRepository) {
    super(ClaimsService.name);
  }

  create(org: organizations, user: IAuthenticatedUser, createClaimDto: claims) {
    return this.claimsRepository.createClaim(org, user, createClaimDto);
  }

  update(org: organizations, user: IAuthenticatedUser, updateClaimDto: claims) {
    return this.claimsRepository.updateClaim(org, user, updateClaimDto);
  }

  findAll() {
    return this.claimsRepository.findAll();
  }

  findById(org: organizations, user: IAuthenticatedUser, id: string) {
    return this.claimsRepository.findOne(org, user, { id });
  }

  findByName(org: organizations, user: IAuthenticatedUser, name: string) {
    return this.claimsRepository.findOne(org, user, { name });
  }

  remove(org: organizations, user: IAuthenticatedUser, id: string) {
    return this.claimsRepository.deleteClaim(org, user, id);
  }
}
