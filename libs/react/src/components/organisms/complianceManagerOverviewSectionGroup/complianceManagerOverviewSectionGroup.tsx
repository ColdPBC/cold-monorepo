import { ComplianceProgressStatus, IconNames } from '@coldpbc/enums';
import { forOwn, map, orderBy } from 'lodash';
import { ColdIcon, ComplianceManagerOverviewSection, ComplianceProgressStatusIcon, ErrorFallback } from '@coldpbc/components';
import { MQTTComplianceManagerPayloadComplianceSection, MQTTComplianceManagerPayloadComplianceSectionGroup } from '@coldpbc/interfaces';
import React, { useContext, useEffect, useState } from 'react';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import ColdMQTTContext from '../../../context/coldMQTTContext';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import useSWRSubscription from 'swr/subscription';
import { resolveNodeEnv } from '@coldpbc/fetchers';
import { withErrorBoundary } from 'react-error-boundary';

export interface ComplianceManagerOverviewSectionGroupProps {
  sectionGroup: MQTTComplianceManagerPayloadComplianceSectionGroup;
  position: number;
}

const _ComplianceManagerOverviewSectionGroup = ({ sectionGroup, position }: ComplianceManagerOverviewSectionGroupProps) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [groupCounts, setGroupCounts] = useState<{
    [key: string]: {
      not_started: number;
      ai_answered: number;
      user_answered: number;
      bookmarked: number;
    };
  }>({});
  const { orgId } = useAuth0Wrapper();
  const { subscribeSWR, publishMessage, connectionStatus, client } = useContext(ColdMQTTContext);
  const context = useContext(ColdComplianceManagerContext);
  const { setComplianceCounts } = context;
  const { name } = context.data;
  const { logBrowser } = useColdContext();

  const getComplianceSectionListTopic = () => {
    return `ui/${resolveNodeEnv()}/${orgId}/${name}/${sectionGroup.id}`;
  };

  const { data, error } = useSWRSubscription(getComplianceSectionListTopic(), subscribeSWR) as {
    data: MQTTComplianceManagerPayloadComplianceSection[] | undefined;
    error: any;
  };

  const getGroupCounts = (groupCounts: {
    [p: string]: {
      not_started: number;
      ai_answered: number;
      user_answered: number;
      bookmarked: number;
    };
  }) => {
    let not_started = 0;
    let ai_answered = 0;
    let user_answered = 0;
    let bookmarked = 0;
    forOwn(groupCounts, (value, key) => {
      not_started += value.not_started;
      ai_answered += value.ai_answered;
      user_answered += value.user_answered;
      bookmarked += value.bookmarked;
    });

    return {
      not_started,
      ai_answered,
      user_answered,
      bookmarked,
    };
  };

  useEffect(() => {
    if (client?.current && connectionStatus) {
      publishMessage(
        `platform/${resolveNodeEnv()}/compliance/getComplianceSectionList`,
        JSON.stringify({
          reply_to: getComplianceSectionListTopic(),
          resource: 'complianceSectionList',
          method: 'GET',
          compliance_set_name: name,
          compliance_section_group_id: sectionGroup.id,
        }),
      );
    }
  }, [connectionStatus, name, publishMessage, client]);

  useEffect(() => {
    // open the first section group by default on load
    if (position === 0) {
      setCollapseOpen(true);
    }
  }, []);

  useEffect(() => {
    setComplianceCounts(prev => {
      return {
        ...prev,
        ...groupCounts,
      };
    });
  }, [groupCounts]);

  const orderedData = orderBy(data, ['order'], ['asc']);

  useEffect(() => {
    logBrowser(`Compliance Manager Overview Section Group: ${sectionGroup.title}`, 'info', {
      data,
      error,
      orderedData,
      collapseOpen,
      orgId,
    });
  }, [collapseOpen, data, error, logBrowser, orderedData, orgId, sectionGroup.title]);

  const sectionGroupCounts = getGroupCounts(groupCounts);

  const sectionStatuses = [
    {
      status: ComplianceProgressStatus.not_started,
      count: sectionGroupCounts.not_started,
    },
    {
      status: ComplianceProgressStatus.ai_answered,
      count: sectionGroupCounts.ai_answered,
    },
    {
      status: ComplianceProgressStatus.user_answered,
      count: sectionGroupCounts.user_answered,
    },
    {
      status: ComplianceProgressStatus.bookmarked,
      count: sectionGroupCounts.bookmarked,
    },
  ];

  const sectionGroupData = sectionGroup;

  const getProgressIcon = (type: ComplianceProgressStatus) => {
    switch (type) {
      case ComplianceProgressStatus.user_answered:
      case ComplianceProgressStatus.not_started:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ComplianceProgressStatusIcon type={type} />
          </div>
        );
      case ComplianceProgressStatus.ai_answered:
      case ComplianceProgressStatus.bookmarked:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ComplianceProgressStatusIcon
              type={type}
              iconProps={{
                width: 15,
                height: 15,
              }}
            />
          </div>
        );
    }
  };

  const getSectionStatusElements = () => {
    return map(sectionStatuses, status => {
      return (
        <div
          className={'rounded-[8px] border-[1px] border-gray-60 bg-gray-50 py-[4px] pl-[4px] pr-[8px] flex flex-row gap-[4px] items-center w-[68px] justify-start'}
          key={status.status}>
          {getProgressIcon(status.status)}
          <div className={'text-tc-primary text-body font-bold'}>{status.count}</div>
        </div>
      );
    });
  };

  return (
    <div className={`flex flex-col w-full bg-transparent ${collapseOpen && 'gap-[36px]'}`}>
      <div className={'w-full flex flex-row justify-between items-center gap-[36px] cursor-pointer'} onClick={() => setCollapseOpen(!collapseOpen)}>
        <div className={'text-h3 text-tc-primary'}>{sectionGroupData.title}</div>
        <div className={'w-auto flex flex-row justify-between items-center gap-[36px]'}>
          <div className={'flex flex-row gap-[8px] items-center'}>
            {getSectionStatusElements()}
            {collapseOpen ? (
              <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
                <ColdIcon name={IconNames.ColdChevronUpIcon} />
              </div>
            ) : (
              <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
                <ColdIcon name={IconNames.ColdChevronDownIcon} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={'w-full flex flex-col gap-[36px] bg-transparent'}>
        {map(orderedData, (section, index) => {
          return (
            <ComplianceManagerOverviewSection
              key={`${section.id}-${index}`}
              section={section}
              groupId={sectionGroup.id}
              setGroupCounts={setGroupCounts}
              collapseOpen={collapseOpen}
            />
          );
        })}
      </div>
    </div>
  );
};

export const ComplianceManagerOverviewSectionGroup = withErrorBoundary(_ComplianceManagerOverviewSectionGroup, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceManagerOverviewSectionGroup: ', error);
  },
});
