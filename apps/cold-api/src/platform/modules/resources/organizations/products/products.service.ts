import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseWorker, ProductsRepository } from '@coldpbc/nest';

@Injectable()
export class ProductsService extends BaseWorker {
  constructor(readonly repository: ProductsRepository) {
    super(ProductsService.name);
  }
  create(req: any, createProductDto: CreateProductDto) {
    return this.repository.createProduct(req.org, req.user, createProductDto);
  }

  createMany(req: any, createProductDto: CreateProductDto[]) {
    return this.repository.createProducts(req.org, req.user, createProductDto);
  }

  findAll(req: any) {
    return this.repository.findAll(req.org, req.user);
  }

  findOne(req: any, filters: { id?: string; name?: string }) {
    return this.repository.findOne(req.org, req.user, filters);
  }

  update(req: any, filters: { id?: string; name?: string }, updateProductDto: UpdateProductDto) {
    return this.repository.updateProduct(req.org, req.user, filters, updateProductDto);
  }

  remove(req: any, filters: { id?: string; name?: string }) {
    return this.repository.remove(req.org, req.user, filters);
  }
}
