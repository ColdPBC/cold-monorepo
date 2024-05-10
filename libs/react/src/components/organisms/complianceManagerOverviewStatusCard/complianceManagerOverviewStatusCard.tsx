import { map } from 'lodash';
import { ComplianceManagerStatus, IconNames } from '@coldpbc/enums';
import { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ColdIcon } from '@coldpbc/components';
import { ComplianceProgressStatusColor } from '@coldpbc/lib';
import { useColdContext } from '@coldpbc/hooks';

export const ComplianceManagerOverviewStatusCard = () => {
  const { status: managerStatus, data } = useContext(ColdComplianceManagerContext);
  const { mqttComplianceSet } = data;
  const { logBrowser } = useColdContext();

  const getStatusIcon = (status: ComplianceManagerStatus) => {
    switch (status) {
      case ComplianceManagerStatus.activated:
        if (managerStatus === ComplianceManagerStatus.activated) {
          return (
            <div className={'absolute top-[3px] left-0 w-[12px] h-[12px]'}>
              <ColdIcon name={IconNames.ColdInvertedCheckmarkIcon} color={ComplianceProgressStatusColor.complete} width={12} height={12} />
            </div>
          );
        } else {
          return <div className={'absolute top-[3px] left-0 w-[12px] h-[12px] bg-gray-70 rounded-full'}></div>;
        }
      default:
        return <div className={'absolute top-[3px] left-0 w-[12px] h-[12px] bg-gray-70 rounded-full'}></div>;
    }
  };

  const getComplianceSetStatusElement = (status: ComplianceManagerStatus) => {
    if (status === ComplianceManagerStatus.notActivated) {
      return null;
    }

    let text = '';

    switch (status) {
      case ComplianceManagerStatus.activated:
        text = `Activate ${mqttComplianceSet?.compliance_definition.title}`;
        break;
      case ComplianceManagerStatus.upload:
        text = 'Upload Documents';
        break;
      case ComplianceManagerStatus.startedAi:
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
        {status !== ComplianceManagerStatus.submitted && <div data-testid={'compliance'} className={'absolute h-[calc(100%+22px)] w-[1px] bg-bgc-menu left-[6px] top-[6px]'}></div>}
        {getStatusIcon(status)}
        <div className={'text-tc-primary text-body w-full'}>{text}</div>
      </div>
    );
  };

  logBrowser('ComplianceManagerOverviewStatusCard', 'info', {
    managerStatus,
  });

  return (
    <div className={'w-[347px] h-auto p-[24px] flex flex-col gap-[22px] bg-bgc-elevated rounded-[16px]'} data-testid={'compliance-overview-statuses'}>
      {map(ComplianceManagerStatus, (status, index) => {
        return getComplianceSetStatusElement(status);
      })}
    </div>
  );
};
