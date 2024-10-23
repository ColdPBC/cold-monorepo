import {find, forEach, forOwn} from 'lodash';
import {ComplianceSurveyPayloadType} from '@coldpbc/interfaces';

/***
 * Helper method to mock return response from the server
 * @param payload
 * @param surveys
 */
export const returnUpdatedSurvey = (payload: ComplianceSurveyPayloadType, surveys: ComplianceSurveyPayloadType[]) => {
	const fullSurvey = find(surveys, survey => survey.definition.title === payload.definition.title);
	if (!fullSurvey) {
		return payload;
	}
	const copy = {
		...fullSurvey,
		definition: payload.definition,
		progress: {
			sections: fullSurvey.progress.sections,
			question_count: 0,
			questions_answered: 0,
			total_review: 0,
			percentage: 0,
			total_score: 0,
			total_max_score: 0,
		},
	} as ComplianceSurveyPayloadType;

	forOwn(copy.definition.sections, (section, sectionKey) => {
		const index = fullSurvey.progress.sections.findIndex(progress => progress.title === section.title);
		copy.progress.sections[index] = {
			answered: 0,
			complete: false,
			questions: {},
			review: 0,
			title: section.title,
			total: 0,
		};
		let answered = 0;
		let complete = false;
		let review = 0;
		let total = 0;
		if (index !== -1) {
			copy.progress.sections[index].questions = {};
			forOwn(section.follow_up, (question, questionKey) => {
				copy.progress.sections[index].questions[questionKey] = {
					user_answered: false,
					ai_answered: false,
				};
				const questionAnswered = question.value !== null && question.value !== undefined;
				copy.progress.sections[index].questions[questionKey].user_answered = questionAnswered;
				copy.progress.sections[index].questions[questionKey].ai_answered = question.ai_attempted !== undefined;
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
		copy.progress.sections[index].answered = answered;
		copy.progress.sections[index].complete = complete;
		copy.progress.sections[index].review = review;
		copy.progress.sections[index].total = total;
	});
	forEach(copy.progress.sections, section => {
		copy.progress.question_count += section.total;
		copy.progress.total_review += section.review;
		copy.progress.questions_answered += section.answered;
	});
	copy.progress.percentage = 0.7;
	copy.progress.total_score = 95;
	copy.progress.total_max_score = 100;

	return copy;
};
