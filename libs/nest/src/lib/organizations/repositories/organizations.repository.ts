import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../worker';
import { PrismaService } from '../../prisma';
import { IAuthenticatedUser } from '../../primitives';
import { set } from 'lodash';
import { organizations } from '@prisma/client';

@Injectable()
export class OrganizationsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(OrganizationsRepository.name);
  }

  async create(org: organizations, user: IAuthenticatedUser) {
    const existing = this.prisma.organizations.upsert({
      where: {
        name: org.name,
      },
      create: org as any,
      update: org as any,
    });

    this.logger.log(`Organization created or updated`, { organization: org, user });
    return existing;
  }

  async findAll(
    user: IAuthenticatedUser,
    filters?: {
      id?: string;
      name?: string;
      isTest?: boolean;
    } | null,
  ) {
    const queryOptions = {
      include: {
        facilities: true,
      },
    };

    if (filters) {
      set(queryOptions, 'where', { ...filters });
    }

    const orgs = await this.prisma.organizations.findMany(queryOptions);

    if (!orgs) {
      throw new NotFoundException({ filters, user }, `No Organizations found`);
    }

    return orgs;
  }

  findOne(user: IAuthenticatedUser, filters?: { name?: string; id?: string; isTest?: boolean }) {
    if (filters?.id || filters?.name) {
      return this.prisma.organizations.findUnique({
        where: {
          id: filters.id,
          name: filters.name,
        },
      });
    } else {
      throw new UnprocessableEntityException({ filters, user }, 'Must provide id or name');
    }
  }

  remove(org: any, user: IAuthenticatedUser) {
    if (!org?.id?.includes('org_')) {
      throw new UnprocessableEntityException({ organization: org, user }, `${org.id} is not a valid organization id`);
    }

    // don't del cold-climate
    if (org?.name?.includes('cold-climate')) {
      throw new BadRequestException({ organization: org, user }, 'cannot delete cold-climate org');
    }

    return this.prisma.organizations.delete({
      where: {
        id: org.id,
      },
    });
  }
}
