import { Injectable } from '@nestjs/common';
import { BaseWorker, ComplianceAiResponseFilesRepository, IAuthenticatedUser } from '@coldpbc/nest';

@Injectable()
export class OrganizationComplianceAiResponseFilesService extends BaseWorker {
  constructor(readonly repository: ComplianceAiResponseFilesRepository) {
    super(OrganizationComplianceAiResponseFilesService.name);
  }
  create(orgId: string, complianceName: string, aiResponseId: string, aiResponseFileData: any, user: IAuthenticatedUser) {
    return this.repository.createAiResponseFile(orgId, complianceName, aiResponseId, aiResponseFileData, user);
  }

  findAll(orgId: string, complianceName: string, aiResponseId: string, user: IAuthenticatedUser) {
    return this.repository.findAllAiResponseFiles(orgId, complianceName, aiResponseId, user);
  }

  findOne(orgId: string, complianceName: string, aiResponseId: string, id: string, user: IAuthenticatedUser) {
    return this.repository.findOneAiResponseFile(orgId, complianceName, aiResponseId, id, user);
  }

  update(orgId: string, complianceName: string, aiResponseId: string, id: string, aiResponseFileData: any, user: IAuthenticatedUser) {
    return this.repository.updateAiResponseFile(orgId, complianceName, aiResponseId, id, aiResponseFileData, user);
  }

  remove(orgId: string, complianceName: string, aiResponseId: string, id: string, user: IAuthenticatedUser) {
    return this.repository.removeAiResponseFile(orgId, complianceName, aiResponseId, id, user);
  }
}
