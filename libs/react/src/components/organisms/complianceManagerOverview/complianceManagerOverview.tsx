import { ComplianceSurveyPayloadType } from '@coldpbc/interfaces';
import {
  Card,
  ComplianceManagerAssessmentPreview,
  ComplianceManagerOverviewSectionGroups,
  ComplianceManagerOverviewStatusCard,
  ComplianceManagerQuestionnaireProgress,
} from '@coldpbc/components';

export interface ComplianceManagerOverviewProps {
  survey: ComplianceSurveyPayloadType;
}

export const ComplianceManagerOverview = () => {
  return (
    <div className={'w-full flex flex-col gap-[48px] justify-center'}>
      <Card data-testid={'compliance-overview-guide'} className={'border-[1px] bg-gray-10 border-bgc-accent w-full'}></Card>
      <div className={'w-full flex flex-row gap-[24px]'}>
        <ComplianceManagerOverviewStatusCard />
        <ComplianceManagerQuestionnaireProgress />
        <ComplianceManagerAssessmentPreview />
      </div>
      <ComplianceManagerOverviewSectionGroups />
    </div>
  );
};
