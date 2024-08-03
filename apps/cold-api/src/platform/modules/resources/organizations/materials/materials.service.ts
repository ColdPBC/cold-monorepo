import { Injectable } from '@nestjs/common';

@Injectable()
export class MaterialsService {
  create(createMaterialDto: any) {
    return 'This action adds a new material';
  }

  findAll() {
    return `This action returns all materials`;
  }

  findOne(id: string) {
    return `This action returns a #${id} material`;
  }

  update(id: string, updateMaterialDto: any) {
    return `This action updates a #${id} material`;
  }

  remove(id: string) {
    return `This action removes a #${id} material`;
  }
}
