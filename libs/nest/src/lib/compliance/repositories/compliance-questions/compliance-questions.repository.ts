import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { compliance_questions, compliance_sections, organizations, Prisma } from '@prisma/client';
import { difference, get, sumBy } from 'lodash';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { FilteringService } from '../../filtering';
import { CacheService } from '../../../cache';

export type dependency_chain_data = {
  dependency_expression: string;
  dependent_question_id: string;
  dependent_question_key: string;
  dependent_section_key: string;
  dependent_section_group_id: string;
  dependent_definition_name: string;
  dependent_question_values: any[];
};

export interface Question {
  id: string;
  prompt: string;
  order: number;
  key: string;
  rubric: any | null;
  options: any[] | null;
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
  constructor(readonly prisma: PrismaService, readonly filteringService: FilteringService, readonly cache: CacheService) {
    super(ComplianceQuestionsRepository.name);
  }

  private getCacheKey(org: organizations, name: string) {
    return `organizations:${org.id}:compliance:${name}:questions`;
  }

  /**
   * Retrieves a list of questions with responses for a given compliance section.
   * @param compliance_section_id
   * @param organization_id
   * @param filter
   */
  async getFilteredQuestionList({ compliance_section_id, organization_id }, filter?: boolean) {
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
                        LEFT JOIN compliance_responses cr
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
                   cq.deleted = FALSE AND
                   ocair.deleted = FALSE AND
                   cs.deleted = FALSE AND
                   cr.organization_id = ${organization_id} AND
                   cs.id = ${compliance_section_id}
                 GROUP BY cq.id, cr.organization_id, ocair.answer, ocr.value, cdc.dependency_chain, cr.compliance_definition_name, cs.id;`,
    )) as any;

    if (!questions.length) {
      return { compliance_questions: [], counts: { total: 0, not_started: 0, ai_answered: 0, user_answered: 0, bookmarked: 0 } };
    }

    this.logger.info('Retrieved filtered question list', { questions, organization_id, compliance_section_id });

    const start = new Date().getTime();

    const response = filter ? await this.filteringService.filterQuestions(questions) : questions;

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
    const questions = await this.prisma.compliance_definitions.findUnique({
      where: {
        name: compliance_definition_name,
      },
      include: {
        compliance_section_groups: {
          where: {
            id: compliance_section_group_id,
          },
          orderBy: {
            order: 'asc',
          },
          include: {
            compliance_sections: {
              where: {
                id: compliance_section_id,
              },
              orderBy: {
                order: 'asc',
              },
              include: {
                compliance_questions: {
                  orderBy: {
                    order: 'asc',
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!questions) {
      throw new NotFoundException(`No questions found for group: ${compliance_section_group_id} & section: ${compliance_section_id}}`);
    }

    this.logger.info(`Retrieved ${compliance_definition_name} question list for group: ${compliance_section_group_id} & section: ${compliance_section_id}}`, {
      ...questions,
    });

    return questions;
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
      await this.cache.delete('organizations', true);

      questions.forEach(q => (q.id = new Cuid2Generator(GuidPrefixes.ComplianceQuestion).scopedId));

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
      await this.cache.delete(`organizations`, true);

      question.id = new Cuid2Generator(GuidPrefixes.ComplianceQuestion).scopedId;
      const section = await this.prisma.compliance_sections.findUnique({
        where: {
          id: question.compliance_section_id,
        },
      });

      if (!section) {
        throw new NotFoundException(`Section not found for id ${question.compliance_section_id}`);
      }

      const created = await this.prisma.compliance_questions.create({
        data: {
          ...(question as any),
        },
      });

      if (question.dependency_expression) {
        await this.transformDependencyExpression(question, section);
      }

      this.logger.info(`Created question for compliance ${question.compliance_definition_name}`, { created });
      return created;
    } catch (e: any) {
      this.logger.error(`Error creating question for compliance ${question.compliance_definition_name}`, { ...e, question });
      if (e.code === 'P2002') {
        throw new ConflictException(`Question with key ${question.key} already exists for compliance ${question.compliance_definition_name}`);
      }

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
    await this.cache.delete('organizations', true);

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

      if (question.dependency_expression) {
        await this.transformDependencyExpression(question);
      }

      this.logger.info(`Updated question for compliance ${question.compliance_definition_name}`, { updated });
      return updated;
    } catch (e: any) {
      if (e.meta.cause === 'Record to update not found.') {
        throw new NotFoundException(`Question not found for compliance ${question.compliance_definition_name} and id ${question.id}`);
      }
      this.logger.error(`Error updating question for compliance ${question.compliance_definition_name}`, { ...e, question });
      throw e;
    }
  }

  async deleteQuestion(id: string): Promise<void> {
    await this.cache.delete('organizations', true);

    const question = await this.prisma.compliance_questions.findUnique({
      where: {
        id,
      },
    });

    if (!question) {
      throw new NotFoundException(`Question not found for id ${id}`);
    }

    await this.cache.delete(`compliance:${question?.compliance_definition_name}`, true);

    this.prisma.compliance_questions.delete({
      where: {
        id,
      },
    });
  }

  async transformDependencyExpression(question: compliance_questions, section?: compliance_sections) {
    const seen: any[] = [];

    if (!section) {
      const existing = await this.prisma.compliance_sections.findUnique({
        where: {
          id: question.compliance_section_id,
        },
      });

      if (!existing) {
        throw new NotFoundException(`Section not found for id ${question.compliance_section_id}`);
      } else {
        section = existing;
      }
    }
    const chains = await this.buildDependencyChain(question, seen, []);

    if (chains.length < 1) {
      console.log(`No chains found for question: ${question.key}`, { question, seen });
    }

    try {
      const qDep = await this.prisma.compliance_question_dependency_chains.upsert({
        where: {
          defNameSecKeyQuestKey: {
            compliance_question_key: question.key,
            compliance_section_key: section.key,
            compliance_definition_name: question.compliance_definition_name,
          },
        },
        create: {
          id: new Cuid2Generator(GuidPrefixes.ComplianceDependencyChain).scopedId,
          dependency_chain: chains,
          compliance_question_id: question.id,
          compliance_question_key: question.key,
          compliance_section_id: section.id,
          compliance_section_key: section.key,
          compliance_section_group_id: section.compliance_section_group_id,
          compliance_definition_name: question.compliance_definition_name,
          dependency_expression: question.dependency_expression ? question.dependency_expression : '',
        },
        update: {
          dependency_chain: chains,
          compliance_question_id: question.id,
          compliance_question_key: question.key,
          compliance_section_id: section.id,
          compliance_section_key: section.key,
          compliance_section_group_id: section.compliance_section_group_id,
          compliance_definition_name: question.compliance_definition_name,
          dependency_expression: question.dependency_expression ? question.dependency_expression : '',
        },
      });

      await this.prisma.compliance_questions.update({
        where: {
          id: question.id,
        },
        data: {
          compliance_question_dependency_chain_id: qDep.id,
        },
      });
    } catch (e) {
      this.logger.error(e.message, { question, error: e.message, stack: e.stack });

      throw new UnprocessableEntityException({ question, error: e.message, stack: e.stack }, 'Error building dependency chains');
    }
  }

  async buildDependencyChain(question: any, seen: any[], chains: dependency_chain_data[]): Promise<dependency_chain_data[]> {
    if (question.dependency_expression) {
      const split_expression = question.dependency_expression.split('and $');
      for (const part of split_expression) {
        const expression = part.startsWith('lookup') ? `$${part}` : part;
        const regex =
          /(?:(?<booleanValue>true|false) in \$map\(\$lookup\(definition\.sections\.\*\.follow_up, '(?<questionKeyMap>.+?)'\)\.value, function\(\$v\) { \$v in (?<valuesMap>.+?)(?= \}\) and|\}\)\$|$)|\$lookup\(definition\.sections\.\*\.follow_up, '(?<questionKey>.+?)'\)\.value = (?<values>true|false))/g;

        const matches = [...expression.matchAll(regex)];
        if (!matches || matches.length === 0) {
          continue;
        }
        for (const match of matches) {
          const dependent_question = await this.prisma.compliance_questions.findUnique({
            where: {
              compDefNameKey: {
                compliance_definition_name: question.compliance_definition_name,
                key: get(match, 'groups.questionKey', get(match, 'groups.questionKeyMap', '')),
              },
            },
            select: {
              id: true,
              key: true,
              dependency_expression: true,
              compliance_definition_name: true,
              compliance_section: {
                select: {
                  id: true,
                  key: true,
                  compliance_section_group_id: true,
                },
              },
            },
          });

          if (!dependent_question) {
            console.warn(`🚨 Missing Question: ${get(match, 'groups.questionKey', get(match, 'groups.questionKeyMap', ''))} 🚨`, {
              match,
              question,
            });
            return chains;
          }

          const chainData: dependency_chain_data = {
            dependency_expression: dependent_question.dependency_expression,
            dependent_question_id: dependent_question.id,
            dependent_question_key: dependent_question.key,
            dependent_section_key: dependent_question.compliance_section.key,
            dependent_section_group_id: dependent_question.compliance_section.compliance_section_group_id,
            dependent_definition_name: dependent_question.compliance_definition_name,
            dependent_question_values: JSON.parse(
              get(match, 'groups.valuesMap', `[${get(match, 'groups.values', '')}]`)
                .replace(' })', '')
                .replaceAll("'", '"'),
            ),
          } as dependency_chain_data;

          chains.push(chainData);

          if (seen.includes(question)) {
            console.warn(`🚨 Circular Dependency Detected: ${question.key} 🚨`, { question, seen });
            return chains;
          }

          seen.push(question);
          if (dependent_question.dependency_expression) {
            return await this.buildDependencyChain(dependent_question, seen, chains);
          }
        }
      }
    }

    return chains;
  }
}
