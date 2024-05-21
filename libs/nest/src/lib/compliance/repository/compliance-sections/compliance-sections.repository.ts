import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { MqttService } from '../../../mqtt';
import { filter, get } from 'lodash';
import { compliance_sections } from '@prisma/client';
import { Dependency } from './compliance-sections.types';
import { BaseWorker } from '../../../worker';

/**
 * ComplianceSectionsRepository class is responsible for managing the compliance sections data.
 *
 * @class ComplianceSectionsRepository
 * @extends BaseWorker
 */
@Injectable()
export class ComplianceSectionsRepository extends BaseWorker implements OnModuleInit {
  constructor(readonly prisma: PrismaService, readonly mqtt: MqttService) {
    super(ComplianceSectionsRepository.name);
  }

  /**
   * Retrieves a compliance section based on the provided compliance definition name and section key.
   *
   * @param groupId
   * @param {string} compliance_definition_name - The name of the compliance definition used to filter the sections.
   *
   * @param key
   * @param filter
   * @param questions
   * @returns {Promise<Array<Object>>} - A Promise that resolves to an array of compliance section objects.
   */
  async getSectionByComplianceAndKey(compliance_definition_name: string, groupId: string, key: string, filter?: boolean, questions?: boolean): Promise<compliance_sections> {
    const sections = this.prisma.compliance_sections.findUnique({
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
    }) as unknown as compliance_sections;

    if (filter) {
      return this.filterSections([sections])[0];
    }

    return sections;
  }

  async getSectionByComplianceAndId(compliance_definition_name: string, groupId: string, id: string, filter?: boolean, questions?: boolean): Promise<compliance_sections> {
    const sections = this.prisma.compliance_sections.findUnique({
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
    }) as unknown as compliance_sections;

    if (filter) {
      return this.filterSections([sections])[0];
    }

    return sections;
  }

  /**
   * Retrieves a list of compliance sections based on the provided compliance definition name.
   *
   *
   * @returns {Promise<Array<Object>>} - A Promise that resolves to an array of compliance section objects.
   * @param name
   * @param filter
   * @param questions
   */
  async getSectionListByCompliance(name: string, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    return this.getSectionList({ compliance_definition_name: name }, filter, questions);
  }

  /**
   * Retrieves an unfiltered list of sections based on the provided compliance_section_group_id.
   *
   * @param compliance_definition_name
   * @param compliance_section_group_id - The ID of the compliance section group.
   * @param filter
   * @param questions
   * @returns Promise{Array} - An array of section objects that match the provided compliance_section_group_id.
   */
  async getSectionListByGroup({ compliance_definition_name, compliance_section_group_id }, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    return this.getSectionList({ compliance_definition_name, compliance_section_group_id }, filter, questions);
  }

  async getSectionListByComplianceAndGroup(name: string, groupId: string, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    return this.getSectionList({ compliance_definition_name: name, compliance_section_group_id: groupId }, filter, questions);
  }

  /**
   * Retrieves a list of sections based on the provided compliance_section_group_id.
   *
   * @param compliance_section_group_id - The ID of the compliance section group.
   *
   * @param filter
   * @param questions
   * @returns Promise{Array} - An array of section objects that match the provided compliance_section_group_id.
   */
  async getFilteredSectionList({ compliance_section_group_id }, filter = true, questions?: boolean): Promise<Array<any>> {
    return this.getSectionList({ compliance_section_group_id }, filter, questions);
  }

  /**
   * Filter questions based on their dependencies.
   *
   * @param {Section[]} sections - An array of questions to filter.
   * @return {Promise<Question[]>} The filtered array of questions.
   */
  async filterSections(sections: compliance_sections[]) {
    const [response] = await Promise.all([
      filter(sections, (section: compliance_sections) => {
        const dependencies = get(section, 'compliance_section_dependency_chains.dependency_chain', []) as Dependency[];
        if (dependencies.length < 1) {
          return true;
        }

        for (const dependency of dependencies) {
          const dependentQuestion = this.prisma.organization_compliance_responses.findUnique({
            where: {
              id: dependency.dependent_question_id,
            },
            select: {
              value: true,
            },
          }) as any;

          if (!dependentQuestion) {
            return false;
          }

          const dependentAnswer = dependentQuestion.value;
          return !!(dependency.dependent_question_values && dependency.dependent_question_values.includes(dependentAnswer));
        }

        return true;
      }),
    ]);

    return response;
  }

  /**
   * Retrieves a list of sections based on the specified condition.
   *
   * @param {object} where - The condition to filter sections.
   * @param {boolean} [filter] - Optional parameter to specify whether to filter sections or not.
   * @param questions
   * @returns {Promise<Array<object>>} - An array of section objects.
   *
   * @private
   */
  private async getSectionList(where: any, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    const sections = (await this.prisma.compliance_sections.findMany({
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
    })) as unknown as compliance_sections[];

    if (filter) {
      return this.filterSections(sections);
    }

    return sections;
  }
}
