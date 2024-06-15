import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { ComplianceSectionsRepository } from '../compliance-sections';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { compliance_section_groups, compliance_section_groupsSchema } from '../../../../validation/generated/modelSchema/compliance_section_groupsSchema';
import { ComplianceSectionGroupsExtendedDto } from './dto';
import { FilteringService } from '../../filtering';

/**
 * Represents a repository for accessing compliance section groups data.
 * @constructor
 * @param {PrismaService} prisma - The Prisma service instance.
 */
@Injectable()
export class ComplianceSectionGroupsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly filterService: FilteringService, readonly complianceSectionsRepository: ComplianceSectionsRepository) {
    super(ComplianceSectionGroupsRepository.name);
  }

  validateSectionGroup(sectionGroup: compliance_section_groups) {
    try {
      compliance_section_groupsSchema.parse(sectionGroup);
    } catch (error) {
      this.logger.error(`Error validating section group`, { sectionGroup, error });
      throw error;
    }
  }

  /**
   * Creates a new section group.
   *
   * @param {string} compliance_name - The name of the compliance set.
   * @param {Partial<compliance_section_groups>} sectionGroup - The section group to create.
   *
   * @throws {Error} - Throws an error if the compliance definition name is not provided.
   */
  async createSectionGroup(sectionGroup: ComplianceSectionGroupsExtendedDto) {
    try {
      sectionGroup.id = new Cuid2Generator(GuidPrefixes.SectionGroup).scopedId;

      const data = compliance_section_groupsSchema
        .partial({
          created_at: true,
          updated_at: true,
          deleted: true,
        })
        .parse(sectionGroup);

      return this.prisma.extended.compliance_section_groups.create({
        data: data,
      });
    } catch (error: any) {
      this.logger.error(`Error creating section group`, { sectionGroup, error });
      throw new UnprocessableEntityException(JSON.parse(error.message), { sectionGroup, ...error });
    }
  }
  /**
   * Retrieves a list of section groups for a given organization and compliance set.
   * @throws {Error} - Throws an error if the compliance definition is not found.
   */
  async getSectionGroupList(where: { compliance_definition_name?: string; title?: string }, filter?: boolean, questions?: boolean) {
    try {
      const groupList = (await this.prisma.extended.compliance_section_groups.findMany({
        where: where,
        select: {
          id: true,
          title: true,
          metadata: true,
          order: true,
          compliance_definition_name: true,
          compliance_sections: {
            select: {
              id: true,
              key: true,
              title: true,
              metadata: true,
              order: true,
              compliance_section_dependency_chains: true,
              compliance_questions: questions
                ? {
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
                      question_summary: true,
                      coresponding_question: true,
                      compliance_question_dependency_chain: true,
                    },
                  }
                : false,
            },
          },
        },
      })) as ComplianceSectionGroupsExtendedDto[];

      if (filter) {
        if (groupList.length < 1) {
          return [];
        }
        return await this.filterService.filterSectionGroups(groupList);
      }

      return groupList;
    } catch (error) {
      this.logger.error(`Error getting section group list`, { where, error });
      throw error;
    }
  }

  async getSectionGroup(
    where: { compDefNameTitle: { compliance_definition_name: string; title: string } } | { compliance_definition_name: string; id: string },
    filter?: boolean,
    questions?: boolean,
  ) {
    try {
      const sectionGroup = this.prisma.extended.compliance_section_groups.findUnique({
        where: {
          ...where,
        },
        select: {
          id: true,
          title: true,
          metadata: true,
          order: true,
          compliance_definition_name: true,
          compliance_sections: {
            select: {
              id: true,
              key: true,
              title: true,
              metadata: true,
              order: true,
              compliance_section_dependency_chains: true,
              compliance_questions: questions
                ? {
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
                      question_summary: true,
                      coresponding_question: true,
                      compliance_question_dependency_chain: true,
                    },
                  }
                : false,
            },
          },
        },
      }) as unknown as ComplianceSectionGroupsExtendedDto;

      if (filter) {
        sectionGroup.compliance_sections = await this.filterService.filterSectionGroupSections(sectionGroup);
        return sectionGroup;
      }

      return sectionGroup;
    } catch (error) {
      this.logger.error(`Error getting section group`, { where, error });
      throw error;
    }
  }

  /**
   * Retrieves a list of section groups for a given organization and compliance set.
   *
   * @param {object} payload - The payload object containing org_id and compliance_set_name.
   * @param {string} payload.org_id - The ID of the organization.
   * @param {string} payload.compliance_set_name - The name of the compliance set.
   *
   * @param filter
   * @param questions
   * @throws {Error} - Throws an error if the compliance definition is not found.
   */
  async getSectionGroupListByOrgCompliance({ org_id, compliance_set_name }: { org_id: string; compliance_set_name: string }, filter?: boolean, questions?: boolean) {
    try {
      const orgCompliance = (await this.prisma.extended.organization_compliance.findUnique({
        where: {
          orgIdCompNameKey: {
            organization_id: org_id,
            compliance_definition_name: compliance_set_name,
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
          compliance_definition: {
            select: {
              name: true,
              title: true,
              version: true,
              logo_url: true,
              metadata: true,
              image_url: true,
              compliance_section_groups: {
                select: {
                  id: true,
                  title: true,
                  metadata: true,
                  order: true,
                  compliance_definition_name: true,
                  compliance_sections: {
                    select: {
                      id: true,
                      key: true,
                      title: true,
                      metadata: true,
                      order: true,
                      compliance_section_dependency_chains: true,
                      compliance_questions: questions
                        ? {
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
                              question_summary: true,
                              coresponding_question: true,
                              compliance_question_dependency_chain: true,
                            },
                          }
                        : false,
                    },
                  },
                },
              },
            },
          },
        },
      })) as any;

      if (filter) {
        orgCompliance.compliance_definition.compliance_section_groups = this.filterService.filterSectionGroups(orgCompliance.compliance_definition.compliance_section_groups);
      }

      return orgCompliance;
    } catch (error) {
      this.logger.error(`Error getting section group list by org and compliance`, { org_id, compliance_set_name, error });
      throw error;
    }
  }

  /**
   * Deletes a section group.
   *
   * @param {object} where - The where clause to use to find the section group to delete.
   *
   * @throws {Error} - Throws an error if the section group is not found.
   */
  async deleteSectionGroup(where: { compliance_definition_name: string; id: string }) {
    try {
      const deleted = this.prisma.extended.compliance_section_groups.delete({
        where: where,
      });

      return deleted;
    } catch (error) {
      this.logger.error(`Error deleting section group`, { where, error });
      throw error;
    }
  }

  /**
   * Updates a section group.
   */
  async updateSectionGroup(where: { compliance_definition_name: string; id: string }, data: Partial<compliance_section_groups>) {
    try {
      compliance_section_groupsSchema.partial().parse(data);

      const updated = this.prisma.extended.compliance_section_groups.update({
        where: where,
        data: data,
      });

      return updated;
    } catch (error) {
      this.logger.error(`Error updating section group`, { where, error });
      throw error;
    }
  }
}
