import { ComplianceSidebarQuestion } from '@coldpbc/interfaces';
import React, { useContext, useState } from 'react';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { ComplianceProgressStatus, IconNames } from '@coldpbc/enums';
import { ColdIcon, ComplianceProgressStatusIcon } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';
import { upperCase } from 'lodash';

export const QuestionnaireQuestionItemPlaceholder = (props: { question: ComplianceSidebarQuestion; number: number }) => {
	const { focusQuestion } = useContext(ColdComplianceQuestionnaireContext);
	const { question, number } = props;
	const { id, prompt, bookmarked, user_answered, ai_answered, question_summary } = question;

	const getQuestionStatus = () => {
		if (user_answered) {
			return ComplianceProgressStatus.user_answered;
		} else if (ai_answered) {
			return ComplianceProgressStatus.ai_answered;
		} else {
			return ComplianceProgressStatus.not_started;
		}
	};

	const [questionBookmarked, setQuestionBookmarked] = useState<boolean>(bookmarked);
	const [questionStatus, setQuestionStatus] = useState<ComplianceProgressStatus>(getQuestionStatus());

	const getQuestionStatusIcon = () => {
		return (
			<div className={'w-[12px] h-[12px]'}>
				<ComplianceProgressStatusIcon type={questionStatus} inverted={true} />
			</div>
		);
	};

	const getBookMarkIcon = () => {
		return (
			<div
				className={'flex items-center justify-center w-[24px] h-[24px] cursor-pointer'}
				onClick={() => {
					setQuestionBookmarked(!questionBookmarked);
				}}>
				<ColdIcon name={IconNames.ColdBookmarkIcon} filled={questionBookmarked} color={questionBookmarked ? HexColors.lightblue['200'] : 'white'} width={15} height={20} />
			</div>
		);
	};

	const getPrompt = () => {
		const className = 'text-left text-h5 text-tc-primary';

		const promptWithLinebreaks = prompt.split('\n');

		return (
			<div className={className}>
				{promptWithLinebreaks.map(prompt => {
					return prompt;
				})}
			</div>
		);
	};

	return (
		<div
			className={`flex flex-col w-full rounded-[16px] bg-gray-30 gap-[16px] ${questionBookmarked ? 'border-[1px] border-lightblue-200 p-[23px]' : ' p-[24px]'}
    ${focusQuestion !== null && focusQuestion.key !== id ? 'opacity-20' : ''}`}>
			<div className={'flex flex-row gap-[8px] justify-between'}>
				<div className={'flex flex-row gap-[8px] items-center'}>
					{getQuestionStatusIcon()}
					<div className={'w-full flex justify-start text-gray-120'}>{question_summary ? upperCase(question_summary) : `QUESTION ${number}`}</div>
				</div>
				<div className={'flex flex-row gap-[8px] items-center'}>
					{getBookMarkIcon()}
					<div className={'w-[24px] h-[24px] cursor-pointer'}>
						<ColdIcon name={IconNames.ColdRightArrowIcon} />
					</div>
				</div>
			</div>
			{getPrompt()}
		</div>
	);
};
