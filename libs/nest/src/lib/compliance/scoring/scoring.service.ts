import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../worker';
import { set } from 'lodash';
import { FilteringService } from '../filtering';

@Injectable()
export class ScoringService extends BaseWorker {
  constructor(readonly filterService: FilteringService) {
    super(ScoringService.name);
  }

  async scoreComplianceResponse(complianceResponse: any): Promise<any> {
    let complianceScore = 0;
    let complianceAiScore = 0;
    let complianceMaxScore = 0;

    if (Array.isArray(complianceResponse.compliance_section_groups) && complianceResponse.compliance_section_groups.length > 0) {
      for (const sectionGroup of complianceResponse.compliance_section_groups) {
        const scored = await this.scoreSectionGroup(sectionGroup);
        complianceScore += scored.score;
        complianceAiScore += scored.ai_score;
        complianceMaxScore += scored.max_score;
      }
    }
    set(complianceResponse, 'score', complianceScore);
    set(complianceResponse, 'ai_score', complianceAiScore);
    set(complianceResponse, 'max_score', complianceMaxScore);

    return complianceResponse;
  }

  async scoreSectionGroup(sectionGroup: any): Promise<any> {
    let sectionGroupScore = 0;
    let sectionGroupAiScore = 0;
    let sectionGroupMaxScore = 0;

    for (const section of sectionGroup.compliance_sections) {
      // Get the current question
      const scored = await this.scoreSection(section);
      sectionGroupScore += scored.score;
      sectionGroupAiScore += scored.ai_score;
      sectionGroupMaxScore += scored.max_score;
    }

    set(sectionGroup, 'score', sectionGroupScore);
    set(sectionGroup, 'ai_score', sectionGroupAiScore);
    set(sectionGroup, 'max_score', sectionGroupMaxScore);
    // return the scored survey
    return sectionGroup;
  }

  async scoreSection(section: any): Promise<{ score: number; ai_score: number; max_score: number }> {
    let sectionScore = 0;
    let sectionAiScore = 0;
    let sectionMaxScore = 0;

    for (const question of section.compliance_questions) {
      // Get the current question
      const scored = await this.scoreQuestion(question);
      sectionScore += scored.score;
      sectionAiScore += scored.ai_score;
      sectionMaxScore += scored.max_score;
    }

    set(section, 'score', sectionScore);
    set(section, 'ai_score', sectionAiScore);
    set(section, 'max_score', sectionMaxScore);
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
   */
  async scoreQuestion(question: any): Promise<{ max_score: number; score: number; ai_score: number }> {
    // Get the follow-up questions for the current section

    // Check if the question has a rubric and a score map

    let score = 0;
    let aiScore = 0;

    let maxScore = 0;
    // If the question component is 'multi_select' or 'select' and the value is an array

    if (question.compliance_responses && question.compliance_responses.length > 0) {
      // Sum up the scores for each selected option
      for (const response of question.compliance_responses) {
        if (question.rubric && question.rubric?.score_map) {
          /**
           * If the question is multi_select or select, sum up the scores for each selected option
           */
          if (question.component === 'multi_select' || question.component === 'select') {
            if (this.filterService.questionHasAnswer(response.org_response, 'value')) {
              response.org_response.value.forEach(value => {
                score += question.rubric.score_map[value] || 0;
              });
            }

            if (this.filterService.questionHasAnswer(response.ai_response, 'answer')) {
              response.ai_response.answer.forEach(answer => {
                aiScore += question.rubric.score_map[answer] || 0;
              });
            }
          } else {
            // For other component types, just map the answer to a score
            score = question.rubric.score_map[response?.org_response?.value] || 0;
            aiScore = question.rubric.score_map[response?.ai_response?.answer] || 0;
          }
        } else {
          // If the question has no rubric or score map, set the score to
          question.score = 0;
          question.ai_score = 0;
          question.max_score = 0;
        }

        question.ai_answered = this.filterService.questionHasAnswer(response.ai_response, 'answer');
        question.org_answered = this.filterService.questionHasAnswer(response.org_response, 'value');
        question.not_started = !question.ai_answered && !question.org_answered;
      }

      if (question.rubric?.max_score) {
        maxScore = question.rubric.max_score;
        // If the question has a maximum score, cap the score
        if (score > question.rubric.max_score) {
          score = question.rubric.max_score;
        }

        if (aiScore > question.rubric.max_score) {
          aiScore = question.rubric.max_score;
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
      question.max_score = question.rubric.max_score || this.getTopScore(question.rubric);
    }

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
