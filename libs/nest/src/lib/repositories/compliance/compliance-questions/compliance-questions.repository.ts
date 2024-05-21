import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { compliance_questions, Prisma } from '@prisma/client';
import { difference, sumBy, unset } from 'lodash';
import { Cuid2Generator } from '../../../utility';
import { ComplianceSectionsCacheRepository } from '../compliance-sections';

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
  constructor(readonly prisma: PrismaService, readonly complianceSectionsCacheRepository: ComplianceSectionsCacheRepository) {
    super(ComplianceQuestionsRepository.name);
  }

  /**
   * Retrieves a list of questions with responses for a given compliance section.
   *
   * @param payload - The payload containing the compliance section ID.
   * @return {Promise<any>} - A promise that resolves to the list of questions.
   * @param filter
   */
  async getFilteredQuestionList({ compliance_section_id, organization_id }, filter?: boolean): Promise<any> {
    const questions = (await this.prisma.$queryRaw(
      Prisma.sql`SELECT cq.id,
                        cq.prompt,
                        cq.order,
                        cq.key,
                        cr.compliance_definition_name,
                        cr.organization_id,
                        ocair.answer                                                       as ai_answer,
                        ocr.value                                                          as user_answer,
                        cdc.dependency_chain                                               as dependency_chain,
                        CASE
                          WHEN ocair.answer IS NULL AND ocr.value IS NULL
                            THEN TRUE
                          ELSE FALSE END                                                   AS not_started,
                        CASE
                          WHEN ocair.answer IS NOT NULL
                            THEN TRUE
                          ELSE FALSE END                                                   AS ai_answered,
                        CASE
                          WHEN ocr.value IS NOT NULL
                            THEN TRUE
                          ELSE FALSE END                                                   AS user_answered,
                        CASE WHEN CAST(COUNT(ocqb.id) as INT) > 1 THEN TRUE ELSE FALSE END AS bookmarked
                 FROM organization_compliance oc
                        JOIN compliance_responses cr
                             ON oc.id = cr.organization_compliance_id
                        JOIN compliance_sections cs ON cr.compliance_section_id = cs.id
                        LEFT JOIN organization_compliance_ai_responses ocair
                             ON cr.organization_compliance_ai_response_id = ocair.id
                        LEFT JOIN organization_compliance_responses ocr
                             ON cr.organization_compliance_response_id = ocr.id
                        JOIN compliance_questions cq
                             ON cr.compliance_question_id = cq.id
                        LEFT JOIN organization_compliance_question_bookmarks ocqb
                                  ON cr.compliance_question_id = ocqb.compliance_question_id
                        LEFT JOIN compliance_question_dependency_chains cdc ON cr.compliance_question_id = cdc.compliance_question_id
                 WHERE
                   cr.organization_id = ${organization_id} AND
                   cs.id = ${compliance_section_id}
                 GROUP BY cq.id, cr.organization_id, ocair.answer, ocr.value, cdc.dependency_chain, cr.compliance_definition_name`,
    )) as any;

    this.logger.info('Retrieved filtered question list', { questions, organization_id, compliance_section_id });

    const start = new Date().getTime();

    const response = filter ? await this.filterQuestions(questions) : questions;

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

    if (filter)
      console.log(`Filtering questions took ${end - start}ms`, {
        originalCount: questions.length,
        filteredCount: response.length,
        diff,
      });

    return { compliance_questions: response, counts: metrics };
  }

  /**
   * Retrieves a list of questions for a given compliance section.
   *
   * @param payload - The payload containing the compliance section ID.
   * @return {Promise<any>} - A promise that resolves to the list of questions.
   * @param filter
   */
  async getQuestionList({ compliance_section_id, compliance_section_group_id, compliance_definition_name }): Promise<any> {
    const questions = await this.prisma.compliance_questions.findMany({
      where: {
        compliance_section_id,
        compliance_definition_name,
      },
      select: {
        id: true,
        prompt: true,
        order: true,
        key: true,
        compliance_question_dependency_chain: true,
        compliance_section: {
          select: {
            id: true,
            key: true,
            title: true,
            metadata: true,
            order: true,
            compliance_definition_name: true,
            dependency_expression: true,
            compliance_section_dependency_chains: true,
            section_group: {
              select: {
                id: true,
                order: true,
                title: true,
                compliance_definition_name: true,
                metadata: true,
              },
            },
          },
        },
      },
    });

    this.logger.info('Retrieved filtered question list', { questions, compliance_section_id });

    return { compliance_questions: questions };
  }

  /**
   * Retrieves a compliance question by its ID.
   *
   * @param {string} id - The ID of the question to retrieve.
   * @returns {Promise<compliance_questions>} - The retrieved question.
   * @throws {NotFoundException} - If the question with the specified ID is not found.
   * @throws {Error} - If an error occurs while retrieving the question.
   */
  async getQuestion(id: string): Promise<compliance_questions> {
    try {
      const question = await this.prisma.compliance_questions.findUnique({
        where: {
          id,
        },
      });

      if (!question) {
        throw new NotFoundException(`Question not found for id ${id}`);
      }

      return question;
    } catch (e: any) {
      this.logger.error(`Error creating questions`, { ...e, id });
      throw e;
    }
  }

  /**
   * Retrieves a question based on the compliance definition name and key.
   *
   * @param {Object} params - The parameters for retrieving the question.
   * @param {string} params.compliance_definition_name - The name of the compliance definition.
   * @param {string} params.key - The key of the question within the compliance definition.
   *
   * @returns {Promise<compliance_questions>} - A promise that resolves to the retrieved question.
   * @throws {NotFoundException} - If no question is found for the given compliance definition name and key.
   * @throws {Error} - If an error occurs while retrieving the question.
   */
  async getQuestionByKeyAndComplianceName({ compliance_definition_name, key }: { compliance_definition_name: string; key: string }): Promise<compliance_questions> {
    try {
      const question = await this.prisma.compliance_questions.findUnique({
        where: {
          compDefNameKey: {
            compliance_definition_name,
            key,
          },
        },
      });

      if (!question) {
        throw new NotFoundException(`Question not found for compliance ${compliance_definition_name} and key ${key}`);
      }

      return question;
    } catch (e: any) {
      this.logger.error(`Error creating questions`, { ...e, compliance_definition_name, key });
      throw e;
    }
  }

  /**
   * Creates multiple compliance questions in the database.
   *
   * @param {compliance_questions[]} questions - An array of compliance questions to be created.
   *
   * @return {Promise<Prisma.BatchPayload>} - A promise that resolves when the questions are created successfully.
   *
   * @throws {Error} - If an error occurs while creating the questions.
   */
  async createQuestions(questions: compliance_questions[]): Promise<Prisma.BatchPayload> {
    try {
      questions.forEach(q => (q.id = new Cuid2Generator('cq').scopedId));

      const createdQuestions = await this.prisma.compliance_questions.createMany({
        data: questions as any,
        skipDuplicates: true,
      });

      return createdQuestions;
    } catch (e: any) {
      this.logger.error(`Error creating questions`, { ...e, questions });
      throw e;
    }
  }

  /**
   * Creates a new compliance question.
   *
   * @param {compliance_questions} question - The question to be created.
   * @return {Promise<compliance_questions>} - A Promise that resolves to the created question.
   * @throws {Error} - If an error occurs while creating the question.
   */
  async createQuestion(question: compliance_questions): Promise<compliance_questions> {
    try {
      question.id = new Cuid2Generator('cq').scopedId;
      const created = await this.prisma.compliance_questions.create({
        data: {
          ...(question as any),
        },
      });

      this.logger.info(`Created question for compliance ${question.compliance_definition_name}`, { created });
      return created;
    } catch (e: any) {
      this.logger.error(`Error creating question for compliance ${question.compliance_definition_name}`, { ...e, question });
      throw e;
    }
  }

  /**
   * Updates a compliance question.
   *
   * @param {compliance_questions} question - The compliance question object to update.
   * @returns {Promise<compliance_questions>} - The updated compliance question object.
   * @throws Throws an error if there is an issue updating the question.
   */
  async updateQuestion(question: compliance_questions): Promise<compliance_questions> {
    let where: any;

    // If the question has an ID, use that to update the question. Otherwise, use the compliance definition name and key.
    if (question.id) {
      where = { id: question.id };
    } else {
      where = {
        compDefNameKey: {
          compliance_definition_name: question.compliance_definition_name,
          key: question.key,
        },
      };
    }

    try {
      const updated = await this.prisma.compliance_questions.update({
        where: where,
        data: {
          ...(question as any),
        },
      });

      this.logger.info(`Updated question for compliance ${question.compliance_definition_name}`, { updated });
      return updated;
    } catch (e: any) {
      this.logger.error(`Error updating question for compliance ${question.compliance_definition_name}`, { ...e, question });
      throw e;
    }
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

  async deleteQuestion(id: string): Promise<void> {
    try {
      this.prisma.compliance_questions.delete({
        where: {
          id,
        },
      });
    } catch (e: any) {
      this.logger.error(`Error deleting question`, { ...e, id });
      throw e;
    }
  }
}
