import { useState } from 'react';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { HexColors } from '@coldpbc/themes';
import { ComplianceProgressStatus } from '@coldpbc/enums';
import { QuestionnaireSidebarSectionGroup } from '../../molecules/questionnaireSidebarSectionGroup/questionnaireSidebarSectionGroup';

export const QuestionnaireSidebar = ({
  sectionGroups,
}: {
  sectionGroups: {
    name: string;
    sections: {
      name: string;
      questions: {
        id: string;
        prompt: string;
        order: number;
        status: ComplianceProgressStatus;
      }[];
    }[];
  }[];
}) => {
  const [open, setOpen] = useState(false);
  let totalQuestions = 0;
  let totalQuestionsAnswered = 0;

  sectionGroups.forEach(item => {
    item.sections.forEach(section => {
      totalQuestions += section.questions.length;
      totalQuestionsAnswered += section.questions.filter(question => question.status === ComplianceProgressStatus.user_answered).length;
    });
  });

  return (
    <div
      className={'h-full flex flex-col gap-[24px] border-gray-70 border-r-[1px] text-ellipsis'}
      style={{
        width: open ? '407px' : '72px',
        transition: 'width 0.3s',
      }}>
      {open ? (
        <div className={'w-full h-[72px] flex justify-between items-center px-[16px] py-[8px] shadow-2xl cursor-pointer'} onClick={() => setOpen(!open)}>
          <div className={'text-tc-primary text-h4 truncate'}>Table of Contents</div>
          <ChevronDoubleLeftIcon width={'24'} height={'24'} color={HexColors.gray['90']} />
        </div>
      ) : (
        <div className={'w-full h-[72px] flex justify-center items-center border-b-[1px] border-gray-70 cursor-pointer'} onClick={() => setOpen(!open)}>
          <ChevronDoubleRightIcon width={'24'} height={'24'} color={HexColors.gray['90']} />
        </div>
      )}
      <div className={'w-full h-full flex flex-col gap-[48px] overflow-y-auto scrollbar-hide'}>
        {sectionGroups.map((item, index) => {
          return <QuestionnaireSidebarSectionGroup key={index} sectionGroup={item} sideBarExpanded={open} totalQuestions={totalQuestions} />;
        })}
      </div>
    </div>
  );
};
