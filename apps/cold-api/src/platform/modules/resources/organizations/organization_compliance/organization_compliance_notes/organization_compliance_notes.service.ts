import { Injectable } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';
import { ComplianceNotesRepository } from '../../../../../../../../../libs/nest/src/lib/compliance/repositories/compliance-notes/compliance-notes.repository';

@Injectable()
export class OrganizationComplianceNotesService extends BaseWorker {
  constructor(readonly repository: ComplianceNotesRepository) {
    super(OrganizationComplianceNotesService.name);
  }
  async create(name: string, qId: string, note: string, req: any) {
    return await this.repository.createNote(name, qId, note, req.org, req.user);
  }

  async findAll(name: string, qId: string, req: any) {
    return await this.repository.getNotesByqId(name, qId, req.org, req.user);
  }

  async update(name: string, qId: string, note: string, id: string, req: any) {
    return await this.repository.updateNote(name, qId, id, note, req.org, req.user);
  }

  async remove(name: string, qId: string, id: string, req: any) {
    return await this.repository.remove(name, qId, id, req.org, req.user);
  }
}
