import { ComplianceSurveyPayloadType } from '@coldpbc/interfaces';
import { find, forOwn } from 'lodash';

/***
 * Helper method to mock return response from the server
 * @param payload
 * @param surveys
 */
export const returnUpdatedSurvey = (payload: ComplianceSurveyPayloadType, surveys: ComplianceSurveyPayloadType[]) => {
  const fullSurvey = find(surveys, survey => survey.definition.title === payload.definition.title);
  const copy = {
    ...fullSurvey,
    definition: payload.definition,
  } as ComplianceSurveyPayloadType;

  forOwn(copy.definition.sections, (section, sectionKey) => {
    const index = copy.definition.progress.sections.findIndex(progress => progress.section === sectionKey);
    copy.definition.progress = {
      sections: [],
      question_count: 0,
      questions_answered: 0,
      total_review: 0,
      percentage: 0,
      total_score: 0,
      total_max_score: 0,
    };
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
        copy.definition.progress.questions_answered += questionAnswered ? 1 : 0;
        if (!questionAnswered) {
          review += question.ai_attempted ? 1 : 0;
          copy.definition.progress.total_review += question.ai_attempted ? 1 : 0;
        }
        total += 1;
        copy.definition.progress.question_count += 1;
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
  copy.definition.progress.percentage = 70;
  copy.definition.progress.total_score = 95;
  copy.definition.progress.total_max_score = 100;

  return copy;
};
