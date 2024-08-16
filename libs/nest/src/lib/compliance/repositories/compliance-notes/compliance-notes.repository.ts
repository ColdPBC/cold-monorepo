import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { PrismaService } from '../../../prisma/prisma.service';
import { CacheService } from '../../../cache';

@Injectable()
export class ComplianceNotesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly cacheService: CacheService) {
    super(ComplianceNotesRepository.name);
  }

  private getCacheKey(orgId: string, name: string) {
    return `organizations:${orgId}:compliance:${name}:notes`;
  }

  async createNote(name: string, qId: string, note: string, org: any, user: any) {
    const start = new Date();
    await this.cacheService.delete(this.getCacheKey(org.id, name), true);

    const orgCompliance = await this.validate(qId, name, org, user);

    if (!note) throw new BadRequestException('Note is required');

    const newNote = await this.prisma.organization_compliance_notes.create({
      data: {
        id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceNote).scopedId,
        compliance_question_id: qId,
        organization_compliance_id: orgCompliance.id,
        note,
        metadata: { email: user.coldclimate_claims.email },
      },
    });

    if (!org.isTest) {
      const question = await this.prisma.compliance_questions.findUnique({
        where: {
          id: qId,
        },
      });

      this.sendMetrics('organization.compliance.notes', 'compliance_notes_repository', 'create', 'completed', {
        sendEvent: true,
        start,
        tags: {
          key: question ? question.key : '',
          question_id: qId,
          compliance: orgCompliance.compliance_definition_name,
          organization_id: org.id,
          organization_name: org.name,
          email: user.coldclimate_claims.email,
          data: newNote,
        },
      });
    }

    this.logger.debug(`Created new note for ${name} question (${qId}) with ID: ${newNote.id}`);
    return newNote;
  }

  async getNotesByqId(name: string, qId: string, org: any, user: any) {
    const orgCompliance = await this.validate(qId, name, org, user);

    const notes = await this.prisma.organization_compliance_notes.findMany({
      where: {
        organization_compliance_id: orgCompliance.id,
        compliance_question_id: qId,
      },
    });

    this.logger.debug(`Found ${notes.length} notes for ${name} question (${qId})`);

    this.cacheService.set(`${this.getCacheKey(org.id, name)}:questions:${qId}`, notes, { ttl: 60 * 60 * 24 * 7 });
    return notes;
  }

  async updateNote(name: string, qId: string, id: string, note: string, org: any, user: any) {
    const start = new Date();
    await this.cacheService.delete(`${this.getCacheKey(org.id, name)}:${id}`, true);

    const orgCompliance = await this.validate(qId, name, org, user);

    if (!note) throw new BadRequestException('Note is required');
    if (!id) throw new BadRequestException('Note ID is required');

    const notes = await this.prisma.organization_compliance_notes.findMany({
      where: {
        organization_compliance_id: orgCompliance.id,
        compliance_question_id: qId,
      },
    });

    if (!org.isTest) {
      const question = await this.prisma.compliance_questions.findUnique({
        where: {
          id: qId,
        },
      });

      this.sendMetrics('organization.compliance.notes', 'compliance_notes_repository', 'update', 'completed', {
        sendEvent: true,
        start,
        tags: {
          key: question ? question.key : '',
          question_id: qId,
          compliance: orgCompliance.compliance_definition_name,
          organization_id: org.id,
          organization_name: org.name,
          email: user.coldclimate_claims.email,
          data: notes,
        },
      });
    }
    this.logger.debug(`Updated note (${id}) for ${name} question (${qId})`);

    return notes;
  }

  async remove(name: string, qId: string, id: string, org: any, user: any) {
    const start = new Date();
    await this.cacheService.delete(`${this.getCacheKey(org.id, name)}:${id}`, true);

    const orgCompliance = await this.validate(qId, name, org, user);

    if (!id) throw new BadRequestException('Note ID is required');

    const deleted = await this.prisma.organization_compliance_notes.delete({
      where: {
        id,
        organization_compliance_id: orgCompliance.id,
        compliance_question_id: qId,
      },
    });

    if (!org.isTest) {
      const question = await this.prisma.compliance_questions.findUnique({
        where: {
          id: qId,
        },
      });

      this.sendMetrics('organization.compliance.notes', 'compliance_notes_repository', 'delete', 'completed', {
        sendEvent: true,
        start,
        tags: {
          key: question ? question.key : '',
          question_id: qId,
          compliance: orgCompliance.compliance_definition_name,
          organization_id: org.id,
          organization_name: org.name,
          email: user.coldclimate_claims.email,
          data: deleted,
        },
      });
    }

    this.logger.debug(`Deleted note with ID: ${id}`);

    return;
  }

  private async validate(qId: string, name: string, org: any, user: any) {
    if (!qId) throw new BadRequestException('Compliance Question ID is required');
    if (!name) throw new BadRequestException('Compliance Definition Name is required');
    if (!org) throw new BadRequestException('Organization is required');
    if (!user) throw new BadRequestException('User is required');

    const orgCompliance = await this.prisma.organization_compliance.findUnique({
      where: {
        orgIdCompNameKey: {
          organization_id: org.id,
          compliance_definition_name: name,
        },
      },
    });

    if (!orgCompliance) throw new NotFoundException(`Organization Compliance for ${name} not found for ${org.name} `);

    return orgCompliance;
  }
}
