import { BaseButton, Card } from '@coldpbc/components';
import { ColdInfoIcon } from '../../atoms/icons/coldInfoIcon';
import { HexColors } from '@coldpbc/themes';
import { Tooltip } from 'flowbite-react';
import { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { forEach, forOwn } from 'lodash';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import { useColdContext } from '@coldpbc/hooks';

export const ComplianceManagerAssessmentPreview = () => {
  const context = useContext(ColdComplianceManagerContext);
  const { status, complianceCounts } = context;
  const { mqttComplianceSet } = context.data;
  const { logBrowser } = useColdContext();

  // todo: change this to show the actual assessment percentage and not amount of answered/amount of questions
  let totalQuestions = 0;
  let answeredQuestions = 0;
  forEach(complianceCounts, (count, key) => {
    answeredQuestions += count.user_answered;
    forOwn(count, count => {
      totalQuestions += count;
    });
  });
  const percentage = totalQuestions !== 0 ? ((answeredQuestions / totalQuestions) * 100).toFixed(0) : 0;

  logBrowser('Compliance Manager Assessment Preview', 'info', {
    status,
    mqttComplianceSet,
    percentage,
    totalQuestions,
    answeredQuestions,
  });

  const getPercentage = () => {
    if ([ComplianceManagerStatus.notActivated, ComplianceManagerStatus.activated, ComplianceManagerStatus.uploadedDocuments, ComplianceManagerStatus.startedAi].includes(status)) {
      return '--';
    } else {
      return percentage + '%';
    }
  };

  return (
    <Card className={'w-fit flex flex-col justify-between overflow-visible'} glow={false}>
      <Tooltip
        className={'bg-gray-50 border-[1px] border-gray-60 p-[8px] text-tc-primary text-body transition-none'}
        content={'This shows the points you’ve accumulated from your answers out of the total points possible'}
        arrow={false}>
        <div className={'bg-gray-50 relative rounded-[16px] p-[24px] w-[155px] text-tc-primary flex flex-col border-[1px] border-gray-60'}>
          <div className={'w-full text-body text-center'}>Estimated Assessment</div>
          <div className={'w-full text-h1 text-center'}>{getPercentage()}</div>
          <div className={'absolute top-[8px] right-[8px]'}>
            <ColdInfoIcon color={HexColors.tc.disabled} />
          </div>
        </div>
      </Tooltip>
      <BaseButton className={'w-full'} disabled={status === ComplianceManagerStatus.notActivated}>
        Submit
      </BaseButton>
    </Card>
  );
};
