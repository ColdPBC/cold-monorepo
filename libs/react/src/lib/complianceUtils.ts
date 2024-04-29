import { SurveyPayloadType } from '@coldpbc/interfaces';
import { forOwn, isUndefined } from 'lodash';
import { LDFlagSet } from '@launchdarkly/node-server-sdk';

export const getComplianceProgressForSurvey = (survey: SurveyPayloadType) => {
  let totalQuestions = 0;
  let answeredQuestions = 0;
  let aiAnsweredQuestions = 0;
  let aiAttemptedQuestions = 0;
  forOwn(survey.definition?.sections, (section, sectionKey) => {
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
  });
  return {
    totalQuestions,
    aiAttemptedQuestions,
    answeredQuestions,
    aiAnsweredQuestions,
    percentageAnswered: Math.round((answeredQuestions / totalQuestions) * 100),
    percentageAIAnswered: Math.round((aiAnsweredQuestions / totalQuestions) * 100),
  };
};

export const getCorrectComplianceLogo = (logoUrl: string | undefined, flags: LDFlagSet) => {
  if (!logoUrl) return logoUrl;
  let newImageName = '';
  const imageUrl = logoUrl;
  const imageSeparated = imageUrl.split('/');
  const imageName = imageSeparated[imageSeparated.length - 1];
  if (flags.showNewCompliancePageHomeCold671) {
    newImageName = imageName.replace('dark', 'light');
  } else {
    newImageName = imageName.replace('light', 'dark');
  }

  return imageUrl.replace(imageName, newImageName);
};
