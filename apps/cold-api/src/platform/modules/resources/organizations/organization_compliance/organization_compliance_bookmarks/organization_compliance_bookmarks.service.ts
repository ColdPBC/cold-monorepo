import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { organization_compliance_question_bookmarks } from '@prisma/client';
import { BaseWorker, ComplianceQuestionBookmarksRepository } from '@coldpbc/nest';

@Injectable()
export class OrganizationComplianceBookmarksService extends BaseWorker {
  constructor(readonly repository: ComplianceQuestionBookmarksRepository) {
    super(OrganizationComplianceBookmarksService.name);
  }
  create(bookmark: organization_compliance_question_bookmarks) {
    try {
      return this.repository.upsertComplianceQuestionBookmark(bookmark);
    } catch (err) {
      this.logger.error(err);
      if (err instanceof NotFoundException) throw err;
      throw new UnprocessableEntityException({ bookmark, description: err.message, cause: err });
    }
  }

  findAll() {
    return `This action returns all organizationComplianceBookmarks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceBookmark`;
  }

  update(id: number, updateOrganizationComplianceBookmarkDto: any) {
    return `This action updates a #${id} organizationComplianceBookmark`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceBookmark`;
  }
}
