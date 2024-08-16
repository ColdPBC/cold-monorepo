import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { PrismaService } from '../../../prisma';
import { organizations } from '@prisma/client';
import { IAuthenticatedUser } from '../../../primitives';
import { CacheService } from '../../../cache';

@Injectable()
export class ComplianceQuestionBookmarksRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly cache: CacheService) {
    super(ComplianceQuestionBookmarksRepository.name);
  }

  private getCacheKey(org: organizations, name: string, user: IAuthenticatedUser) {
    return `organizations:${org.id}:compliance:${name}:bookmarks${user ? `:user:${user.coldclimate_claims.email}` : ''}`;
  }

  async getComplianceQuestionBookmarkById(name: string, id: string, org: organizations, user: IAuthenticatedUser) {
    try {
      const orgCompliance = await this.getOrganizationCompliance(name, org);

      if (!orgCompliance) {
        throw new NotFoundException(`Organization Compliance ${name} not found for ${org.name} `);
      }

      const bookmark = await this.prisma.organization_compliance_question_bookmarks.findUnique({
        where: {
          id,
          email: user.coldclimate_claims.email,
          organization_compliance_id: orgCompliance.id,
        },
      });

      this.cache.set(`${this.getCacheKey(org, name, user)}:${id}`, bookmark, { ttl: 60 * 60 * 24 * 7 });

      return bookmark;
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

      const bookmarks = await this.prisma.organization_compliance_question_bookmarks.findMany({
        where: {
          organization_compliance_id: orgCompliance.id,
          email: user?.coldclimate_claims?.email,
        },
      });

      this.cache.set(this.getCacheKey(org, name, user), bookmarks, { ttl: 60 * 60 * 24 * 7 });

      return bookmarks;
    } catch (err) {
      this.logger.error(err, { organization: org, user, compliance: { name } });
      if (err instanceof NotFoundException) throw err;

      throw new UnprocessableEntityException({ organization: org, user }, err.meta);
    }
  }

  async getComplianceQuestionBookmarksByQuestionId(name: string, qId: string, org: organizations, user: IAuthenticatedUser) {
    try {
      const orgCompliance = await this.getOrganizationCompliance(name, org, qId);

      if (!orgCompliance?.compliance_definition?.compliance_questions || orgCompliance.compliance_definition.compliance_questions.length < 1) {
        throw new NotFoundException(`Organization Compliance or question not found for ${name} : ${org.name} `);
      }

      const bookmarks = await this.prisma.organization_compliance_question_bookmarks.findMany({
        where: {
          organization_compliance_id: orgCompliance.id,
          compliance_question_id: qId,
          email: user?.coldclimate_claims?.email,
        },
      });

      this.cache.set(`${this.getCacheKey(org, name, user)}:questions:${qId}`, bookmarks, { ttl: 60 * 60 * 24 * 7 });

      return bookmarks;
    } catch (err) {
      this.logger.error(err, { organization: org, user, compliance: { name } });
      if (err instanceof NotFoundException) throw err;

      throw new UnprocessableEntityException({ organization: org, user }, err.meta);
    }
  }

  async getComplianceQuestionBookmarksByOrganizationComplianceId(ocId: string, org: organizations, user: IAuthenticatedUser) {
    try {
      const orgCompliance = await this.prisma.organization_compliance.findUnique({
        where: {
          organization_id: org.id,
          id: ocId,
        },
      });

      if (!orgCompliance) {
        throw new NotFoundException(`Organization Compliance ${name} not found for ${org.name} `);
      }

      return this.getComplianceQuestionBookmarksByEmail(orgCompliance.compliance_definition_name, org, user);
    } catch (err) {
      this.logger.error(err, { organization: org, user, compliance: { id: ocId } });
      if (err instanceof NotFoundException) throw err;

      throw new UnprocessableEntityException({ organization: org, user }, err.meta);
    }
  }

  async createComplianceQuestionBookmark(name: string, qId: string, org: organizations, user: IAuthenticatedUser) {
    try {
      const start = new Date();

      this.cache.delete(`${this.getCacheKey(org, name, user)}`, true);

      const orgCompliance = await this.getOrganizationCompliance(name, org, qId);

      if (!orgCompliance?.compliance_definition?.compliance_questions || orgCompliance?.compliance_definition?.compliance_questions?.length < 1) {
        throw new NotFoundException(`Organization Compliance or question not found for ${name}: ${org.name} `);
      }

      const response = await this.prisma.organization_compliance_question_bookmarks.create({
        data: {
          id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceQuestionBookmark).scopedId,
          organization_compliance_id: orgCompliance.id,
          compliance_question_id: qId,
          email: user.coldclimate_claims.email,
        },
      });

      if (!org.isTest) {
        const question = await this.prisma.compliance_questions.findUnique({
          where: {
            id: qId,
          },
        });

        this.sendMetrics('organization.compliance.question.bookmarks', 'compliance_notes_repository.createComplianceQuestionBookmark', 'delete', 'completed', {
          sendEvent: true,
          start,
          tags: {
            key: question ? question.key : '',
            question_id: qId,
            compliance: name,
            organization_id: org.id,
            organization_name: org.name,
            email: user.coldclimate_claims.email,
            data: response,
          },
        });
      }

      this.getComplianceQuestionBookmarksByEmail(name, org, user);

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
      const question = await this.prisma.compliance_questions.findUnique({
        where: {
          id: qId,
        },
        select: {
          compliance_definition_name: true,
        },
      });

      if (!question) throw new NotFoundException(`Compliance question ${qId} not found.`);

      this.cache.delete(`${this.getCacheKey(org, question.compliance_definition_name, user)}`, true);

      const deleted = await this.prisma.organization_compliance_question_bookmarks.delete({
        where: {
          emailQuestId: {
            email: user.coldclimate_claims.email,
            compliance_question_id: qId,
          },
        },
      });

      if (!org.isTest) {
        this.metrics.increment('cold.compliance.question.bookmark', 1, {
          event: 'deleted',
          question_id: qId,
          compliance: question.compliance_definition_name,
          organization_id: org.id,
          organization_name: org.name,
          email: user.coldclimate_claims.email,
        });

        this.metrics.event(
          'User deleted bookmark from compliance question',
          `${user.coldclimate_claims.email} from ${org.name} deleted a bookmark ${question ? `on the following question(${qId})` : ''}) for ${question.compliance_definition_name}`,
          {
            alert_type: 'success',
            date_happened: new Date(),
            priority: 'normal',
          },
          {
            event: 'deleted',
            question_id: qId,
            compliance: question.compliance_definition_name,
            organization_id: org.id,
            organization_name: org.name,
            email: user.coldclimate_claims.email,
          },
        );
      }

      return deleted;
    } catch (err) {
      this.logger.error(err.meta.cause, { organization: org, user, question: qId, ...err.meta });
      if (err.meta?.cause === 'Record to delete does not exist.') throw new NotFoundException({ organization: org, user, question: qId }, err.meta);

      throw new UnprocessableEntityException({ description: err.message, cause: err }, err.meta);
    }
  }

  private async getOrganizationCompliance(name: string, org: organizations, qid?: string) {
    const questionFilter = qid ? { id: qid } : {};
    return this.prisma.organization_compliance.findUnique({
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
