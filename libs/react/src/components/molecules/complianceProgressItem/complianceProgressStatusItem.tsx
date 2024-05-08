import { ComplianceProgressStatus } from '@coldpbc/enums';
import { forEach } from 'lodash';
import { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ComplianceProgressStatusIcon } from '@coldpbc/components';

export interface ComplianceProgressItemProps {
  type: ComplianceProgressStatus;
}

export const ComplianceProgressStatusItem = ({ type }: ComplianceProgressItemProps) => {
  const { data } = useContext(ColdComplianceManagerContext);
  const { mqttComplianceSet } = data;

  const currentProgressData = {
    type: type,
    count: 0,
    percentage: 0,
  };

  let totalQuestions = 0;
  forEach(mqttComplianceSet?.compliance_section_groups, group => {
    totalQuestions += group.question_count;
    switch (type) {
      case ComplianceProgressStatus.not_started:
        currentProgressData.count += group.not_started_count;
        break;
      case ComplianceProgressStatus.needs_review:
        currentProgressData.count += group.ai_answered_count;
        break;
      case ComplianceProgressStatus.bookmarked:
        currentProgressData.count += group.bookmarked_count;
        break;
      case ComplianceProgressStatus.complete:
        currentProgressData.count += group.user_answered_count;
        break;
    }
  });

  currentProgressData.percentage = totalQuestions !== 0 ? currentProgressData.count / totalQuestions : 0;

  let text = '';
  switch (type) {
    case ComplianceProgressStatus.not_started:
      text = 'Not Started';
      break;
    case ComplianceProgressStatus.needs_review:
      text = 'AI Needs Review';
      break;
    case ComplianceProgressStatus.bookmarked:
      text = 'Bookmarked';
      break;
    case ComplianceProgressStatus.complete:
      text = 'Complete';
      break;
  }

  const getProgressIcon = (type: ComplianceProgressStatus) => {
    switch (type) {
      case ComplianceProgressStatus.not_started:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ComplianceProgressStatusIcon type={ComplianceProgressStatus.not_started} />
          </div>
        );
      case ComplianceProgressStatus.needs_review:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ComplianceProgressStatusIcon type={ComplianceProgressStatus.needs_review} iconProps={{ width: 15, height: 15 }} />
          </div>
        );
      case ComplianceProgressStatus.bookmarked:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ComplianceProgressStatusIcon type={ComplianceProgressStatus.bookmarked} iconProps={{ height: 15 }} />
          </div>
        );
      case ComplianceProgressStatus.complete:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ComplianceProgressStatusIcon type={ComplianceProgressStatus.complete} />
          </div>
        );
    }
  };

  const getCount = () => {
    if (!currentProgressData) {
      return null;
    }
    const count = currentProgressData.count;
    return <div className={'text-h3 text-tc-primary'}>{count}</div>;
  };

  const getPercentage = () => {
    if (!currentProgressData) {
      return null;
    }
    const percentage = `${(currentProgressData.percentage * 100).toFixed(0)}%`;
    return <div className={'text-tc-primary text-label py-[4px] px-[8px] rounded-[16px] bg-bgc-accent'}>{percentage}</div>;
  };

  return (
    <div className={'w-full flex flex-col p-[8px] bg-gray-50 rounded-[8px] border-[1px] border-gray-60'}>
      <div className={'w-full flex flex-row justify-between items-center'}>
        <div className={'text-tc-primary text-eyebrow'}>{text}</div>
        {getProgressIcon(type)}
      </div>
      <div className={'w-full flex flex-row justify-between items-center'}>
        {getCount()}
        {getPercentage()}
      </div>
    </div>
  );
};
