import { Injectable } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';

@Injectable()
export class ScoringService extends BaseWorker {
  constructor() {
    super(ScoringService.name);
  }

  async scoreSurvey(survey: any): Promise<any> {
    Object.keys(survey.definition.sections).forEach(sectionKey => {
      const followUps = survey.definition.sections[sectionKey].follow_up;
      Object.keys(followUps).forEach(questionKey => {
        const question = followUps[questionKey];

        if (question.rubric && question.rubric.score_map) {
          let score = 0;
          if ((question.component === 'multi_select' || question.component === 'select') && Array.isArray(question.value)) {
            // Sum up the scores for each selected option
            question.value.forEach(value => {
              score += question.rubric.score_map[value] || 0;
            });
          } else {
            // For other component types, just map the answer to a score
            score = question.rubric.score_map[question.value] || 0;
          }

          if (question.rubric.max_score && score > question.rubric.max_score) {
            score = question.rubric.max_score;
          }
          question.score = score;
        }
      });
    });
    return survey;
  }
}
