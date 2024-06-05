import { Injectable, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { MqttService } from '../../../mqtt';
import { filter, get } from 'lodash';
import { compliance_sections } from '@prisma/client';
import { Dependency } from './compliance-sections.types';
import { BaseWorker } from '../../../worker';
import { IAuthenticatedUser } from '../../../primitives';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { ComplianceSectionsExtendedDto } from './dto';
import compliance_sectionsSchema from 'libs/nest/src/validation/generated/modelSchema/compliance_sectionsSchema';

/**
 * ComplianceSectionsRepository class is responsible for managing the compliance sections data.
 *
 * @class ComplianceSectionsRepository
 * @extends BaseWorker
 */
@Injectable()
export class ComplianceSectionsRepository extends BaseWorker implements OnModuleInit {
  constructor(private readonly prisma: PrismaService, readonly mqtt: MqttService) {
    super(ComplianceSectionsRepository.name);
  }

  /**
   * Retrieves a compliance section based on the provided compliance definition name and section key.
   *
   * @param groupId
   * @param {string} compliance_definition_name - The name of the compliance definition used to filter the sections.
   *
   * @param key
   * @param user
   * @param filter
   * @param questions
   * @returns {Promise<Array<Object>>} - A Promise that resolves to an array of compliance section objects.
   */
  async getSectionByComplianceAndKey(
    compliance_definition_name: string,
    groupId: string,
    key: string,
    user: IAuthenticatedUser,
    filter?: boolean,
    questions?: boolean,
  ): Promise<ComplianceSectionsExtendedDto> {
    try {
      const sections = (await this.prisma.extended.compliance_sections.findUnique({
        where: {
          compliance_section_group_id: groupId,
          compDefNameSectionKey: {
            compliance_definition_name: compliance_definition_name,
            key: key,
          },
        },
        select: {
          id: true,
          key: true,
          title: true,
          metadata: true,
          order: true,
          compliance_section_group_id: true,
          compliance_definition_name: true,
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
          _count: {
            select: {
              compliance_questions: true,
            },
          },
        },
      })) as ComplianceSectionsExtendedDto;

      if (filter) {
        const filtered = await this.filterSections([sections])[0];
        this.logger.log(`filtered sections for ${compliance_definition_name}`, { compliance_definition_name, sections: filtered, filter, questions, user });
        return filtered;
      }

      this.logger.log(`retrieved sections for ${compliance_definition_name}`, { compliance_definition_name, sections, filter, questions, user });
      return sections;
    } catch (error) {
      this.logger.error(`Error retrieving section for ${compliance_definition_name}`, { compliance_definition_name, error, user });
      throw error;
    }
  }

  async getSectionByComplianceAndId(
    compliance_definition_name: string,
    groupId: string,
    id: string,
    user: IAuthenticatedUser,
    filter?: boolean,
    questions?: boolean,
  ): Promise<ComplianceSectionsExtendedDto> {
    try {
      const sections = (await this.prisma.extended.compliance_sections.findUnique({
        where: {
          compliance_section_group_id: groupId,
          compliance_definition_name: compliance_definition_name,
          id: id,
        },
        select: {
          id: true,
          key: true,
          title: true,
          metadata: true,
          order: true,
          compliance_section_group_id: true,
          compliance_definition_name: true,
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
          _count: {
            select: {
              compliance_questions: true,
            },
          },
        },
      })) as ComplianceSectionsExtendedDto;

      if (filter) {
        return await this.filterSections([sections])[0];
      }

      this.logger.log(`retrieved sections for ${compliance_definition_name}`, {
        compliance_definition_name,
        compliance_section_group_id: groupId,
        sections,
        filter,
        questions,
        user,
      });

      return sections;
    } catch (error) {
      this.logger.error(`Error retrieving section for ${compliance_definition_name}`, { compliance_definition_name, error, user });
      throw error;
    }
  }

  /**
   * Retrieves a list of compliance sections based on the provided compliance definition name.
   *
   *
   * @returns {Promise<Array<Object>>} - A Promise that resolves to an array of compliance section objects.
   * @param name
   * @param user
   * @param filter
   * @param questions
   */
  async getSectionListByCompliance(name: string, user: IAuthenticatedUser, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    try {
      const sections = this.getSectionList({ compliance_definition_name: name }, user, filter, questions);
      this.logger.info(`retrieved sections for ${name}`, { name, sections, filter, questions, user });
      return sections;
    } catch (error) {
      this.logger.error(`Error retrieving sections for ${name}`, { name, error });
      throw error;
    }
  }

  /**
   * Retrieves an unfiltered list of sections based on the provided compliance_section_group_id.
   *
   * @param compliance_definition_name
   * @param compliance_section_group_id - The ID of the compliance section group.
   * @param user
   * @param filter
   * @param questions
   * @returns Promise{Array} - An array of section objects that match the provided compliance_section_group_id.
   */
  async getSectionListByGroup({ compliance_definition_name, compliance_section_group_id }, user: IAuthenticatedUser, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    try {
      const sections = this.getSectionList({ compliance_definition_name, compliance_section_group_id }, user, filter, questions);
      this.logger.info(`retrieved sections for ${compliance_section_group_id}`, { compliance_section_group_id, sections });
      return sections;
    } catch (error) {
      this.logger.error(`Error retrieving sections for ${compliance_section_group_id}`, { compliance_section_group_id, error });
      throw error;
    }
  }

  async getSectionListByComplianceAndGroup(name: string, groupId: string, user: IAuthenticatedUser, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    try {
      const sections = await this.getSectionList({ compliance_definition_name: name, compliance_section_group_id: groupId }, user, filter, questions);
      this.logger.info(`retrieved sections for ${name}`, { user, compliance_definition_name: name, sections });
      return sections;
    } catch (error) {
      this.logger.error(`Error retrieving sections for ${name}`, { name, error });
      throw error;
    }
  }

  /**
   * Retrieves a list of sections based on the provided compliance_section_group_id.
   *
   * @param compliance_section_group_id - The ID of the compliance section group.
   *
   * @param user
   * @param filter
   * @param questions
   * @returns Promise{Array} - An array of section objects that match the provided compliance_section_group_id.
   */
  async getFilteredSectionList({ compliance_section_group_id }, user: IAuthenticatedUser, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    try {
      const sections = this.getSectionList({ compliance_section_group_id }, user, filter, questions);
      this.logger.info(`retrieved sections for ${compliance_section_group_id}`, { compliance_section_group_id, sections });
      return sections;
    } catch (error) {
      this.logger.error(`Error retrieving sections for ${compliance_section_group_id}`, { compliance_section_group_id, error });
      throw error;
    }
  }

  async createSection(data: any, user: IAuthenticatedUser) {
    try {
      return this.prisma.extended.compliance_sections.create({
        data: {
          id: new Cuid2Generator(GuidPrefixes.ComplianceSection).scopedId,
          ...data,
        },
      });
    } catch (error) {
      this.logger.error(`Error creating compliance section`, { data, error, user });
      throw error;
    }
  }

  async updateSection(name: string, sgId: string, id: string, data: any, user: IAuthenticatedUser) {
    try {
      compliance_sectionsSchema.parse(data);
      return this.prisma.extended.compliance_sections.update({
        where: {
          id,
          compliance_definition_name: name,
          compliance_section_group_id: sgId,
        },
        data,
      });
    } catch (error: any) {
      this.logger.error(`Error updating compliance section`, { id, data, error });
      throw new UnprocessableEntityException(error.message, { id, data, ...error });
    }
  }

  async deleteSection(name: string, sgId: string, id: string, user: IAuthenticatedUser) {
    try {
      return this.prisma.extended.compliance_sections.delete({
        where: {
          id,
          compliance_definition_name: name,
          compliance_section_group_id: sgId,
        },
      });
    } catch (error) {
      this.logger.error(`Error deleting compliance section`, { id, section_group_id: sgId, error, user });
      throw error;
    }
  }

  // PRIVATE METHODS //

  /**
   * Filter questions based on their dependencies.
   *
   * @param {Section[]} sections - An array of questions to filter.
   * @return {Promise<Question[]>} The filtered array of questions.
   */
  async filterSections(sections: ComplianceSectionsExtendedDto[]): Promise<ComplianceSectionsExtendedDto[]> {
    /**
     * Filter questions based on their dependencies.
     */
    const [response] = (await Promise.all([
      filter(sections, (section: compliance_sections) => {
        const dependencies = get(section, 'compliance_section_dependency_chains.dependency_chain', []) as Dependency[];
        /**
         * If the question has no dependencies, it is included in the response.
         */
        if (dependencies.length < 1) {
          return true;
        }

        for (const dependency of dependencies) {
          const dependentQuestion = this.prisma.extended.organization_compliance_responses.findUnique({
            where: {
              id: dependency.dependent_question_id,
            },
            select: {
              value: true,
            },
          }) as any;

          /**
           * If the dependent question does not exist, the dependency is not met.
           */
          if (!dependentQuestion) {
            return false;
          }

          /**
           * If the dependent question has a value that is not in the dependent_question_values array, the dependency is not met.
           */
          const dependency_met = dependency.dependent_question_values && dependency.dependent_question_values.includes(dependentQuestion.value);
          if (!dependency_met) {
            return false;
          }
        }

        /**
         * If all dependencies are met, the question is included in the response.
         */
        return true;
      }),
    ])) as ComplianceSectionsExtendedDto[][];

    return response;
  }

  /**
   * Retrieves a list of sections based on the specified condition.
   *
   * @param {object} where - The condition to filter sections.
   * @param user
   * @param filter
   * @param questions
   * @returns {Promise<Array<object>>} - An array of section objects.
   *
   * @private
   */
  private async getSectionList(where: any, user: IAuthenticatedUser, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    const sections = (await this.prisma.extended.compliance_sections.findMany({
      where: { ...where },
      select: {
        id: true,
        key: true,
        title: true,
        metadata: true,
        order: true,
        compliance_section_group_id: true,
        compliance_definition_name: true,
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
        _count: {
          select: {
            compliance_questions: true,
          },
        },
      },
    })) as ComplianceSectionsExtendedDto[];

    this.logger.log(`retrieved sections for ${where.compliance_definition_name}`, { where, sections, filter, questions, user });
    if (filter) {
      return await this.filterSections(sections);
    }

    return sections;
  }
}
