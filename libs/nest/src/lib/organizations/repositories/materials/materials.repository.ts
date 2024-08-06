import { BadRequestException, Global, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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
    organization: true,
    material_suppliers: true,
    created_at: true,
    updated_at: true,
  };

  async createMaterial(org: organizations, user: IAuthenticatedUser, data: any) {
    data.id = new Cuid2Generator(GuidPrefixes.Material).scopedId;
    data.organization_id = org.id;

    const product = this.prisma.materials.create({
      data: data,
    });

    this.logger.log(`Organization material ${data.name} created`, { organization: org, user, product });

    return product;
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

  async updateMaterials(org: organizations, user: IAuthenticatedUser, filters: { id?: string; name?: string }, data: any) {
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
