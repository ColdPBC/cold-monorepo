import { useContext } from 'react';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { HexColors } from '@coldpbc/themes';
import { QuestionnaireSidebarSectionGroup, Spinner } from '@coldpbc/components';
import useSWR from 'swr';
import { QuestionnaireQuestion } from '@coldpbc/interfaces';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';

export const QuestionnaireSidebar = (props: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) => {
  const { sidebarOpen, setSidebarOpen } = props;
  const { orgId } = useAuth0Wrapper();
  const { name } = useContext(ColdComplianceQuestionnaireContext);

  const getSidebarDataUrl = () => {
    return [`/compliance_definitions/${name}/organizations/${orgId}/questionnaireSidebar`, 'GET'];
  };

  const sideBarSWR = useSWR<
    {
      name: string;
      key: string;
      sections: {
        name: string;
        key: string;
        questions: QuestionnaireQuestion[];
      }[];
    }[],
    any,
    any
  >(getSidebarDataUrl(), axiosFetcher);

  if (sideBarSWR.isLoading) {
    return <Spinner />;
  }

  if (!sideBarSWR.data) {
    return null;
  }

  const sectionGroups = sideBarSWR.data;

  return (
    <div
      className={'h-full flex flex-col gap-[24px] border-gray-70 border-r-[1px] text-ellipsis'}
      style={{
        width: sidebarOpen ? '407px' : '72px',
        transition: 'width 0.3s',
      }}>
      {sidebarOpen ? (
        <div className={'w-full h-[72px] flex justify-between items-center px-[16px] py-[8px] shadow-2xl cursor-pointer'} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <div className={'text-tc-primary text-h4 truncate'}>Table of Contents</div>
          <ChevronDoubleLeftIcon width={'24'} height={'24'} color={HexColors.gray['90']} />
        </div>
      ) : (
        <div className={'w-full h-[72px] flex justify-center items-center border-b-[1px] border-gray-70 cursor-pointer'} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <ChevronDoubleRightIcon width={'24'} height={'24'} color={HexColors.gray['90']} />
        </div>
      )}
      <div className={'w-full h-full flex flex-col gap-[48px] overflow-y-auto scrollbar-hide'}>
        {sectionGroups.map((item, index) => {
          return <QuestionnaireSidebarSectionGroup key={index} sectionGroup={item} sideBarExpanded={sidebarOpen} />;
        })}
      </div>
    </div>
  );
};
