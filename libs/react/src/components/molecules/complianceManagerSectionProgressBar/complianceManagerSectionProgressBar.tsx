import { ComplianceManagerStatus, ComplianceProgressStatus } from '@coldpbc/enums';
import { Tooltip } from 'flowbite-react';
import { ComplianceProgressStatusColor } from '@coldpbc/lib';
import { get, map, orderBy } from 'lodash';
import { flowbiteThemeOverride, HexColors } from '@coldpbc/themes';
import { ComplianceProgressStatusIcon, Spinner } from '@coldpbc/components';
import { MQTTComplianceManagerPayloadComplianceQuestion } from '@coldpbc/interfaces';
import { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { useColdContext } from '@coldpbc/hooks';

export interface ComplianceManagerSectionProgressBarProps {
  questions: MQTTComplianceManagerPayloadComplianceQuestion[] | undefined;
}

export const ComplianceManagerSectionProgressBar = ({ questions }: ComplianceManagerSectionProgressBarProps) => {
  const { status: managerStatus } = useContext(ColdComplianceManagerContext);
  const { logBrowser } = useColdContext();
  const getProgressTooltipIcon = (status: ComplianceProgressStatus) => {
    return (
      <div className={'w-[12px] h-[12px] flex items-center justify-center'}>
        <ComplianceProgressStatusIcon
          type={status}
          inverted={true}
          iconProps={{
            height: 12,
            width: 12,
          }}
        />
      </div>
    );
  };

  const getProgressBarItem = (questions: MQTTComplianceManagerPayloadComplianceQuestion[], index: number) => {
    const totalQuestions = questions.length;
    const question = questions[index];
    let status = ComplianceProgressStatus.not_started;
    if (question.user_answered) {
      status = ComplianceProgressStatus.user_answered;
    } else if (question.bookmarked) {
      status = ComplianceProgressStatus.bookmarked;
    } else if (question.ai_answered) {
      status = ComplianceProgressStatus.ai_answered;
    }

    const isLast = index === totalQuestions - 1;
    const isFirst = index === 0;

    const tooltipContent = (
      <div className={'flex flex-col w-full justify-start transition-none'}>
        <div className={'flex flex-row gap-[4px] items-center'}>
          {getProgressTooltipIcon(status)}
          <div className={'text-label text-tc-primary'}>Question {index + 1}</div>
        </div>
        <div className={'w-full text-tc-primary text-body'}>{question.prompt}</div>
      </div>
    );

    // todo: add onclick to questionnaire
    const color = get(ComplianceProgressStatusColor, status);
    return (
      <div
        className={`h-[8px] w-full cursor-pointer transition ease-in-out hover:scale-110 duration-300`}
        style={{
          backgroundColor: color,
          borderTopLeftRadius: isFirst ? 4 : 0,
          borderBottomLeftRadius: isFirst ? 4 : 0,
          borderTopRightRadius: isLast ? 4 : 0,
          borderBottomRightRadius: isLast ? 4 : 0,
          borderLeft: isFirst ? 'none' : `2px solid ${HexColors.bgc.accent}`,
          borderRight: isLast ? 'none' : `2px solid ${HexColors.bgc.accent}`,
        }}
        onClick={() => {
          if (managerStatus === ComplianceManagerStatus.notActivated) {
            return;
          }
        }}>
        <Tooltip
          className={'w-[455px] p-[8px] rounded-[8px] border-[1px] border-gray-60 bg-gray-30 shadow-[0_8px_16px_0px_rgba(0,0,0,0)] flex flex-col justify-start transition-none'}
          content={tooltipContent}
          arrow={false}
          theme={flowbiteThemeOverride.tooltip}
          animation={false}>
          <div className={'w-full h-[8px]'}></div>
        </Tooltip>
      </div>
    );
  };

  const orderedData = orderBy(questions, ['order'], ['asc']);

  logBrowser('Compliance Question List', 'info', {
    orderedData,
    managerStatus,
  });

  if (!questions) {
    return <Spinner />;
  } else {
    return (
      <div className={'flex flex-row justify-start w-full'}>
        {map(orderedData, (question, index) => {
          const percentWidth = 100 / questions.length;
          return (
            <div
              key={index}
              style={{
                width: `${percentWidth}%`,
              }}>
              {getProgressBarItem(questions, index)}
            </div>
          );
        })}
      </div>
    );
  }
};
