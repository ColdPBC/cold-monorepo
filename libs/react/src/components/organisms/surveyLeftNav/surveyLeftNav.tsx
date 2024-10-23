import React from 'react';
import { SurveyActiveKeyType, SurveyPayloadType } from '@coldpbc/interfaces';
import { isEmpty } from 'lodash';
import { SurveySectionsProgress } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';

export interface SurveyLeftNavProps {
	surveyData: SurveyPayloadType;
	activeKey: SurveyActiveKeyType;
	setActiveKey: (key: SurveyActiveKeyType) => void;
	submitted: boolean;
}

const _SurveyLeftNav = (props: SurveyLeftNavProps) => {
	const { surveyData, activeKey, submitted } = props;
	const { definition: surveyFormData } = surveyData;
	return (
		<div className="flex flex-col" data-testid={'survey-left-nav'} data-chromatic="ignore">
			{isEmpty(activeKey.value) || submitted ? (
				<div className={'pb-[37px] relative flex-1'} data-testid={'survey-intro'}>
					<div
						className={'w-[668px] h-full rounded-2xl'}
						style={{
							backgroundImage: `url('${surveyFormData.image_url}')`,
							backgroundSize: 'cover',
							backgroundColor: 'lightGray',
							backgroundRepeat: 'no-repeat',
						}}></div>
				</div>
			) : (
				<div className={'flex flex-col flex-1'}>
					<div className={'pr-[12px] flex-1 flex flex-col'} data-testid={'survey-sections-progress'}>
						<SurveySectionsProgress sections={surveyFormData.sections} activeKey={activeKey} />
					</div>
					<div className={'mt-[6px] mb-[16px] flex justify-start'}>
						<div className={'text-tc-primary text-sm font-medium'}>Your progress is auto-saved</div>
					</div>
				</div>
			)}
		</div>
	);
};

export const SurveyLeftNav = withErrorBoundary(_SurveyLeftNav, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SurveyLeftNav: ', error);
	},
});
