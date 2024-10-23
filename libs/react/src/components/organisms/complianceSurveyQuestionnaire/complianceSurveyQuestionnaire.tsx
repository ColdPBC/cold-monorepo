import React from 'react';
import { findIndex, keys, size } from 'lodash';
import {
	allOtherSurveyQuestionsAnswered,
	getQuestionValue,
	getSectionIndex,
	ifAdditionalContextConditionMet,
	isAIResponseValueValid,
	isComponentTypeValid,
	putSurveyData,
	sortComplianceSurvey,
	updateSurveyQuestion,
} from '@coldpbc/lib';
import { BaseButton, ColdIcon, ErrorFallback, SurveyDocumentLinkModal, SurveyInput } from '@coldpbc/components';
import { ButtonTypes, GlobalSizes, IconNames } from '@coldpbc/enums';
import { ComplianceSurveyActiveKeyType, ComplianceSurveyPayloadType, ComplianceSurveySavedQuestionType, IButtonProps, SurveyActiveKeyType } from '@coldpbc/interfaces';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useSWRConfig } from 'swr';
import { withErrorBoundary } from 'react-error-boundary';

export interface ComplianceSurveyQuestionnaireProps {
	activeKey: ComplianceSurveyActiveKeyType;
	setActiveKey: (activeKey: ComplianceSurveyActiveKeyType) => void;
	submitSurvey: () => void;
	surveyData: ComplianceSurveyPayloadType;
	setSurveyData: (surveyData: ComplianceSurveyPayloadType) => void;
	savedQuestions: Array<ComplianceSurveySavedQuestionType>;
}

const _ComplianceSurveyQuestionnaire = (props: ComplianceSurveyQuestionnaireProps) => {
	const { activeKey, setActiveKey, submitSurvey, surveyData, setSurveyData, savedQuestions } = props;
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
	const inSavedQuestions = activeKey.section === 'savedQuestions';

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
			section: activeKey.section,
			category: activeKey.category,
		});
		const newSurvey = updateSurveyQuestion(surveyData, activeKey, { value }, undefined, additional);
		logBrowser('Compliance Survey Question Updated', 'info', {
			key,
			value,
			newActiveKey: {
				value: activeKey.value,
				previousValue: activeKey.value,
				isFollowUp: activeKey.isFollowUp,
				section: activeKey.section,
				category: activeKey.category,
			},
		});
		setSurveyData(newSurvey as ComplianceSurveyPayloadType);
	};

	const getQuestionForKey = (key: ComplianceSurveyActiveKeyType, additional = false) => {
		const activeSectionIndex = getSectionIndex(sections, activeKey);
		const activeSectionKey = Object.keys(sections)[activeSectionIndex];
		if (key.isFollowUp) {
			const followUpIndex = findIndex(Object.keys(sections[activeSectionKey].follow_up), followUpKey => {
				return followUpKey === key.value;
			});
			const followUpKey = Object.keys(sections[activeSectionKey].follow_up)[followUpIndex];
			const followUp = sections[activeSectionKey].follow_up[followUpKey];
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
		} else {
			const section = sections[key.value];
			if (section && isComponentTypeValid(section.component)) {
				if (additional && section.additional_context) {
					return (
						<SurveyInput
							{...section.additional_context}
							options={[]}
							input_key={key.value}
							onFieldUpdated={(name, value) => {
								onFieldUpdated(key.value, value, true);
							}}
							value={section.additional_context.value}
							isAdditional={true}
						/>
					);
				}
				return (
					<SurveyInput
						{...section}
						input_key={key.value}
						onFieldUpdated={onFieldUpdated}
						component={section.component}
						options={[]}
						tooltip={''}
						placeholder={''}
						value={section.value}
					/>
				);
			}
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
		const activeSectionIndex = getSectionIndex(sections, activeKey);
		const activeSectionKey = Object.keys(sections)[activeSectionIndex];
		if (!activeKey.isFollowUp) {
			if (activeSectionIndex !== 0) {
				buttonProps.label = 'Previous';
				buttonProps.onClick = () => {
					onPreviousButtonClicked();
				};
			}
		} else {
			const activeFollowUpIndex = findIndex(Object.keys(sections[activeSectionKey].follow_up), followUpKey => {
				return followUpKey === activeKey.value;
			});
			if (!isComponentTypeValid(sections[activeSectionKey].component) && sections[activeSectionKey].prompt === '') {
				if (activeFollowUpIndex === 0) {
					if (activeSectionIndex !== 0) {
						buttonProps.label = 'Previous';
						buttonProps.onClick = () => {
							onPreviousButtonClicked();
						};
					}
				} else {
					buttonProps.label = 'Previous';
					buttonProps.onClick = () => {
						onPreviousButtonClicked();
					};
				}
			} else {
				buttonProps.label = 'Previous';
				buttonProps.onClick = () => {
					onPreviousButtonClicked();
				};
			}
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
		const activeSectionKey = activeKey.section;
		if (activeKey.isFollowUp) {
			const activeFollowUpIndex = Object.keys(sections[activeSectionKey].follow_up).findIndex(followUpKey => {
				return followUpKey === activeKey.value;
			});
			const activeFollowUpKey = Object.keys(sections[activeSectionKey].follow_up)[activeFollowUpIndex];

			if (
				sections[activeSectionKey].follow_up[activeFollowUpKey].value === undefined &&
				isAIResponseValueValid({
					ai_response: sections[activeSectionKey].follow_up[activeFollowUpKey].ai_response,
					component: sections[activeSectionKey].follow_up[activeFollowUpKey].component,
					options: sections[activeSectionKey].follow_up[activeFollowUpKey].options,
				})
			) {
				buttonProps.label = 'Confirm';
				if (activeSectionIndex === Object.keys(sections).length - 1 && activeFollowUpIndex === Object.keys(sections[activeSectionKey].follow_up).length - 1) {
					buttonProps.onClick = () => {
						onSubmitButtonClicked();
					};
				} else {
					buttonProps.onClick = () => {
						onNextButtonClicked();
					};
				}
			} else {
				if (activeSectionIndex === Object.keys(sections).length - 1 && activeFollowUpIndex === Object.keys(sections[activeSectionKey].follow_up).length - 1) {
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
		} else {
			if (sections[activeSectionKey].value === undefined && sections[activeSectionKey].ai_response !== undefined && sections[activeSectionKey].ai_response?.answer !== undefined) {
				buttonProps.label = 'Confirm';
				buttonProps.onClick = () => {
					onNextButtonClicked();
				};
			} else {
				if (sections[activeSectionKey].value === null || sections[activeSectionKey].value === undefined) {
					if (activeSectionIndex === Object.keys(sections).length - 1) {
						buttonProps.label = 'Save';
						buttonProps.onClick = () => {
							onSubmitButtonClicked();
						};
					} else {
						buttonProps.label = 'Skip';
						buttonProps.onClick = () => {
							onSkipButtonClicked();
						};
					}
				} else {
					if (sections[activeSectionKey].value === false) {
						buttonProps.label = 'Save';
						buttonProps.onClick = () => {
							onSubmitButtonClicked();
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

		if (allOtherSurveyQuestionsAnswered(surveyData, activeKey)) {
			buttonProps.label = 'Submit & Close';
			buttonProps.onClick = () => {
				onSubmitButtonClicked();
			};
			buttonProps.disabled = getQuestionValue(surveyData, activeKey) === undefined || getQuestionValue(surveyData, activeKey) === null || sendingSurvey;
		}

		return <BaseButton {...buttonProps} />;
	};

	const goToNextQuestion = (key: ComplianceSurveyActiveKeyType, surveyData: ComplianceSurveyPayloadType) => {
		const sections = surveyData.definition.sections;
		const activeSectionIndex = getSectionIndex(sections, key);
		const activeSectionKey = Object.keys(sections)[activeSectionIndex];
		const nextSectionKey = Object.keys(sections)[activeSectionIndex + 1];
		const nextSection = sections[nextSectionKey];

		if (activeKey.isFollowUp) {
			const activeFollowUpIndex = findIndex(Object.keys(sections[activeSectionKey].follow_up), followUpKey => {
				return followUpKey === activeKey.value;
			});
			if (activeFollowUpIndex === Object.keys(sections[activeSectionKey].follow_up).length - 1) {
				if (!isComponentTypeValid(nextSection.component) && nextSection.prompt === '') {
					setActiveKey({
						value: Object.keys(nextSection.follow_up)[0],
						previousValue: key.value,
						isFollowUp: true,
						section: nextSectionKey,
						category: nextSection.section_type,
					});
				} else {
					setActiveKey({
						value: nextSectionKey,
						previousValue: key.value,
						isFollowUp: false,
						section: nextSectionKey,
						category: nextSection.section_type,
					});
				}
			} else {
				const nextFollowUpKey = Object.keys(sections[activeSectionKey].follow_up)[activeFollowUpIndex + 1];
				setActiveKey({
					value: nextFollowUpKey,
					previousValue: key.value,
					isFollowUp: true,
					section: activeSectionKey,
					category: sections[activeSectionKey].section_type,
				});
			}
		} else {
			if (sections[activeSectionKey].value !== true) {
				if (!isComponentTypeValid(nextSection.component) && nextSection.prompt === '') {
					setActiveKey({
						value: Object.keys(nextSection.follow_up)[0],
						previousValue: key.value,
						isFollowUp: true,
						section: nextSectionKey,
						category: nextSection.section_type,
					});
				} else {
					setActiveKey({
						value: nextSectionKey,
						previousValue: key.value,
						isFollowUp: false,
						section: nextSectionKey,
						category: nextSection.section_type,
					});
				}
			} else {
				const nextFollowUpKey = Object.keys(sections[activeSectionKey].follow_up)[0];
				setActiveKey({
					value: nextFollowUpKey,
					previousValue: key.value,
					isFollowUp: true,
					section: activeSectionKey,
					category: sections[activeSectionKey].section_type,
				});
			}
		}
		logBrowser('Next Question Loaded', 'info', {
			key,
			activeSectionIndex,
			activeSectionKey,
			nextSectionKey,
		});
	};

	const onNextButtonClicked = async () => {
		setSendingSurvey(true);
		setDocumentLinkModalOpen(false);
		const newSurvey = updateSurveyQuestion(surveyData, activeKey, {
			value: getQuestionValue(surveyData, activeKey),
			skipped: false,
		});
		const response = (await putSurveyData(newSurvey as ComplianceSurveyPayloadType, getOrgSpecificUrl)) as ComplianceSurveyPayloadType;
		const sortedSurvey = sortComplianceSurvey(response);
		setSurveyData(sortedSurvey);
		await mutate([getOrgSpecificUrl(`/surveys/${newSurvey.name}`), 'GET'], sortedSurvey, {
			revalidate: false,
		});
		logBrowser('Compliance Survey Next Button Clicked', 'info', {
			activeKey,
		});
		updateTransitionClassNames(true);
		setSendingSurvey(false);
		goToNextQuestion(activeKey, sortedSurvey);
	};

	const onSkipButtonClicked = async () => {
		setSendingSurvey(true);
		setDocumentLinkModalOpen(false);
		const newSurvey = updateSurveyQuestion(surveyData, activeKey, {
			skipped: true,
			value: null,
		});
		const response = (await putSurveyData(newSurvey as ComplianceSurveyPayloadType, getOrgSpecificUrl)) as ComplianceSurveyPayloadType;
		const sortedSurvey = sortComplianceSurvey(response);
		setSurveyData(sortedSurvey);
		await mutate([getOrgSpecificUrl(`/surveys/${newSurvey.name}`), 'GET'], sortedSurvey, {
			revalidate: false,
		});
		logBrowser('Compliance Survey Skip Button Clicked', 'info', {
			activeKey,
		});
		updateTransitionClassNames(true);
		setSendingSurvey(false);
		goToNextQuestion(activeKey, sortedSurvey);
	};

	const onSubmitButtonClicked = async () => {
		// tell the difference between a skipped question and a question that was answered
		setSendingSurvey(true);
		setDocumentLinkModalOpen(false);
		const newSurvey = updateSurveyQuestion(
			surveyData,
			activeKey,
			{
				value: getQuestionValue(surveyData, activeKey),
				skipped: false,
			},
			true,
		);
		const response = (await putSurveyData(newSurvey as ComplianceSurveyPayloadType, getOrgSpecificUrl)) as ComplianceSurveyPayloadType;
		const sortedSurvey = sortComplianceSurvey(response);
		setSurveyData(sortedSurvey);
		await mutate([getOrgSpecificUrl(`/surveys/${newSurvey.name}`), 'GET'], sortedSurvey, {
			revalidate: false,
		});
		logBrowser('Compliance Survey Submit Button Clicked', 'info', {
			activeKey,
		});
		updateTransitionClassNames(true);
		setSendingSurvey(false);
		submitSurvey();
	};

	const onPreviousButtonClicked = () => {
		setDocumentLinkModalOpen(false);
		const activeSectionIndex = getSectionIndex(sections, activeKey);
		const activeSectionKey = Object.keys(sections)[activeSectionIndex];
		if (activeKey.isFollowUp) {
			const activeFollowUpIndex = findIndex(Object.keys(sections[activeSectionKey].follow_up), followUpKey => {
				return followUpKey === activeKey.value;
			});
			if (activeFollowUpIndex === 0) {
				const section = sections[activeSectionKey];
				if (!isComponentTypeValid(section.component) && section.prompt === '') {
					const previousSectionKey = Object.keys(sections)[activeSectionIndex - 1];
					const previousSection = sections[previousSectionKey];
					if (previousSection.value !== true && isComponentTypeValid(previousSection.component) && previousSection.prompt !== '') {
						setActiveKey({
							value: previousSectionKey,
							previousValue: activeKey.value,
							isFollowUp: false,
							section: previousSectionKey,
							category: previousSection.section_type,
						});
					} else {
						setActiveKey({
							value: Object.keys(previousSection.follow_up)[Object.keys(previousSection.follow_up).length - 1],
							previousValue: activeKey.value,
							isFollowUp: true,
							section: previousSectionKey,
							category: previousSection.section_type,
						});
					}
				} else {
					setActiveKey({
						value: activeSectionKey,
						previousValue: activeKey.value,
						isFollowUp: false,
						section: activeSectionKey,
						category: sections[activeSectionKey].section_type,
					});
				}
			} else {
				const previousFollowUpKey = Object.keys(sections[activeSectionKey].follow_up)[activeFollowUpIndex - 1];
				setActiveKey({
					value: previousFollowUpKey,
					previousValue: activeKey.value,
					isFollowUp: true,
					section: activeSectionKey,
					category: sections[activeSectionKey].section_type,
				});
			}
		} else {
			const previousSectionKey = Object.keys(sections)[activeSectionIndex - 1];
			const previousSection = sections[previousSectionKey];
			if (previousSection.value !== true && isComponentTypeValid(previousSection.component) && previousSection.prompt !== '') {
				setActiveKey({
					value: previousSectionKey,
					previousValue: activeKey.value,
					isFollowUp: false,
					section: previousSectionKey,
					category: previousSection.section_type,
				});
			} else {
				const previousSectionLastFollowUpKey = Object.keys(previousSection.follow_up)[Object.keys(previousSection.follow_up).length - 1];
				setActiveKey({
					value: previousSectionLastFollowUpKey,
					previousValue: activeKey.value,
					isFollowUp: true,
					section: previousSectionKey,
					category: previousSection.section_type,
				});
			}
		}
		logBrowser('Previous Button Clicked', 'info', {
			activeKey,
			activeSectionIndex,
			activeSectionKey,
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

	const questions = Object.keys(sections)
		.map(sectionKey => {
			const category = getQuestionForKey({
				value: sectionKey,
				previousValue: '',
				isFollowUp: false,
				section: sectionKey,
				category: sections[sectionKey].section_type,
			});
			const followUps = Object.keys(sections[sectionKey].follow_up).map(followUpKey => {
				return getQuestionForKey({
					value: followUpKey,
					previousValue: '',
					isFollowUp: true,
					section: sectionKey,
					category: sections[sectionKey].section_type,
				});
			});
			return [category, ...followUps];
		})
		.flat();

	const question = questions.find(question => {
		return question.props.input_key === activeKey.value;
	});

	const additionalContextQuestion = checkAdditionalContext(activeKey);

	const bookMarkQuestion = async () => {
		if (inSavedQuestions) {
			return;
		}
		setSendingSurvey(true);
		// check if the question is already saved
		const section = surveyData.definition.sections[activeKey.section];
		const question = section.follow_up[activeKey.value];
		const newSurvey = updateSurveyQuestion(surveyData, activeKey, { saved: !question.saved });
		const response = (await putSurveyData(newSurvey as ComplianceSurveyPayloadType, getOrgSpecificUrl)) as ComplianceSurveyPayloadType;
		const sortedSurvey = sortComplianceSurvey(response);
		setSurveyData(sortedSurvey);
		await mutate([getOrgSpecificUrl(`/surveys/${newSurvey.name}`), 'GET'], sortedSurvey, {
			revalidate: false,
		});
		logBrowser('Compliance survey Question Bookmarked', 'info', {
			activeKey,
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
		const activeSection = surveyData.definition.sections[activeKey.section];
		const questionIndex = keys(activeSection.follow_up).indexOf(activeKey.value) + 1;
		const bookmarked = activeSection.follow_up[activeKey.value].saved;
		logBrowser('Compliance survey Question Loaded', 'info', {
			activeKey,
			questionIndex,
			bookmarked,
		});
		return (
			<div className={'w-full h-full relative flex flex-col space-y-[24px]'} data-testid={'survey-question-container'}>
				<div className={'flex flex-row justify-between'}>
					<div className={'flex flex-col'}>
						<div className={'text-caption font-bold'}>
							{activeKey.category}
							{question.props.question_summary ? ' > ' + surveyData.definition.sections[activeKey.section].title : ''}
						</div>
						<div className={'text-h2'}>{question.props.question_summary ? question.props.question_summary : surveyData.definition.sections[activeKey.section].title}</div>
						<div className={'text-caption'}>
							( Question {questionIndex}
							{' of '}
							{size(surveyData.definition.sections[activeKey.section].follow_up)})
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
						<div className={'h-full w-[60px] rounded-lg flex justify-center items-center bg-transparent cursor-pointer hover:bg-bgc-accent'} onClick={bookMarkQuestion}>
							<ColdIcon name={IconNames.ColdBookmarkIcon} color={'white'} filled={bookmarked} />
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

export const ComplianceSurveyQuestionnaire = withErrorBoundary(_ComplianceSurveyQuestionnaire, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ComplianceSurveyQuestionnaire: ', error);
	},
});
