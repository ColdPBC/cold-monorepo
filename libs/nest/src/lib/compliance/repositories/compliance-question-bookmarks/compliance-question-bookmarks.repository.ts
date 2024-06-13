import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

      return this.prisma.extended.organization_compliance_question_bookmarks.findUnique({
        where: {
          id,
          email: user.coldclimate_claims.email,
          organization_compliance_id: orgCompliance.id,
        },
      });
    } catch (err) {
      this.logger.error(err, { organization: org, user, compliance: { name } });
      if (err instanceof NotFoundException) throw err;

      throw new BadRequestException({ description: err.message, cause: err });
    }
  }

  async getComplianceQuestionBookmarksByEmail(name: string, org: organizations, user: IAuthenticatedUser) {
    try {
      const orgCompliance = await this.getOrganizationCompliance(name, org);

      if (!orgCompliance) {
        throw new NotFoundException(`Organization Compliance ${name} not found for ${org.name} `);
      }

      return this.prisma.extended.organization_compliance_question_bookmarks.findMany({
        where: {
          organization_compliance_id: orgCompliance.id,
          email: user?.coldclimate_claims?.email,
        },
      });
    } catch (err) {
      this.logger.error(err, { organization: org, user, compliance: { name } });
      if (err instanceof NotFoundException) throw err;

      throw new BadRequestException({ description: err.message, cause: err });
    }
  }

  async getComplianceQuestionBookmarksByQuestionId(name: string, qId: string, org: organizations, user: IAuthenticatedUser) {
    try {
      return this.prisma.extended.organization_compliance_question_bookmarks.findMany({
        where: {
          compliance_question_id: qId,
        },
      });
    } catch (err) {
      this.logger.error(err, { organization: org, user, compliance: { name } });
      if (err instanceof NotFoundException) throw err;

      throw new BadRequestException({ description: err.message, cause: err });
    }
  }

  async getComplianceQuestionBookmarksByComplianceAndQuestionId(ocId: string, qId: string, org: organizations, user: IAuthenticatedUser) {
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

      return this.prisma.extended.organization_compliance_question_bookmarks.findMany({
        where: {
          organization_compliance_id: ocId,
          compliance_question_id: qId,
        },
      });
    } catch (err) {
      this.logger.error(err, { organization: org, user, compliance: { name } });
      if (err instanceof NotFoundException) throw err;

      throw new BadRequestException({ description: err.message, cause: err });
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

      return this.prisma.extended.organization_compliance_question_bookmarks.findMany({
        where: {
          organization_compliance_id: ocId,
        },
      });
    } catch (err) {
      this.logger.error(err, { organization: org, user, compliance: { id: ocId } });
      if (err instanceof NotFoundException) throw err;

      throw new BadRequestException({ description: err.message, cause: err });
    }
  }

  async upsertComplianceQuestionBookmark(name: string, qId: string, org: organizations, user: IAuthenticatedUser) {
    try {
      const orgCompliance = await this.getOrganizationCompliance(name, org);

      if (!orgCompliance) {
        throw new NotFoundException(`Organization Compliance ${name} not found for ${org.name} `);
      }

      return this.prisma.extended.organization_compliance_question_bookmarks.create({
        data: {
          id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceQuestionBookmark).scopedId,
          organization_compliance_id: orgCompliance.id,
          compliance_question_id: qId,
          email: user.coldclimate_claims.email,
        },
      });
    } catch (err) {
      this.logger.error(err, { organization: org, user, qId, compliance: { name } });
      if (err instanceof NotFoundException) throw err;

      throw new BadRequestException({ description: err.message, cause: err });
    }
  }

  async deleteComplianceQuestionBookmark(name: string, id: string, org: organizations, user: IAuthenticatedUser) {
    try {
      const orgCompliance = await this.getOrganizationCompliance(name, org);

      if (!orgCompliance) {
        throw new NotFoundException(`Organization Compliance ${name} not found for ${org.name} `);
      }

      return this.prisma.extended.organization_compliance_question_bookmarks.delete({
        where: {
          emailQuestId: {
            email: user.coldclimate_claims.email,
            compliance_question_id: id,
          },
        },
      });
    } catch (err) {
      this.logger.error(err, { organization: org, user, compliance: { name } });
      if (err instanceof NotFoundException) throw err;

      throw new BadRequestException({ description: err.message, cause: err });
    }
  }

  private async getOrganizationCompliance(name: string, org: organizations) {
    return this.prisma.extended.organization_compliance.findUnique({
      where: {
        orgIdCompNameKey: {
          organization_id: org.id,
          compliance_definition_name: name,
        },
      },
    });
  }
}
