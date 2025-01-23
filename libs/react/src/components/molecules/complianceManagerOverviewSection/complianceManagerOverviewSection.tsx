import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { ComplianceSidebarSection } from '@coldpbc/interfaces';
import { useColdContext } from '@coldpbc/hooks';
import React, { useContext, useEffect } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ComplianceManagerSectionProgressBar, ErrorFallback } from '@coldpbc/components';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { orderBy } from 'lodash';

const _ComplianceManagerOverviewSection = ({ section, groupId, collapseOpen }: { section: ComplianceSidebarSection; groupId: string; collapseOpen: boolean }) => {
  const navigate = useNavigate();
  const context = useContext(ColdComplianceManagerContext);
  const { status } = context;
  const { name, currentAIStatus } = context.data;
  const { logBrowser } = useColdContext();

  const orderedQuestions = orderBy(section.compliance_questions, ['order'], ['asc']);
  const sectionAIStatus = currentAIStatus?.find(s => s.section === section.key);

  useEffect(() => {
    logBrowser(`Compliance Manager Overview Section: ${section.title}`, 'info', {
      section,
      groupId,
      orderedQuestions,
    });
  }, [section, groupId, orderedQuestions]);

  const isAIRunning = () => {
    if (status === ComplianceManagerStatus.startedAi) {
      // check if the currentAIStatus has the section
      return !!sectionAIStatus;
    } else {
      return false;
    }
  };

  const canNavigateToQuestionnaire = () => {
    if (isAIRunning() || status === ComplianceManagerStatus.notActivated || status === ComplianceManagerStatus.submitted) {
      return false;
    } else {
      return true;
    }
  };

  if (!collapseOpen) {
    return <></>;
  }

  const backgroundColor = isAIRunning() ? 'bg-gray-60' : 'bg-bgc-accent';
  const textColor = isAIRunning() ? 'text-tc-disabled' : 'text-tc-primary';

  return (
    <div className={`flex flex-col w-full rounded-[8px] py-[16px] px-[24px] gap-[30px] ${backgroundColor}`} key={`${groupId}-${section.id}`}>
      <div className={'w-full flex flex-row justify-between items-center'}>
        <div className={'flex flex-row gap-[16px] justify-start items-center'}>
          <div className={`text-h4 ${textColor}`}>{section.title}</div>
          {isAIRunning() && <div className={'text-body text-tc-disabled'}>Cold AI Running</div>}
        </div>
        <div className={'flex flex-row gap-[8px] items-center'}>
          <div className={`w-[105px] h-full flex items-center text-body text-start ${textColor}`}>{orderedQuestions ? orderedQuestions.length : 0} Questions</div>
          <div
            className={`${!canNavigateToQuestionnaire() ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => {
              if (!canNavigateToQuestionnaire()) {
                return;
              }
              navigate(`/assessment/${name}?section=${section.key}`);
            }}>
            <ArrowRightIcon className={'w-[24px] h-[24px] text-tc-primary'} />
          </div>
        </div>
      </div>
      <ComplianceManagerSectionProgressBar sectionAIStatus={sectionAIStatus} questions={orderedQuestions} isNavigable={canNavigateToQuestionnaire()} />
    </div>
  );
};

export const ComplianceManagerOverviewSection = withErrorBoundary(_ComplianceManagerOverviewSection, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceManagerOverviewSection: ', error);
  },
});
