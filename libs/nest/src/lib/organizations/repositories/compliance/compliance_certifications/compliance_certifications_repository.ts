import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../../worker';
import { PrismaService } from '../../../../prisma';
import { IAuthenticatedUser } from '../../../../primitives';
import { certification_types, certifications, organizations } from '@prisma/client';
import { Cuid2Generator, GuidPrefixes } from '../../../../utility';

@Injectable()
export class ComplianceCertificationRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceCertificationRepository.name);
  }

  async createComplianceCertification(org: organizations, user: IAuthenticatedUser, data: certifications) {
    data.id = new Cuid2Generator(GuidPrefixes.Certifications).scopedId;

    if (!data.name) {
      throw new BadRequestException('Certification name is required');
    }
    if (!data.type) {
      throw new BadRequestException('Certification type is required');
    }

    const certification = this.prisma.certifications.create({
      data: data,
    });

    this.logger.log(`Compliance Policy ${data.name} created`, { certification });

    return certification;
  }

  async createComplianceCertifications(org: organizations, user: IAuthenticatedUser, data: certifications[]) {
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

    const policies = this.prisma.certifications.createMany({
      data: data,
    });

    this.logger.log(`Created ${data.length} compliance policies`, { policies });

    return policies;
  }

  async updateComplianceCertification(org: organizations, user: IAuthenticatedUser, data: certifications) {
    const policy = this.prisma.certifications.update({
      where: {
        id: data.id,
      },
      data: data,
    });

    this.logger.log(`Compliance policy ${data.name} updated`, { policy });

    return policy;
  }

  async deleteComplianceCertification(org: organizations, user: IAuthenticatedUser, id: string) {
    const policy = this.prisma.certifications.delete({
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
        certification_claims: true,
      },
    };

    const certifications = await this.prisma.certifications.findMany(queryOptions);

    if (!certifications || certifications.length === 0) {
      throw new NotFoundException(`No Certifications found`);
    }

    return certifications;
  }

  async findByType(org: organizations, user: IAuthenticatedUser, type: certification_types) {
    const queryOptions = {
      where: {
        type: type,
      },
      select: {
        id: true,
        name: true,
        level: true,
        type: true,
        certification_claims: true,
      },
    };

    const certifications = await this.prisma.certifications.findMany(queryOptions);

    if (!certifications || certifications.length === 0) {
      throw new NotFoundException(`No Certifications found`);
    }

    return certifications;
  }

  async findOne(org: organizations, user: IAuthenticatedUser, filters?: { name?: string; id?: string }) {
    if (filters?.id || filters?.name) {
      const certification = await this.prisma.certifications.findUnique({
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
