import { Injectable } from '@nestjs/common';
import { BaseWorker, ComplianceNotesRepository, IRequest } from '@coldpbc/nest';

@Injectable()
export class OrganizationComplianceNotesService extends BaseWorker {
  constructor(readonly repository: ComplianceNotesRepository) {
    super(OrganizationComplianceNotesService.name);
  }
  async create(name: string, qId: string, note: string, req: IRequest) {
    return await this.repository.createNote(name, qId, note, req.organization, req.user);
  }

  async findAll(name: string, qId: string, req: IRequest) {
    return await this.repository.getNotesByqId(name, qId, req.organization, req.user);
  }

  async update(name: string, qId: string, note: string, id: string, req: IRequest) {
    return await this.repository.updateNote(name, qId, id, note, req.organization, req.user);
  }

  async remove(name: string, qId: string, id: string, req: IRequest) {
    return await this.repository.remove(name, qId, id, req.organization, req.user);
  }
}
