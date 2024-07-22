import { BadRequestException, Global, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { IAuthenticatedUser } from '../../../primitives';
import { organizations } from '@prisma/client';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';

@Injectable()
@Global()
export class ProductsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ProductsRepository.name);
  }

  product_query = {
    id: true,
    name: true,
    organization: true,
    product_facilities: {
      select: {
        product_facility: {
          select: {
            id: true,
            name: true,
            organization_id: true,
            address_line_1: true,
            address_line_2: true,
            city: true,
            state_province: true,
            postal_code: true,
            metadata: true,
            supplier: true,
            deleted: true,
            certification_claims: true,
          },
        },
      },
    },
  };

  async createProduct(org: organizations, user: IAuthenticatedUser, data: any) {
    data.id = new Cuid2Generator(GuidPrefixes.OrganizationProduct).scopedId;
    data.organization_id = org.id;

    const product = this.prisma.organization_products.create({
      data: data,
    });

    this.logger.log(`Organization product ${data.name} created`, { organization: org, user, product });

    return product;
  }

  async createProducts(org: organizations, user: IAuthenticatedUser, data: any[]) {
    data = data.map(d => {
      d.id = new Cuid2Generator(GuidPrefixes.OrganizationProduct).scopedId;
      d.organization_id = org.id;
      return d;
    });
    const products = this.prisma.organization_products.createMany({
      data: data,
    });
    this.logger.log(`Organization products created`, { organization: org, user, products });

    return products;
  }

  async updateProduct(org: organizations, user: IAuthenticatedUser, filters: { id?: string; name?: string }, data: any) {
    const product = this.prisma.organization_products.update({
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

  async findAll(org: organizations, user: IAuthenticatedUser) {
    const products = await this.prisma.extended.organization_products.findMany({
      where: {
        organization_id: org.id,
      },
      select: this.product_query,
    });

    if (!products || products.length === 0) {
      throw new NotFoundException({ organization: org, user }, `No products found`);
    }

    return products;
  }

  findOne(org: organizations, user: IAuthenticatedUser, filters: { name?: string; id?: string }) {
    if (filters?.id || filters?.name) {
      return this.prisma.extended.organization_products.findUnique({
        where: {
          id: filters.id,
          name: filters.name,
          organization_id: org.id,
        },
        select: this.product_query,
      });
    } else {
      throw new UnprocessableEntityException({ filters, user }, 'Must provide id or name');
    }
  }

  remove(org: any, user: IAuthenticatedUser, filters: { id?: string; name?: string }) {
    if (!filters?.id && !filters?.name) {
      throw new BadRequestException('Must provide id or name');
    }

    return this.prisma.organization_products.delete({
      where: {
        id: filters.id,
        name: filters.name,
        organization_id: org.id,
      },
    });
  }
}
