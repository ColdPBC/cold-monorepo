import { Injectable } from '@nestjs/common';
import { BaseWorker, MaterialsRepository, IRequest } from '@coldpbc/nest';

@Injectable()
export class MaterialsService extends BaseWorker {
  constructor(readonly repository: MaterialsRepository) {
    super(MaterialsService.name);
  }

  create(req: IRequest, createMaterialDto: any) {
    return this.repository.createMaterial(req.organization, req.user, createMaterialDto);
  }

  createSupplierMaterial(req: IRequest, id: string, supplierId: string) {
    const data = {
      material_id: id,
      supplier_id: supplierId,
    };

    return this.repository.createSupplierMaterial(req.organization, req.user, data);
  }

  deleteSupplierMaterial(req: IRequest, material_id: string, supplier_id: string) {
    const data = {
      material_id,
      supplier_id,
    };

    return this.repository.removeMaterialSupplier(req.organization, req.user, data);
  }

  createMany(req: IRequest, createMaterialsDto: any[]) {
    return this.repository.createMaterials(req.organization, req.user, createMaterialsDto);
  }

  findAll(req: IRequest) {
    return this.repository.findAll(req.organization, req.user);
  }

  findOne(req: IRequest, id: string) {
    return this.repository.findOne(req.organization, req.user, { id });
  }

  update(req: IRequest, id: string, updateMaterialDto: any) {
    return this.repository.updateMaterials(req.organization, req.user, { id }, updateMaterialDto);
  }

  remove(req: IRequest, id: string) {
    return this.repository.remove(req.organization, req.user, { id });
  }
}
