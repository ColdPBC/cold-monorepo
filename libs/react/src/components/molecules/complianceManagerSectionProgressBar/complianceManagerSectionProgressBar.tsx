import { ComplianceProgressStatus } from '@coldpbc/enums';
import { Tooltip } from 'flowbite-react';
import { ComplianceProgressStatusColor } from '@coldpbc/lib';
import { get, map, orderBy } from 'lodash';
import { flowbiteThemeOverride, HexColors } from '@coldpbc/themes';
import { ComplianceProgressStatusIcon, ErrorFallback, Spinner } from '@coldpbc/components';
import { ComplianceSidebarQuestion, CurrentAIStatusSection } from '@coldpbc/interfaces';
import React, { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { useColdContext } from '@coldpbc/hooks';
import { withErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

export interface ComplianceManagerSectionProgressBarProps {
  sectionAIStatus: CurrentAIStatusSection | undefined;
  questions: ComplianceSidebarQuestion[] | undefined;
  isNavigable: boolean;
}

const _ComplianceManagerSectionProgressBar = ({ questions, sectionAIStatus, isNavigable }: ComplianceManagerSectionProgressBarProps) => {
  const { status: managerStatus, data } = useContext(ColdComplianceManagerContext);
  const { name } = data;
  const { logBrowser } = useColdContext();
  const navigate = useNavigate();

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

  const getProgressBarItem = (questions: ComplianceSidebarQuestion[], index: number) => {
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

    const isQuestionBeingProcessed = sectionAIStatus?.questions.some(q => q === question.key);

    const color = isQuestionBeingProcessed ? ComplianceProgressStatusColor.ai_answered : get(ComplianceProgressStatusColor, status);

    // todo: add onclick to questionnaire
    return (
      <Tooltip
        className={
          'w-[455px] p-[8px] rounded-[8px] border-[1px] border-gray-60 bg-gray-30 shadow-[0_8px_16px_0px_rgba(0,0,0,0)] flex flex-col justify-start transition-none animate-none'
        }
        content={tooltipContent}
        arrow={false}
        theme={flowbiteThemeOverride.tooltip}
        animation={false}>
        <div
          className={`h-[8px] w-full cursor-pointer transition ease-in-out hover:scale-110 duration-300 ${isQuestionBeingProcessed && 'animate-pulsate'}`}
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
            if (isNavigable) {
              navigate(`/questionnaire/${name}?question=${question.key}`);
            }
          }}></div>
      </Tooltip>
    );
  };

  const orderedData = orderBy(questions, ['order'], ['asc']);

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

export const ComplianceManagerSectionProgressBar = withErrorBoundary(_ComplianceManagerSectionProgressBar, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceManagerSectionProgressBar: ', error);
  },
});
