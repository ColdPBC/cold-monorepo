import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { organization_compliance_question_bookmarks } from '@prisma/client';
import { BaseWorker, ComplianceQuestionBookmarksRepository } from '@coldpbc/nest';

@Injectable()
export class ComplianceQuestionBookmarkService extends BaseWorker {
  constructor(readonly repository: ComplianceQuestionBookmarksRepository) {
    super(ComplianceQuestionBookmarkService.name);
  }

  upsert(name, qId, bookmark: Partial<organization_compliance_question_bookmarks>, req: any) {
    try {
      return this.repository.createComplianceQuestionBookmark(name, qId, req.organization, req.user);
    } catch (err) {
      this.logger.error(err);
      if (err instanceof NotFoundException) throw err;
      throw new UnprocessableEntityException({ bookmark, description: err.message, cause: err });
    }
  }

  findAllByEmail(name: string, req: any) {
    return this.repository.getComplianceQuestionBookmarksByEmail(name, req.organization, req.user);
  }

  findByQuestionIdAndEmail(name: string, id: string, req: any) {
    return this.repository.getComplianceQuestionBookmarksByQuestionId(name, id, req.organization, req.user);
  }

  findAllOrgBookmarks(name: string, req: any) {
    return this.repository.getComplianceQuestionBookmarksByOrganizationComplianceId(name, req.organization, req.user);
  }

  async remove(qId: string, req: any) {
    return await this.repository.deleteComplianceQuestionBookmark(qId, req.organization, req.user);
  }
}
