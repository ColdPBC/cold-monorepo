import { Injectable } from '@nestjs/common';
import { BaseWorker, IAuthenticatedUser, OrganizationAttributesRepository } from '@coldpbc/nest';
import { organization_attributes, organizations } from '@prisma/client';
import { unset } from 'lodash';

@Injectable()
export class OrganizationAttributesService extends BaseWorker {
  constructor(readonly orgAttributesRepository: OrganizationAttributesRepository) {
    super(OrganizationAttributesService.name);
  }
  create(org: organizations, user: IAuthenticatedUser, createClaimDto: organization_attributes) {
    unset(createClaimDto, 'id');

    return this.orgAttributesRepository.createClaim(org, user, createClaimDto);
  }

  findAll(org: organizations, user: IAuthenticatedUser) {
    return this.orgAttributesRepository.findAll(org);
  }

  findByName(org: organizations, user: IAuthenticatedUser, name: string) {
    return this.orgAttributesRepository.findOne(org, user, { name });
  }

  update(org: organizations, user: IAuthenticatedUser, id: string, updateClaimDto: organization_attributes) {
    updateClaimDto.id = id;
    return this.orgAttributesRepository.updateAttribute(org, user, id, updateClaimDto);
  }

  remove(org: organizations, user: IAuthenticatedUser, id: string) {
    return this.orgAttributesRepository.deleteAttribute(org, user, id);
  }
}
