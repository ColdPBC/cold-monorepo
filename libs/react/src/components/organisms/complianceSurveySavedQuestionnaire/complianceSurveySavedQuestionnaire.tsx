import React from 'react';
import { findIndex, get, keys, size } from 'lodash';
import { BaseButton, ColdIcon, ErrorFallback, SurveyDocumentLinkModal, SurveyInput } from '@coldpbc/components';
import {
	getAccurateBookmarkedValue,
	getQuestionValue,
	getSectionIndex,
	ifAdditionalContextConditionMet,
	isAIResponseValueValid,
	putSurveyData,
	sortComplianceSurvey,
	updateSurveyQuestion,
} from '@coldpbc/lib';
import { ButtonTypes, GlobalSizes, IconNames } from '@coldpbc/enums';
import { ComplianceSurveyActiveKeyType, ComplianceSurveyPayloadType, ComplianceSurveySavedQuestionType, IButtonProps, SurveyActiveKeyType } from '@coldpbc/interfaces';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useSWRConfig } from 'swr';
import { withErrorBoundary } from 'react-error-boundary';

export interface ComplianceSurveySavedQuestionnaireProps {
	activeKey: ComplianceSurveyActiveKeyType;
	setActiveKey: (activeKey: ComplianceSurveyActiveKeyType) => void;
	submitSurvey: () => void;
	surveyData: ComplianceSurveyPayloadType;
	setSurveyData: (surveyData: ComplianceSurveyPayloadType) => void;
	savedQuestions: ComplianceSurveySavedQuestionType[];
	bookmarked: {
		[key: string]: boolean;
	};
	setBookmarked: (bookmarked: { [key: string]: boolean }) => void;
}

const _ComplianceSurveySavedQuestionnaire = (props: ComplianceSurveySavedQuestionnaireProps) => {
	const { activeKey, setActiveKey, submitSurvey, surveyData, setSurveyData, savedQuestions, bookmarked, setBookmarked } = props;
	const { getOrgSpecificUrl } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
	const [sendingSurvey, setSendingSurvey] = React.useState<boolean>(false);
	const [documentLinkModalOpen, setDocumentLinkModalOpen] = React.useState<boolean>(false);
	const nextQuestionTransitionClassNames = {
		enter: 'transform translate-x-full',
		enterDone: 'transition ease-out duration-200 transform translate-x-0',
		exitActive: 'transition ease-in duration-200 transform -translate-x-full',
	};
	const previousQuestionTransitionClassNames = {
		enter: 'transform -translate-x-full',
		enterDone: 'transition ease-out duration-200 transform translate-x-0',
		exitActive: 'transition ease-in duration-200 transform translate-x-full',
	};
	const { mutate } = useSWRConfig();
	const [transitionClassNames, setTransitionClassNames] = React.useState<any>(nextQuestionTransitionClassNames);
	const { definition, id, name } = surveyData;
	const { sections } = definition;

	const updateTransitionClassNames = (nextDirection: boolean) => {
		if (nextDirection) {
			setTransitionClassNames(nextQuestionTransitionClassNames);
		} else {
			setTransitionClassNames(previousQuestionTransitionClassNames);
		}
	};

	const onFieldUpdated = (key: string, value: any, additional = false) => {
		setActiveKey({
			value: activeKey.value,
			previousValue: activeKey.value,
			isFollowUp: activeKey.isFollowUp,
			section: 'savedQuestions',
			category: surveyData.definition.title,
		});
		const newSurvey = updateSurveyQuestion(surveyData, activeKey, { value }, undefined, additional);
		logBrowser('Updating saved question', 'info', {
			activeKey,
			key,
			value,
			additional,
		});
		setSurveyData(newSurvey as ComplianceSurveyPayloadType);
	};

	const getQuestionForKey = (key: ComplianceSurveyActiveKeyType, additional = false) => {
		// get the saved question
		const activeSectionIndex = getSectionIndex(sections, activeKey);
		const activeSectionKey = Object.keys(sections)[activeSectionIndex];
		const followUpKey = key.value;
		const followUp = sections[activeSectionKey].follow_up[followUpKey];
		const followUpIndex = findIndex(Object.keys(sections[activeSectionKey].follow_up), followUpKey => {
			return followUpKey === key.value;
		});
		if (additional && followUp.additional_context) {
			return (
				<SurveyInput
					{...followUp.additional_context}
					options={[]}
					input_key={key.value}
					onFieldUpdated={(name, value) => {
						onFieldUpdated(key.value, value, true);
					}}
					value={followUp.additional_context.value}
					isAdditional={true}
				/>
			);
		}
		if (followUp) {
			return <SurveyInput {...followUp} input_key={key.value} onFieldUpdated={onFieldUpdated} value={followUp.value} prompt={`${followUpIndex + 1}. ${followUp.prompt}`} />;
		}

		return <></>;
	};

	const getPreviousButton = () => {
		const buttonProps = {
			label: '',
			variant: ButtonTypes.secondary,
			onClick: () => {
				onPreviousButtonClicked();
			},
			textSize: GlobalSizes.small,
			disabled: sendingSurvey,
		};
		const questionIndex = findIndex(savedQuestions, savedQuestion => {
			return savedQuestion.followUpKey === activeKey.value;
		});

		if (questionIndex > 0) {
			buttonProps.label = 'Previous';
			buttonProps.onClick = () => {
				onPreviousButtonClicked();
			};
		}

		if (buttonProps.label === '') {
			return <></>;
		} else {
			return <BaseButton {...buttonProps} />;
		}
	};

	const getNextButton = () => {
		const buttonProps: IButtonProps = {
			label: 'Continue',
			variant: ButtonTypes.primary,
			onClick: () => {
				onNextButtonClicked();
			},
			textSize: GlobalSizes.small,
			loading: sendingSurvey,
			disabled: sendingSurvey,
		};
		const activeSectionIndex = getSectionIndex(sections, activeKey);

		// start of saved question logic
		const activeSectionKey = Object.keys(sections)[activeSectionIndex];
		const activeFollowUpIndex = savedQuestions.findIndex(savedQuestion => {
			return savedQuestion.followUpKey === activeKey.value;
		});
		const activeFollowUpKey = savedQuestions[activeFollowUpIndex].followUpKey;

		if (activeKey.isFollowUp) {
			if (
				sections[activeSectionKey].follow_up[activeFollowUpKey].value === undefined &&
				isAIResponseValueValid({
					ai_response: sections[activeSectionKey].follow_up[activeFollowUpKey].ai_response,
					component: sections[activeSectionKey].follow_up[activeFollowUpKey].component,
					options: sections[activeSectionKey].follow_up[activeFollowUpKey].options,
				})
			) {
				buttonProps.label = 'Confirm';
				if (activeFollowUpIndex === savedQuestions.length - 1) {
					buttonProps.onClick = () => {
						onSubmitButtonClicked();
					};
				} else {
					buttonProps.onClick = () => {
						onNextButtonClicked();
					};
				}
			} else {
				if (activeFollowUpIndex === savedQuestions.length - 1) {
					buttonProps.label = 'Save';
					buttonProps.onClick = () => {
						onSubmitButtonClicked();
					};
				} else {
					if (sections[activeSectionKey].follow_up[activeFollowUpKey].value === null || sections[activeSectionKey].follow_up[activeFollowUpKey].value === undefined) {
						buttonProps.label = 'Skip';
						buttonProps.onClick = () => {
							onSkipButtonClicked();
						};
					} else {
						buttonProps.label = 'Continue';
						buttonProps.onClick = () => {
							onNextButtonClicked();
						};
					}
				}
			}
		}

		return <BaseButton {...buttonProps} />;
	};

	const goToNextQuestion = (key: ComplianceSurveyActiveKeyType, surveyData: ComplianceSurveyPayloadType) => {
		const activeFollowUpIndex = findIndex(savedQuestions, savedQuestion => {
			return savedQuestion.followUpKey === key.value;
		});
		const nextFollowUpKey = savedQuestions[activeFollowUpIndex + 1].followUpKey;
		setActiveKey({
			value: nextFollowUpKey,
			previousValue: key.value,
			isFollowUp: true,
			section: 'savedQuestions',
			category: surveyData.definition.title,
		});
	};

	const onNextButtonClicked = async () => {
		setSendingSurvey(true);
		setDocumentLinkModalOpen(false);
		const bookmarkedQuestion = getAccurateBookmarkedValue(sections, activeKey, bookmarked);
		const newSurvey = updateSurveyQuestion(surveyData, activeKey, {
			value: getQuestionValue(surveyData, activeKey),
			skipped: false,
			saved: bookmarkedQuestion,
		});
		const response = (await putSurveyData(newSurvey as ComplianceSurveyPayloadType, getOrgSpecificUrl)) as ComplianceSurveyPayloadType;
		const sortedSurvey = sortComplianceSurvey(response);
		setSurveyData(sortedSurvey);
		await mutate([getOrgSpecificUrl(`/surveys/${newSurvey.name}`), 'GET'], sortedSurvey, {
			revalidate: false,
		});
		logBrowser('Navigating to next saved question', 'info', {
			activeKey,
			bookmarked,
			bookmarkedQuestion,
		});
		updateTransitionClassNames(true);
		setSendingSurvey(false);
		goToNextQuestion(activeKey, sortedSurvey);
	};

	const onSkipButtonClicked = async () => {
		setSendingSurvey(true);
		setDocumentLinkModalOpen(false);
		const bookmarkedQuestion = getAccurateBookmarkedValue(sections, activeKey, bookmarked);
		const newSurvey = updateSurveyQuestion(surveyData, activeKey, {
			skipped: true,
			value: null,
			saved: bookmarkedQuestion,
		});
		const response = (await putSurveyData(newSurvey as ComplianceSurveyPayloadType, getOrgSpecificUrl)) as ComplianceSurveyPayloadType;
		const sortedSurvey = sortComplianceSurvey(response);
		setSurveyData(sortedSurvey);
		await mutate([getOrgSpecificUrl(`/surveys/${newSurvey.name}`), 'GET'], sortedSurvey, {
			revalidate: false,
		});
		logBrowser('Skipping saved question', 'info', {
			activeKey,
			bookmarked,
			bookmarkedQuestion,
		});
		updateTransitionClassNames(true);
		setSendingSurvey(false);
		goToNextQuestion(activeKey, sortedSurvey);
	};

	const onSubmitButtonClicked = async () => {
		// tell the difference between a skipped question and a question that was answered
		setSendingSurvey(true);
		setDocumentLinkModalOpen(false);
		const bookmarkedQuestion = getAccurateBookmarkedValue(sections, activeKey, bookmarked);
		const newSurvey = updateSurveyQuestion(
			surveyData,
			activeKey,
			{
				value: getQuestionValue(surveyData, activeKey),
				skipped: false,
				saved: bookmarkedQuestion,
			},
			true,
		);
		const response = (await putSurveyData(newSurvey as ComplianceSurveyPayloadType, getOrgSpecificUrl)) as ComplianceSurveyPayloadType;
		const sortedSurvey = sortComplianceSurvey(response);
		setSurveyData(sortedSurvey);
		await mutate([getOrgSpecificUrl(`/surveys/${newSurvey.name}`), 'GET'], sortedSurvey, {
			revalidate: false,
		});
		logBrowser('Submitting saved question', 'info', {
			activeKey,
			bookmarked,
			bookmarkedQuestion,
		});
		updateTransitionClassNames(true);
		setSendingSurvey(false);
		submitSurvey();
	};

	const onPreviousButtonClicked = () => {
		// got the previous question in the saved questions
		setDocumentLinkModalOpen(false);
		const activeFollowUpIndex = savedQuestions.findIndex(savedQuestion => {
			return savedQuestion.followUpKey === activeKey.value;
		});
		const previousFollowUpKey = savedQuestions[activeFollowUpIndex - 1].followUpKey;
		setActiveKey({
			value: previousFollowUpKey,
			previousValue: activeKey.value,
			isFollowUp: true,
			section: 'savedQuestions',
			category: surveyData.definition.title,
		});
		logBrowser('Navigating to previous saved question', 'info', {
			activeKey,
			previousFollowUpKey,
		});
		updateTransitionClassNames(false);
	};

	const checkAdditionalContext = (key: SurveyActiveKeyType) => {
		let condition = false;
		const activeSectionIndex = getSectionIndex(sections, activeKey);
		const activeSectionKey = Object.keys(sections)[activeSectionIndex];
		const section = sections[activeSectionKey];
		if (key.isFollowUp) {
			const followUp = section.follow_up[key.value];
			const value = getQuestionValue(surveyData, key);
			// if the follow up is unanswered then
			if (value === null || value === undefined) {
				condition = false;
			} else {
				if (followUp && followUp.additional_context) {
					condition = ifAdditionalContextConditionMet(value, followUp.additional_context);
				}
			}
		} else {
			const value = getQuestionValue(surveyData, key);
			if (value === null || value === undefined) {
				condition = false;
			} else {
				if (section.additional_context) {
					condition = ifAdditionalContextConditionMet(value, section.additional_context);
				}
			}
		}
		if (condition) {
			return getQuestionForKey(activeKey, true);
		} else {
			return undefined;
		}
	};

	const questions = savedQuestions
		.map(question => {
			return getQuestionForKey({
				value: question.followUpKey,
				previousValue: '',
				isFollowUp: true,
				section: question.sectionKey,
				category: question.category,
			});
		})
		.flat();

	const question = questions.find(question => {
		return question.props.input_key === activeKey.value;
	});

	const additionalContextQuestion = checkAdditionalContext(activeKey);

	const unBookMarkQuestion = async () => {
		setSendingSurvey(true);
		const bookmarkedQuestion = get(bookmarked, `${activeKey.value}`, true);
		setBookmarked({
			...bookmarked,
			[activeKey.value]: !bookmarkedQuestion,
		});
		logBrowser('Unbookmarked question', 'info', {
			activeKey,
			bookmarked,
			bookmarkedQuestion,
		});
		setSendingSurvey(false);
	};

	const saveDocumentLink = async (key: string, value: any) => {
		setSendingSurvey(true);
		setDocumentLinkModalOpen(false);
		const newSurvey = updateSurveyQuestion(surveyData, activeKey, { document_link: value });
		setSurveyData(newSurvey as ComplianceSurveyPayloadType);
		const response = (await putSurveyData(newSurvey as ComplianceSurveyPayloadType, getOrgSpecificUrl)) as ComplianceSurveyPayloadType;
		const sortedSurvey = sortComplianceSurvey(response);
		setSurveyData(sortedSurvey);
		await mutate([getOrgSpecificUrl(`/surveys/${newSurvey.name}`), 'GET'], sortedSurvey, {
			revalidate: false,
		});
		setSendingSurvey(false);
	};

	if (question !== undefined) {
		const sectionIndex = getSectionIndex(sections, activeKey);
		const activeSection = sections[Object.keys(sections)[sectionIndex]];
		const questionIndex = keys(activeSection.follow_up).indexOf(activeKey.value) + 1;
		const bookMarkedState = get(bookmarked, `${activeKey.value}`, undefined);
		const bookmarkedForQuestion = get(bookmarked, `${activeKey.value}`, undefined) === undefined ? activeSection.follow_up[activeKey.value].saved : bookMarkedState;

		logBrowser('Rendering compliance saved question', 'info', {
			activeKey,
			questionIndex,
			bookmarkedForQuestion,
		});

		return (
			<div className={'w-full h-full relative flex flex-col space-y-[24px]'} data-testid={'survey-question-container'}>
				<div className={'flex flex-row justify-between'}>
					<div className={'flex flex-col'}>
						<div className={'text-caption font-bold'}>{activeSection.section_type}</div>
						<div className={'text-h2'}>{activeSection.title}</div>
						<div className={'text-caption'}>
							( Question {questionIndex}
							{' of '}
							{size(activeSection.follow_up)})
						</div>
					</div>
					<div className={'flex flex-row items-start space-x-4 h-[60px]'}>
						<div className={'relative h-full w-[60px] flex justify-center items-center'}>
							<div
								className={'h-full w-[60px] rounded-lg flex justify-center items-center bg-transparent cursor-pointer hover:bg-bgc-accent'}
								onClick={() => {
									setDocumentLinkModalOpen(!documentLinkModalOpen);
								}}>
								<ColdIcon name={IconNames.ColdDocumentUploadIcon} inverted={!!activeSection.follow_up[activeKey.value].document_link} />
							</div>
							<div className={'absolute top-full z-10'}>
								{documentLinkModalOpen && (
									<SurveyDocumentLinkModal
										show={documentLinkModalOpen}
										setShowModal={setDocumentLinkModalOpen}
										surveyDocumentLink={activeSection.follow_up[activeKey.value].document_link}
										questionKey={activeKey.value}
										saveSurveyDocumentLink={saveDocumentLink}
									/>
								)}
							</div>
						</div>
						<div className={'h-full w-[60px] rounded-lg flex justify-center items-center bg-transparent cursor-pointer hover:bg-bgc-accent'} onClick={unBookMarkQuestion}>
							<ColdIcon name={IconNames.ColdBookmarkIcon} color={'white'} filled={bookmarkedForQuestion} />
						</div>
						<div className={'h-full w-[60px] rounded-lg flex justify-center items-center bg-transparent cursor-pointer hover:bg-bgc-accent'} onClick={submitSurvey}>
							<ColdIcon name={IconNames.CloseModalIcon} />
						</div>
					</div>
				</div>
				<div className={'h-full w-full flex items-start justify-center overflow-y-auto'}>
					<SwitchTransition>
						<CSSTransition key={question.props.input_key} timeout={150} classNames={transitionClassNames}>
							<div className={'w-full space-y-6 items-start'}>
								{question}
								{additionalContextQuestion}
							</div>
						</CSSTransition>
					</SwitchTransition>
				</div>
				<div className={'w-full space-x-[15px] h-[80px] flex justify-end right-0 bottom-0 pb-[40px]'}>
					{getPreviousButton()}
					{getNextButton()}
				</div>
			</div>
		);
	} else {
		return <></>;
	}
};

export const ComplianceSurveySavedQuestionnaire = withErrorBoundary(_ComplianceSurveySavedQuestionnaire, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ComplianceSurveySavedQuestionnaire: ', error);
	},
});
