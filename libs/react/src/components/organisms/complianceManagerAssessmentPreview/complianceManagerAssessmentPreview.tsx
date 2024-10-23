import { BaseButton, Card, ColdInfoIcon, ErrorFallback } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';
import { Tooltip } from 'flowbite-react';
import React, { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { get, includes } from 'lodash';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import { useColdContext } from '@coldpbc/hooks';
import { withErrorBoundary } from 'react-error-boundary';

const _ComplianceManagerAssessmentPreview = () => {
	const context = useContext(ColdComplianceManagerContext);
	const { status } = context;
	const { complianceCounts } = context.data;
	const { logBrowser } = useColdContext();

	// todo: change this to show the actual assessment percentage and not amount of answered/amount of questions
	let totalQuestions = 0;
	let answeredQuestions = 0;
	const counts = get(complianceCounts, 'data.counts', {
		org_answered: 0,
		ai_answered: 0,
		not_started: 0,
	});
	totalQuestions = counts.org_answered + counts.ai_answered + counts.not_started;
	answeredQuestions = counts.org_answered;
	const percentage = totalQuestions !== 0 ? ((answeredQuestions / totalQuestions) * 100).toFixed(0) : 0;

	logBrowser('Compliance Manager Assessment Preview', 'info', {
		status,
		percentage,
		totalQuestions,
		answeredQuestions,
	});

	const getPercentage = () => {
		if ([ComplianceManagerStatus.notActivated, ComplianceManagerStatus.activated, ComplianceManagerStatus.uploadedDocuments, ComplianceManagerStatus.startedAi].includes(status)) {
			return '--';
		} else {
			return percentage + '%';
		}
	};

	const isButtonDisabled = () => {
		return includes(
			[
				ComplianceManagerStatus.notActivated,
				ComplianceManagerStatus.activated,
				ComplianceManagerStatus.uploadedDocuments,
				ComplianceManagerStatus.startedAi,
				ComplianceManagerStatus.submitted,
			],
			status,
		);
	};

	return (
		<Card className={'w-fit flex flex-col justify-between overflow-visible'} glow={false}>
			<Tooltip
				className={'bg-gray-50 border-[1px] border-gray-60 p-[8px] text-tc-primary text-body transition-none'}
				content={'This shows the points you’ve accumulated from your answers out of the total points possible'}
				arrow={false}>
				<div className={'bg-gray-50 relative rounded-[16px] p-[24px] w-[155px] text-tc-primary flex flex-col border-[1px] border-gray-60'}>
					<div className={'w-full text-body text-center'}>Estimated Assessment</div>
					<div className={'w-full text-h1 text-center'}>{getPercentage()}</div>
					<div className={'absolute top-[8px] right-[8px]'}>
						<ColdInfoIcon color={HexColors.tc.disabled} />
					</div>
				</div>
			</Tooltip>
			<BaseButton className={'w-full'} disabled={isButtonDisabled()}>
				Submit
			</BaseButton>
		</Card>
	);
};

export const ComplianceManagerAssessmentPreview = withErrorBoundary(_ComplianceManagerAssessmentPreview, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ComplianceManagerAssessmentPreview: ', error);
	},
});
