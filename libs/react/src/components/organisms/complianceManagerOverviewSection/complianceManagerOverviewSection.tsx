import { ComplianceProgressStatus, IconNames } from '@coldpbc/enums';
import { forEach, map } from 'lodash';
import { ColdIcon, ColdSupportNotFilledInIcon, ComplianceManagerSectionProgressBar } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { ComplianceManagerSectionGroup } from '@coldpbc/interfaces';

export interface ComplianceManagerOverviewSectionProps {
  sectionGroup: ComplianceManagerSectionGroup;
}

export const ComplianceManagerOverviewSection = ({ sectionGroup }: ComplianceManagerOverviewSectionProps) => {
  // get number of question from section
  let numberOfQuestions = 0;
  const sectionStatuses = [
    {
      status: ComplianceProgressStatus.not_started,
      count: 0,
    },
    {
      status: ComplianceProgressStatus.needs_review,
      count: 0,
    },
    {
      status: ComplianceProgressStatus.complete,
      count: 0,
    },
    {
      status: ComplianceProgressStatus.bookmarked,
      count: 0,
    },
  ];

  forEach(sectionGroup.sections, section => {
    forEach(section.questions, question => {
      const index = sectionStatuses.findIndex(status => status.status === question.status);
      sectionStatuses[index].count++;
      numberOfQuestions++;
    });
  });

  const sectionGroupData = sectionGroup;

  const getProgressIcon = (type: ComplianceProgressStatus) => {
    switch (type) {
      case ComplianceProgressStatus.not_started:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ColdSupportNotFilledInIcon color={HexColors.gray['90']} />
          </div>
        );
      case ComplianceProgressStatus.needs_review:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ColdIcon name={IconNames.ColdAiIcon} color={HexColors.yellow['200']} width={15} height={15} />
          </div>
        );
      case ComplianceProgressStatus.bookmarked:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ColdIcon name={IconNames.ColdBookmarkIcon} color={HexColors.lightblue['200']} height="15" />
          </div>
        );
      case ComplianceProgressStatus.complete:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ColdIcon name={IconNames.ColdCheckIcon} color={HexColors.green['200']} />
          </div>
        );
    }
  };

  const getSectionStatusElements = () => {
    return map(sectionStatuses, status => {
      return (
        <div className={'rounded-[8px] border-[1px] border-gray-60 bg-gray-50 py-[4px] pl-[4px] pr-[8px] flex flex-row gap-[4px] items-center'}>
          {getProgressIcon(status.status)}
          <div className={'text-tc-primary text-body font-bold'}>{status.count}</div>
        </div>
      );
    });
  };

  const getSubSectionElement = (index: number) => {
    const section = sectionGroupData.sections[index];
    return (
      <div className={'w-full flex flex-row justify-between gap-[30px] items-center'}>
        <div className={'text-tc-primary text-body font-bold w-[159px]'}>{section.title}</div>
        <ComplianceManagerSectionProgressBar questions={section.questions} />
      </div>
    );
  };

  return (
    <div
      className={'flex flex-col w-full rounded-[8px] py-[16px] px-[24px] gap-[30px] bg-bgc-accent cursor-pointer'}
      onClick={() => {
        // todo: navigate to section in questionnaire
      }}>
      <div className={'w-full flex flex-row justify-between items-center'}>
        <div className={'text-h4 text-tc-primary'}>{sectionGroupData.title}</div>
        <div className={'w-auto flex flex-row gap-[16px] items-center'}>
          <div className={'flex flex-row gap-[8px] items-center'}>
            <div className={'w-[105px] h-full flex items-center text-body text-start text-tc-secondary'}>{numberOfQuestions} Questions</div>
            {getSectionStatusElements()}
          </div>
          <ArrowRightIcon className={'w-[24px] h-[24px] text-tc-primary'} />
        </div>
      </div>
      {map(sectionGroupData.sections, (section, index) => {
        return getSubSectionElement(index);
      })}
    </div>
  );
};
