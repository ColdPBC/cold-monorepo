import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../worker';
import { ComplianceSectionsExtendedDto, Dependency, Question } from '../repositories';
import { filter, get, unset } from 'lodash';
import { compliance_sections } from '@prisma/client';
import { PrismaService } from '../../prisma';
@Injectable()
export class FilteringService extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(FilteringService.name);
  }

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
    const response = (await Promise.all([
      filter(sections, async (section: compliance_sections) => {
        const dependencies = get(section, 'compliance_section_dependency_chains.dependency_chain', []) as Dependency[];
        /**
         * If the question has no dependencies, it is included in the response.
         */
        if (dependencies.length < 1) {
          return true;
        }

        for (const dependency of dependencies) {
          const dependentQuestion = (await this.prisma.extended.organization_compliance_responses.findUnique({
            where: {
              id: dependency.dependent_question_id,
            },
            select: {
              value: true,
            },
          })) as any;

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
    ])) as ComplianceSectionsExtendedDto[];

    return response;
  }

  /**
   * Filter questions based on their dependencies.
   *
   * @param {Question[]} questions - An array of questions to filter.
   * @return {Promise<Question[]>} The filtered array of questions.
   */
  async filterQuestions(questions: Question[]): Promise<Question[]> {
    const dependenciesMet = function (question: Question): boolean {
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
      }

      unset(question, 'dependency_chain');
      return true;
    };

    try {
      const filteredQuestions = questions.filter(dependenciesMet);
      return filteredQuestions;
    } catch (e: any) {
      this.logger.error(`Error evaluating jsonata expression: ${e.message}`, { ...e });
      return questions;
    }
  }

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
