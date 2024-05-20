import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { MQTTComplianceManagerPayloadComplianceQuestionList, MQTTComplianceManagerPayloadComplianceSection } from '@coldpbc/interfaces';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import React, { useContext, useEffect, useRef } from 'react';
import ColdMQTTContext from '../../../context/coldMQTTContext';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import useSWRSubscription from 'swr/subscription';
import { ComplianceManagerSectionProgressBar } from '@coldpbc/components';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import { resolveNodeEnv } from '@coldpbc/fetchers';

export const ComplianceManagerOverviewSection = ({
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
  const { orgId } = useAuth0Wrapper();
  const { subscribeSWR, publishMessage, connectionStatus, client } = useContext(ColdMQTTContext);
  const totalQuestions = useRef(0);
  const context = useContext(ColdComplianceManagerContext);
  const { status } = context;
  const { name, currentAIStatus } = context.data;
  const { logBrowser } = useColdContext();

  const sectionTopic = `ui/${resolveNodeEnv()}/${orgId}/${name}/${groupId}/${section.id}`;

  const { data, error } = useSWRSubscription(sectionTopic, subscribeSWR) as {
    data: MQTTComplianceManagerPayloadComplianceQuestionList | undefined;
    error: unknown;
  };

  useEffect(() => {
    if (client?.current && connectionStatus) {
      publishMessage(
        `platform/${resolveNodeEnv()}/compliance/getComplianceQuestionList`,
        JSON.stringify({
          reply_to: sectionTopic,
          resource: 'complianceQuestionList',
          method: 'GET',
          compliance_set_name: name,
          compliance_section_group_id: groupId,
          compliance_section_id: section.id,
        }),
      );
    }
  }, [connectionStatus, name, publishMessage, client, collapseOpen]);

  useEffect(() => {
    const counts = data?.counts;
    if (counts) {
      totalQuestions.current = counts.total;
      setGroupCounts(prev => {
        return {
          ...prev,
          [section.id]: {
            not_started: counts.not_started,
            ai_answered: counts.ai_answered,
            user_answered: counts.user_answered,
            bookmarked: counts.bookmarked,
          },
        };
      });
    }
  }, [data]);

  const isAIRunning = () => {
    if (status === ComplianceManagerStatus.startedAi) {
      if (currentAIStatus === undefined) {
        return true;
      } else {
        // todo: look for section in currentAIStatus. if found return true, else return false
        return false;
      }
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
        // todo: navigate to section in questionnaire
      }}
      key={`${groupId}-${section.id}`}>
      <div className={'w-full flex flex-row justify-between items-center'}>
        <div className={'flex flex-row gap-[16px] justify-start items-center'}>
          <div className={`text-h4 ${textColor}`}>{section.title}</div>
          {status === ComplianceManagerStatus.startedAi && <div className={'text-body text-tc-disabled'}>Cold AI Running</div>}
        </div>
        <div className={'flex flex-row gap-[8px] items-center'}>
          <div className={`w-[105px] h-full flex items-center text-body text-start ${textColor}`}>{totalQuestions.current} Questions</div>
          <ArrowRightIcon className={'w-[24px] h-[24px] text-tc-primary'} />
        </div>
      </div>
      <ComplianceManagerSectionProgressBar questions={data?.compliance_questions} />
    </div>
  );
};
