import { ComplianceSurveyPayloadType } from '@coldpbc/interfaces';
import { Card, ComplianceManagerAssessmentPreview, ComplianceManagerOverviewSections, ComplianceManagerQuestionnaireProgress } from '@coldpbc/components';
import { ComplianceManagerOverviewStatusCard } from '../complianceManagerOverviewStatusCard/complianceManagerOverviewStatusCard';

export interface ComplianceManagerOverviewProps {
  survey: ComplianceSurveyPayloadType;
}

export const ComplianceManagerOverview = () => {
  return (
    <div className={'w-full flex flex-col gap-[48px]'}>
      <Card data-testid={'compliance-overview-guide'} className={'border-[1px] bg-gray-10 border-bgc-accent w-full'}></Card>
      <div className={'w-full flex flex-row gap-[24px]'}>
        <ComplianceManagerOverviewStatusCard />
        <ComplianceManagerQuestionnaireProgress />
        <ComplianceManagerAssessmentPreview />
      </div>
      <ComplianceManagerOverviewSections />
    </div>
  );
};
