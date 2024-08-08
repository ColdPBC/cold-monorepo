import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../worker';
import { PrismaService } from '../prisma';
import { IAuthenticatedUser } from '../primitives';
import { claim_types, claims, organizations } from '@prisma/client';
import { Cuid2Generator, GuidPrefixes } from '../utility';

@Injectable()
export class ClaimsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ClaimsRepository.name);
  }

  async createClaim(org: organizations, user: IAuthenticatedUser, data: claims) {
    data.id = new Cuid2Generator(GuidPrefixes.Claims).scopedId;

    if (!data.name) {
      throw new BadRequestException('Claim name is required');
    }
    if (!data.type) {
      data.type = claim_types.INTERNAL;
    }

    const certification = this.prisma.claims.create({
      data: data,
    });

    this.logger.log(`Compliance Policy ${data.name} created`, { certification });

    return certification;
  }

  async createClaims(org: organizations, user: IAuthenticatedUser, data: claims[]) {
    data = data.map(d => {
      if (!d.name) {
        throw new BadRequestException('Compliance Policy name is required');
      }

      if (!d.type) {
        throw new BadRequestException('Compliance Policy type is required');
      }

      d.id = new Cuid2Generator(GuidPrefixes.OrganizationProduct).scopedId;

      return d;
    });

    const policies = this.prisma.claims.createMany({
      data: data,
    });

    this.logger.log(`Created ${data.length} compliance policies`, { policies });

    return policies;
  }

  async updateComplianceCertification(org: organizations, user: IAuthenticatedUser, data: claims) {
    const policy = this.prisma.claims.update({
      where: {
        id: data.id,
      },
      data: data,
    });

    this.logger.log(`Compliance policy ${data.name} updated`, { policy });

    return policy;
  }

  async deleteComplianceCertification(org: organizations, user: IAuthenticatedUser, id: string) {
    const policy = this.prisma.claims.delete({
      where: {
        id: id,
      },
    });

    this.logger.log(`Compliance Policy ${id} deleted`, { organization: org, user, policy });

    return policy;
  }

  async findAll() {
    const queryOptions = {
      select: {
        id: true,
        name: true,
        level: true,
        type: true,
        organization_claims: true,
      },
    };

    const certifications = await this.prisma.claims.findMany(queryOptions);

    if (!certifications || certifications.length === 0) {
      throw new NotFoundException(`No Certifications found`);
    }

    return certifications;
  }

  async findByType(org: organizations, user: IAuthenticatedUser, type: claim_types) {
    const queryOptions = {
      where: {
        type: type,
      },
      select: {
        id: true,
        name: true,
        level: true,
        type: true,
        organization_claims: true,
      },
    };

    const certifications = await this.prisma.claims.findMany(queryOptions);

    if (!certifications || certifications.length === 0) {
      throw new NotFoundException(`No Certifications found`);
    }

    return certifications;
  }

  async findOne(org: organizations, user: IAuthenticatedUser, filters?: { name?: string; id?: string }) {
    if (filters?.id || filters?.name) {
      const certification = await this.prisma.claims.findUnique({
        where: {
          id: filters.id,
          name: filters.name,
        },
        select: {
          id: true,
          name: true,
          type: true,
          level: true,
        },
      });

      if (!certification) {
        throw new NotFoundException({ filters, user }, `No Certification found`);
      }

      return certification;
    } else {
      throw new UnprocessableEntityException({ filters, user }, 'Must provide id or name');
    }
  }
}
