import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { organization_compliance_ai_responses, organization_compliance_responses, organizations, Prisma } from '@prisma/client';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { IAuthenticatedUser } from '../../../primitives';
import { ScoringService } from '../../scoring';
import { pick, set } from 'lodash';
import { CacheService } from '../../../cache';

export interface ComplianceResponseOptions {
  take?: number;
  skip?: number;
  sectionGroupFilter?: { where: { [key: string]: any } };
  sectionFilter?: { where: { [key in Prisma.Compliance_sectionsScalarFieldEnum]: any } };
  questionFilter?: { where: { [key in Prisma.Compliance_responsesScalarFieldEnum]: any } };
  sectionOptions?: { pagination: { take: number; skip: number } };
  questionOptions?: { pagination: { take: number; skip: number } };
  references?: boolean;
  responses?: boolean;
  bookmarks?: boolean;
  onlyCounts?: boolean;
  bpc?: boolean;
}

@Injectable()
export class ComplianceResponsesRepository extends BaseWorker {
  defaultOptions: ComplianceResponseOptions = {
    responses: true,
    bookmarks: true,
    references: true,
    questionOptions: { pagination: { take: 100, skip: 0 } },
    sectionOptions: { pagination: { take: 100, skip: 0 } },
    onlyCounts: false, // Only return the counts
    questionFilter: undefined,
    sectionFilter: undefined,
  };

  constructor(readonly prisma: PrismaService, readonly scoringService: ScoringService, readonly cacheService: CacheService) {
    super(ComplianceResponsesRepository.name);
  }

  getCacheKey(org: organizations, name: string, options?: ComplianceResponseOptions) {
    return options
      ? `organizations:${org.id}:compliance:${name}:responses:${options.responses}:references:${options.references}:bookmarks:${options.bookmarks}:take:${options.take}:skip:${options.skip}`
      : `organizations:${org.id}:compliance:${name}:responses`;
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

  getSectionGroupQuery(org: organizations, user: IAuthenticatedUser, options: ComplianceResponseOptions) {
    const query = {
      select: {
        id: true,
        title: true,
        order: true,
        compliance_sections: this.getSectionQuery(org, user, options),
      },
    };

    if (options?.sectionGroupFilter) {
      query['where'] = options.sectionGroupFilter;
    }

    return query;
  }

  getSectionQuery(org: organizations, user: IAuthenticatedUser, options: ComplianceResponseOptions) {
    const query = {
      select: {
        id: true,
        key: true,
        title: true,
        order: true,
        compliance_section_dependency_chains: true,
        compliance_questions: this.getQuestionsQuery(org, user, options),
      },
    };

    if (options?.sectionOptions) {
      query['take'] = options.sectionOptions.pagination.take;
      query['skip'] = options.sectionOptions.pagination.skip;
    }

    if (options?.sectionFilter) {
      query['where'] = options.sectionFilter;
    }

    return query;
  }

  private getQuestionsQuery(org: organizations, user: IAuthenticatedUser, options?: ComplianceResponseOptions) {
    const query = {
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
        dependencies: true,
        dependency_expression: true,
        question_bookmarks: options?.bookmarks ? this.getBookmarkQuery(user.coldclimate_claims.email) : false,
        compliance_responses: {
          where: {
            organization_id: org.id,
          },
          select: {
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
          },
        },
        question_summary: true,
      },
    };

    if (options?.questionFilter) {
      query['where'] = options.questionFilter;
    }

    if (options?.questionOptions?.pagination) {
      query['take'] = options.questionOptions.pagination.take;
      query['skip'] = options.questionOptions.pagination.skip;
    }

    return query;
  }

  /**
   * Create or Update a compliance response
   * @param org
   * @param compliance_definition_name
   * @param sId
   * @param sgId
   * @param qId
   * @param user
   * @param user_response
   * @param ai_response
   */
  async updateComplianceResponse(
    org: organizations,
    compliance_definition_name: string,
    sgId: string,
    sId: string,
    qId: string,
    user: IAuthenticatedUser,
    user_response?: organization_compliance_responses,
    ai_response?: organization_compliance_ai_responses,
  ) {
    await this.cacheService.delete(this.getCacheKey(org, compliance_definition_name), true);

    const tstart = new Date();

    if (!sId) throw new BadRequestException('Compliance Section ID is required');
    if (!sgId) throw new BadRequestException('Compliance Section Group ID is required');
    if (!compliance_definition_name) throw new BadRequestException('Compliance Definition Name is required');
    if (!org) throw new BadRequestException('Organization is required');
    if (!user) throw new BadRequestException('User is required');

    let compliance;

    try {
      let start = new Date();
      compliance = await this.prisma.organization_compliance.findUnique({
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

      if (!Object.prototype.hasOwnProperty.call(user_response, 'value') && (!Object.prototype.hasOwnProperty.call(ai_response, 'answer') || !ai_response?.justification)) {
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
        duration: new Date().getTime() - start.getTime(),
      });

      let orgResponseEntity, aiResponseEntity;

      // If the AI response is provided, save it
      if (ai_response && (Object.prototype.hasOwnProperty.call(ai_response, 'answer') || ai_response?.justification)) {
        const aiResponse = await this.upsertAIResponse(start, aiResponseEntity, ai_response, compliance, org, qId, user);
        start = aiResponse.start;
        aiResponseEntity = aiResponse.aiResponseEntity;
      }

      // If the user response is provided, save it
      if (user_response && Object.prototype.hasOwnProperty.call(user_response, 'value')) {
        const orgResponse = await this.upsertOrgResponse(start, orgResponseEntity, compliance, qId, user_response, org, user);
        start = orgResponse.start;
        orgResponseEntity = orgResponse.orgResponseEntity;

        if (!org.isTest) {
          const question = await this.prisma.compliance_questions.findUnique({
            where: {
              id: qId,
            },
          });

          this.sendMetrics('organization.compliance.user.responses', 'cold-nest', 'update', 'completed', {
            sendEvent: true,
            start,
            tags: {
              key: question ? question.key : '',
              question_id: qId,
              section_id: sId,
              section_group_id: sgId,
              compliance: compliance.compliance_definition_name,
              organization_id: org.id,
              organization_name: org.name,
              email: user.coldclimate_claims.email,
            },
          });
        }
      }

      if (orgResponseEntity || aiResponseEntity) {
        //await this.upsertComplianceResponse(start, ai_response, qId, sId, sgId, org, compliance, aiResponseEntity, orgResponseEntity, user, user_response);
      }

      this.logger.info(`Upserted response for ${org.name}: ${compliance.compliance_definition_name}`, {
        user,
        user_response,
        ai_response,
        organization: org,
        duration: new Date().getTime() - tstart.getTime(),
      });
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

    try {
      const orgCompliance = await this.prisma.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: org.id,
            compliance_definition_name: compliance_definition_name,
          },
        },
      });
      // If the organization compliance is not found, create it since they are trying to access the compliance set for the first time
      if (!orgCompliance) {
        const compliance = await this.prisma.compliance_definitions.findUnique({
          where: {
            name: compliance_definition_name,
          },
        });

        if (!compliance || !compliance.id) {
          throw new NotFoundException(`Compliance Definition ${compliance_definition_name} not found`);
        }

        await this.prisma.organization_compliance.create({
          data: {
            id: new Cuid2Generator(GuidPrefixes.OrganizationCompliance).scopedId,
            organization_id: org.id,
            compliance_definition_name: compliance_definition_name,
            compliance_definition_id: compliance.id,
            description: '',
          },
        });
      }

      const organization = (await this.prisma.organizations.findUnique({
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
                  compliance_section_groups: this.getSectionGroupQuery(org, user, Object.assign(this.defaultOptions, options)),
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

  /**
   * Get the scored compliance question responses
   * @param org
   * @param compliance_definition_name
   * @param user
   * @param options
   * @param bpc
   */
  async getScoredComplianceQuestionsByName(org: organizations, compliance_definition_name: string, user: IAuthenticatedUser, options?: ComplianceResponseOptions) {
    const start = new Date();

    if (options?.bpc) {
      await this.cacheService.delete(this.getCacheKey(org, compliance_definition_name), true);
    } else {
      const key = this.getCacheKey(org, compliance_definition_name, options);
      const scoredCompliance = await this.cacheService.get(key);

      if (!scoredCompliance) {
        options ? (options.bpc = true) : (options = { bpc: true });
        return this.getScoredComplianceQuestionsByName(org, compliance_definition_name, user, options);
      }

      this.logger.info(`Cache hit for ${org.name}: ${compliance_definition_name} in ${new Date().getTime() - start.getTime()}ms`, { compliance_definition_name });

      return scoredCompliance;
    }

    if (!compliance_definition_name) throw new BadRequestException('Compliance Definition Name is required');
    if (!org) throw new BadRequestException('Organization is required');
    if (!user) throw new BadRequestException('User is required');

    try {
      const orgComp = await this.prisma.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: org.id,
            compliance_definition_name: compliance_definition_name,
          },
        },
        select: {
          organization_id: true,
          compliance_definition_id: true,
          compliance_definition_name: true,
          visible: true,
        },
      });

      if (!orgComp?.compliance_definition_id) {
        throw new NotFoundException(`Organization Compliance for ${compliance_definition_name} not found for Organization ${org.name}`, {
          description: `Organization Compliance for ${compliance_definition_name} not found for Organization ${org.name}`,
        });
      }

      const query = {
        where: {
          orgIdCompNameKey: {
            organization_id: org.id,
            compliance_definition_name: compliance_definition_name,
          },
        },
        select: {
          visible: true,
          compliance_definition: {
            select: {
              name: true,
              compliance_section_groups: this.getSectionGroupQuery(org, user, Object.assign(this.defaultOptions, options)),
            },
          },
        },
      };
      const response = await this.prisma.organization_compliance.findUnique(query);

      if (!response) {
        throw new NotFoundException(`No Compliance Found For ${org.name}`);
      }

      const organization = pick(org, ['id', 'name', 'display_name']) as any;

      set(organization, 'organization_compliance', response);

      const scored = await this.scoringService.scoreComplianceResponse(organization.organization_compliance.compliance_definition, org, user, options);

      scored.visible = organization.organization_compliance.visible;

      const end = new Date();
      this.logger.info(`getScoredComplianceQuestionsByName completed for ${org.name}: ${compliance_definition_name} in ${end.getTime() - start.getTime()}ms`, {
        compliance_definition_name,
      });

      await this.cacheService.set(this.getCacheKey(org, compliance_definition_name, options), scored, { ttl: 60 * 60 * 24 });

      return scored;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(`Error getting responses for organization: ${org.name}: ${compliance_definition_name}`, {
          user,
          error,
        });
      }

      const end = new Date();
      this.logger.info(`getScoredComplianceQuestionsByName completed with error for ${org.name}: ${compliance_definition_name} in ${end.getTime() - start.getTime()}ms`, {
        compliance_definition_name,
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
      const response = await this.prisma.organizations.findUnique({
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
                          compliance_questions: this.getQuestionsQuery(org, user, options),
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
      const response = await this.prisma.organizations.findUnique(query);

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
      const response = await this.prisma.organizations.findUnique({
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
                          compliance_questions: this.getQuestionsQuery(org, user, options),
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
      const response = await this.prisma.organizations.findUnique({
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
                              dependencies: true,
                              dependency_expression: true,
                              additional_context: true,
                              question_bookmarks: options.bookmarks ? this.getBookmarkQuery(user.coldclimate_claims.email) : false,
                              compliance_responses: {
                                select: {
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

  async deleteAllAiResponsesByName(org: organizations, orgComp: any, user: IAuthenticatedUser) {
    await this.cacheService.delete(this.getCacheKey(org, orgComp.compliance_definition_name), true);

    const compliance = await this.prisma.organization_compliance.findUnique({
      where: {
        orgIdCompNameKey: {
          organization_id: org.id,
          compliance_definition_name: orgComp.compliance_definition_name,
        },
      },
    });

    try {
      if (!compliance) {
        throw new NotFoundException(`Organization Compliance Definition ${orgComp.compliance_definition_name} not found for organization ${org.name}`);
      }

      this.logger.info(`Clearing previous AI responses for ${org.name}: ${orgComp.compliance_definition_name}`, {
        user,
        compliance,
        organization: org,
      });

      return await this.prisma.organization_compliance_ai_responses.deleteMany({
        where: {
          organization_compliance_id: compliance.id,
          organization_id: org.id,
        },
      });
    } catch (error) {
      this.logger.error(`Error clearing previous AI responses for ${org.name}: ${orgComp.compliance_definition_name}`, {
        user,
        compliance,
        organization: org,
        error,
      });
      throw error;
    }
  }

  async deleteComplianceResponse(org: organizations, compliance_definition_name: string, sgId: string, sId: string, qId: string, user: IAuthenticatedUser, type: string = 'ai') {
    const start = new Date();
    await this.cacheService.delete(this.getCacheKey(org, compliance_definition_name), true);

    const compliance = await this.prisma.organization_compliance.findUnique({
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

      const question = await this.prisma.compliance_questions.findUnique({
        where: {
          id: qId,
        },
      });

      let response: any;
      switch (type) {
        case 'ai':
          response = await this.prisma.organization_compliance_ai_responses.delete({
            where: { orgCompQuestId: { organization_compliance_id: compliance.id, compliance_question_id: qId } },
          });
          this.sendMetrics('organization.compliance.ai.responses', 'cold-nest', 'delete', 'completed', {
            sendEvent: true,
            start,
            tags: {
              key: question ? question.key : '',
              question_id: qId,
              section_id: sId,
              section_group_id: sgId,
              compliance: compliance.compliance_definition_name,
              organization_id: org.id,
              organization_name: org.name,
              email: user.coldclimate_claims.email,
              data: response,
            },
          });
          break;
        case 'org':
          response = await this.prisma.organization_compliance_responses.deleteMany({
            where: { organization_compliance_id: compliance.id, compliance_question_id: qId },
          });
          this.sendMetrics('organization.compliance.user.responses', 'cold-nest', 'delete', 'completed', {
            sendEvent: true,
            start,
            tags: {
              key: question ? question.key : '',
              question_id: qId,
              section_id: sId,
              section_group_id: sgId,
              compliance: compliance.compliance_definition_name,
              organization_id: org.id,
              organization_name: org.name,
              email: user.coldclimate_claims.email,
              data: response,
            },
          });
          break;
        case 'all': {
          response = this.prisma.organization_compliance_ai_responses.deleteMany({
            where: { organization_compliance_id: compliance.id },
          });

          const orgResponse = await this.prisma.organization_compliance_responses.deleteMany({
            where: { organization_compliance_id: compliance.id },
          });
          this.sendMetrics('organization.compliance.responses', 'cold-nest', 'delete_all', 'completed', {
            sendEvent: true,
            start,
            tags: {
              compliance: compliance.compliance_definition_name,
              organization_id: org.id,
              organization_name: org.name,
              email: user.coldclimate_claims.email,
              data: { aiResponse: response, orgResponse },
            },
          });
          return { aiResponse: response, orgResponse };
        }
        default:
          throw new BadRequestException(`Invalid type ${type} provided`);
      }
      return response;
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

  private async upsertComplianceResponse(
    start: Date,
    ai_response:
      | undefined
      | {
          id: string;
          answer: Prisma.JsonValue | null;
          justification: string;
          references: Prisma.JsonValue | null;
          sources: Prisma.JsonValue | null;
          additional_context: Prisma.JsonValue | null;
          organization_id: string;
          organization_compliance_id: string;
          created_at: Date;
          updated_at: Date;
          compliance_question_id: string;
          deleted: boolean;
        },
    qId: string,
    sId: string,
    sgId: string,
    org: {
      id: string;
      name: string;
      enabled_connections: Prisma.JsonValue;
      display_name: string;
      branding: Prisma.JsonValue | null;
      phone: string | null;
      website: string | null;
      email: string | null;
      created_at: Date;
      updated_at: Date;
      isTest: boolean;
      deleted: boolean;
    },
    compliance,
    aiResponseEntity,
    orgResponseEntity,
    user: IAuthenticatedUser,
    user_response:
      | undefined
      | {
          id: string;
          value: Prisma.JsonValue | null;
          created_at: Date;
          updated_at: Date;
          compliance_question_id: string;
          organization_compliance_id: string;
          additional_context: Prisma.JsonValue | null;
          deleted: boolean;
        },
  ) {
    start = new Date();

    await this.cacheService.delete(this.getCacheKey(org, compliance.compliance_definition_name), true);

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
    await this.prisma.compliance_responses.upsert({
      where: {
        orgCompQuestId: {
          organization_compliance_id: compliance.id,
          compliance_question_id: ai_response?.compliance_question_id || qId,
        },
      },
      create: crData,
      update: crData,
    });

    this.logger.info(`Saved Compliance response for ${org.name}: ${compliance.compliance_definition_name}`, {
      user,
      user_response,
      ai_response,
      organization: org,
      duration: new Date().getTime() - start.getTime(),
    });
  }

  private async upsertOrgResponse(
    start: Date,
    orgResponseEntity,
    compliance,
    qId: string,
    user_response: {
      id: string;
      value: Prisma.JsonValue | null;
      created_at: Date;
      updated_at: Date;
      compliance_question_id: string;
      organization_compliance_id: string;
      additional_context: Prisma.JsonValue | null;
      deleted: boolean;
    },
    org: {
      id: string;
      name: string;
      enabled_connections: Prisma.JsonValue;
      display_name: string;
      branding: Prisma.JsonValue | null;
      phone: string | null;
      website: string | null;
      email: string | null;
      created_at: Date;
      updated_at: Date;
      isTest: boolean;
      deleted: boolean;
    },
    user: IAuthenticatedUser,
  ) {
    start = new Date();
    await this.cacheService.delete(this.getCacheKey(org, compliance.compliance_definition_name), true);

    orgResponseEntity = await this.prisma.organization_compliance_responses.upsert({
      where: {
        orgCompQuestId: {
          organization_compliance_id: compliance.id,
          compliance_question_id: qId || user_response?.compliance_question_id,
        },
      },
      create: {
        id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceResponse).scopedId,
        organization_compliance_id: compliance.id,
        compliance_question_id: qId || user_response?.compliance_question_id,
        // @ts-expect-error - This is a valid value
        value: user_response.value,
      },
      update: {
        // @ts-expect-error - This is a valid value
        value: user_response.value,
      },
    });

    this.logger.info(`Saved User response for ${org.name}: ${compliance.compliance_definition_name}`, {
      user,
      user_response,
      organization: org,
      duration: new Date().getTime() - start.getTime(),
    });

    const question = await this.prisma.compliance_questions.findUnique({
      where: {
        id: qId,
      },
    });

    this.sendMetrics('organization.compliance.user.responses', 'cold-nest', 'update', 'completed', {
      sendEvent: true,
      start,
      tags: {
        key: question ? question.key : '',
        question_id: qId,
        compliance: compliance.compliance_definition_name,
        organization_id: org.id,
        organization_name: org.name,
        email: user.coldclimate_claims.email,
        data: orgResponseEntity,
      },
    });
    return { start, orgResponseEntity };
  }

  private async upsertAIResponse(
    start: Date,
    aiResponseEntity,
    ai_response: {
      id: string;
      answer: Prisma.JsonValue | null;
      justification: string;
      references: Prisma.JsonValue | null;
      sources: Prisma.JsonValue | null;
      additional_context: Prisma.JsonValue | null;
      organization_id: string;
      organization_compliance_id: string;
      created_at: Date;
      updated_at: Date;
      compliance_question_id: string;
      deleted: boolean;
    },
    compliance,
    org: organizations,
    qId: string,
    user: IAuthenticatedUser,
  ) {
    start = new Date();
    await this.cacheService.delete(this.getCacheKey(org, compliance.compliance_definition_name), true);

    aiResponseEntity = await this.prisma.organization_compliance_ai_responses.upsert({
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
    this.logger.info(`Saved AI response for ${org.name}: ${compliance.compliance_definition_name}`, {
      user,
      ai_response,
      organization: org,
      duration: new Date().getTime() - start.getTime(),
    });

    const question = await this.prisma.compliance_questions.findUnique({
      where: {
        id: qId,
      },
    });

    this.sendMetrics('organization.compliance.ai.responses', 'cold-nest', 'update', 'completed', {
      sendEvent: false,
      start,
      tags: {
        key: question ? question.key : '',
        question_id: qId,
        compliance: compliance.compliance_definition_name,
        organization_id: org.id,
        organization_name: org.name,
        email: user.coldclimate_claims.email,
        data: aiResponseEntity,
      },
    });

    return { start, aiResponseEntity };
  }
}
