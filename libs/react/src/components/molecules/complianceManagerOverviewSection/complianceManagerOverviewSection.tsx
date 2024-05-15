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
      not_started: number;
      ai_answered: number;
      user_answered: number;
      bookmarked: number;
    }>
  >;
  collapseOpen: boolean;
}) => {
  const { orgId } = useAuth0Wrapper();
  const { subscribeSWR, publishMessage, connectionStatus, client } = useContext(ColdMQTTContext);
  const totalQuestions = useRef(0);
  const context = useContext(ColdComplianceManagerContext);
  const { status } = context;
  const { name } = context.data;
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
  }, [connectionStatus, name, publishMessage, client]);

  useEffect(() => {
    const counts = data?.counts;
    if (counts) {
      totalQuestions.current = counts.total;
      console.log(counts);
      setGroupCounts(prev => {
        return {
          not_started: prev.not_started + counts.not_started,
          ai_answered: prev.ai_answered + counts.ai_answered,
          user_answered: prev.user_answered + counts.user_answered,
          bookmarked: prev.bookmarked + counts.bookmarked,
        };
      });
      // {
      //   not_started: counts.not_started + groupCounts.not_started,
      //     needs_review: counts.ai_answered + groupCounts.needs_review,
      //   complete: counts.user_answered + groupCounts.complete,
      //   bookmarked: counts.bookmarked + groupCounts.bookmarked,
      // }
    }
  }, [data]);

  if (section._count.compliance_questions === 0) {
    return null;
  }

  logBrowser('Compliance Manager Overview Section', 'info', {
    section,
    groupId,
    data,
    error,
  });

  if (!collapseOpen) {
    return <></>;
  }

  return (
    <div
      className={`flex flex-col w-full rounded-[8px] py-[16px] px-[24px] gap-[30px] bg-bgc-accent ${
        status === ComplianceManagerStatus.notActivated ? 'cursor-default' : 'cursor-pointer'
      }`}
      onClick={() => {
        if (status === ComplianceManagerStatus.notActivated) {
          return;
        }
        // todo: navigate to section in questionnaire
      }}
      key={`${groupId}-${section.id}`}>
      <div className={'w-full flex flex-row justify-between items-center'}>
        <div className={'text-h4 text-tc-primary'}>{section.title}</div>
        <div className={'flex flex-row gap-[8px] items-center'}>
          <div className={'w-[105px] h-full flex items-center text-body text-start text-tc-secondary'}>{totalQuestions.current} Questions</div>
          <ArrowRightIcon className={'w-[24px] h-[24px] text-tc-primary'} />
        </div>
      </div>
      <ComplianceManagerSectionProgressBar questions={data?.compliance_questions} />
    </div>
  );
};
