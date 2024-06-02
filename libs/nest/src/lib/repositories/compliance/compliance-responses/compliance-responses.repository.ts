import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { organization_compliance, organization_compliance_ai_responses, organization_compliance_responses, organizations } from '@prisma/client';
import { Cuid2Generator } from '../../../utility';
import { IAuthenticatedUser } from '../../../primitives';

@Injectable()
export class ComplianceResponsesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceResponsesRepository.name);
  }

  /**
   * Create or Update a compliance response
   * @param orgId
   * @param compliance_definition_name
   * @param compliance_section_id
   * @param compliance_section_group_id
   * @param compliance_question_id
   * @param user
   * @param user_response
   * @param ai_response
   */
  async upsertComplianceResponse(
    orgId: string,
    compliance_definition_name: string,
    compliance_section_group_id: string,
    compliance_section_id: string,
    compliance_question_id: string,
    user: IAuthenticatedUser,
    user_response?: organization_compliance_responses,
    ai_response?: organization_compliance_ai_responses,
  ) {
    let organization, compliance;

    try {
      let where;
      const byId = orgId.startsWith('org_');
      if (byId) {
        where = { id: orgId };
      } else {
        where = { name: orgId };
      }

      organization = await this.prisma.extended.organizations.findUnique({
        where: where,
      });
      if (!organization) {
        throw new NotFoundException(`Organization ${orgId} not found`);
      }

      compliance = await this.prisma.extended.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: organization.id,
            compliance_definition_name,
          },
        },
      });

      if (!compliance) {
        throw new NotFoundException(`Organization Compliance Definition ${compliance_definition_name} not found for organization ${organization.name}`);
      }

      if (!user_response?.value && (!ai_response?.answer || !ai_response?.justification)) {
        throw new BadRequestException(`No User or AI response provided for ${organization.name}: ${compliance.compliance_definition_name}, nothing to do`);
      }

      if (!ai_response?.compliance_question_id || (!user_response?.compliance_question_id && !compliance_question_id)) {
        throw new BadRequestException(`No compliance question id provided for ${organization.name}: ${compliance.compliance_definition_name}`);
      }

      this.logger.info(`Saving response for ${organization.name}: ${compliance.compliance_definition_name}`, {
        user,
        user_response: user_response,
        ai_response,
        ...compliance,
        organization: { id: organization.id, name: organization.name, display_name: organization.display_name },
      });

      let orgResponseEntity, aiResponseEntity;

      if (ai_response?.answer || ai_response?.justification) {
        aiResponseEntity = await this.prisma.extended.organization_compliance_ai_responses.upsert({
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
            compliance_question_id: compliance_question_id || ai_response.compliance_question_id,
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

      if (user_response?.value) {
        orgResponseEntity = await this.prisma.extended.organization_compliance_responses.upsert({
          where: {
            orgCompQuestId: {
              organization_compliance_id: compliance.id,
              compliance_question_id: compliance_question_id || user_response.compliance_question_id,
            },
          },
          create: {
            id: new Cuid2Generator('ocr').scopedId,
            organization_compliance_id: compliance.id,
            compliance_question_id: user_response.compliance_question_id,
            value: user_response.value,
          },
          update: {
            value: user_response.value,
          },
        });
      }

      if (orgResponseEntity || aiResponseEntity) {
        const crData = {
          compliance_question_id: compliance_question_id || ai_response.compliance_question_id,
          compliance_section_id: compliance_section_id,
          compliance_section_group_id: compliance_section_group_id,
          organization_id: organization.id,
          compliance_definition_name: compliance.compliance_definition_name,
          organization_compliance_id: compliance.id,
          organization_compliance_ai_response_id: aiResponseEntity.id,
          organization_compliance_response_id: orgResponseEntity?.id,
        };
        await this.prisma.extended.compliance_responses.upsert({
          where: {
            orgCompQuestId: {
              organization_compliance_id: compliance.id,
              compliance_question_id: compliance_question_id || ai_response.compliance_question_id,
            },
          },
          create: crData,
          update: crData,
        });
      }
    } catch (error) {
      this.logger.error(`Error saving response for ${organization.name}: ${compliance.compliance_definition_name}`, {
        user,
        user_response: user_response,
        ai_response,
        compliance,
        organization,
        error,
      });
      throw error;
    }
  }

  async getComplianceResponses(orgId: string, compliance_definition_name: string, user: IAuthenticatedUser) {
    let where;
    const byId = orgId.startsWith('org_');
    if (byId) {
      where = { id: orgId };
    } else {
      where = { name: orgId };
    }

    try {
      const organization = await this.prisma.extended.organizations.findUnique({
        where: where,
        select: {
          id: true,
          name: true,
          display_name: true,
          organization_compliance: {
            where: { compliance_definition_name },
            select: {
              id: true,
              question_bookmarks: {
                select: {
                  id: true,
                  deleted: true,
                },
              },
              notes: {
                select: {
                  id: true,
                  note: true,
                  deleted: true,
                  files: true,
                  links: true,
                },
              },
              compliance_responses: {
                where: {
                  compliance_definition_name,
                },
                select: {
                  id: true,
                  org_response: true,
                  ai_response: {
                    select: {
                      id: true,
                      answer: true,
                      justification: true,
                      sources: true,
                      references: true,
                      additional_context: true,
                      deleted: true,
                      files: true,
                    },
                  },
                  compliance_section_group: {
                    select: {
                      id: true,
                      title: true,
                      order: true,
                      deleted: true,
                      compliance_sections: {
                        select: {
                          id: true,
                          key: true,
                          title: true,
                          order: true,
                          deleted: true,
                          compliance_section_dependency_chains: true,
                          compliance_questions: {
                            select: {
                              id: true,
                              key: true,
                              order: true,
                              component: true,
                              tooltip: true,
                              placeholder: true,
                              rubric: true,
                              options: true,
                              question_summary: true,
                              coresponding_question: true,
                              additional_context: true,
                              deleted: true,
                            },
                          },
                        },
                      },
                    },
                  },
                  deleted: true,
                },
              },
              deleted: true,
            },
          },
        },
      });

      if (!organization) {
        throw new NotFoundException(`Organization ${orgId} not found`);
      }

      return { ...organization };
    } catch (error) {
      this.logger.error(`Error getting responses for organization: ${orgId}: ${compliance_definition_name}`, {
        user,
        error,
      });
      throw error;
    }
  }

  async getComplianceResponseById(orgId: string, compliance_definition_name: string, user: IAuthenticatedUser, id: number) {
    try {
      let where;
      const byId = orgId.startsWith('org_');
      if (byId) {
        where = { id: orgId };
      } else {
        where = { name: orgId };
      }

      const organization = await this.prisma.extended.organizations.findUnique({
        where: where,
        select: {
          id: true,
          name: true,
          display_name: true,
          organization_compliance: {
            where: { compliance_definition_name },
            select: {
              id: true,
              question_bookmarks: {
                select: {
                  id: true,
                  deleted: true,
                },
              },
              notes: {
                select: {
                  id: true,
                  note: true,
                  deleted: true,
                  files: true,
                  links: true,
                },
              },
              compliance_responses: {
                where: {
                  id,
                },
                select: {
                  id: true,
                  org_response: true,
                  ai_response: {
                    select: {
                      id: true,
                      answer: true,
                      justification: true,
                      sources: true,
                      references: true,
                      additional_context: true,
                      deleted: true,
                      files: true,
                    },
                  },
                  compliance_section_group: {
                    select: {
                      id: true,
                      title: true,
                      order: true,
                      deleted: true,
                      compliance_sections: {
                        select: {
                          id: true,
                          key: true,
                          title: true,
                          order: true,
                          deleted: true,
                          compliance_section_dependency_chains: true,
                          compliance_questions: {
                            select: {
                              id: true,
                              key: true,
                              order: true,
                              component: true,
                              tooltip: true,
                              placeholder: true,
                              rubric: true,
                              options: true,
                              question_summary: true,
                              coresponding_question: true,
                              additional_context: true,
                              deleted: true,
                            },
                          },
                        },
                      },
                    },
                  },
                  deleted: true,
                },
              },
              deleted: true,
            },
          },
        },
      });

      if (!organization) {
        throw new NotFoundException(`Organization ${orgId} not found`);
      }

      return { ...organization };
    } catch (error) {
      this.logger.error(`Error getting responses for organization: ${orgId}: ${compliance_definition_name}`, {
        user,
        error,
      });
      throw error;
    }
  }

  async deleteComplianceResponses(organization: organizations, compliance: organization_compliance, user, includeUserResponses = false) {
    try {
      this.logger.info(`Clearing previous responses for ${organization.name}: ${compliance.compliance_definition_name}`, {
        user,
        ...compliance,
        organization: { id: organization.id, name: organization.name, display_name: organization.display_name },
      });

      await this.prisma.extended.compliance_responses.deleteMany({
        where: { organization_compliance_id: compliance.id },
      });

      if (includeUserResponses) {
        await this.prisma.extended.organization_compliance_responses.deleteMany({
          where: { organization_compliance_id: compliance.id },
        });
      }
    } catch (error) {
      this.logger.error(`Error clearing previous responses for ${organization.name}: ${compliance.compliance_definition_name}`, {
        user,
        compliance,
        organization,
        error,
      });
      throw error;
    }
  }
}
