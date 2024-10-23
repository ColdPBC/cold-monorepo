import {
	ComplianceSurveyActiveKeyType,
	ComplianceSurveyPayloadType,
	ComplianceSurveySavedQuestionType,
	SurveySectionFollowUpsType,
	SurveySectionFollowUpType,
} from '@coldpbc/interfaces';
import { find, findIndex, map } from 'lodash';
import { ColdIcon, ErrorFallback } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';
import { HexColors } from '@coldpbc/themes';
import { useColdContext } from '@coldpbc/hooks';
import { isAIResponseValueValid } from '@coldpbc/lib';

export interface ComplianceSurveyRightNavProps {
	activeKey: ComplianceSurveyActiveKeyType;
	setActiveKey: (activeKey: ComplianceSurveyActiveKeyType) => void;
	surveyData: ComplianceSurveyPayloadType;
	savedQuestions: Array<ComplianceSurveySavedQuestionType>;
	surveyOpen: boolean;
	setSurveyOpen: (surveyOpen: boolean) => void;
}

const _ComplianceSurveyRightNav = (props: ComplianceSurveyRightNavProps) => {
	const { activeKey, setActiveKey, surveyData, setSurveyOpen, savedQuestions } = props;
	const { logBrowser } = useColdContext();

	const onClick = (key: string) => {
		// open modal with
		setActiveKey({
			...activeKey,
			value: key,
		});
		setSurveyOpen(true);
	};

	const getQuestionItemIcon = (key: string, inSavedQuestions?: boolean) => {
		let activeSection = surveyData.definition.sections[activeKey.section];
		const followUp = activeSection.follow_up[key];
		if (inSavedQuestions) {
			const question = find(savedQuestions, (saved: ComplianceSurveySavedQuestionType) => saved.followUpKey === key);
			if (question) {
				activeSection = surveyData.definition.sections[question.sectionKey];
			}
		}
		const progressSection = find(surveyData.progress.sections, section => section.title === activeSection.title);
		const progressQuestion = progressSection?.questions[key];

		if (progressQuestion?.user_answered) {
			return (
				<div className={'w-[24px] h-[24px]'}>
					<ColdIcon name={IconNames.ColdComplianceSurveyCheckBoxIcon} className={' '} />
				</div>
			);
		} else {
			if (progressQuestion?.ai_answered && isAIResponseValueValid(followUp)) {
				return (
					<div className={'h-[24px] w-[24px] rounded-full flex items-center justify-center bg-gray-70'}>
						<ColdIcon name={IconNames.ColdAiIcon} color={HexColors.white} />
					</div>
				);
			} else {
				return <div className={'h-[24px] w-[24px] rounded-full bg-gray-70'}></div>;
			}
		}
	};

	const getQuestionItem = (question: SurveySectionFollowUpType, key: string, questions: SurveySectionFollowUpsType, inSavedQuestions?: boolean) => {
		let index = 0;
		if (inSavedQuestions) {
			index = findIndex(savedQuestions, (saved: ComplianceSurveySavedQuestionType) => saved.followUpKey === key) + 1;
		} else {
			index = Object.keys(questions).indexOf(key) + 1;
		}

		let prompt = question.question_summary ? question.question_summary : question.prompt;
		let hasDocumentLink = false;

		if (inSavedQuestions) {
			hasDocumentLink = !!savedQuestions[index - 1].document_link;
			prompt = `${savedQuestions[index - 1].category} - ${savedQuestions[index - 1].sectionTitle} - ${savedQuestions[index - 1].prompt}`;
		} else {
			hasDocumentLink = !!question.document_link;
		}

		return (
			<div
				key={key}
				className={`h-[34px] flex flex-row space-x-2 items-center hover:underline cursor-pointer ${hasDocumentLink ? 'pl-[38px]' : 'pl-[72px]'}`}
				onClick={() => onClick(key)}>
				{hasDocumentLink && <ColdIcon name={IconNames.ColdDocumentUploadIcon} inverted={true} />}
				{getQuestionItemIcon(key, inSavedQuestions)}
				<div className={'w-full text-body line-clamp-1'}>
					{index}. {prompt}
				</div>
			</div>
		);
	};

	const getRightNavTitle = () => {
		if (activeKey.section === 'savedQuestions') {
			return 'Saved Questions';
		} else {
			return surveyData.definition.sections[activeKey.section].title;
		}
	};

	const getQuestionItems = () => {
		const inSavedQuestions = activeKey.section === 'savedQuestions';
		if (activeKey.section === 'savedQuestions') {
			return map(savedQuestions, (question, key, questions) => {
				return getQuestionItem(
					question,
					question.followUpKey,
					{
						[question.followUpKey]: surveyData.definition.sections[question.sectionKey].follow_up[question.followUpKey],
					},
					inSavedQuestions,
				);
			});
		} else {
			const sectionQuestions = surveyData.definition.sections[activeKey.section].follow_up;

			return map(sectionQuestions, (question, key, questions) => {
				return getQuestionItem(question, key, questions, inSavedQuestions);
			});
		}
	};

	logBrowser('ComplianceSurveyRightNav', 'info', { activeKey });

	return (
		<div className={'w-full h-full bg-bgc-accent pr-[99px] pt-[38px] pb-[38px] text-tc-primary space-y-[18px] flex flex-col overflow-y-auto rounded-r-lg'}>
			<div className={'flex flex-col pl-[72px]'}>
				<div className={'text-caption font-bold'}>{activeKey.category}</div>
				<div className={'text-h2'}>{getRightNavTitle()}</div>
			</div>
			{getQuestionItems()}
		</div>
	);
};

export const ComplianceSurveyRightNav = withErrorBoundary(_ComplianceSurveyRightNav, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ComplianceSurveyRightNav: ', error);
	},
});
