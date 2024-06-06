import { ComplianceProgressStatus } from '@coldpbc/enums';
import { useContext } from 'react';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';

export const QuestionnaireContainer = (props: {
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
  const { sectionGroups } = props;
  const { activeQuestion, setActiveQuestion } = useContext(ColdComplianceQuestionnaireContext);

  return (
    <div className={'w-full flex flex-col gap-[40px] overflow-x-auto'}>
      {sectionGroups.map((sectionGroup, index) => {
        return (
          <div className={'w-full flex-col gap-[40px] items-start'}>
            <div className={'text-h1'}>{sectionGroup.name}</div>
            {sectionGroup.sections.map((section, index) => {
              return <div className={'text-h2'}>{section.name}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
};
