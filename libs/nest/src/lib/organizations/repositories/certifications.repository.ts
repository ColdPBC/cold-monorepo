import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../worker';
import { PrismaService } from '../../prisma';
import { IAuthenticatedUser } from '../../primitives';
import { certifications, organizations } from '@prisma/client';
import { Cuid2Generator, GuidPrefixes } from '../../utility';

@Injectable()
export class CertificationsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(CertificationsRepository.name);
  }

  async createCertification(data: certifications) {
    data.id = new Cuid2Generator(GuidPrefixes.Certifications).scopedId;

    if (!data.name) {
      throw new BadRequestException('Certification name is required');
    }
    if (!data.type) {
      throw new BadRequestException('Certification type is required');
    }
    if (!data.logo_url) {
      throw new BadRequestException('Certification logo url is required');
    }

    const certification = this.prisma.extended.certifications.create({
      data: data,
    });

    this.logger.log(`Organization product ${data.name} created`, { certification });

    return certification;
  }

  async createCertifications(data: certifications[]) {
    data = data.map(d => {
      if (!d.name) {
        throw new BadRequestException('Certification name is required');
      }
      if (!d.type) {
        throw new BadRequestException('Certification type is required');
      }
      if (!d.logo_url) {
        throw new BadRequestException('Certification logo url is required');
      }
      d.id = new Cuid2Generator(GuidPrefixes.OrganizationProduct).scopedId;

      return d;
    });
    const certifications = this.prisma.extended.certifications.createMany({
      data: data,
    });
    this.logger.log(`Organization products created`, { certifications });

    return certifications;
  }

  async updateCertification(data: certifications) {
    const certification = this.prisma.extended.certifications.update({
      where: {
        id: data.id,
      },
      data: data,
    });

    this.logger.log(`Certification ${data.name} updated`, { certification });

    return certification;
  }

  async deleteCertification(org: organizations, user: IAuthenticatedUser, id: string) {
    const product = this.prisma.extended.certifications.delete({
      where: {
        id: id,
      },
    });

    this.logger.log(`Organization product ${id} deleted`, { organization: org, user, product });

    return product;
  }

  async findAll(
    filters?: {
      id?: string;
      name?: string;
    } | null,
  ) {
    const queryOptions = {
      where: {
        ...filters,
      },
      select: {
        id: true,
        name: true,
        type: true,
        logo_url: true,
        document_url: true,
        website: true,
        created_at: true,
        updated_at: true,
        certification_claims: {
          select: {
            id: true,
            organization_id: true,
            certification_id: true,
            issued_date: true,
            expiration_date: true,
            effective_date: true,
            created_at: true,
            updated_at: true,
            deleted: true,
          },
        },
      },
    };
    const certifications = await this.prisma.extended.certifications.findMany(queryOptions);

    if (!certifications) {
      throw new NotFoundException({ filters }, `No Certifications found`);
    }

    return certifications;
  }

  findOne(user: IAuthenticatedUser, filters?: { name?: string; id?: string; isTest?: boolean }) {
    if (filters?.id || filters?.name) {
      return this.prisma.extended.organizations.findUnique({
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

    return this.prisma.extended.organizations.delete({
      where: {
        id: org.id,
      },
    });
  }
}
