import { ComplianceProgressStatus, IconNames } from '@coldpbc/enums';
import { useContext, useState } from 'react';
import { ColdIcon, ComplianceProgressStatusIcon } from '@coldpbc/components';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { QuestionnaireQuestion } from '@coldpbc/interfaces';
import { HexColors } from '@coldpbc/themes';

export const QuestionnaireSidebarSection = ({
  section,
  sideBarExpanded,
}: {
  section: {
    name: string;
    key: string;
    questions: QuestionnaireQuestion[];
  };
  sideBarExpanded: boolean;
}) => {
  const { activeQuestion, setActiveQuestion } = useContext(ColdComplianceQuestionnaireContext);
  const [open, setOpen] = useState(false);
  const answeredQuestions = section.questions.filter(question => question.user_answered).length;
  const questions = section.questions.length;
  const ratio = `${answeredQuestions}/${questions}`;

  const getQuestionStatus = (question: QuestionnaireQuestion) => {
    if (question.user_answered) return ComplianceProgressStatus.user_answered;
    if (question.ai_answered) return ComplianceProgressStatus.ai_answered;
    return ComplianceProgressStatus.not_started;
  };

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
              <div className={'flex flex-row w-full gap-[10px] px-[4px] py-[2px] items-center cursor-pointer'} key={index} onClick={() => setActiveQuestion(question.key)}>
                <div className={'w-[12px] h-[12px]'}>
                  <ComplianceProgressStatusIcon type={getQuestionStatus(question)} inverted={true} />
                </div>
                <div className={'text-tc-secondary text-body truncate w-full'}>
                  {questionNumber}. {question.prompt}
                </div>
                {question.bookmarked && (
                  <div className={'w-[18px] h-[18px] flex items-center justify-center'}>
                    <ColdIcon name={IconNames.ColdBookmarkIcon} filled={true} color={HexColors.lightblue['200']} height={16} width={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
