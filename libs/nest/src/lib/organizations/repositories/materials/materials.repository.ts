import { BadRequestException, ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { IAuthenticatedUser } from '../../../primitives';
import { organizations } from '@prisma/client';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';

@Injectable()
export class MaterialsRepository extends BaseWorker {
  constructor(private readonly prisma: PrismaService) {
    super(MaterialsRepository.name);
  }

  material_query = {
    id: true,
    name: true,
    material_suppliers: {
      include: {
        supplier: true,
        material: true,
      },
    },
    certification_claims: {
      select: {
        id: true,
        certification_id: true,
        effective_date: true,
        issued_date: true,
        material: true,
        product: true,
        facility: true,
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
            type: true,
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
            level: true,
          },
        },
      },
    },
    created_at: true,
    updated_at: true,
  };

  async createMaterial(org: organizations, user: IAuthenticatedUser, data: any) {
    try {
      data.id = new Cuid2Generator(GuidPrefixes.Material).scopedId;
      data.organization_id = org.id;

      const product = await this.prisma.materials.create({
        data: data,
      });

      this.logger.log(`Organization material ${data.name} created`, { organization: org, user, product });

      return product;
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ConflictException({ organization: org, user, data }, { cause: `Material ${data.name} already exists` });
      }
      this.logger.error(`Organization material ${data.name} failed to create`, {
        organization: org,
        user,
        data,
        error: e,
      });
      throw e;
    }
  }

  async createMaterials(org: organizations, user: IAuthenticatedUser, data: any[]) {
    data = data.map(d => {
      d.id = new Cuid2Generator(GuidPrefixes.Material).scopedId;
      d.organization_id = org.id;
      return d;
    });
    const materials = this.prisma.materials.createMany({
      data: data,
    });
    this.logger.log(`Organization products created`, { organization: org, user, materials });

    return materials;
  }

  async updateMaterials(
    org: organizations,
    user: IAuthenticatedUser,
    filters: {
      id?: string;
      name?: string;
    },
    data: any,
  ) {
    const product = this.prisma.products.update({
      where: {
        organization_id: org.id,
        id: filters.id,
        name: filters.name,
      },
      data: data,
    });

    this.logger.log(`Organization product ${data.name} updated`, { organization: org, user, product });

    return product;
  }

  async createSupplierMaterial(org: organizations, user: IAuthenticatedUser, data: any) {
    data.id = new Cuid2Generator(GuidPrefixes.MaterialSupplier).scopedId;
    data.organization_id = org.id;

    const material = await this.prisma.materials.findUnique({
      where: {
        id: data.material_id,
      },
    });

    if (!material) {
      throw new NotFoundException({ organization: org, user, data }, 'Material not found');
    }

    const supplier = await this.prisma.organization_facilities.findUnique({
      where: {
        id: data.supplier_id,
      },
    });

    if (!supplier) {
      throw new NotFoundException({ organization: org, user, data }, 'Supplier not found');
    }

    delete data.organization_id;

    const result = this.prisma.material_suppliers.create({
      data: data,
    });

    this.logger.log(`Organization material ${data.name} created`, { organization: org, user, material_supplier: result });

    return result;
  }

  async findAll(org: organizations, user: IAuthenticatedUser) {
    const materials = await this.prisma.materials.findMany({
      where: {
        organization_id: org.id,
      },
      select: this.material_query,
    });

    if (!materials || materials.length === 0) {
      throw new NotFoundException({ organization: org, user }, `No products found`);
    }

    return materials;
  }

  findOne(org: organizations, user: IAuthenticatedUser, filters: { name?: string; id?: string }) {
    if (filters?.id || filters?.name) {
      return this.prisma.materials.findUnique({
        where: {
          id: filters.id,
          name: filters.name,
          organization_id: org.id,
        },
        select: this.material_query,
      });
    } else {
      throw new UnprocessableEntityException({ filters, user }, 'Must provide id or name');
    }
  }

  remove(org: any, user: IAuthenticatedUser, filters: { id?: string; name?: string }) {
    if (!filters?.id && !filters?.name) {
      throw new BadRequestException('Must provide id or name');
    }

    return this.prisma.materials.delete({
      where: {
        id: filters.id,
        name: filters.name,
        organization_id: org.id,
      },
    });
  }
}
