import { ComplianceSurveyPayloadType } from '@coldpbc/interfaces';
import { find, forOwn } from 'lodash';

export const returnUpdatedSurvey = (payload: ComplianceSurveyPayloadType, surveys: ComplianceSurveyPayloadType[]) => {
  // check every question in the survey. update the progress field for each question
  // if question is answered set user_answered to true, if not set user_answered to false
  // if ai_answered is true, set ai_answered to true, if not set ai_answered to false
  const fullSurvey = find(surveys, survey => survey.definition.title === payload.definition.title);
  const copy = {
    ...fullSurvey,
    definition: payload.definition,
  } as ComplianceSurveyPayloadType;

  forOwn(copy.definition.sections, (section, sectionKey) => {
    const index = copy.definition.progress.sections.findIndex(progress => progress.section === sectionKey);
    copy.definition.progress.sections[index] = {
      answered: 0,
      complete: false,
      questions: {},
      review: 0,
      section: sectionKey,
      title: section.title,
      total: 0,
    };
    let answered = 0;
    let complete = false;
    let review = 0;
    let total = 0;
    if (index !== -1) {
      copy.definition.progress.sections[index].questions = {};
      forOwn(section.follow_up, (question, questionKey) => {
        copy.definition.progress.sections[index].questions[questionKey] = {
          user_answered: false,
          ai_answered: false,
        };
        const questionAnswered = question.value !== null && question.value !== undefined;
        copy.definition.progress.sections[index].questions[questionKey].user_answered = questionAnswered;
        copy.definition.progress.sections[index].questions[questionKey].ai_answered = question.ai_attempted !== undefined;
        answered += questionAnswered ? 1 : 0;
        if (!questionAnswered) {
          review += question.ai_attempted ? 1 : 0;
        }
        total += 1;
      });
    }
    if (answered === total) {
      complete = true;
    }
    copy.definition.progress.sections[index].answered = answered;
    copy.definition.progress.sections[index].complete = complete;
    copy.definition.progress.sections[index].review = review;
    copy.definition.progress.sections[index].total = total;
  });
  return copy;
};
