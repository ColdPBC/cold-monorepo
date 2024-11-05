import { Injectable } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';

@Injectable()
export class ScoringService extends BaseWorker {
  constructor() {
    super(ScoringService.name);
  }

  /**
   * The scoreSurvey function is used to calculate the score for each follow-up question in a survey.
   * It iterates over each section in the survey, and for each section, it iterates over each follow-up
   * question. If a question has a rubric and a score map, it calculates the score for the question
   * based on the question's component type and value. If the calculated score is greater than the max
   * score for the question, it sets the score to the max score. Finally, it sets the score for the
   * question and returns the scored survey.
   * @param survey
   */
  scoreSurvey(survey: any): Promise<any> {
    // Iterate over each section in the survey
    Object.keys(survey.definition.sections).forEach(sectionKey => {
      // Get the follow-up questions for the current section
      const followUps = survey.definition.sections[sectionKey].follow_up;

      // Iterate over each follow-up questions
      Object.keys(followUps).forEach(questionKey => {
        // Get the current question
        const question = followUps[questionKey];

        // Check if the question has a rubric and a score map
        if (question.rubric && question.rubric.score_map) {
          let score = 0;
          let maxScore = 0;
          // If the question component is 'multi_select' or 'select' and the value is an array
          if ((question.component === 'multi_select' || question.component === 'select') && Array.isArray(question.value)) {
            // Sum up the scores for each selected option
            question.value.forEach(value => {
              score += question.rubric.score_map[value] || 0;
            });
          } else {
            // For other component types, just map the answer to a score
            score = question.rubric.score_map[question.value] || 0;
          }

          if (question.rubric.max_score) {
            maxScore = question.rubric.max_score;
            // If the question has a maximum score, cap the score
            if (score > question.rubric.max_score) {
              score = question.rubric.max_score;
            }
          } else {
            maxScore = this.getTopScore(question);
          }

          // Set the score for the question
          question.max_score = maxScore;
          question.score = score;
        }
      });
    });

    // return the scored survey
    return survey;
  }

  private getTopScore(question) {
    let maxScore = 0;
    Object.keys(question.rubric.score_map).forEach(value =>
      parseInt(question.rubric.score_map[value]) > maxScore ? (maxScore = parseInt(question.rubric.score_map[value])) : maxScore,
    );
    return maxScore;
  }
}
