import { ComplianceProgressStatus } from '@coldpbc/enums';
import { forOwn } from 'lodash';
import { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ComplianceProgressStatusIcon } from '@coldpbc/components';

export interface ComplianceProgressItemProps {
  type: ComplianceProgressStatus;
}

export const ComplianceProgressStatusItem = ({ type }: ComplianceProgressItemProps) => {
  const { complianceCounts } = useContext(ColdComplianceManagerContext);

  const currentProgressData = {
    type: type,
    count: 0,
    percentage: 0,
  };

  let totalQuestions = 0;
  forOwn(complianceCounts, (value, key) => {
    switch (type) {
      case ComplianceProgressStatus.not_started:
        currentProgressData.count += value.not_started;
        break;
      case ComplianceProgressStatus.ai_answered:
        currentProgressData.count += value.ai_answered;
        break;
      case ComplianceProgressStatus.bookmarked:
        currentProgressData.count += value.bookmarked;
        break;
      case ComplianceProgressStatus.user_answered:
        currentProgressData.count += value.user_answered;
        break;
    }
    forOwn(value, count => {
      totalQuestions += count;
    });
  });

  currentProgressData.percentage = totalQuestions !== 0 ? currentProgressData.count / totalQuestions : 0;

  let text = '';
  switch (type) {
    case ComplianceProgressStatus.not_started:
      text = 'Not Started';
      break;
    case ComplianceProgressStatus.ai_answered:
      text = 'AI Needs Review';
      break;
    case ComplianceProgressStatus.bookmarked:
      text = 'Bookmarked';
      break;
    case ComplianceProgressStatus.user_answered:
      text = 'Complete';
      break;
  }

  const getProgressIcon = (type: ComplianceProgressStatus) => {
    switch (type) {
      case ComplianceProgressStatus.not_started:
      case ComplianceProgressStatus.user_answered:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ComplianceProgressStatusIcon type={type} />
          </div>
        );
      case ComplianceProgressStatus.ai_answered:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ComplianceProgressStatusIcon type={ComplianceProgressStatus.ai_answered} iconProps={{ width: 15, height: 15 }} />
          </div>
        );
      case ComplianceProgressStatus.bookmarked:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ComplianceProgressStatusIcon type={ComplianceProgressStatus.bookmarked} iconProps={{ height: 15 }} />
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
