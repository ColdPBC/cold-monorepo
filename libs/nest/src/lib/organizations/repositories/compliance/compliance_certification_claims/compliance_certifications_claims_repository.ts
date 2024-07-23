import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../../worker';
import { PrismaService } from '../../../../prisma';
import { IAuthenticatedUser } from '../../../../primitives';
import { certification_claims, certification_types, organizations } from '@prisma/client';
import { Cuid2Generator, GuidPrefixes } from '../../../../utility';
import { unset } from 'lodash';

@Injectable()
export class ComplianceCertificationClaimsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceCertificationClaimsRepository.name);
  }

  async createClaim(org: organizations, user: IAuthenticatedUser, data: any) {
    if (!data.certification_id) {
      throw new BadRequestException('Certification ID is required');
    }
    if (!data.organization_facility_id) {
      throw new BadRequestException('Organization Facility ID is required');
    }

    unset(data, 'id');
    data.organization_name = org.name;

    const certification = this.prisma.certification_claims.upsert({
      where: {
        organization_name: org.name,
        organization_file_id: data.organization_file_id,
      },
      create: {
        id: new Cuid2Generator(GuidPrefixes.Claims).scopedId,
        ...data,
      },
      update: data,
    });

    this.logger.log(`Certification claim ${data.id} created`, { certification });

    return certification;
  }

  async updateClaim(org: organizations, user: IAuthenticatedUser, id: string, data: certification_claims) {
    if (!data.certification_id) {
      throw new BadRequestException('Certification ID is required');
    }
    if (!data.organization_facility_id) {
      throw new BadRequestException('Organization Facility ID is required');
    }
    const policy = this.prisma.certification_claims.update({
      where: {
        organization_name: org.name,
        id: data.id,
      },
      data: data,
    });

    return policy;
  }

  async deleteClaim(org: organizations, user: IAuthenticatedUser, id: string) {
    const policy = this.prisma.certification_claims.delete({
      where: {
        organization_name: org.name,
        id: id,
      },
    });

    this.logger.log(`Compliance Policy ${id} deleted`, { organization: org, user, policy });

    return policy;
  }

  async findAll(org: organizations) {
    const queryOptions = {
      where: {
        organization_name: org.name,
      },
      select: {
        id: true,
        facility: true,
        organization_file: true,
        certification: true,
        organization: true,
      },
    };

    const certifications = await this.prisma.certification_claims.findMany(queryOptions);

    if (!certifications || certifications.length === 0) {
      throw new NotFoundException(`No Certifications found`);
    }

    return certifications;
  }

  async findByType(org: organizations, user: IAuthenticatedUser, type: certification_types) {
    const queryOptions = {
      where: {
        type: type,
        organization_name: org.name,
      },
      select: {
        id: true,
        facility: true,
        organization_file: true,
        certification: true,
        organization: true,
      },
    };

    const certifications = await this.prisma.certification_claims.findMany(queryOptions);

    if (!certifications || certifications.length === 0) {
      throw new NotFoundException(`No Certification claims found`);
    }

    return certifications;
  }

  async findOne(org: organizations, user: IAuthenticatedUser, filters?: { name?: string; id?: string }) {
    if (filters?.id || filters?.name) {
      const certification = await this.prisma.certification_claims.findUnique({
        where: {
          id: filters.id,
          organization_name: org.name,
        },
        select: {
          id: true,
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
