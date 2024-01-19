import { Compliance } from '@coldpbc/interfaces';
import { forEach, forOwn, isUndefined } from 'lodash';

export const getComplianceProgress = (compliance: Compliance) => {
  // loop through all the surveys and get the number of questions answered and the total number of questions
  let totalQuestions = 0;
  let answeredQuestions = 0;
  let aiAnsweredQuestions = 0;
  let aiAttemptedQuestions = 0;
  forEach(compliance.surveys, survey => {
    forOwn(survey.definition?.sections, (section, sectionKey) => {
      forOwn(section.follow_up, question => {
        totalQuestions++;
        if (!isUndefined(question.ai_attempted)) {
          aiAttemptedQuestions++;
        }
        if (question.value) {
          answeredQuestions++;
        } else {
          if (question.ai_value) {
            aiAnsweredQuestions++;
          }
        }
      });
    });
  });

  return {
    totalQuestions,
    aiAttemptedQuestions,
    answeredQuestions,
    aiAnsweredQuestions,
    percentageAnswered: Math.round((answeredQuestions / totalQuestions) * 100),
    percentageAIAnswered: Math.round((aiAnsweredQuestions / totalQuestions) * 100),
    title: compliance.title,
  };
};
