import { forOwn, map } from 'lodash';
import { ComplianceManagerStatus, IconNames } from '@coldpbc/enums';
import { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ColdIcon, ProgressCircle } from '@coldpbc/components';
import { ComplianceProgressStatusColor, isComplianceStatusPassed, isComplianceStatusReached } from '@coldpbc/lib';
import { HexColors } from '@coldpbc/themes';

export const ComplianceManagerOverviewStatusCard = () => {
  const { data, status: managerStatus, complianceCounts } = useContext(ColdComplianceManagerContext);
  const { mqttComplianceSet } = data;

  const isProgressBarGradientPercentageBased = (status: ComplianceManagerStatus) => {
    if (
      (managerStatus === ComplianceManagerStatus.startedAi && status === ComplianceManagerStatus.completedAi) ||
      (managerStatus === ComplianceManagerStatus.startedQuestions && status === ComplianceManagerStatus.completedQuestions)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const showProgressBarGradient = (status: ComplianceManagerStatus) => {
    if (status === managerStatus) {
      return true;
    }

    return false;
  };

  const getStatusIcon = (status: ComplianceManagerStatus) => {
    if (
      (managerStatus === ComplianceManagerStatus.startedAi && status === ComplianceManagerStatus.completedAi) ||
      (managerStatus === ComplianceManagerStatus.startedQuestions && status === ComplianceManagerStatus.completedQuestions)
    ) {
      let percentage = 0;
      if (managerStatus === ComplianceManagerStatus.startedQuestions && status === ComplianceManagerStatus.completedQuestions) {
        let totalQuestions = 0;
        let answeredQuestions = 0;
        forOwn(complianceCounts, (value, key) => {
          totalQuestions += value.ai_answered + value.user_answered + value.not_started + value.bookmarked;
          answeredQuestions += value.user_answered;
        });
        percentage = (answeredQuestions / totalQuestions) * 100;
      } else {
        percentage = 50;
      }

      return (
        <div className={'absolute top-[3px] left-0 w-[12px] h-[12px]'}>
          <ProgressCircle color={HexColors.lightblue['200']} radius={6} percentage={percentage} backgroundColor={HexColors.gray['70']} />
        </div>
      );
    } else {
      if (isComplianceStatusReached(status, managerStatus)) {
        return (
          <div className={'absolute top-[3px] left-0 w-[12px] h-[12px]'}>
            <ColdIcon name={IconNames.ColdCheckIcon} color={ComplianceProgressStatusColor.user_answered} width={12} height={12} inverted={true} />
          </div>
        );
      } else {
        return <div className={'absolute top-[3px] left-0 w-[12px] h-[12px] bg-gray-70 rounded-full'}></div>;
      }
    }
  };

  const getComplianceStatusProgressBar = (status: ComplianceManagerStatus) => {
    if (status === ComplianceManagerStatus.submitted) {
      return null;
    }
    if (showProgressBarGradient(status)) {
      if (isProgressBarGradientPercentageBased(status)) {
        const percentage = 70;
        return (
          <div
            data-testid={'compliance'}
            className={`absolute h-[calc(100%+22px)] w-[1px] left-[6px] top-[6px]`}
            style={{
              backgroundImage: `linear-gradient(to bottom, ${ComplianceProgressStatusColor.user_answered} 0%, ${ComplianceProgressStatusColor.user_answered} ${percentage}%, ${HexColors.bgc.menu} ${percentage}%, ${HexColors.bgc.menu} 100%)`,
            }}></div>
        );
      } else {
        return (
          <div
            data-testid={'compliance'}
            className={`absolute h-[calc(100%+22px)] w-[1px] left-[6px] top-[6px]`}
            style={{
              // have gradient color from 0% to amount of percentage to 100%
              backgroundImage: `linear-gradient(to bottom, ${ComplianceProgressStatusColor.user_answered} 0%, ${HexColors.bgc.menu} 100%)`,
            }}></div>
        );
      }
    }

    const progressBarColor = isComplianceStatusPassed(status, managerStatus) ? 'bg-green-200' : 'bg-bgc-menu';

    return <div data-testid={'compliance'} className={`absolute h-[calc(100%+22px)] w-[1px] left-[6px] top-[6px] ${progressBarColor}`}></div>;
  };

  const getComplianceSetStatusElement = (status: ComplianceManagerStatus) => {
    if ([ComplianceManagerStatus.notActivated, ComplianceManagerStatus.startedAi, ComplianceManagerStatus.startedQuestions].includes(status)) {
      return null;
    }

    let text = '';

    switch (status) {
      case ComplianceManagerStatus.activated:
        text = `Activate ${mqttComplianceSet?.compliance_definition.title}`;
        break;
      case ComplianceManagerStatus.uploadedDocuments:
        text = 'Upload Documents';
        break;
      case ComplianceManagerStatus.completedAi:
        text = 'Start ✨Cold AI';
        break;
      case ComplianceManagerStatus.completedQuestions:
        text = 'Complete Questions';
        break;
      case ComplianceManagerStatus.submitted:
        text = 'Submit to Cold';
        break;
      default:
        text = '';
    }

    return (
      <div className={'w-full flex flex-row pl-[28px] relative'} key={status}>
        {getComplianceStatusProgressBar(status)}
        {getStatusIcon(status)}
        <div className={'text-tc-primary text-body w-full'}>{text}</div>
      </div>
    );
  };

  return (
    <div className={'w-[347px] h-auto p-[24px] flex flex-col gap-[22px] bg-bgc-elevated rounded-[16px]'} data-testid={'compliance-overview-statuses'}>
      {map(ComplianceManagerStatus, (status, index) => {
        return getComplianceSetStatusElement(status);
      })}
    </div>
  );
};
