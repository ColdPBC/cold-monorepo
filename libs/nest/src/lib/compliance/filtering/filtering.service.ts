import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../worker';
import { ComplianceSectionGroupsExtendedDto, ComplianceSectionsExtendedDto, Dependency, Question } from '../repositories';
import { findIndex, get, unset } from 'lodash';
import { PrismaService } from '../../prisma';

@Injectable()
export class FilteringService extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(FilteringService.name);
  }

  /**
   * Filters section groups by applying a filtering function to each group's compliance_sections.
   *
   * @param {any[]} sectionGroups - An array of section groups to filter.
   *
   * @param references
   * @private
   *
   * @return {Promise<void>} - A promise that resolves when the filtering is complete.
   */
  async filterSectionGroups(sectionGroups: ComplianceSectionGroupsExtendedDto[], options?: { references?: boolean }) {
    try {
      for (const group of sectionGroups) {
        group.compliance_sections = (await this.filterSectionGroupSections(group, options)) as ComplianceSectionsExtendedDto[];
      }

      return sectionGroups;
    } catch (error) {
      this.logger.error(`Error filtering section groups`, { sectionGroups, error });
      throw error;
    }
  }

  /**
   * Filters the compliance sections within a section group.
   *
   * @param {any} sectionGroup - The section group containing the compliance sections.
   *
   * @param references
   * @return {Promise<any>} A promise that resolves to the filtered compliance sections.
   *
   * @private
   */
  async filterSectionGroupSections(sectionGroup: ComplianceSectionGroupsExtendedDto, options?: { references?: boolean }): Promise<ComplianceSectionsExtendedDto[]> {
    try {
      if (!sectionGroup.compliance_sections) return [];

      return await this.filterSections(sectionGroup.compliance_sections, options);
    } catch (error) {
      this.logger.error(`Error filtering section group sections`, { sectionGroup, error });
      throw error;
    }
  }

  /**
   * Filter questions based on their dependencies.
   *
   * @param {Section[]} sections - An array of questions to filter.
   * @param references
   * @return {Promise<Question[]>} The filtered array of questions.
   */
  async filterSections(sections: ComplianceSectionsExtendedDto[], options?: { references?: boolean }): Promise<ComplianceSectionsExtendedDto[]> {
    /**
     * Filter questions based on their dependencies.
     */

    const filtered = await Promise.all(
      sections.filter(async section => {
        const dependencies = get(section, 'compliance_section_dependency_chains.dependency_chain', []) as Dependency[];
        /**
         * If the question has no dependencies, it is included in the response.
         */
        if (dependencies.length < 1) {
          return true;
        }

        for (const dependency of dependencies) {
          const dependentQuestion = await this.prisma.extended.organization_compliance_responses.findUnique({
            where: {
              id: dependency.dependent_question_id,
            },
            select: {
              value: true,
            },
          });

          /**
           * If the dependent question does not exist, the dependency is not met.
           */
          if (!dependentQuestion) {
            this.logger.info(`Dependent question response not found`, { dependency, dependentQuestion });
            return false;
          }

          /**
           * If the dependent question has a value that is not in the dependent_question_values array, the dependency is not met.
           */
          const dependency_met = dependency.dependent_question_values && dependency.dependent_question_values.includes(dependentQuestion.value);
          if (!dependency_met) {
            this.logger.info(`Dependency not met`, { dependency, dependentQuestion });
            return false;
          }
        }

        /**
         * If all dependencies are met, the question is included in the response.
         */
        return true;
      }),
    );

    if (options?.references) {
      for (const section of filtered) {
        if (Array.isArray(section.compliance_questions)) {
          for (const question of section.compliance_questions) {
            if (Array.isArray(question['references'])) {
              question['references'] = await this.filterReferences(question['references']);
            }
          }
        }
      }
    }

    return filtered;
  }

  /**
   * Filter questions based on their dependencies.
   *
   * @param {Question[]} questions - An array of questions to filter.
   * @param references
   * @return {Promise<Question[]>} The filtered array of questions.
   */
  async filterQuestions(questions: Question[], references?: boolean): Promise<Question[]> {
    const dependenciesMet = (question: Question): boolean => {
      unset(question, 'ai_answer');

      if (!question.dependency_chain || !question.dependency_chain.length) {
        unset(question, 'dependency_chain');

        return true;
      }

      for (const dependency of question.dependency_chain) {
        const dependentQuestion = questions.find(q => q.id === dependency.dependent_question_id);

        if (!dependentQuestion) {
          return false;
        }

        const dependentAnswer = dependentQuestion.user_answer;

        if (!dependentAnswer) {
          return false;
        }

        if (Array.isArray(dependentAnswer)) {
          for (const answer of dependentAnswer) {
            if (!dependency?.dependent_question_values?.includes(answer)) {
              return false;
            }
          }
        } else {
          if (dependency.dependent_question_values && !dependency.dependent_question_values.includes(dependentAnswer[0])) {
            return false;
          }
        }

        if (references && Array.isArray(question['references'])) {
          question['references'] = this.filterReferences(question['references']);
        }
      }

      unset(question, 'dependency_chain');
      return true;
    };

    try {
      return questions.filter(dependenciesMet);
    } catch (e: any) {
      this.logger.error(`Error evaluating jsonata expression: ${e.message}`, { ...e });
      return questions;
    }
  }

  async filterReferences(aiReferences: any[]): Promise<any[]> {
    const references: any = [];

    for (const ref of aiReferences) {
      if (ref.url) {
        const parts = new URL(ref.url);
        const parsed = `${parts.hostname}${parts.pathname}`;
        const idx = findIndex(references, { url: parsed });

        if (idx < 0) {
          const newRef = {
            url: parsed,
            text: [ref.text],
          };

          references.push(newRef);
        } else {
          if (!references[idx].text.includes(ref.text)) {
            references[idx].text.push(ref.text);
          }
        }
      }

      if (ref.file) {
        const idx = findIndex(references, { file: ref.file });

        if (idx < 0) {
          const newRef = {
            file: ref.file,
            text: [ref.text],
          };
          references.push(newRef);
        } else {
          if (!references[idx].text.includes(ref.text)) {
            references[idx].text.push(ref.text);
          }
        }
      }
    }

    return references;
  }

  /**
   * Check if a question has a bookmark.
   * @param response
   * @param property
   */
  questionHasBookmark(response: any, property: string) {
    if (response) {
      if (Object.prototype.hasOwnProperty.call(response, property) && response[property] !== null && response[property] !== '') {
        if (Array.isArray(response[property]) && response[property].length > 0) {
          return true;
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Check if a question has an answer or value property.  Handles conditions where answer: false is a valid response.
   * @param response
   * @param property
   */
  questionHasAnswer(response: any, property: string) {
    if (response) {
      if (Object.prototype.hasOwnProperty.call(response, property) && response[property] !== null && response[property] !== '') {
        if (Array.isArray(response[property]) && response[property].length > 0) {
          return true;
        }
        return true;
      }
    }
    return false;
  }
}
