import { SurveyPayloadType } from '@coldpbc/interfaces';
import { forOwn, get, isUndefined } from 'lodash';

export const getComplianceProgressForSurvey = (survey: SurveyPayloadType) => {
  let totalQuestions = 0;
  let answeredQuestions = 0;
  let aiAnsweredQuestions = 0;
  let aiAttemptedQuestions = 0;
  forOwn(
    get(survey, 'definition.sections', {
      section: {
        follow_up: {
          0: {
            ai_attempted: false,
            value: undefined,
            ai_response: undefined,
          },
        },
      },
    }),
    (section, sectionKey) => {
      forOwn(section.follow_up, question => {
        totalQuestions++;
        if (!isUndefined(question.ai_attempted)) {
          aiAttemptedQuestions++;
        }
        if (question.value) {
          answeredQuestions++;
        } else {
          if (question.ai_response?.answer) {
            aiAnsweredQuestions++;
          }
        }
      });
    },
  );
  return {
    totalQuestions,
    aiAttemptedQuestions,
    answeredQuestions,
    aiAnsweredQuestions,
    percentageAnswered: Math.round((answeredQuestions / totalQuestions) * 100),
    percentageAIAnswered: Math.round((aiAnsweredQuestions / totalQuestions) * 100),
  };
};
