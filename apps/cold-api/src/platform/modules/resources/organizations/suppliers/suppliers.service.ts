import { Injectable } from '@nestjs/common';
import { organizations } from '@prisma/client';
import { BaseWorker, IAuthenticatedUser, SuppliersRepository } from '@coldpbc/nest';

@Injectable()
export class SuppliersService extends BaseWorker {
  constructor(private readonly supRepo: SuppliersRepository) {
    super(SuppliersService.name);
  }

  findAll(org: organizations, user: IAuthenticatedUser) {
    return this.supRepo.findAll(org, user);
  }

  findById(org: organizations, user: IAuthenticatedUser, id: string) {
    return this.supRepo.findOne(org, user, { id });
  }

  getClaimNames(org: organizations, user: IAuthenticatedUser) {
    return this.supRepo.getSupplierClaimNames(org, user);
  }

  getClaimList(org: organizations, user: IAuthenticatedUser) {
    return this.supRepo.getOrgClaimList(org, user);
  }
}
