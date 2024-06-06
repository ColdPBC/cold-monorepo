import { ComplianceProgressStatus, IconNames } from '@coldpbc/enums';
import { useContext, useState } from 'react';
import { ColdIcon, ComplianceProgressStatusIcon } from '@coldpbc/components';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';

export const QuestionnaireSidebarSection = ({
  section,
  sideBarExpanded,
}: {
  section: {
    name: string;
    questions: {
      id: string;
      prompt: string;
      order: number;
      status: ComplianceProgressStatus;
    }[];
  };
  sideBarExpanded: boolean;
}) => {
  const { activeQuestion, setActiveQuestion } = useContext(ColdComplianceQuestionnaireContext);
  const [open, setOpen] = useState(false);
  const answeredQuestions = section.questions.filter(question => question.status === ComplianceProgressStatus.user_answered).length;
  const questions = section.questions.length;
  const ratio = `${answeredQuestions}/${questions}`;

  if (!sideBarExpanded) return null;
  return (
    <div className={'w-full flex flex-col gap-[14px]'}>
      <div className={'flex flex-row py-[16px] pl-[40px] pr-[24px] text-tc-primary gap-[8px] cursor-pointer items-center hover:bg-gray-60'} onClick={() => setOpen(!open)}>
        <div className={'text-body font-bold truncate w-full'}>{section.name}</div>
        <div className={'text-body'}>{ratio}</div>
        {open ? <ColdIcon name={IconNames.ColdChevronUpIcon} /> : <ColdIcon name={IconNames.ColdChevronDownIcon} />}
      </div>
      {open && (
        <div className={'flex flex-col gap-[10px] w-full pl-[40px] pr-[24px] pb-[16px]'}>
          {section.questions.map((question, index) => {
            const questionNumber = index + 1;
            return (
              <div className={'flex flex-row w-full gap-[10px] px-[4px] py-[2px] items-center cursor-pointer'} key={index} onClick={() => setActiveQuestion(question.id)}>
                <div className={'w-[12px] h-[12px]'}>
                  <ComplianceProgressStatusIcon type={question.status} inverted={true} />
                </div>
                <div className={'text-tc-secondary text-body truncate w-full'}>
                  {questionNumber}. {question.prompt}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
