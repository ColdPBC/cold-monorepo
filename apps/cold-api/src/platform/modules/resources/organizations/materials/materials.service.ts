import { Injectable } from '@nestjs/common';
import { BaseWorker, MaterialsRepository } from '@coldpbc/nest';

@Injectable()
export class MaterialsService extends BaseWorker {
  constructor(readonly repository: MaterialsRepository) {
    super(MaterialsService.name);
  }

  create(req: any, createMaterialDto: any) {
    return this.repository.createMaterial(req.organization, req.user, createMaterialDto);
  }

  createSupplierMaterial(req: any, id: string, supplierId: string) {
    const data = {
      material_id: id,
      supplier_id: supplierId,
    };

    return this.repository.createSupplierMaterial(req.organization, req.user, data);
  }

  deleteSupplierMaterial(req: any, material_id: string, supplier_id: string) {
    const data = {
      material_id,
      supplier_id,
    };

    return this.repository.removeMaterialSupplier(req.organization, req.user, data);
  }

  createMany(req: any, createMaterialsDto: any[]) {
    return this.repository.createMaterials(req.organization, req.user, createMaterialsDto);
  }

  findAll(req: any) {
    return this.repository.findAll(req.organization, req.user);
  }

  findOne(req: any, id: string) {
    return this.repository.findOne(req.organization, req.user, { id });
  }

  update(req: any, id: string, updateMaterialDto: any) {
    return this.repository.updateMaterials(req.organization, req.user, { id }, updateMaterialDto);
  }

  remove(req: any, id: string) {
    return this.repository.remove(req.organization, req.user, { id });
  }
}
