import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { ComplianceAiResponsesRepository } from '../compliance-ai-responses';
import { organization_compliance } from '@prisma/client';
import { CreateComplianceReponsesPayload } from './compliance-reponses.types';
import { Cuid2Generator } from '../../../utility';

@Injectable()
export class ComplianceResponsesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly cairr: ComplianceAiResponsesRepository) {
    super(ComplianceResponsesRepository.name);
  }

  async saveComplianceResponse({ organization, compliance, compliance_section_id, compliance_section_group_id, user, org_response, ai_response }: CreateComplianceReponsesPayload) {
    this.logger.info(`Saving response for ${organization.name}: ${compliance.compliance_definition_name}`, {
      user,
      org_response,
      ai_response,
      ...compliance,
      organization: { id: organization.id, name: organization.name, display_name: organization.display_name },
    });

    let orgResponseEntity, aiResponseEntity;

    if (ai_response?.answer || ai_response?.justification) {
      aiResponseEntity = await this.prisma.organization_compliance_ai_responses.upsert({
        where: {
          orgCompQuestId: {
            compliance_question_id: ai_response.compliance_question_id,
            organization_compliance_id: compliance.id,
          },
        },
        create: {
          id: new Cuid2Generator('ocair').scopedId,
          organization_id: organization.id,
          organization_compliance_id: compliance.id,
          compliance_question_id: ai_response.compliance_question_id,
          answer: ai_response.answer as any,
          justification: ai_response.justification,
          sources: ai_response.sources as any,
          references: ai_response.references as any,
          additional_context: ai_response.additional_context as any,
        },
        update: {
          answer: ai_response.answer as any,
          justification: ai_response.justification,
          sources: ai_response.sources as any,
          references: ai_response.references as any,
          additional_context: ai_response.additional_context as any,
        },
      });
    }
    if (org_response?.value && aiResponseEntity.id) {
      orgResponseEntity = await this.prisma.organization_compliance_responses.upsert({
        where: {
          orgCompQuestId: {
            organization_compliance_id: compliance.id,
            compliance_question_id: org_response.compliance_question_id,
          },
        },
        create: {
          id: new Cuid2Generator('ocr').scopedId,
          organization_compliance_id: compliance.id,
          compliance_question_id: org_response.compliance_question_id,
          value: org_response.value,
        },
        update: {
          value: org_response.value,
        },
      });
    }

    await this.prisma.compliance_responses.upsert({
      where: {
        orgCompQuestId: {
          organization_compliance_id: compliance.id,
          compliance_question_id: ai_response.compliance_question_id,
        },
      },
      create: {
        compliance_question_id: ai_response.compliance_question_id,
        compliance_section_id: compliance_section_id,
        compliance_section_group_id: compliance_section_group_id,
        organization_id: organization.id,
        compliance_definition_name: compliance.compliance_definition_name,
        organization_compliance_id: compliance.id,
        organization_compliance_ai_response_id: aiResponseEntity.id,
        organization_compliance_response_id: orgResponseEntity?.id,
      },
      update: {
        compliance_question_id: ai_response.compliance_question_id,
        compliance_section_id: compliance_section_id,
        compliance_section_group_id: compliance_section_group_id,
        organization_id: organization.id,
        compliance_definition_name: compliance.compliance_definition_name,
        organization_compliance_id: compliance.id,
        organization_compliance_ai_response_id: aiResponseEntity.id,
        organization_compliance_response_id: orgResponseEntity?.id,
      },
    });
  }

  async getResponses(organization, compliance: organization_compliance) {
    return this.prisma.compliance_responses.findMany({
      where: { organization_compliance_id: compliance.id },
    });
  }

  async deleteComplianceResponses(organization, compliance: organization_compliance, user, includeUserResponses = false) {
    this.logger.info(`Clearing previous responses for ${organization.name}: ${compliance.compliance_definition_name}`, {
      user,
      ...compliance,
      organization: { id: organization.id, name: organization.name, display_name: organization.display_name },
    });

    await this.prisma.compliance_responses.deleteMany({
      where: { organization_compliance_id: compliance.id },
    });

    if (includeUserResponses) {
      await this.prisma.organization_compliance_responses.deleteMany({
        where: { organization_compliance_id: compliance.id },
      });
    }
  }
}
