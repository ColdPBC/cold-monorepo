import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseWorker, IRequest, ProductsRepository } from '@coldpbc/nest';

@Injectable()
export class ProductsService extends BaseWorker {
  constructor(readonly repository: ProductsRepository) {
    super(ProductsService.name);
  }
  create(req: IRequest, createProductDto: CreateProductDto) {
    return this.repository.createProduct(req.organization, req.user, createProductDto);
  }

  createMany(req: IRequest, createProductDto: CreateProductDto[]) {
    return this.repository.createProducts(req.organization, req.user, createProductDto);
  }

  findAll(req: IRequest) {
    return this.repository.findAll(req.organization, req.user);
  }

  findOne(req: IRequest, filters: { id?: string; name?: string }) {
    return this.repository.findOne(req.organization, req.user, filters);
  }

  update(req: IRequest, filters: { id?: string; name?: string }, updateProductDto: UpdateProductDto) {
    return this.repository.updateProduct(req.organization, req.user, filters, updateProductDto);
  }

  remove(req: IRequest, filters: { id?: string; name?: string }) {
    return this.repository.remove(req.organization, req.user, filters);
  }
}
