import { AuthenticatedUser, BaseWorker, CacheService, PrismaService } from '@coldpbc/nest';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { organizations } from '@prisma/client';

@Injectable()
export class OrganizationHelper extends BaseWorker {
  constructor(readonly prisma: PrismaService, private readonly cache: CacheService) {
    super(OrganizationHelper.name);
  }

  async getOrganizations(bpc = false): Promise<Array<organizations>> {
    let orgs: Array<organizations> = [];
    if (!bpc) {
      orgs = (await this.cache.get('organizations')) as Array<organizations>;
    }

    if (!orgs) {
      orgs = (await this.prisma.organizations.findMany()) as Array<organizations>;
      if (!orgs) {
        throw new NotFoundException('no organizations found in DB, Cache, or Auth0');
      }
    }

    return orgs;
  }

  async getOrganizationById(id: string, user: AuthenticatedUser, bpc = false): Promise<organizations> {
    if (!user.isColdAdmin && user.coldclimate_claims.org_id !== id) {
      throw new UnauthorizedException(`User is not authorized to access organization ${id}`);
    }
    let org: organizations;
    if (!bpc) {
      const orgs = await this.getOrganizations(bpc);
      org = orgs.find(o => o.id === id) as organizations;
    } else {
      org = (await this.prisma.organizations.findUnique({
        where: {
          id: id,
        },
      })) as organizations;
    }

    if (!org) {
      throw new NotFoundException(`Organization ${id} not found`);
    }

    return org;
  }
}
