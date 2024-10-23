import {
	ComplianceManagerAssessmentPreview,
	ComplianceManagerFlowGuide,
	ComplianceManagerOverviewModal,
	ComplianceManagerOverviewSectionGroups,
	ComplianceManagerOverviewStatusCard,
	ComplianceManagerQuestionnaireProgress,
	ErrorFallback,
} from '@coldpbc/components';
import React, { useState } from 'react';
import { ComplianceManagerFlowGuideStatus } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';

const _ComplianceManagerOverview = () => {
	const [showModal, setShowModal] = useState(false);
	const [flowGuideStatus, setFlowGuideStatus] = useState<ComplianceManagerFlowGuideStatus>(ComplianceManagerFlowGuideStatus.activate);
	return (
		<div className={'w-full flex flex-col gap-[48px] justify-center'}>
			<ComplianceManagerFlowGuide showModal={showModal} setShowModal={setShowModal} flowGuideStatus={flowGuideStatus} setFlowGuideStatus={setFlowGuideStatus} />
			<div className={'w-full flex flex-row gap-[24px]'}>
				<ComplianceManagerOverviewStatusCard />
				<ComplianceManagerQuestionnaireProgress />
				<ComplianceManagerAssessmentPreview />
			</div>
			<ComplianceManagerOverviewSectionGroups />
			<ComplianceManagerOverviewModal show={showModal} setShowModal={setShowModal} flowGuideStatus={flowGuideStatus} setFlowGuideStatus={setFlowGuideStatus} />
		</div>
	);
};

export const ComplianceManagerOverview = withErrorBoundary(_ComplianceManagerOverview, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ComplianceManagerOverview: ', error);
	},
});
