import { QuestionnaireSidebarSection } from '@coldpbc/components';
import { QuestionnaireQuestion } from '@coldpbc/interfaces';

export const QuestionnaireSidebarSectionGroup = ({
  sectionGroup,
  sideBarExpanded,
}: {
  sectionGroup: {
    name: string;
    key: string;
    sections: {
      name: string;
      key: string;
      questions: QuestionnaireQuestion[];
    }[];
  };
  sideBarExpanded: boolean;
}) => {
  let answeredQuestions = 0;
  let totalQuestions = 0;

  sectionGroup.sections.forEach(section => {
    answeredQuestions += section.questions.filter(question => question.user_answered).length;
    totalQuestions += section.questions.length;
  });

  const percentage = totalQuestions === 0 ? '0' : ((answeredQuestions / totalQuestions) * 100).toFixed(0);

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
