import { ComplianceProgressStatus, IconNames } from '@coldpbc/enums';
import { Tooltip } from 'flowbite-react';
import { ComplianceProgressStatusColor } from '@coldpbc/lib';
import { get } from 'lodash';
import { flowbiteThemeOverride, HexColors } from '@coldpbc/themes';
import { ColdIcon, ComplianceProgressStatusIcon } from '@coldpbc/components';
import { ColdInvertedBookmarkIcon } from '../../atoms/icons/coldInvertedBookmarkIcon';

export interface ComplianceManagerSectionProgressBarProps {
  questions: {
    status: ComplianceProgressStatus;
    prompt: string;
  }[];
}

export const ComplianceManagerSectionProgressBar = ({ questions }: ComplianceManagerSectionProgressBarProps) => {
  const totalQuestions = questions.length;

  const getProgressTooltipIcon = (status: ComplianceProgressStatus) => {
    switch (status) {
      case ComplianceProgressStatus.not_started:
        return (
          <div className={'w-[15px] h-[15px] flex items-center justify-center'}>
            <ComplianceProgressStatusIcon
              type={ComplianceProgressStatus.not_started}
              iconProps={{
                height: 15,
                width: 15,
              }}
            />
          </div>
        );
      case ComplianceProgressStatus.needs_review:
        return (
          <div className={'w-[15px] h-[15px] flex items-center justify-center'}>
            <ColdIcon name={IconNames.ColdAiIcon} color={HexColors.yellow['200']} height={12} />
          </div>
        );
      case ComplianceProgressStatus.bookmarked:
        return (
          <div className={'w-[15px] h-[15px] flex items-center justify-center'}>
            <ColdInvertedBookmarkIcon color={HexColors.lightblue['200']} />
          </div>
        );
      case ComplianceProgressStatus.complete:
        return (
          <div className={'w-[15px] h-[15px] flex items-center justify-center'}>
            <ColdIcon name={IconNames.ColdInvertedCheckmarkIcon} color={HexColors.green['200']} />
          </div>
        );
    }
  };

  const getProgressBarItem = (index: number) => {
    const question = questions[index];
    const isLast = index === totalQuestions - 1;
    const isFirst = index === 0;

    const tooltipContent = (
      <div className={'flex flex-col w-full justify-start'}>
        <div className={'flex flex-row gap-[4px]'}>
          {getProgressTooltipIcon(question.status)}
          <div className={'text-label text-tc-primary'}>Question {index + 1}</div>
        </div>
        <div className={'w-full text-tc-primary text-body'}>{question.prompt}</div>
      </div>
    );

    // todo: add onclick to questionnaire
    const color = get(ComplianceProgressStatusColor, question.status);
    return (
      <div
        className={'h-[8px] w-full cursor-pointer transition ease-in-out hover:scale-110 duration-300'}
        style={{
          backgroundColor: color,
          borderTopLeftRadius: isFirst ? 4 : 0,
          borderBottomLeftRadius: isFirst ? 4 : 0,
          borderTopRightRadius: isLast ? 4 : 0,
          borderBottomRightRadius: isLast ? 4 : 0,
          borderLeft: isFirst ? 'none' : `1px solid ${HexColors.bgc.accent}`,
          borderRight: isLast ? 'none' : `1px solid ${HexColors.bgc.accent}`,
        }}
        onClick={() => {}}>
        <Tooltip
          className={'w-[455px] p-[8px] rounded-[8px] border-[1px] border-gray-60 bg-gray-30 shadow-[0_8px_16px_0px_rgba(0,0,0,0)] flex flex-col justify-start'}
          content={tooltipContent}
          arrow={false}
          theme={flowbiteThemeOverride.tooltip}>
          <div className={'w-full h-[8px]'}></div>
        </Tooltip>
      </div>
    );
  };

  return (
    <div className={'flex flex-row justify-start w-full'}>
      {questions.map((question, index) => {
        const percentWidth = 100 / totalQuestions;
        return (
          <div
            key={index}
            style={{
              width: `${percentWidth}%`,
            }}>
            {getProgressBarItem(index)}
          </div>
        );
      })}
    </div>
  );
};
