import { Card, ComplianceProgressStatusItem } from '@coldpbc/components';
import { ComplianceProgressStatus } from '@coldpbc/enums';

export const ComplianceManagerQuestionnaireProgress = () => {
  return (
    <Card title={'Questionnaire Progress'} glow={false} className={'w-full flex flex-col gap-[16px]'}>
      <div className={'w-full flex flex-row gap-[16px]'}>
        <div className={'w-1/2'}>
          <ComplianceProgressStatusItem type={ComplianceProgressStatus.not_started} />
        </div>
        <div className={'w-1/2'}>
          <ComplianceProgressStatusItem type={ComplianceProgressStatus.needs_review} />
        </div>
      </div>
      <div className={'w-full flex flex-row gap-[16px]'}>
        <div className={'w-1/2'}>
          <ComplianceProgressStatusItem type={ComplianceProgressStatus.bookmarked} />
        </div>
        <div className={'w-1/2'}>
          <ComplianceProgressStatusItem type={ComplianceProgressStatus.complete} />
        </div>
      </div>
    </Card>
  );
};
