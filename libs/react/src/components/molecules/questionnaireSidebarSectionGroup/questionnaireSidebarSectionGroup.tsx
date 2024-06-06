import { ComplianceProgressStatus } from '@coldpbc/enums';
import { QuestionnaireSidebarSection } from '@coldpbc/components';

export const QuestionnaireSidebarSectionGroup = ({
  sectionGroup,
  sideBarExpanded,
  totalQuestions,
}: {
  sectionGroup: {
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
  };
  sideBarExpanded: boolean;
  totalQuestions: number;
}) => {
  let answeredQuestions = 0;
  sectionGroup.sections.forEach(section => {
    answeredQuestions += section.questions.filter(question => question.status === ComplianceProgressStatus.user_answered).length;
  });
  const percentage = totalQuestions === 0 ? '0' : (answeredQuestions / totalQuestions).toFixed(0);

  if (!sideBarExpanded) return null;

  return (
    <div className={'w-full flex flex-col'}>
      <div className={'w-full flex justify-between text-h3 text-tc-primary p-[16px]'}>
        {sectionGroup.name}
        <div className={'bg-gray-70 rounded-[16px] px-[8px] py-[4px] text-body flex items-center'}>{percentage}%</div>
      </div>
      {sectionGroup.sections.map(section => {
        return <QuestionnaireSidebarSection sideBarExpanded={sideBarExpanded} section={section} />;
      })}
    </div>
  );
};
