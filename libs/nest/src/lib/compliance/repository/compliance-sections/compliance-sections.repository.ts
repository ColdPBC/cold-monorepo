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
   * Retrieves an unfiltered list of sections based on the provided compliance_section_group_id.
   *
   * @param compliance_section_group_id - The ID of the compliance section group.
   * @returns Promise{Array} - An array of section objects that match the provided compliance_section_group_id.
   */
  async getSectionList({ compliance_section_group_id }): Promise<Array<any>> {
    const sections = (await this.prisma.compliance_sections.findMany({
      where: {
        compliance_section_group_id: compliance_section_group_id,
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
        _count: {
          select: {
            compliance_questions: true,
          },
        },
      },
    })) as unknown as compliance_sections[];

    return sections;
  }

  /**
   * Retrieves a list of sections based on the provided compliance_section_group_id.
   *
   * @param compliance_section_group_id - The ID of the compliance section group.
   *
   * @returns Promise{Array} - An array of section objects that match the provided compliance_section_group_id.
   */
  async getFilteredSectionList({ compliance_section_group_id }): Promise<Array<any>> {
    const sections = (await this.prisma.compliance_sections.findMany({
      where: {
        compliance_section_group_id: compliance_section_group_id,
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
        _count: {
          select: {
            compliance_questions: true,
          },
        },
      },
    })) as unknown as compliance_sections[];

    const filtered = await this.filterSections(sections);
    return filtered;
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
}
