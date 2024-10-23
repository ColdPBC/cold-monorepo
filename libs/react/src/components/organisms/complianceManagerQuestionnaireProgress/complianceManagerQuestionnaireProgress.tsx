import { Card, ComplianceProgressStatusItem, ErrorFallback } from '@coldpbc/components';
import { ComplianceProgressStatus } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';

const _ComplianceManagerQuestionnaireProgress = () => {
	return (
		<Card title={'Questionnaire Progress'} glow={false} className={'w-full flex flex-col gap-[16px]'}>
			<div className={'w-full flex flex-row gap-[16px]'}>
				<div className={'w-1/2'}>
					<ComplianceProgressStatusItem type={ComplianceProgressStatus.not_started} />
				</div>
				<div className={'w-1/2'}>
					<ComplianceProgressStatusItem type={ComplianceProgressStatus.ai_answered} />
				</div>
			</div>
			<div className={'w-full flex flex-row gap-[16px]'}>
				<div className={'w-1/2'}>
					<ComplianceProgressStatusItem type={ComplianceProgressStatus.bookmarked} />
				</div>
				<div className={'w-1/2'}>
					<ComplianceProgressStatusItem type={ComplianceProgressStatus.user_answered} />
				</div>
			</div>
		</Card>
	);
};

export const ComplianceManagerQuestionnaireProgress = withErrorBoundary(_ComplianceManagerQuestionnaireProgress, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ComplianceManagerQuestionnaireProgress: ', error);
	},
});
