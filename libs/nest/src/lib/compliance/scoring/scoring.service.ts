import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../worker';
import { pick, set } from 'lodash';
import { FilteringService } from '../filtering';
import { ComplianceResponseOptions } from '../repositories';
import { IAuthenticatedUser } from '../../primitives';
import { organizations } from '@prisma/client';
import { PrismaService } from '../../prisma';

@Injectable()
export class ScoringService extends BaseWorker {
  constructor(readonly filterService: FilteringService, readonly prisma: PrismaService) {
    super(ScoringService.name);
  }

  async scoreComplianceResponse(complianceResponse: any, org: organizations, user: IAuthenticatedUser, options?: ComplianceResponseOptions): Promise<any> {
    let complianceScore = 0;
    let complianceAiScore = 0;
    let complianceMaxScore = 0;
    let not_started = 0;
    let org_answered = 0;
    let ai_answered = 0;
    let bookmarked = 0;
    let totalQuestions = 0;

    if (Array.isArray(complianceResponse.compliance_section_groups) && complianceResponse.compliance_section_groups.length > 0) {
      complianceResponse.compliance_section_groups = await this.filterService.filterSectionGroups(complianceResponse.compliance_section_groups, options);

      if (!complianceResponse.compliance_section_groups) {
        this.logger.warn(`No compliance section groups found for ${complianceResponse.name}`, complianceResponse);
        complianceResponse.compliance_section_groups = [];
      }

      for (const sectionGroup of complianceResponse.compliance_section_groups) {
        const scored = await this.scoreSectionGroup(sectionGroup, org, user, options);

        // increment counters
        not_started += sectionGroup.counts.not_started;
        org_answered += sectionGroup.counts.org_answered;
        ai_answered += sectionGroup.counts.ai_answered;
        bookmarked += sectionGroup.counts.bookmarked;
        totalQuestions += sectionGroup.counts.total;

        complianceScore += scored.score;
        complianceAiScore += scored.ai_score;
        complianceMaxScore += scored.max_score;
      }
    }
    set(complianceResponse, 'score', complianceScore);
    set(complianceResponse, 'ai_score', complianceAiScore);
    set(complianceResponse, 'max_score', complianceMaxScore);
    set(complianceResponse, 'estimated_score', complianceScore + complianceAiScore);
    set(complianceResponse, 'counts', { not_started, org_answered, ai_answered, bookmarked, total: totalQuestions, progress: (org_answered / totalQuestions) * 100 });

    return complianceResponse;
  }

  async scoreSectionGroup(sectionGroup: any, org: organizations, user: IAuthenticatedUser, options?: ComplianceResponseOptions): Promise<any> {
    let sectionGroupScore = 0;
    let sectionGroupAiScore = 0;
    let sectionGroupMaxScore = 0;

    let not_started = 0;
    let org_answered = 0;
    let ai_answered = 0;
    let bookmarked = 0;
    let totalQuestions = 0;

    for (const section of sectionGroup.compliance_sections) {
      // Get the current question
      const scored = await this.scoreSection(section, org, user, options);

      // increment counters
      not_started += section.counts.not_started;
      org_answered += section.counts.org_answered;
      ai_answered += section.counts.ai_answered;
      bookmarked += section.counts.bookmarked;
      totalQuestions += section.counts.total;

      sectionGroupScore += scored.score;
      sectionGroupAiScore += scored.ai_score;
      sectionGroupMaxScore += scored.max_score;
    }

    set(sectionGroup, 'score', sectionGroupScore);
    set(sectionGroup, 'ai_score', sectionGroupAiScore);
    set(sectionGroup, 'estimated_score', sectionGroupScore + sectionGroupAiScore);
    set(sectionGroup, 'max_score', sectionGroupMaxScore);

    set(sectionGroup, 'counts', { not_started, org_answered, ai_answered, bookmarked, total: totalQuestions, progress: (org_answered / totalQuestions) * 100 });
    // return the scored survey
    return sectionGroup;
  }

  async scoreSection(
    section: any,
    org: organizations,
    user: IAuthenticatedUser,
    options?: ComplianceResponseOptions,
  ): Promise<{ score: number; ai_score: number; max_score: number }> {
    let sectionScore = 0;
    let sectionAiScore = 0;
    let sectionMaxScore = 0;

    let not_started = 0;
    let org_answered = 0;
    let ai_answered = 0;
    let bookmarked = 0;

    section.compliance_questions = await this.filterService.filterQuestions(section.compliance_questions, options);

    const totalQuestions = section.compliance_questions.length;

    for (const idx in section.compliance_questions) {
      // Get the current question
      section.compliance_questions[idx] = await this.scoreQuestion(section.compliance_questions[idx], org, user, options);

      // increment counters
      not_started += section.compliance_questions[idx].counts?.not_started;
      org_answered += section.compliance_questions[idx].counts?.org_answered;
      ai_answered += section.compliance_questions[idx].counts?.ai_answered;
      bookmarked += section.compliance_questions[idx].counts?.bookmarked;

      sectionScore += section.compliance_questions[idx].score;
      sectionAiScore += section.compliance_questions[idx].ai_score;
      sectionMaxScore += section.compliance_questions[idx].max_score;
    }

    if (options?.onlyCounts) {
      delete section.compliance_questions;
    }

    set(section, 'score', sectionScore);
    set(section, 'ai_score', sectionAiScore);
    set(section, 'estimated_score', sectionScore + sectionAiScore);
    set(section, 'max_score', sectionMaxScore);
    set(section, 'counts', { not_started, org_answered, ai_answered, bookmarked, total: totalQuestions, progress: (org_answered / totalQuestions) * 100 });
    // return the scored section
    return section;
  }

  /**
   * The ScoreAssesment function is used to calculate the score for each follow-up question in a survey.
   * It iterates over each section in the survey, and for each section, it iterates over each follow-up
   * question. If a question has a rubric and a score map, it calculates the score for the question
   * based on the question's component type and value. If the calculated score is greater than the max
   * score for the question, it sets the score to the max score. Finally, it sets the score for the
   * question and returns the scored survey.
   * @param question
   * @param org
   * @param user
   * @param options
   */
  async scoreQuestion(
    question: any,
    org: organizations,
    user: IAuthenticatedUser,
    options?: ComplianceResponseOptions,
  ): Promise<{ max_score: number; score: number; ai_score: number }> {
    // Get the follow-up questions for the current section

    // Check if the question has a rubric and a score map

    let score = 0;
    let aiScore = 0;
    let maxScore = 0;

    // If the question component is 'multi_select' or 'select' and the value is an array

    if (Array.isArray(question.compliance_responses)) {
      question.bookmarked = Array.isArray(question.question_bookmarks) && question.question_bookmarks.length > 0;
      // If the question has no responses, it's not started
      if (question.compliance_responses.length < 1) {
        question.ai_answered = false;
        question.user_answered = false;
        question.not_started = true;
      }
      // Sum up the scores for each selected option
      for (const response of question.compliance_responses) {
        if (question.rubric && question.rubric?.score_map) {
          /**
           * If the question is multi_select or select, sum up the scores for each selected option
           */
          if (question.component === 'multi_select' || question.component === 'select') {
            if (this.filterService.questionHasValidAnswer(response.org_response, 'value', question.component)) {
              await response.org_response.value.forEach(value => {
                score += question.rubric.score_map[value] || 0;
              });
            } else {
              if (this.filterService.questionHasValidAnswer(response.ai_response, 'answer', question.component)) {
                await response.ai_response.answer.forEach(answer => {
                  aiScore += question.rubric.score_map[answer] || 0;
                });
              }
            }
          } else {
            // For other component types, just map the answer to a score
            if (question.rubric.score_map[response?.org_response?.value] > 0) {
              score = question.rubric.score_map[response?.org_response?.value];
              aiScore = 0;
            } else {
              score = 0;
              aiScore = question.rubric.score_map[response?.ai_response?.answer] || 0;
            }
          }
        } else {
          // If the question has no rubric or score map, set the score to
          question.score = 0;
          question.ai_score = 0;
          question.max_score = 0;
        }

        question.user_answered = response.org_response ? Object.prototype.hasOwnProperty.call(response.org_response, 'value') : false;
        question.ai_answered = !question.user_answered && this.filterService.questionHasValidAnswer(response.ai_response, 'answer', question.component);
        question.not_started = !question.ai_answered && !question.org_answered;
      }
      /**
       * If the responses aren't needed, remove the compliance_responses array
       */
      if (!options?.responses) {
        delete question.compliance_responses;
      }

      if (question.rubric?.max_score) {
        maxScore = question.rubric?.max_score;
        // If the question has a maximum score, cap the score
        if (score > question.rubric?.max_score) {
          score = question.rubric?.max_score;
        }

        if (aiScore > question.rubric?.max_score) {
          aiScore = question.rubric?.max_score;
        }
      } else {
        maxScore = this.getTopScore(question.rubric);
      }

      // Set the score for the question
      question.score = score;
      question.ai_score = aiScore;
      question.max_score = maxScore || this.getTopScore(question.rubric);
    } else {
      // If the question has no responses, set the ai_score & score to 0
      question.score = 0;
      question.ai_score = 0;
      question.max_score = question.rubric?.max_score || this.getTopScore(question.rubric);
    }

    set(question, 'counts', {
      not_started: !question.user_answered && !question.ai_answered ? 1 : 0,
      org_answered: question.user_answered ? 1 : 0,
      ai_answered: question.ai_answered ? 1 : 0,
      bookmarked: question.bookmarked ? 1 : 0,
      total: 1,
      progress: (question.user_answered / 1) * 100,
    });

    if (question.rubric?.score_map) {
      question.answer_score_map = Object.assign({}, question.rubric?.score_map);
    }

    if (options?.onlyCounts) {
      return pick(question, ['id', 'key', 'order', 'ai_answered', 'bookmarked', 'user_answered', 'not_started', 'counts', 'answer_score_map', 'max_score', 'score', 'ai_score']);
    }

    if (!options?.references) {
      delete question?.ai_response?.references;
    }

    if (!options?.responses) {
      delete question?.ai_response;
    }

    delete question.rubric;

    // return the scored survey
    return question;
  }

  private getTopScore(rubric: any) {
    let maxScore = 0;
    if (rubric) {
      const keys = Object.keys(rubric?.score_map);
      for (const value of keys) {
        maxScore += rubric?.score_map[value];
      }
    }

    return maxScore;
  }
}
