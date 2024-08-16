import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { PrismaService } from '../../../prisma';
import { IAuthenticatedUser } from '../../../primitives';
import { organizations } from '@prisma/client';
import { CacheService } from '../../../cache';

@Injectable()
export class OrganizationComplianceRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly cacheService: CacheService) {
    super(OrganizationComplianceRepository.name);
  }

  /**
   * Get organization compliances by name for all orgs
   */
  async getOrgComplianceDefinitions(name: string, user: IAuthenticatedUser, organization: organizations) {
    try {
      return this.prisma.organization_compliance.findMany({
        where: { compliance_definition_name: name },
        include: {
          compliance_definition: true,
          statuses: {
            take: 1,
            select: {
              id: true,
              type: true,
              updated_at: true,
              created_at: true,
            },
            orderBy: {
              created_at: 'desc',
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(`Error getting compliance definitions`, { organization, error, user });
      throw error;
    }
  }

  /**
   * Get organization compliance by name and Org
   * @param name
   * @param user
   * @param organization
   */
  async getOrgComplianceByName(name: string, user: IAuthenticatedUser, organization: organizations) {
    try {
      const compliance: any = await this.prisma.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: organization.id,
            compliance_definition_name: name,
          },
        },
        select: {
          visible: true,
          statuses: {
            take: 1,
            select: {
              id: true,
              type: true,
              updated_at: true,
              created_at: true,
            },
            orderBy: {
              created_at: 'desc',
            },
          },
          id: true,
          compliance_definition_name: true,
          organization: true,
          compliance_definition: {
            select: {
              id: true,
              name: true,
              title: true,
              version: true,
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
                      dependency_expression: true,
                      compliance_questions: {
                        select: {
                          id: true,
                          key: true,
                          order: true,
                          prompt: true,
                          component: true,
                          tooltip: true,
                          placeholder: true,
                          rubric: true,
                          options: true,
                          coresponding_question: true,
                          dependency_expression: true,
                          question_summary: true,
                          additional_context: true,
                          compliance_section_id: true,
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

      return compliance;
    } catch (error) {
      this.logger.error(`Error getting compliance definition`, { organization, compliance: { name }, error, user });
      throw error;
    }
  }
  async getOrgComplianceDefinitionByName(name: string, user: IAuthenticatedUser, organization: organizations) {
    try {
      const compliance = await this.prisma.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            compliance_definition_name: name,
            organization_id: organization.id,
          },
        },
        select: {
          statuses: {
            take: 1,
            select: {
              id: true,
              type: true,
              updated_at: true,
              created_at: true,
            },
            orderBy: {
              created_at: 'desc',
            },
          },
          visible: true,
          id: true,
          organization_id: true,
          compliance_definition: {
            select: {
              name: true,
              sections: {
                select: {
                  id: true,
                  title: true,
                  key: true,
                  order: true,
                  compliance_questions: {
                    select: {
                      id: true,
                      key: true,
                      prompt: true,
                      component: true,
                      options: true,
                      rubric: true,
                      order: true,
                      compliance_responses: {
                        select: {
                          ai_response: {
                            select: {
                              id: true,
                              answer: true,
                            },
                          },
                          org_response: {
                            select: {
                              id: true,
                              value: true,
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

      if (!compliance) {
        throw new NotFoundException({ organization, compliance, user }, `Compliance definition not found`);
      }

      this.logger.log(`Got compliance definition`, { organization, compliance, user });

      return compliance;
    } catch (error) {
      this.logger.error(`Error getting compliance definition`, { organization, compliance: { name }, error, user });
      throw error;
    }
  }

  async createOrgCompliance(name: string, data: any, user: IAuthenticatedUser, organization: organizations) {
    try {
      const start = new Date();
      await this.cacheService.delete(`organizations:${organization.id}:compliance:${name}`, true);

      data.compliance_definition_name = name;

      data.organization_id = organization.id;
      data.id = new Cuid2Generator(GuidPrefixes.OrganizationCompliance).scopedId;
      data.description = '';

      const compliance = await this.prisma.organization_compliance.create({
        data,
      });

      this.sendMetrics('organization.compliance', 'cold-nest', 'create', 'completed', {
        sendEvent: true,
        start,
        tags: { organization, user, compliance: compliance },
      });

      return compliance;
    } catch (error) {
      this.logger.error(`Error creating compliance definition`, { name, organization, ...data, error, user });
      throw error;
    }
  }

  async updateOrgComplianceDefinition(name: string, data: any, user: IAuthenticatedUser, organization: organizations) {
    try {
      const start = new Date();
      await this.cacheService.delete(`organizations:${organization.id}:compliance:${name}`, true);

      const userResponse = await this.prisma.organization_compliance.update({
        where: {
          orgIdCompNameKey: {
            compliance_definition_name: name,
            organization_id: data.organization_id,
          },
        },
        data,
      });

      this.sendMetrics('organization.compliance', 'cold-nest', 'update', 'completed', {
        sendEvent: true,
        start,
        tags: { organization, user, compliance: userResponse },
      });

      return userResponse;
    } catch (error) {
      this.logger.error(`Error updating compliance definition`, { name, organization, ...data, error, user });
      throw error;
    }
  }

  async deleteOrgComplianceDefinition(name: string, user: IAuthenticatedUser, organization: organizations) {
    try {
      const start = new Date();
      await this.cacheService.delete(`organizations:${organization.id}:compliance:${name}`, true);

      const deleted = this.prisma.organization_compliance.delete({
        where: {
          orgIdCompNameKey: {
            compliance_definition_name: name,
            organization_id: organization.id,
          },
        },
      });

      this.sendMetrics('organization.compliance', 'cold-nest', 'delete', 'completed', {
        sendEvent: true,
        start,
        tags: { organization, user, compliance: deleted },
      });

      return deleted;
    } catch (error) {
      this.logger.error(`Error deleting compliance definition`, { name, organization, error, user });
      throw error;
    }
  }
}
