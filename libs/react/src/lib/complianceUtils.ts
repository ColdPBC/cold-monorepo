import { SurveyPayloadType } from '@coldpbc/interfaces';
import { forOwn, isUndefined } from 'lodash';
import { HexColors } from '@coldpbc/themes';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ComplianceManagerStatus } from '@coldpbc/enums';

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

export const ComplianceProgressStatusColor = {
	not_started: HexColors.gray['50'],
	ai_answered: HexColors.yellow['200'],
	bookmarked: HexColors.lightblue['200'],
	user_answered: HexColors.green['200'],
};

export const getTermString = (term: string) => {
	switch (term) {
		case 'annual':
			return 'Annual';
		case 'quarterly':
			return 'Quarterly';
		case 'every_three_years':
			return 'Every Three Years';
		default:
			return '';
	}
};

export const startComplianceAI = async (name: string, orgId: string) => {
	return await axiosFetcher([`/compliance/${name}/organizations/${orgId}/activate`, 'PUT']);
};

export const isComplianceStatusPassed = (state: ComplianceManagerStatus, managerStatus: ComplianceManagerStatus) => {
	const enumArray = Object.values(ComplianceManagerStatus);
	// check if the state is either the same or before the managerStatus
	return enumArray.indexOf(state) < enumArray.indexOf(managerStatus);
};

export const isComplianceStatusReached = (state: ComplianceManagerStatus, managerStatus: ComplianceManagerStatus) => {
	const enumArray = Object.values(ComplianceManagerStatus);
	// check if the state is either the same or before the managerStatus
	return enumArray.indexOf(state) <= enumArray.indexOf(managerStatus);
};
