import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { Prisma } from '@prisma/client';
import { difference, sumBy, unset } from 'lodash';

interface Question {
  id: string;
  prompt: string;
  order: number;
  key: string;
  organization_id: string;
  ai_answer: boolean | null;
  user_answer: boolean | null;
  dependency_chain: Dependency[] | null;
}

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
 * Represents a repository for managing compliance questions.
 * @implements {BaseWorker}
 */
@Injectable()
export class ComplianceQuestionsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceQuestionsRepository.name);
  }

  /**
   * Retrieves a list of questions for a given compliance section.
   *
   * @param payload - The payload containing the compliance section ID.
   * @return {Promise<any>} - A promise that resolves to the list of questions.
   */
  async getQuestionList({ compliance_section_id }): Promise<any> {
    const questions = (await this.prisma.$queryRaw(
      Prisma.sql`SELECT cq.id,
                        cq.prompt,
                        cq.order,
                        cq.key,
                        oc.organization_id,
                        ocair.answer                                                       as ai_answer,
                        ocr.value                                                          as user_answer,
                        cdc.dependency_chain                                               as dependency_chain,
                        CASE
                          WHEN ocair.answer IS NULL AND ocr.value IS NULL
                            THEN TRUE
                          ELSE FALSE END                                                   AS not_started,
                        CASE
                          WHEN ocair.answer IS NOT NULL AND ocr.value IS NULL
                            THEN TRUE
                          ELSE FALSE END                                                   AS ai_answered,
                        CASE
                          WHEN ocr.value IS NOT NULL AND ocair.answer IS NULL
                            THEN TRUE
                          ELSE FALSE END                                                   AS user_answered,
                        CASE WHEN CAST(COUNT(ocqb.id) as INT) > 1 THEN TRUE ELSE FALSE END AS bookmarked
                 FROM compliance_questions cq
                        LEFT JOIN organization_compliance_ai_responses ocair
                                  ON cq.id = ocair.compliance_question_id
                        LEFT JOIN organization_compliance_responses ocr
                                  ON cq.id = ocr.compliance_question_id
                        LEFT JOIN compliance_responses cr ON cq.id = cr.compliance_question_id
                        LEFT JOIN organization_compliance_question_bookmarks ocqb
                                  ON cq.id = ocqb.compliance_question_id
                        LEFT JOIN compliance_sections cs
                                  ON cq.compliance_section_id = cs.id
                        LEFT JOIN compliance_section_groups csg ON cs.compliance_section_group_id = csg.id
                        LEFT JOIN organization_compliance oc
                                  ON csg.compliance_definition_name = oc.compliance_definition_name
                        LEFT OUTER JOIN compliance_question_dependency_chains cdc ON cq.id = cdc.compliance_question_id
                 WHERE cs.id = ${compliance_section_id}

                 GROUP BY cq.id, ocair.answer, ocr.value,
                          oc.id, cdc.dependency_chain`,
    )) as any;

    this.logger.info('Retrieved question list', { questions });

    const start = new Date().getTime();
    const response = await this.filterQuestions(questions);
    const end = new Date().getTime();
    const diff = difference(questions, response);

    const metrics = {
      total: response.length,
      not_started: sumBy(response, (item: any) => {
        return item.not_started ? 1 : 0;
      }),
      ai_answered: sumBy(response, (item: any) => {
        return item.ai_answered ? 1 : 0;
      }),
      user_answered: sumBy(response, (item: any) => {
        return item.user_answered ? 1 : 0;
      }),
      bookmarked: sumBy(response, (item: any) => {
        return item.bookmarked ? 1 : 0;
      }),
    };
    console.log(`Filtering questions took ${end - start}ms`, {
      originalCount: questions.length,
      filteredCount: response.length,
      diff,
    });

    return { compliance_questions: response, counts: metrics };
  }

  /**
   * Filter questions based on their dependencies.
   *
   * @param {Question[]} questions - An array of questions to filter.
   * @return {Promise<Question[]>} The filtered array of questions.
   */
  async filterQuestions(questions: Question[]): Promise<Question[]> {
    const dependenciesMet = function (question: Question): boolean {
      if (!question.dependency_chain || !question.dependency_chain.length) {
        unset(question, 'dependency_chain');
        unset(question, 'user_answer');
        unset(question, 'ai_answer');

        return true;
      }
      for (const dependency of question.dependency_chain) {
        const dependentQuestion = questions.find(q => q.id === dependency.dependent_question_id);
        if (!dependentQuestion) {
          return false;
        }
        const dependentAnswer = dependentQuestion.user_answer;
        if (dependency.dependent_question_values && !dependency.dependent_question_values.includes(dependentAnswer)) {
          return false;
        }
      }
      unset(question, 'dependency_chain');
      unset(question, 'user_answer');
      unset(question, 'ai_answer');
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
}
