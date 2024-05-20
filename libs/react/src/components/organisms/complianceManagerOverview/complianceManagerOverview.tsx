import {
  ComplianceManagerAssessmentPreview,
  ComplianceManagerFlowGuide,
  ComplianceManagerOverviewModal,
  ComplianceManagerOverviewSectionGroups,
  ComplianceManagerOverviewStatusCard,
  ComplianceManagerQuestionnaireProgress,
} from '@coldpbc/components';
import { useState } from 'react';
import { ComplianceManagerFlowGuideStatus } from '@coldpbc/enums';

export const ComplianceManagerOverview = () => {
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
