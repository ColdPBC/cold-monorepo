import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ComplianceNotesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceNotesRepository.name);
  }

  async createNote(name: string, qId: string, note: string, org: any, user: any) {
    const orgCompliance = await this.validate(qId, name, org, user);

    if (!note) throw new BadRequestException('Note is required');

    const newNote = await this.prisma.extended.organization_compliance_notes.create({
      data: {
        id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceNote).scopedId,
        compliance_question_id: qId,
        organization_compliance_id: orgCompliance.id,
        note,
        metadata: { email: user.coldclimate_claims.email },
      },
    });

    this.logger.debug(`Created new note for ${name} question (${qId}) with ID: ${newNote.id}`);
    return newNote;
  }

  async getNotesByqId(name: string, qId: string, org: any, user: any) {
    const orgCompliance = await this.validate(qId, name, org, user);

    const notes = await this.prisma.extended.organization_compliance_notes.findMany({
      where: {
        organization_compliance_id: orgCompliance.id,
        compliance_question_id: qId,
      },
    });

    this.logger.debug(`Found ${notes.length} notes for ${name} question (${qId})`);

    return notes;
  }

  async updateNote(name: string, qId: string, id: string, note: string, org: any, user: any) {
    const orgCompliance = await this.validate(qId, name, org, user);

    if (!note) throw new BadRequestException('Note is required');
    if (!id) throw new BadRequestException('Note ID is required');

    const notes = await this.prisma.extended.organization_compliance_notes.findMany({
      where: {
        organization_compliance_id: orgCompliance.id,
        compliance_question_id: qId,
      },
    });

    this.logger.debug(`Updated note (${id}) for ${name} question (${qId})`);

    return notes;
  }

  async remove(name: string, qId: string, id: string, org: any, user: any) {
    const orgCompliance = await this.validate(qId, name, org, user);

    if (!id) throw new BadRequestException('Note ID is required');

    await this.prisma.extended.organization_compliance_notes.delete({
      where: {
        id,
        organization_compliance_id: orgCompliance.id,
        compliance_question_id: qId,
      },
    });

    this.logger.debug(`Deleted note with ID: ${id}`);

    return;
  }

  private async validate(qId: string, name: string, org: any, user: any) {
    if (!qId) throw new BadRequestException('Compliance Question ID is required');
    if (!name) throw new BadRequestException('Compliance Definition Name is required');
    if (!org) throw new BadRequestException('Organization is required');
    if (!user) throw new BadRequestException('User is required');

    const orgCompliance = await this.prisma.extended.organization_compliance.findUnique({
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
