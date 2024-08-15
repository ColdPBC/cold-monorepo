import { Injectable } from '@nestjs/common';
import { BaseWorker, IAuthenticatedUser, OrganizationClaimsRepository } from '@coldpbc/nest';
import { organization_claims, organizations } from '@prisma/client';
import { unset } from 'lodash';

@Injectable()
export class OrganizationClaimsService extends BaseWorker {
  constructor(readonly claimsRepository: OrganizationClaimsRepository) {
    super(OrganizationClaimsService.name);
  }
  create(org: organizations, user: IAuthenticatedUser, createClaimDto: organization_claims) {
    unset(createClaimDto, 'id');

    return this.claimsRepository.createClaim(org, user, createClaimDto);
  }

  findAll(org: organizations, user: IAuthenticatedUser) {
    return this.claimsRepository.findAll(org);
  }

  findByName(org: organizations, user: IAuthenticatedUser, name: string) {
    return this.claimsRepository.findOne(org, user, { name });
  }

  update(org: organizations, user: IAuthenticatedUser, id: string, updateClaimDto: organization_claims) {
    updateClaimDto.id = id;
    return this.claimsRepository.updateClaim(org, user, id, updateClaimDto);
  }

  remove(org: organizations, user: IAuthenticatedUser, id: string) {
    return this.claimsRepository.deleteClaim(org, user, id);
  }
}
