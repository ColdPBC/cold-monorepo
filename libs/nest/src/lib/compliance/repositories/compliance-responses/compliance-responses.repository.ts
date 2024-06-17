import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { organization_compliance, organization_compliance_ai_responses, organization_compliance_responses, organizations } from '@prisma/client';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { IAuthenticatedUser } from '../../../primitives';
import { ScoringService } from '../../scoring';
import { pick, set } from 'lodash';

export interface ComplianceResponseOptions {
  take?: number;
  skip?: number;
  references?: boolean;
  responses?: boolean;
  bookmarks?: boolean;
}

@Injectable()
export class ComplianceResponsesRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly scoringService: ScoringService) {
    super(ComplianceResponsesRepository.name);
  }

  private getBookmarkQuery(email: string) {
    return {
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
      },
    };
  }

  private getQuestionsQuery(options: ComplianceResponseOptions, org: organizations, user: IAuthenticatedUser) {
    return {
      take: options?.take,
      skip: options?.skip,
      select: {
        id: true,
        key: true,
        order: true,
        component: true,
        prompt: true,
        tooltip: true,
        placeholder: true,
        rubric: true,
        options: true,
        additional_context: true,
        question_bookmarks: options?.bookmarks ? this.getBookmarkQuery(user.coldclimate_claims.email) : false,
        compliance_responses: {
          where: {
            organization_id: org.id,
          },
          select: {
            id: true,
            org_response: {
              select: {
                id: true,
                value: true,
                deleted: true,
              },
            },
            ai_response: {
              select: {
                id: true,
                answer: true,
                justification: true,
                references: options?.references,
              },
            },
            deleted: true,
          },
        },
      },
    };
  }

  /**
   * Create or Update a compliance response
   * @param orgId
   * @param compliance_definition_name
   * @param sId
   * @param sgId
   * @param qId
   * @param user
   * @param user_response
   * @param ai_response
   */
  async upsertComplianceResponse(
    org: organizations,
    compliance_definition_name: string,
    sgId: string,
    sId: string,
    qId: string,
    user: IAuthenticatedUser,
    user_response?: organization_compliance_responses,
    ai_response?: organization_compliance_ai_responses,
  ) {
    if (!sId) throw new BadRequestException('Compliance Section ID is required');
    if (!sgId) throw new BadRequestException('Compliance Section Group ID is required');
    if (!compliance_definition_name) throw new BadRequestException('Compliance Definition Name is required');
    if (!org) throw new BadRequestException('Organization is required');
    if (!user) throw new BadRequestException('User is required');

    let compliance;

    try {
      compliance = await this.prisma.extended.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: org.id,
            compliance_definition_name,
          },
        },
      });

      if (!compliance) {
        throw new NotFoundException(`Organization Compliance Definition ${compliance_definition_name} not found for organization ${org.name}`);
      }

      if (!user_response?.value && (!ai_response?.answer || !ai_response?.justification)) {
        throw new BadRequestException(`No User or AI response provided for ${org.name}: ${compliance.compliance_definition_name}, nothing to do`);
      }

      if (!ai_response?.compliance_question_id && !user_response?.compliance_question_id && !qId) {
        throw new BadRequestException(`No compliance question id provided for ${org.name}: ${compliance.compliance_definition_name}`);
      }

      this.logger.info(`Saving response for ${org.name}: ${compliance.compliance_definition_name}`, {
        user,
        user_response: user_response,
        ai_response,
        ...compliance,
        organization: { id: org.id, name: org.name, display_name: org.display_name },
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
            id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceAIResponse).scopedId,
            organization_id: org.id,
            organization_compliance_id: compliance.id,
            compliance_question_id: qId || ai_response.compliance_question_id,
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
              compliance_question_id: qId || user_response.compliance_question_id,
            },
          },
          create: {
            id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceResponse).scopedId,
            organization_compliance_id: compliance.id,
            compliance_question_id: qId || user_response.compliance_question_id,
            value: user_response.value,
          },
          update: {
            value: user_response.value,
          },
        });
      }

      if (orgResponseEntity || aiResponseEntity) {
        const crData = {
          compliance_question_id: ai_response?.compliance_question_id || qId,
          compliance_section_id: sId,
          compliance_section_group_id: sgId,
          organization_id: org.id,
          compliance_definition_name: compliance.compliance_definition_name,
          organization_compliance_id: compliance.id,
          organization_compliance_ai_response_id: aiResponseEntity?.id,
          organization_compliance_response_id: orgResponseEntity?.id,
        };
        await this.prisma.extended.compliance_responses.upsert({
          where: {
            orgCompQuestId: {
              organization_compliance_id: compliance.id,
              compliance_question_id: ai_response?.compliance_question_id || qId,
            },
          },
          create: crData,
          update: crData,
        });
      }
    } catch (error) {
      this.logger.error(`Error saving response for ${org.name}: ${compliance.compliance_definition_name}`, {
        user,
        user_response: user_response,
        ai_response,
        compliance,
        organization: org,
        error,
      });
      throw error;
    }
  }

  async getComplianceResponses(org: organizations, compliance_definition_name: string, user: IAuthenticatedUser, options?: ComplianceResponseOptions) {
    if (!compliance_definition_name) throw new BadRequestException('Compliance Definition Name is required');
    if (!org) throw new BadRequestException('Organization is required');
    if (!user) throw new BadRequestException('User is required');

    options = {
      responses: options?.responses ? options.responses : true,
      bookmarks: options?.references ? options.references : true,
      take: options?.take ? +options?.take : 100,
      skip: options?.skip ? +options?.skip : 0,
    };

    try {
      const organization = (await this.prisma.extended.organizations.findUnique({
        where: {
          id: org.id,
        },
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
                },
              },
              notes: {
                select: {
                  id: true,
                  note: true,
                  files: true,
                  links: true,
                },
              },
              compliance_definition: {
                select: {
                  id: true,
                  name: true,
                  compliance_section_groups: {
                    select: {
                      id: true,
                      title: true,
                      order: true,
                      compliance_sections: {
                        select: {
                          id: true,
                          key: true,
                          title: true,
                          order: true,
                          compliance_section_dependency_chains: true,
                          compliance_questions: this.getQuestionsQuery(options, org, user),
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })) as any;

      if (!organization) {
        throw new NotFoundException(`Organization responses for ${org.name} not found`);
      }

      /*
       * Score the compliance response
       */
      if (Array.isArray(organization?.organization_compliance) && organization?.organization_compliance.length > 0) {
        const compliance_response = organization?.organization_compliance[0];
        const response = await this.scoringService.scoreComplianceResponse(compliance_response?.compliance_definition, org, user);
        this.logger.log(`Scored ${compliance_definition_name} Compliance `, response);
      }

      // Map over the results and add the additional flags
      /* const complianceResponsesWithFlags = organization.organization_compliance.map(compliance => {
        const definition = compliance.compliance_definition;

        const aiAnswered = definition.response.ai_response && response.ai_response.answer && response.ai_response.answer.length > 0;
        const userAnswered = response.org_response && response.org_response.value && response.org_response.value.length > 0;
        const notAnswered = !aiAnswered && !userAnswered;

        return {
          ...response,
          aiAnswered,
          userAnswered,
          notAnswered,
        };
      });*/

      return { ...organization };
    } catch (error) {
      this.logger.error(`Error getting responses for organization: ${org.name}: ${compliance_definition_name}`, {
        user,
        error,
      });
      throw error;
    }
  }

  async getScoredComplianceQuestionsByName(org: organizations, compliance_definition_name: string, user: IAuthenticatedUser, options?: ComplianceResponseOptions) {
    if (!compliance_definition_name) throw new BadRequestException('Compliance Definition Name is required');
    if (!org) throw new BadRequestException('Organization is required');
    if (!user) throw new BadRequestException('User is required');

    options = {
      responses: options?.responses ? options.responses : true,
      bookmarks: options?.references ? options.references : true,
      take: options?.take ? +options?.take : 100,
      skip: options?.skip ? +options?.skip : 0,
    };

    try {
      const response = await this.prisma.extended.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: org.id,
            compliance_definition_name: compliance_definition_name,
          },
        },
        select: {
          compliance_definition: {
            select: {
              name: true,
              compliance_section_groups: {
                select: {
                  id: true,
                  title: true,
                  order: true,
                  compliance_sections: {
                    select: {
                      id: true,
                      key: true,
                      title: true,
                      order: true,
                      compliance_section_dependency_chains: true,
                      compliance_questions: this.getQuestionsQuery(options, org, user),
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!response) {
        throw new NotFoundException(`No Compliance Found For ${org.name}`);
      }

      const organization = pick(org, ['id', 'name', 'display_name']) as any;

      set(organization, 'organization_compliance', response);

      return this.scoringService.scoreComplianceResponse(organization.organization_compliance.compliance_definition, org, user, options);
    } catch (error) {
      this.logger.error(`Error getting responses for organization: ${org.name}: ${compliance_definition_name}`, {
        user,
        error,
      });
      throw error;
    }
  }

  async getScoredComplianceQuestionBySection(
    org: organizations,
    compliance_definition_name: string,
    sgId: string,
    sId: string,
    user: IAuthenticatedUser,
    options?: ComplianceResponseOptions,
  ) {
    if (!sId) throw new BadRequestException('Compliance Section ID is required');
    if (!sgId) throw new BadRequestException('Compliance Section Group ID is required');
    if (!compliance_definition_name) throw new BadRequestException('Compliance Definition Name is required');
    if (!org) throw new BadRequestException('Organization is required');
    if (!user) throw new BadRequestException('User is required');

    options = {
      responses: options?.responses ? options.responses : true,
      bookmarks: options?.bookmarks ? options.bookmarks : true,
      take: options?.take ? +options?.take : 100,
      skip: options?.skip ? +options?.skip : 0,
    };

    try {
      const response = await this.prisma.extended.organizations.findUnique({
        where: {
          id: org.id,
        },
        select: {
          id: true,
          name: true,
          organization_compliance: {
            where: { compliance_definition_name },
            select: {
              compliance_definition: {
                select: {
                  name: true,
                  compliance_section_groups: {
                    where: { id: sgId },
                    select: {
                      id: true,
                      title: true,
                      order: true,
                      compliance_sections: {
                        where: {
                          id: sId,
                        },
                        select: {
                          id: true,
                          key: true,
                          title: true,
                          order: true,
                          compliance_section_dependency_chains: true,
                          compliance_questions: this.getQuestionsQuery(options, org, user),
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!response) {
        throw new NotFoundException(`No Compliance Found For ${org.name}`);
      }

      return this.scoringService.scoreComplianceResponse(response.organization_compliance[0].compliance_definition, org, user, options);
    } catch (error) {
      this.logger.error(`Error getting responses for organization: ${org.name}: ${compliance_definition_name}`, {
        user,
        error,
      });
      throw error;
    }
  }

  async getScoredComplianceQuestionById(
    org: organizations,
    compliance_definition_name: string,
    sgId: string,
    sId: string,
    qId: string,
    user: IAuthenticatedUser,
    options?: ComplianceResponseOptions,
  ) {
    options = {
      responses: options?.responses ? options.responses : true,
      bookmarks: options?.bookmarks ? options.bookmarks : true,
      references: options?.references ? options.references : true,
      take: options?.take ? +options?.take : 100,
      skip: options?.skip ? +options?.skip : 0,
    };

    const query = {
      where: {
        id: org.id,
      },
      select: {
        id: true,
        name: true,
        organization_compliance: {
          where: { compliance_definition_name },
          select: {
            compliance_definition: {
              select: {
                name: true,
                compliance_section_groups: {
                  where: { id: sgId },
                  select: {
                    id: true,
                    title: true,
                    order: true,
                    compliance_sections: {
                      where: {
                        id: sId,
                      },
                      select: {
                        id: true,
                        key: true,
                        title: true,
                        order: true,
                        compliance_section_dependency_chains: true,
                        compliance_questions: {
                          where: {
                            id: qId,
                          },
                          select: {
                            id: true,
                            key: true,
                            order: true,
                            additional_context: true,
                            component: true,
                            question_bookmarks: options.bookmarks ? this.getBookmarkQuery(user.coldclimate_claims.email) : false,
                            compliance_responses: {
                              where: {
                                organization_id: org.id,
                              },
                              select: {
                                id: true,
                                ai_response: {
                                  select: {
                                    id: true,
                                    answer: true,
                                    justification: true,
                                    references: true,
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    try {
      const response = await this.prisma.extended.organizations.findUnique(query);

      if (!response) {
        throw new NotFoundException(`No Compliance Found For ${org.name}`);
      }

      return this.scoringService.scoreComplianceResponse(response.organization_compliance[0].compliance_definition, org, user);
    } catch (error) {
      this.logger.error(`Error getting responses for organization: ${org.name}: ${compliance_definition_name}`, {
        user,
        error,
      });
      throw error;
    }
  }

  async getScoredComplianceQuestionBySectionGroup(
    org: organizations,
    compliance_definition_name: string,
    csgId: string,
    user: IAuthenticatedUser,
    options?: ComplianceResponseOptions,
  ) {
    options = {
      responses: options?.responses ? options.responses : false,
      bookmarks: options?.references ? options.references : true,
      references: options?.references ? options.references : true,
      take: options?.take ? +options?.take : 100,
      skip: options?.skip ? +options?.skip : 0,
    };

    try {
      const response = await this.prisma.extended.organizations.findUnique({
        where: {
          id: org.id,
        },
        select: {
          id: true,
          name: true,
          organization_compliance: {
            where: { compliance_definition_name },
            select: {
              compliance_definition: {
                select: {
                  name: true,
                  compliance_section_groups: {
                    where: { id: csgId },
                    select: {
                      id: true,
                      title: true,
                      order: true,
                      compliance_sections: {
                        select: {
                          id: true,
                          key: true,
                          title: true,
                          order: true,
                          compliance_section_dependency_chains: true,
                          compliance_questions: this.getQuestionsQuery(options, org, user),
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!response || response.organization_compliance?.length < 1) {
        throw new NotFoundException(`No Compliance Found For ${org.name}`);
      }

      return this.scoringService.scoreComplianceResponse(response.organization_compliance[0].compliance_definition, org, user);
    } catch (error) {
      this.logger.error(`Error getting responses for organization: ${org.name}: ${compliance_definition_name}`, {
        user,
        error,
        organization: org,
      });
      throw error;
    }
  }

  async getComplianceResponseById(org: organizations, compliance_definition_name: string, user: IAuthenticatedUser, id: number, options?: ComplianceResponseOptions) {
    options = {
      responses: options?.responses ? options.responses : false,
      bookmarks: options?.references ? options.references : true,
      references: options?.references ? options.references : true,
      take: options?.take ? +options?.take : 100,
      skip: options?.skip ? +options?.skip : 0,
    };

    try {
      const response = await this.prisma.extended.organizations.findUnique({
        where: {
          id: org.id,
        },
        select: {
          id: true,
          name: true,
          organization_compliance: {
            where: { compliance_definition_name },
            select: {
              compliance_definition: {
                select: {
                  name: true,
                  compliance_section_groups: {
                    select: {
                      id: true,
                      title: true,
                      order: true,
                      compliance_sections: {
                        select: {
                          id: true,
                          key: true,
                          title: true,
                          order: true,
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
                              additional_context: true,
                              question_bookmarks: options.bookmarks ? this.getBookmarkQuery(user.coldclimate_claims.email) : false,
                              compliance_responses: {
                                where: {
                                  id,
                                },
                                select: {
                                  id: true,
                                  org_response: {
                                    select: {
                                      id: true,
                                      value: true,
                                    },
                                  },
                                  ai_response: {
                                    select: {
                                      id: true,
                                      answer: true,
                                      justification: true,
                                      references: options?.references,
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!response) {
        throw new NotFoundException(`Compliance responses with the id of ${id} do not belong to ${org.name} not found`);
      }

      return this.scoringService.scoreComplianceResponse(response.organization_compliance[0].compliance_definition, org, user);
    } catch (error) {
      this.logger.error(`Error getting responses for organization: ${org.id}: ${compliance_definition_name}`, {
        user,
        error,
      });
      throw error;
    }
  }

  async deleteComplianceResponses(org: organizations, compliance_definition_name: string, sgId: string, sId: string, qId: string, user: IAuthenticatedUser, type: string) {
    const compliance = await this.prisma.extended.organization_compliance.findUnique({
      where: {
        orgIdCompNameKey: {
          organization_id: org.id,
          compliance_definition_name,
        },
      },
    });

    try {
      if (!compliance) {
        throw new NotFoundException(`Organization Compliance Definition ${compliance_definition_name} not found for organization ${org.name}`);
      }

      this.logger.info(`Clearing previous responses for ${org.name}: ${compliance_definition_name}`, {
        user,
        compliance,
        options: { compliance_definition_name, sgId, sId, qId, type },
        org,
      });

      switch (type) {
        case 'ai':
          return await this.prisma.extended.organization_compliance_ai_responses.delete({
            where: { orgCompQuestId: { organization_compliance_id: compliance.id, compliance_question_id: qId } },
          });
        case 'org':
          return await this.prisma.extended.organization_compliance_responses.deleteMany({
            where: { organization_compliance_id: compliance.id, compliance_question_id: qId },
          });
        case 'all':
          await this.prisma.extended.organization_compliance_ai_responses.deleteMany({
            where: { organization_compliance_id: compliance.id },
          });
          return await this.prisma.extended.organization_compliance_responses.deleteMany({
            where: { organization_compliance_id: compliance.id },
          });
        default:
          throw new BadRequestException(`Invalid type ${type} provided`);
      }
    } catch (error) {
      this.logger.error(`Error clearing previous responses for ${org.name}: ${compliance_definition_name}`, {
        user,
        compliance,
        organization: org,
        error,
      });
      throw error;
    }
  }
}
