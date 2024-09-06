import { Injectable } from '@nestjs/common';
import { BaseWorker, SustainabilityAttributesRepository, IAuthenticatedUser } from '@coldpbc/nest';
import { organizations, sustainability_attributes } from '@prisma/client';

@Injectable()
export class SustainabilityAttributesService extends BaseWorker {
  constructor(private readonly claimsRepository: SustainabilityAttributesRepository) {
    super(SustainabilityAttributesService.name);
  }

  create(org: organizations, user: IAuthenticatedUser, createClaimDto: sustainability_attributes) {
    return this.claimsRepository.createClaim(org, user, createClaimDto);
  }

  update(org: organizations, user: IAuthenticatedUser, updateClaimDto: sustainability_attributes) {
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
