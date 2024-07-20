import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../worker';
import { ComplianceResponseOptions, ComplianceSectionGroupsExtendedDto, ComplianceSectionsExtendedDto, Dependency, Question } from '../repositories';
import { findIndex, get, merge, unset } from 'lodash';
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
   * @param options
   * @private
   *
   * @return {Promise<void>} - A promise that resolves when the filtering is complete.
   */
  async filterSectionGroups(sectionGroups: ComplianceSectionGroupsExtendedDto[], options?: ComplianceResponseOptions) {
    try {
      for (const group of sectionGroups) {
        group.compliance_sections = (await this.filterSectionGroupSections(group, options)) as ComplianceSectionsExtendedDto[];
      }

      return sectionGroups.filter(group => group?.compliance_sections && group.compliance_sections.length > 0);
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
  async filterSectionGroupSections(sectionGroup: ComplianceSectionGroupsExtendedDto, options?: ComplianceResponseOptions): Promise<ComplianceSectionsExtendedDto[]> {
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
   * @param options
   * @return {Promise<Question[]>} The filtered array of questions.
   */
  async filterSections(sections: ComplianceSectionsExtendedDto[], options?: ComplianceResponseOptions): Promise<ComplianceSectionsExtendedDto[]> {
    /**
     * Filter questions based on their dependencies.
     */

    const filtered: ComplianceSectionsExtendedDto[] = [];

    for (const section of sections) {
      const dependencies = merge([], get(section, 'compliance_section_dependency_chains.dependency_chain', [])) as Dependency[];
      delete section.compliance_section_dependency_chains;

      /**
       * If the question has no dependencies, it is included in the response.
       */
      if (dependencies.length) {
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
           * If the dependent question does not exist, that question doesn't have a response, therefore the dependency is not met.
           */
          if (!dependentQuestion) {
            //this.logger.info(`Dependent question response not found`, { dependency, dependentQuestion });
            continue;
          }

          /**
           * If the dependent question has a value that is not in the dependent_question_values array, the dependency is not met.
           */
          const dependency_met = dependency.dependent_question_values && dependency.dependent_question_values.includes(dependentQuestion.value);
          if (!dependency_met) {
            this.logger.info(`Dependency not met`, { dependency, dependentQuestion });
            continue;
          }

          /**
           * If all dependencies are met, the question is included in the response.
           */
          if (section?.compliance_questions && section.compliance_questions.length > 0) {
            filtered.push(section);
          } else {
            this.logger.warn(`No questions found for section`, { section });
          }
        }
      } else {
        // If there are no dependencies, the question is included in the response.
        if (section?.compliance_questions && section.compliance_questions.length > 0) {
          filtered.push(section);
        } else {
          this.logger.warn(`No questions found for section`, { section });
        }
      }
    }

    return filtered;
  }

  /**
   * Filter questions based on their dependencies.
   *
   * @param {Question[]} questions - An array of questions to filter.
   * @param options
   * @return {Promise<Question[]>} The filtered array of questions.
   */
  async filterQuestions(questions: Question[], options?: ComplianceResponseOptions): Promise<Question[]> {
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

        if (options?.references && Array.isArray(question['references'])) {
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

  /**
   * Filter references to remove duplicate
   * @param aiReferences
   */
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
   * Check if a question has an answer or value property.  Handles conditions where answer: false is a valid response.
   * @param response
   * @param property
   * @param component
   */
  questionHasValidAnswer(response: any, property: string, component: string): boolean {
    try {
      if (response) {
        // if the response answer or value is empty or null or undefined return false
        if (response[property] === null || response[property] === '' || !Object.prototype.hasOwnProperty.call(response, property)) {
          return false;
        }

        switch (component) {
          case 'multi_text':
          case 'multi_select':
          case 'select': {
            if (Array.isArray(response[property]) && response[property].length > 0) {
              return true;
            } else if (typeof response[property] === 'string') {
              response[property] = [response[property]];
              return true;
            } else {
              this.logger.error(`answer not correctly formatted; expected array got ${typeof response[property]}`, { response, property, component });
              return false;
            }
          }
          case 'string':
          case 'number': {
            if (Array.isArray(response[property]) && typeof response[property][0] === component) {
              return true;
            } else if (typeof response[property] === 'number' || typeof response[property] === 'string') {
              response[property] = [response[property]];
              return true;
            } else {
              this.logger.error(`number/string answer not correctly formatted; expected string got ${typeof response[property]}`, { response, property, component });
              return false;
            }
          }

          case 'yes_no': {
            if (Array.isArray(response[property]) && typeof response[property][0] === 'boolean') {
              return true;
            } else if (typeof response[property] === 'boolean') {
              response[property] = [response[property]];
              return true;
            } else if (typeof response[property] === 'string') {
              response[property] = [response[property] === 'true'];
              return true;
            } else {
              this.logger.error(`yes_no answer not correctly formatted; expected boolean got ${typeof response[property]}`, { response, property, component });
              return false;
            }
          }
          case 'textarea':
          case 'text': {
            if (Array.isArray(response[property]) && typeof response[property][0] == 'string') {
              return true;
            } else if (typeof response[property] === 'string') {
              response[property] = [response[property]];
              return true;
            } else {
              this.logger.warn(`text/textarea answer not correctly formatted; expected string got ${typeof response[property]}`, { response, property, component });
              return false;
            }
          }
          case 'percent_slider': {
            if (Array.isArray(response[property]) && typeof response[property][0] == 'number' && response[property][0] >= 0 && response[property][0] <= 100) {
              return true;
            } else if (typeof response[property] === 'number') {
              response[property] = [response[property]];
              return true;
            } else {
              this.logger.warn(`percent_slider answer not correctly formatted; expected number got ${typeof response[property]}`, { response, property, component });
              return false;
            }
          }
          default:
            this.logger.warn(`unknown component type: ${component}`, { response, property, component });
            return true;
        }
      }
      return false;
    } catch (error) {
      this.logger.error(`Error evaluating expression: ${error.message}`, { ...error });
      return false;
    }
  }
}
