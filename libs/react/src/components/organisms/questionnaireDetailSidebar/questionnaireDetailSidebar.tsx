import React, { useContext, useEffect, useState } from 'react';
import { ColdIcon, ErrorFallback, QuestionnaireAIDetail, QuestionnaireMoreDetail, QuestionnaireNotesDetail } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { HexColors } from '@coldpbc/themes';
import { useColdContext } from '@coldpbc/hooks';
import { withErrorBoundary } from 'react-error-boundary';

const _QuestionnaireDetailSidebar = () => {
  const { logBrowser } = useColdContext();
  const { focusQuestion, setFocusQuestion, name } = useContext(ColdComplianceQuestionnaireContext);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [tab, setTab] = useState<'ai' | 'notes' | 'more'>('ai');

  useEffect(() => {
    setSidebarOpen(focusQuestion !== null);
  }, [focusQuestion]);

  const getTabComponent = () => {
    switch (tab) {
      case 'ai':
        return <QuestionnaireAIDetail aiDetails={focusQuestion?.aiDetails} />;
      case 'notes':
        return <QuestionnaireNotesDetail />;
      case 'more':
        return <QuestionnaireMoreDetail />;
      default:
        return null;
    }
  };

  const getTabHeader = (tabName: string) => {
    switch (tabName) {
      case 'ai':
        return (
          <div
            className={'flex flex-row gap-[4px]'}
            style={{
              borderBottom: tab === 'ai' ? `2px solid ${HexColors.primary['300']}` : '2px solid transparent',
            }}>
            <div className={'flex flex-row items-center justify-center'}>
              <ColdIcon name={IconNames.ColdSparkleIcon} filled={true} color={HexColors.yellow['200']} />
            </div>
            <div>Cold AI</div>
          </div>
        );
      case 'notes':
        return (
          <div
            className={'flex flex-row gap-[4px] items-center'}
            style={{
              borderBottom: tab === 'notes' ? `2px solid ${HexColors.primary['300']}` : '2px solid transparent',
            }}>
            <div className={'flex flex-row items-center justify-center'}>
              <ColdIcon name={IconNames.ColdAddNotesIcon} height={15} color={tab === 'notes' ? 'white' : HexColors.tc.disabled} />
            </div>
            <div>Notes</div>
          </div>
        );
      case 'more':
        return (
          <div
            className={'flex flex-row gap-[4px] items-center'}
            style={{
              borderBottom: tab === 'more' ? `2px solid ${HexColors.primary['300']}` : '2px solid transparent',
            }}>
            <div className={'flex flex-row items-center justify-center'}>
              <ColdIcon name={IconNames.PlusIcon} color={tab === 'more' ? 'white' : HexColors.tc.disabled} />
            </div>
            <div>More</div>
          </div>
        );
      default:
        return null;
    }
  };

  logBrowser('QuestionnaireDetailSidebar', 'info', {
    sidebarOpen,
    tab,
    focusQuestion,
  });

  const tabs = ['ai', 'notes'];

  return (
    <div
      className={'flex flex-col h-full'}
      style={{
        width: sidebarOpen ? '407px' : '0px',
        minWidth: sidebarOpen ? '407px' : '0px',
        borderLeft: sidebarOpen ? `1px solid ${HexColors.gray['70']}` : 'none',
        transition: 'width 0.3s',
      }}
      data-chromatic={'ignore'}>
      {sidebarOpen && (
        <>
          <div className={'w-full h-auto flex flex-row gap-[12px] px-[24px] py-[16px] bg-gray-30 justify-between'}>
            <div className={'flex flex-row gap-[24px] justify-start'}>
              {tabs.map(tabName => {
                return (
                  <div
                    className={`flex flex-row items-center gap-[24px] cursor-pointer ${tab === tabName ? 'text-tc-primary' : 'text-tc-disabled'}`}
                    onClick={() => {
                      setTab(tabName as 'ai' | 'notes' | 'more');
                    }}
                    key={tabName}>
                    {getTabHeader(tabName)}
                  </div>
                );
              })}
            </div>
            <div
              className={'flex flex-row justify-center items-center cursor-pointer'}
              onClick={() => {
                setFocusQuestion(null);
              }}>
              <ColdIcon name={IconNames.CloseModalIcon} width={8} height={8} />
            </div>
          </div>
          <div className={'w-full h-full overflow-x-auto'}>{getTabComponent()}</div>
        </>
      )}
    </div>
  );
};

export const QuestionnaireDetailSidebar = withErrorBoundary(_QuestionnaireDetailSidebar, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in QuestionnaireDetailSidebar: ', error);
  },
});
