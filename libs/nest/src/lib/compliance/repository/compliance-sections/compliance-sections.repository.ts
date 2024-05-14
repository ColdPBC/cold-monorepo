import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { MqttAPIComplianceSectionPayload } from '@coldpbc/nest';
import { filter, get } from 'lodash';

type Section = {
  id: string;
  key: string;
  title: string;
  metadata: any;
  order: number;
  compliance_section_group_id: string;
  compliance_definition_name: string;
  compliance_section_dependency_chains: { dependency_chain: Dependency[] } | null;
  _count: {
    compliance_questions: number;
  };
};

interface Dependency {
  dependency_expression: string | null;
  dependent_question_id: string;
  dependent_section_key: string;
  dependent_question_key: string;
  dependent_definition_name: string;
  dependent_question_values: any[] | null;
  dependent_section_group_id: string;
}

/**
 * ComplianceSectionsRepository class is responsible for managing the compliance sections data.
 *
 * @class ComplianceSectionsRepository
 * @extends BaseWorker
 */
@Injectable()
export class ComplianceSectionsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceSectionsRepository.name);
  }

  /**
   * Get the list of sections for a compliance section group.
   *
   * @param {Object} payload - The payload object.
   * @param {string} payload.compliance_section_group_id - The ID of the compliance section group.
   * @returns {Promise<Array<Object>>} - A Promise that resolves to an array of section objects.
   */
  async getSectionList({ compliance_section_group_id }: MqttAPIComplianceSectionPayload) {
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
    })) as unknown as Section[];

    const filtered = await this.filterSections(sections);
    return filtered;
  }

  /**
   * Filter questions based on their dependencies.
   *
   * @param {Section[]} sections - An array of questions to filter.
   * @return {Promise<Question[]>} The filtered array of questions.
   */
  async filterSections(sections: Section[]) {
    const [response] = await Promise.all([
      filter(sections, (section: Section) => {
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
