import { Injectable } from '@nestjs/common';
import { BaseWorker, ComplianceAiResponseFilesRepository, IAuthenticatedUser } from '@coldpbc/nest';
import { organizations } from '@prisma/client';

@Injectable()
export class OrganizationComplianceAiResponseFilesService extends BaseWorker {
  constructor(readonly repository: ComplianceAiResponseFilesRepository) {
    super(OrganizationComplianceAiResponseFilesService.name);
  }
  create(org: organizations, complianceName: string, aiResponseId: string, aiResponseFileData: any, user: IAuthenticatedUser) {
    return this.repository.createAiResponseFile(org, complianceName, aiResponseId, aiResponseFileData, user);
  }

  findAll(org: organizations, complianceName: string, aiResponseId: string, user: IAuthenticatedUser) {
    return this.repository.findAllAiResponseFiles(org, complianceName, aiResponseId, user);
  }

  findOne(org: organizations, complianceName: string, aiResponseId: string, id: string, user: IAuthenticatedUser) {
    return this.repository.findOneAiResponseFile(org, complianceName, aiResponseId, id, user);
  }

  update(org: organizations, complianceName: string, aiResponseId: string, id: string, aiResponseFileData: any, user: IAuthenticatedUser) {
    return this.repository.updateAiResponseFile(org, complianceName, aiResponseId, id, aiResponseFileData, user);
  }

  remove(org: organizations, complianceName: string, aiResponseId: string, id: string, user: IAuthenticatedUser) {
    return this.repository.removeAiResponseFile(org, complianceName, aiResponseId, id, user);
  }
}
