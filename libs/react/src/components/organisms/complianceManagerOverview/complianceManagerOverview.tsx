import {
  ComplianceManagerAssessmentPreview,
  ComplianceManagerOverviewSectionGroups,
  ComplianceManagerOverviewStatusCard,
  ComplianceManagerQuestionnaireProgress,
} from '@coldpbc/components';

export const ComplianceManagerOverview = () => {
  return (
    <div className={'w-full flex flex-col gap-[48px] justify-center'}>
      <div className={'w-full flex flex-row gap-[24px]'}>
        <ComplianceManagerOverviewStatusCard />
        <ComplianceManagerQuestionnaireProgress />
        <ComplianceManagerAssessmentPreview />
      </div>
      <ComplianceManagerOverviewSectionGroups />
    </div>
  );
};
