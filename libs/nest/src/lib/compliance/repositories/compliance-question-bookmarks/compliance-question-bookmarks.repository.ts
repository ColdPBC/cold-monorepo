import { BadRequestException, ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { PrismaService } from '../../../prisma';
import { organizations } from '@prisma/client';
import { IAuthenticatedUser } from '../../../primitives';

@Injectable()
export class ComplianceQuestionBookmarksRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceQuestionBookmarksRepository.name);
  }
  async getComplianceQuestionBookmarkById(name: string, id: string, org: organizations, user: IAuthenticatedUser) {
    try {
      const orgCompliance = await this.getOrganizationCompliance(name, org);

      if (!orgCompliance) {
        throw new NotFoundException(`Organization Compliance ${name} not found for ${org.name} `);
      }

      return await this.prisma.extended.organization_compliance_question_bookmarks.findUnique({
        where: {
          id,
          email: user.coldclimate_claims.email,
          organization_compliance_id: orgCompliance.id,
        },
      });
    } catch (err) {
      this.logger.error(err, { organization: org, user, compliance: { name } });
      if (err instanceof NotFoundException) throw err;

      throw new UnprocessableEntityException({ organization: org, user }, err.meta);
    }
  }

  async getComplianceQuestionBookmarksByEmail(name: string, org: organizations, user: IAuthenticatedUser) {
    try {
      const orgCompliance = await this.getOrganizationCompliance(name, org);

      if (!orgCompliance) {
        throw new NotFoundException(`Organization Compliance ${name} not found for ${org.name} `);
      }

      return await this.prisma.extended.organization_compliance_question_bookmarks.findMany({
        where: {
          organization_compliance_id: orgCompliance.id,
          email: user?.coldclimate_claims?.email,
        },
      });
    } catch (err) {
      this.logger.error(err, { organization: org, user, compliance: { name } });
      if (err instanceof NotFoundException) throw err;

      throw new UnprocessableEntityException({ organization: org, user }, err.meta);
    }
  }

  async getComplianceQuestionBookmarksByQuestionId(name: string, qId: string, org: organizations, user: IAuthenticatedUser) {
    try {
      const orgCompliance = await this.getOrganizationCompliance(name, org, qId);

      if (!orgCompliance || orgCompliance.compliance_definition.compliance_questions.length < 1) {
        throw new NotFoundException(`Organization Compliance or question not found for ${name} : ${org.name} `);
      }

      return await this.prisma.extended.organization_compliance_question_bookmarks.findMany({
        where: {
          organization_compliance_id: orgCompliance.id,
          compliance_question_id: qId,
          email: user?.coldclimate_claims?.email,
        },
      });
    } catch (err) {
      this.logger.error(err, { organization: org, user, compliance: { name } });
      if (err instanceof NotFoundException) throw err;

      throw new UnprocessableEntityException({ organization: org, user }, err.meta);
    }
  }

  async getComplianceQuestionBookmarksByOrganizationComplianceId(ocId: string, org: organizations, user: IAuthenticatedUser) {
    try {
      const orgCompliance = this.prisma.extended.organization_compliance.findUnique({
        where: {
          organization_id: org.id,
          id: ocId,
        },
      });

      if (!orgCompliance) {
        throw new NotFoundException(`Organization Compliance ${name} not found for ${org.name} `);
      }

      return await this.prisma.extended.organization_compliance_question_bookmarks.findMany({
        where: {
          organization_compliance_id: ocId,
        },
      });
    } catch (err) {
      this.logger.error(err, { organization: org, user, compliance: { id: ocId } });
      if (err instanceof NotFoundException) throw err;

      throw new UnprocessableEntityException({ organization: org, user }, err.meta);
    }
  }

  async upsertComplianceQuestionBookmark(name: string, qId: string, org: organizations, user: IAuthenticatedUser) {
    try {
      const orgCompliance = await this.getOrganizationCompliance(name, org, qId);

      if (!orgCompliance || orgCompliance.compliance_definition.compliance_questions.length < 1) {
        throw new NotFoundException(`Organization Compliance or question not found for ${name}: ${org.name} `);
      }

      const response = await this.prisma.extended.organization_compliance_question_bookmarks.create({
        data: {
          id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceQuestionBookmark).scopedId,
          organization_compliance_id: orgCompliance.id,
          compliance_question_id: qId,
          email: user.coldclimate_claims.email,
        },
      });

      return response;
    } catch (err) {
      this.logger.error(err, { organization: org, user, qId, compliance: { name } });
      if (err.code === 'P2002') {
        throw new ConflictException(`User ${user.coldclimate_claims.email} already created a bookmark for question: ${qId} `);
      }

      throw new UnprocessableEntityException({ organization: org, user }, err.meta);
    }
  }

  async deleteComplianceQuestionBookmark(qId: string, org: organizations, user: IAuthenticatedUser) {
    try {
      const deleted = await this.prisma.extended.organization_compliance_question_bookmarks.delete({
        where: {
          emailQuestId: {
            email: user.coldclimate_claims.email,
            compliance_question_id: qId,
          },
        },
      });
      return deleted;
    } catch (err) {
      this.logger.error(err.meta.cause, { organization: org, user, question: qId, ...err.meta });
      if (err.meta?.cause === 'Record to delete does not exist.') throw new NotFoundException({ organization: org, user, question: qId }, err.meta);

      throw new UnprocessableEntityException({ description: err.message, cause: err }, err.meta);
    }
  }

  private async getOrganizationCompliance(name: string, org: organizations, qid?: string) {
    const questionFilter = qid ? { id: qid } : {};
    return this.prisma.extended.organization_compliance.findUnique({
      where: {
        orgIdCompNameKey: {
          organization_id: org.id,
          compliance_definition_name: name,
        },
      },
      select: {
        id: true,
        compliance_definition: {
          select: {
            compliance_questions: {
              where: questionFilter,
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
  }
}
