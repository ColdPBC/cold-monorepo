import { BadRequestException, ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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

    const cert = await this.prisma.certifications.findUnique({
      where: {
        id: data.certification_id,
      },
    });

    if (!cert) {
      throw new NotFoundException(`Certification with id ${data.certification_id} not found`);
    }

    const facility = await this.prisma.organization_facilities.findUnique({
      where: {
        id: data.organization_facility_id,
        organization_id: org.id,
      },
    });

    if (!facility) {
      throw new NotFoundException(`Facility with id ${data.organization_facility_id} not found`);
    }

    const file = await this.prisma.organization_files.findUnique({
      where: {
        id: data.organization_file_id,
        organization_id: org.id,
      },
    });

    if (!file) {
      throw new NotFoundException(`File with id ${data.organization_file_id} not found`);
    }

    unset(data, 'id');
    data.organization_name = org.name;

    try {
      const certification = await this.prisma.certification_claims.create({
        data: {
          id: new Cuid2Generator(GuidPrefixes.Claims).scopedId,
          ...data,
        },
      });

      this.logger.log(`${cert.name} claim created for `, { certification });

      return certification;
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ConflictException(
          `${org.name} already has a claim for: certification: ${data.certification_id}, facility: ${data.organization_facility_id} and file: ${data.organization_file_id}`,
        );
      }
      this.logger.error(e);
      throw new BadRequestException({ ...data }, e.message);
    }
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
        organization_id: org.id,
        id: data.id,
      },
      data: data,
    });

    return policy;
  }

  async deleteClaim(org: organizations, user: IAuthenticatedUser, id: string) {
    const policy = this.prisma.certification_claims.delete({
      where: {
        organization_id: org.id,
        id: id,
      },
    });

    this.logger.log(`Compliance Policy ${id} deleted`, { organization: org, user, policy });

    return policy;
  }

  async findAll(org: organizations) {
    const queryOptions = {
      where: {
        organization_id: org.id,
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
        organization_id: org.id,
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
          organization_id: org.id,
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
