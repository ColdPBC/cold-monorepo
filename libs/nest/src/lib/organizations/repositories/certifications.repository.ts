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

  async createCertification(org: organizations, user: IAuthenticatedUser, data: certifications) {
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

  async createCertifications(org: organizations, user: IAuthenticatedUser, data: certifications[]) {
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

  async updateCertification(org: organizations, user: IAuthenticatedUser, data: certifications) {
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

  async findAll() {
    const queryOptions = {
      include: {
        certification_claims: true,
      },
    };
    const certifications = await this.prisma.extended.certifications.findMany(queryOptions);

    if (!certifications || certifications.length === 0) {
      throw new NotFoundException(`No Certifications found`);
    }

    return certifications;
  }

  async findOne(org: organizations, user: IAuthenticatedUser, filters?: { name?: string; id?: string }) {
    if (filters?.id || filters?.name) {
      const certification = await this.prisma.extended.certifications.findUnique({
        where: {
          id: filters.id,
          name: filters.name,
        },
        include: {
          certification_claims: true,
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
