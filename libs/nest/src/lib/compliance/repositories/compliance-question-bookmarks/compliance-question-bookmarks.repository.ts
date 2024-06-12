import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { Cuid2Generator, GuidPrefixes, PrismaService } from '@coldpbc/nest';
import { organization_compliance_question_bookmarks } from '@prisma/client';

@Injectable()
export class ComplianceQuestionBookmarksRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceQuestionBookmarksRepository.name);
  }
  async getComplianceQuestionBookmarkById(id: string) {
    return this.prisma.extended.organization_compliance_question_bookmarks.findUnique({
      where: {
        id,
      },
    });
  }

  async getComplianceQuestionBookmarksByEmail(email: string) {
    return this.prisma.extended.organization_compliance_question_bookmarks.findMany({
      where: {
        email,
      },
    });
  }

  async getComplianceQuestionBookmarksByQuestionId(qId: string) {
    return this.prisma.extended.organization_compliance_question_bookmarks.findMany({
      where: {
        compliance_question_id: qId,
      },
    });
  }

  async getComplianceQuestionBookmarksByComplianceAndQuestionId(ocId: string, qId: string) {
    return this.prisma.extended.organization_compliance_question_bookmarks.findMany({
      where: {
        organization_compliance_id: ocId,
        compliance_question_id: qId,
      },
    });
  }

  async getComplianceQuestionBookmarksByOrganizationComplianceId(ocId: string) {
    return this.prisma.extended.organization_compliance_question_bookmarks.findMany({
      where: {
        organization_compliance_id: ocId,
      },
    });
  }
  async upsertComplianceQuestionBookmark(data: organization_compliance_question_bookmarks) {
    return this.prisma.extended.organization_compliance_question_bookmarks.upsert({
      where: {
        id: data.id,
      },
      update: data,
      create: {
        // @ts-expect-error - This is a valid use case for the Cuid2Generator
        id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceQuestionBookmark).scopedId,
        ...data,
      },
    });
  }
}
