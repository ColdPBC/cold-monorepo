import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { ComplianceSidebarPayload, MQTTComplianceManagerPayloadComplianceSection } from '@coldpbc/interfaces';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import React, { useContext, useEffect, useRef } from 'react';
import ColdMQTTContext from '../../../context/coldMQTTContext';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import useSWRSubscription from 'swr/subscription';
import { ComplianceManagerSectionProgressBar, ErrorFallback } from '@coldpbc/components';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import { resolveNodeEnv } from '@coldpbc/fetchers';
import { withErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { orderBy } from 'lodash';

const _ComplianceManagerOverviewSection = ({
  section,
  groupId,
  setGroupCounts,
  collapseOpen,
}: {
  section: MQTTComplianceManagerPayloadComplianceSection;
  groupId: string;
  setGroupCounts: React.Dispatch<
    React.SetStateAction<{
      [p: string]: {
        not_started: number;
        ai_answered: number;
        user_answered: number;
        bookmarked: number;
      };
    }>
  >;
  collapseOpen: boolean;
}) => {
  const navigate = useNavigate();
  const { orgId } = useAuth0Wrapper();
  const { subscribeSWR, publishMessage, connectionStatus, client } = useContext(ColdMQTTContext);
  const totalQuestions = useRef(0);
  const context = useContext(ColdComplianceManagerContext);
  const { status } = context;
  const { name, currentAIStatus } = context.data;
  const { logBrowser } = useColdContext();

  const sectionTopic = `ui/${resolveNodeEnv()}/${orgId}/${name}/${groupId}/${section.id}`;

  const { data, error } = useSWRSubscription(sectionTopic, subscribeSWR) as {
    data: ComplianceSidebarPayload | undefined;
    error: unknown;
  };

  const questions = data?.compliance_section_groups?.[0]?.compliance_sections?.[0]?.compliance_questions;
  const orderedQuestions = orderBy(questions, ['order'], ['asc']);
  const sectionAIStatus = currentAIStatus?.find(s => s.section === section.key);

  useEffect(() => {
    if (client?.current && connectionStatus && orgId) {
      publishMessage(
        `platform/${resolveNodeEnv()}/compliance/getComplianceQuestionList`,
        JSON.stringify({
          reply_to: sectionTopic,
          resource: 'complianceQuestionList',
          method: 'GET',
          compliance_set_name: name,
          compliance_section_group_id: groupId,
          compliance_section_id: section.id,
          organization_id: orgId,
        }),
      );
    }
  }, [connectionStatus, name, publishMessage, client, collapseOpen, orgId, currentAIStatus]);

  useEffect(() => {
    if (orderedQuestions.length > 0) {
      totalQuestions.current = orderedQuestions.length;
      let not_started = 0;
      let ai_answered = 0;
      let user_answered = 0;
      let bookmarked = 0;
      orderedQuestions.forEach(q => {
        if (q.user_answered) {
          user_answered++;
        } else if (q.ai_answered) {
          ai_answered++;
        } else if (q.not_started) {
          not_started++;
        }
        if (q.bookmarked) {
          bookmarked++;
        }
      });
      logBrowser(`Adding counts for section: ${section.title}`, 'info', {
        not_started,
        ai_answered,
        user_answered,
        bookmarked,
      });

      setGroupCounts(prev => {
        return {
          ...prev,
          [section.key]: {
            not_started: not_started,
            ai_answered: ai_answered,
            user_answered: user_answered,
            bookmarked: bookmarked,
          },
        };
      });
    }
  }, [orderedQuestions]);

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

  if (section._count.compliance_questions === 0) {
    return null;
  }

  logBrowser('Compliance Manager Overview Section', 'info', {
    section,
    groupId,
    data,
    error,
    currentAIStatus,
    topic: sectionTopic,
  });

  const backgroundColor = isAIRunning() ? 'bg-gray-60' : 'bg-bgc-accent';
  const textColor = isAIRunning() ? 'text-tc-disabled' : 'text-tc-primary';

  return (
    <div
      className={`flex flex-col w-full rounded-[8px] py-[16px] px-[24px] gap-[30px] ${!canNavigateToQuestionnaire() ? 'cursor-default' : 'cursor-pointer'} ${backgroundColor}`}
      onClick={() => {
        if (!canNavigateToQuestionnaire()) {
          return;
        }
        navigate(`/questionnaire/${name}?section=${section.key}`);
      }}
      key={`${groupId}-${section.id}`}>
      <div className={'w-full flex flex-row justify-between items-center'}>
        <div className={'flex flex-row gap-[16px] justify-start items-center'}>
          <div className={`text-h4 ${textColor}`}>{section.title}</div>
          {isAIRunning() && <div className={'text-body text-tc-disabled'}>Cold AI Running</div>}
        </div>
        <div className={'flex flex-row gap-[8px] items-center'}>
          <div className={`w-[105px] h-full flex items-center text-body text-start ${textColor}`}>{totalQuestions.current} Questions</div>
          <ArrowRightIcon className={'w-[24px] h-[24px] text-tc-primary'} />
        </div>
      </div>
      <ComplianceManagerSectionProgressBar sectionAIStatus={sectionAIStatus} questions={orderedQuestions} />
    </div>
  );
};

export const ComplianceManagerOverviewSection = withErrorBoundary(_ComplianceManagerOverviewSection, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceManagerOverviewSection: ', error);
  },
});
