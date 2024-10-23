import React from 'react';
import { SurveyDefinitionType } from '@coldpbc/interfaces';
import ReactMarkdown from 'react-markdown';
import { BaseButton } from '@coldpbc/components';
import { ButtonTypes, GlobalSizes } from '@coldpbc/enums';

export interface SurveyIntroProps {
	surveyFormData: SurveyDefinitionType;
	startSurvey: () => void;
	submitted: boolean;
	closeSurvey: () => void;
}

export const SurveyIntro = (props: SurveyIntroProps) => {
	const { surveyFormData, startSurvey, submitted, closeSurvey } = props;

	const { intro_markdown, title } = surveyFormData;

	return (
		<div className={'w-[580px] space-y-[32px]'} data-testid={'survey-right-nav-intro-outro'}>
			{submitted ? (
				<>
					<div className={'text-h2 text-tc-primary'}>Thanks!</div>
					<div className={'text-tc-primary text-body whitespace-normal'}>Thanks for submitting your information. We'll take a look and get back to you soon.</div>
					<div className={'w-full flex justify-start'}>
						<BaseButton label={'Continue to Dashboard'} onClick={closeSurvey} variant={ButtonTypes.primary} textSize={GlobalSizes.small} />
					</div>
				</>
			) : (
				<>
					<div className={'text-h2 text-tc-primary'}>{title}</div>
					<ReactMarkdown className={'text-tc-primary text-body whitespace-pre-line'}>{intro_markdown}</ReactMarkdown>
					<div className={'w-full flex justify-start'}>
						<BaseButton label={'Start'} onClick={startSurvey} variant={ButtonTypes.primary} textSize={GlobalSizes.small} />
					</div>
				</>
			)}
		</div>
	);
};
