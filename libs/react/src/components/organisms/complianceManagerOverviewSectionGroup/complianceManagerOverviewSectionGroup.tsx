import { ComplianceProgressStatus, IconNames } from '@coldpbc/enums';
import { map, orderBy } from 'lodash';
import { ColdIcon, ComplianceManagerOverviewSection, ComplianceProgressStatusIcon } from '@coldpbc/components';
import { MQTTComplianceManagerPayloadComplianceSection, MQTTComplianceManagerPayloadComplianceSectionGroup } from '@coldpbc/interfaces';
import { useContext, useEffect, useState } from 'react';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import ColdMQTTContext from '../../../context/coldMQTTContext';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { Transition } from '@headlessui/react';
import useSWRSubscription from 'swr/subscription';
import { resolveNodeEnv } from '@coldpbc/fetchers';

export interface ComplianceManagerOverviewSectionGroupProps {
  sectionGroup: MQTTComplianceManagerPayloadComplianceSectionGroup;
}

export const ComplianceManagerOverviewSectionGroup = ({ sectionGroup }: ComplianceManagerOverviewSectionGroupProps) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const { orgId } = useAuth0Wrapper();
  const { subscribeSWR, publishMessage, connectionStatus, client } = useContext(ColdMQTTContext);
  const context = useContext(ColdComplianceManagerContext);
  const { name } = context.data;

  const getComplianceSectionListTopic = () => {
    return `ui/${resolveNodeEnv()}/${orgId}/${name}/${sectionGroup.id}`;
  };

  const { data, error } = useSWRSubscription(getComplianceSectionListTopic(), subscribeSWR) as {
    data: MQTTComplianceManagerPayloadComplianceSection[] | undefined;
    error: any;
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

  // console.log({
  //   type: 'compliance section list',
  //   data,
  //   error,
  // });

  const sectionStatuses = [
    {
      status: ComplianceProgressStatus.not_started,
      count: sectionGroup.not_started_count,
    },
    {
      status: ComplianceProgressStatus.needs_review,
      count: sectionGroup.ai_answered_count,
    },
    {
      status: ComplianceProgressStatus.complete,
      count: sectionGroup.user_answered_count,
    },
    {
      status: ComplianceProgressStatus.bookmarked,
      count: sectionGroup.bookmarked_count,
    },
  ];

  const sectionGroupData = sectionGroup;

  const getProgressIcon = (type: ComplianceProgressStatus) => {
    switch (type) {
      case ComplianceProgressStatus.complete:
      case ComplianceProgressStatus.not_started:
        return (
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <ComplianceProgressStatusIcon type={type} />
          </div>
        );
      case ComplianceProgressStatus.needs_review:
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
        <div className={'rounded-[8px] border-[1px] border-gray-60 bg-gray-50 py-[4px] pl-[4px] pr-[8px] flex flex-row gap-[4px] items-center'} key={status.status}>
          {getProgressIcon(status.status)}
          <div className={'text-tc-primary text-body font-bold'}>{status.count}</div>
        </div>
      );
    });
  };

  return (
    <div
      className={'flex flex-col w-full gap-[36px] bg-transparent'}
      onClick={() => {
        // todo: navigate to section in questionnaire
      }}>
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
      <Transition
        className={'w-full flex flex-col gap-[36px] bg-transparent'}
        show={collapseOpen}
        // // transition fly in from top
        // enter={'transform transition duration-300'}
        // enterFrom={'opacity-0 translate-y-[-100%]'}
        // enterTo={'opacity-100 translate-y-0'}
        // // transition fly out to top
        // leave={'transform transition duration-300'}
        // leaveFrom={'opacity-100 translate-y-0'}
        // leaveTo={'opacity-0 translate-y-[-100%]'}
      >
        {map(orderBy(data, ['order'], ['asc']), (section, index) => {
          return <ComplianceManagerOverviewSection key={`${section.id}-${index}`} section={section} groupId={sectionGroup.id} />;
        })}
      </Transition>
    </div>
  );
};
