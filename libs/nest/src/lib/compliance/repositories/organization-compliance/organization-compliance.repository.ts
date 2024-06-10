import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { PrismaService } from '../../../prisma';
import { IAuthenticatedUser } from '../../../primitives';

@Injectable()
export class OrganizationComplianceRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(OrganizationComplianceRepository.name);
  }

  /**
   * Get all organization compliance definitions
   */
  async getOrgComplianceDefinitions(orgId: string, user: IAuthenticatedUser) {
    try {
      return this.prisma.extended.organization_compliance.findMany({
        where: { organization_id: orgId },
        include: {
          compliance_definition: true,
        },
      });
    } catch (error) {
      this.logger.error(`Error getting compliance definitions`, { organization: { id: orgId }, error, user });
      throw error;
    }
  }

  async getOrgComplianceDefinitionById(orgId: string, id: string, user: IAuthenticatedUser) {
    try {
      return this.prisma.extended.organization_compliance.findUnique({
        where: {
          organization_id: orgId,
          id,
        },
      });
    } catch (error) {
      this.logger.error(`Error getting compliance definition`, { id, error, user });
      throw error;
    }
  }

  async getOrgComplianceDefinitionByName(orgId: string, name: string, user: IAuthenticatedUser) {
    try {
      const compliance = await this.prisma.extended.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            compliance_definition_name: name,
            organization_id: orgId,
          },
        },
        select: {
          id: true,
          organization_id: true,
          compliance_definition_name: true,
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
                          id: true,
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
        throw new NotFoundException({ organization: { id: orgId }, compliance, user }, `Compliance definition not found`);
      }

      this.logger.log(`Got compliance definition`, { organization: { id: orgId }, compliance, user });

      return compliance;
    } catch (error) {
      this.logger.error(`Error getting compliance definition`, { organization: { id: orgId }, compliance: { name }, error, user });
      throw error;
    }
  }

  async createOrgCompliance(name: string, orgId: string, data: any, user: IAuthenticatedUser) {
    try {
      data.compliance_definition_name = name;

      data.organization_id = orgId;

      return this.prisma.extended.organization_compliance.create({
        id: new Cuid2Generator(GuidPrefixes.OrganizationCompliance).scopedId,
        ...data,
      });
    } catch (error) {
      this.logger.error(`Error creating compliance definition`, { name, organization: { id: orgId }, ...data, error, user });
      throw error;
    }
  }

  async updateOrgComplianceDefinition(name: string, orgId: string, data: any, user: IAuthenticatedUser) {
    try {
      const userResponse = await this.prisma.extended.organization_compliance.update({
        where: {
          orgIdCompNameKey: {
            compliance_definition_name: name,
            organization_id: data.organization_id,
          },
        },
        data,
      });

      return userResponse;
    } catch (error) {
      this.logger.error(`Error updating compliance definition`, { name, organization: { id: orgId }, ...data, error, user });
      throw error;
    }
  }

  async deleteOrgComplianceDefinition(name: string, orgId: string, user: IAuthenticatedUser) {
    try {
      return this.prisma.extended.organization_compliance.delete({
        where: {
          orgIdCompNameKey: {
            compliance_definition_name: name,
            organization_id: orgId,
          },
        },
      });
    } catch (error) {
      this.logger.error(`Error deleting compliance definition`, { name, organization: { id: orgId }, error, user });
      throw error;
    }
  }
}
