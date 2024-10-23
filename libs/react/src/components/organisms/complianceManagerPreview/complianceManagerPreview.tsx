import { Card, ComplianceManagerPreviewDetailGraphCard, ComplianceManagerPreviewOverallGraphCard, ErrorFallback } from '@coldpbc/components';
import React, { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { get } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';

const _ComplianceManagerPreview = () => {
	const { data } = useContext(ColdComplianceManagerContext);
	const { complianceCounts } = data;
	const AI_TOTAL = get(complianceCounts, 'data.counts.ai_answered', 0);
	const COMPLETE = get(complianceCounts, 'data.counts.org_answered', 0);
	const TOTAL = get(complianceCounts, 'data.counts.total', 0);

	const getPreviewCardSubText = () => {
		let text = '';
		text = `There are ${AI_TOTAL} ✨Cold AI responses to review and ${
			TOTAL - COMPLETE
		} unanswered questions. Continue to fill in the questionnaire to get a more accurate preview.`;
		return <div className={'text-body'}>{text}</div>;
	};

	return (
		<div className={'w-full flex flex-col gap-[48px] items-start'}>
			<div className={'w-full flex justify-between text-h2 text-tc-primary'}>
				<div>Preview Performance</div>
			</div>
			<Card className={'bg-gray-10 border-bgc-accent border-[2px] flex flex-col gap-[4px]'} glow={true}>
				<div className={'text-h4'}>Preview scores are based on questions you’ve answered so far</div>
				{getPreviewCardSubText()}
			</Card>
			<ComplianceManagerPreviewOverallGraphCard />
			<ComplianceManagerPreviewDetailGraphCard />
		</div>
	);
};

export const ComplianceManagerPreview = withErrorBoundary(_ComplianceManagerPreview, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ComplianceManagerPreview: ', error);
	},
});
