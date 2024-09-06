import { BadRequestException, ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { IAuthenticatedUser } from '../../../primitives';
import { organization_attributes, claim_types, organizations } from '@prisma/client';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';

@Injectable()
export class OrganizationAttributesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(OrganizationAttributesRepository.name);
  }

  async createClaim(org: organizations, user: IAuthenticatedUser, data: organization_attributes) {
    if (!data.sustainability_attribute_id) {
      throw new BadRequestException('Certification ID is required');
    }

    if (data.organization_facility_id) {
      const facility = await this.prisma.organization_facilities.findUnique({
        where: {
          id: data.organization_facility_id,
          organization_id: org.id,
        },
      });

      if (!facility) {
        throw new NotFoundException(`Facility with id ${data.organization_facility_id} not found`);
      }
    }

    if (data.material_id) {
      const material = await this.prisma.materials.findUnique({
        where: {
          id: data.material_id,
          organization_id: org.id,
        },
      });

      if (!material) {
        throw new NotFoundException(`Material with id ${data.organization_facility_id} not found`);
      }
    }

    if (data.product_id) {
      const product = await this.prisma.products.findUnique({
        where: {
          id: data.product_id,
          organization_id: org.id,
        },
      });

      if (!product) {
        throw new NotFoundException(`Material with id ${data.organization_facility_id} not found`);
      }
    }

    const claim = await this.prisma.sustainability_attributes.findUnique({
      where: {
        id: data.sustainability_attribute_id,
      },
    });

    if (!claim) {
      throw new NotFoundException(`Sustainability attribute: ${data.sustainability_attribute_id} not found`);
    }

    let file;
    if (data.organization_file_id) {
      file = await this.prisma.organization_files.findUnique({
        where: {
          id: data.organization_file_id,
          organization_id: org.id,
        },
      });

      if (!file) {
        throw new NotFoundException(`File with id ${data.organization_file_id} not found`);
      }
    }

    data.id = new Cuid2Generator(GuidPrefixes.Claims).scopedId;
    data.organization_id = org.id;

    try {
      const orgClaim = await this.prisma.organization_attributes.create({
        data,
      });

      this.logger.log(`Organization claim (${claim.name} created for ${org.name}`, { organization_claim: orgClaim });

      return orgClaim;
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ConflictException(
          `${org.name} already has a claim for: claim: ${data.sustainability_attribute_id}, facility: ${data.organization_facility_id} and file: ${data.organization_file_id}`,
        );
      }
      this.logger.error(e);
      throw new BadRequestException({ ...data }, e.message);
    }
  }

  async updateAttribute(org: organizations, user: IAuthenticatedUser, id: string, data: organization_attributes) {
    if (!data.sustainability_attribute_id) {
      throw new BadRequestException('Certification ID is required');
    }

    const policy = this.prisma.organization_attributes.update({
      where: {
        organization_id: org.id,
        id: data.id,
      },
      data: data,
    });

    return policy;
  }

  async deleteAttribute(org: organizations, user: IAuthenticatedUser, id: string) {
    const policy = this.prisma.organization_attributes.delete({
      where: {
        organization_id: org.id,
        id: id,
      },
    });

    this.logger.log(`Organization Attribute ${id} deleted`, { organization: org, user, policy });

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
        claims: true,
        organization: true,
      },
    };

    const claims = await this.prisma.organization_attributes.findMany(queryOptions);

    if (!claims || claims.length === 0) {
      throw new NotFoundException(`No Certifications found`);
    }

    return claims;
  }

  async findByType(org: organizations, user: IAuthenticatedUser, type: claim_types) {
    const queryOptions = {
      where: {
        claims: {
          some: {
            type: type,
          },
        },
        organization_id: org.id,
      },
      select: {
        id: true,
        facility: true,
        organization_file: true,
        claim: true,
        organization: true,
      },
    };

    const claims = await this.prisma.organization_attributes.findMany(queryOptions);

    if (!claims || claims.length === 0) {
      throw new NotFoundException(`No Certification claims found`);
    }

    return claims;
  }

  async findOne(org: organizations, user: IAuthenticatedUser, filters?: { name?: string; id?: string }) {
    if (filters?.id || filters?.name) {
      const claim = await this.prisma.organization_attributes.findUnique({
        where: {
          id: filters.id,
          organization_id: org.id,
        },
        select: {
          id: true,
        },
      });

      if (!claim) {
        throw new NotFoundException({ filters, user }, `No Certification found`);
      }

      return claim;
    } else {
      throw new UnprocessableEntityException({ filters, user }, 'Must provide id or name');
    }
  }
}
