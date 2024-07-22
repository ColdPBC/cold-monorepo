import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../worker';
import { PrismaService } from '../../prisma';
import { IAuthenticatedUser } from '../../primitives';
import { organizations } from '@prisma/client';

@Injectable()
export class SuppliersRepository extends BaseWorker {
  base_query = {
    id: true,
    name: true,
    address_line_1: true,
    address_line_2: true,
    city: true,
    state_province: true,
    postal_code: true,
    country: true,
    metadata: true,
    certification_claims: {
      select: {
        id: true,
        certification_id: true,
        expiration_date: true,
        effective_date: true,
        organization_file: {
          select: {
            id: true,
            original_name: true,
            bucket: true,
            key: true,
            openai_file_id: true,
            mimetype: true,
            size: true,
            checksum: true,
          },
        },
        certification: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    },
  };

  constructor(readonly prisma: PrismaService) {
    super(SuppliersRepository.name);
  }

  async findAll(org: organizations, user: IAuthenticatedUser) {
    const queryOptions = {
      where: {
        organization_id: org.id,
        supplier: true,
      },
      select: this.base_query,
    };

    const certifications = await this.prisma.extended.organization_facilities.findMany(queryOptions);

    if (!certifications || certifications.length === 0) {
      throw new NotFoundException(`No Certifications found`);
    }

    return certifications;
  }

  async findOne(org: organizations, user: IAuthenticatedUser, filters?: { name?: string; id?: string }) {
    if (filters?.id || filters?.name) {
      const certification = await this.prisma.extended.organization_facilities.findUnique({
        where: {
          id: filters.id,
          name: filters.name,
          supplier: true,
          organization_id: org.id,
        },
        select: this.base_query,
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
