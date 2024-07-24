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
        effective_date: true,
        issued_date: true,
        organization_file: {
          select: {
            id: true,
            original_name: true,
            bucket: true,
            key: true,
            expires_at: true,
            effective_start_date: true,
            effective_end_date: true,
            openai_file_id: true,
            organization_file_type: true,
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

    const certifications = await this.prisma.organization_facilities.findMany(queryOptions);

    if (!certifications || certifications.length === 0) {
      throw new NotFoundException(`No Certifications found`);
    }

    return certifications;
  }

  async findOne(org: organizations, user: IAuthenticatedUser, filters?: { name?: string; id?: string }) {
    if (filters?.id || filters?.name) {
      const query = {
        where: {
          id: filters.id,
          supplier: true,
          organization_id: org.id,
        },
        select: this.base_query,
      };

      if (filters.name) {
        delete query.where['id'];
        query.where['name'] = filters.name;
      }

      const certification = await this.prisma.organization_facilities.findUnique(query);

      if (!certification) {
        throw new NotFoundException({ filters, user }, `No Certification found`);
      }

      return certification;
    } else {
      throw new UnprocessableEntityException({ filters, user }, 'Must provide id or name');
    }
  }

  async getSupplierClaimNames(org: organizations, user: IAuthenticatedUser) {
    try {
      const list = await this.prisma.organization_claims_view.findMany({
        distinct: ['claim_name'],
        where: {
          organization_name: org.name,
          supplier: true,
        },
        select: {
          claim_name: true,
        },
      });

      if (!list || list.length === 0) {
        throw new NotFoundException(`No Claims found`);
      }

      return list;
    } catch (e) {
      console.error(e.message, { stack: e.stack, organization: org, user });

      if (e.code == 'P2025') {
        throw new NotFoundException({ organization: org, user }, e.message);
      }

      throw e;
    }
  }

  async getOrgClaimList(org: organizations, user: IAuthenticatedUser) {
    try {
      const list = await this.prisma.organization_claims_view.findMany({
        where: {
          organization_name: org.name,
          supplier: true,
        },
        select: {
          facility_id: true,
          facility_name: true,
          address_line_1: true,
          address_line_2: true,
          city: true,
          state_province: true,
          postal_code: true,
          country: true,
          claim_id: true,
          claim_name: true,
          claim_level: true,
          claim_type: true,
          organization_file_id: true,
          organization_file_name: true,
          organization_file_type: true,
          mimetype: true,
          expires_at: true,
          effective_start_date: true,
          effective_end_date: true,
        },
      });

      if (!list || list.length === 0) {
        throw new NotFoundException(`No Claims found`);
      }

      return list;
    } catch (e) {
      console.error(e.message, { stack: e.stack, organization: org, user });

      if (e.code == 'P2025') {
        throw new NotFoundException({ organization: org, user }, e.message);
      }

      throw e;
    }
  }
}
