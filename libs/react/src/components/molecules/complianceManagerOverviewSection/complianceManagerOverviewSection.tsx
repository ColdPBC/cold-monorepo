import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { MQTTComplianceManagerPayloadComplianceQuestion, MQTTComplianceManagerPayloadComplianceSection } from '@coldpbc/interfaces';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { useContext, useEffect } from 'react';
import ColdMQTTContext from '../../../context/coldMQTTContext';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import useSWRSubscription from 'swr/subscription';
import { ComplianceManagerSectionProgressBar } from '@coldpbc/components';
import { ComplianceManagerStatus } from '@coldpbc/enums';

export const ComplianceManagerOverviewSection = ({ section, groupId }: { section: MQTTComplianceManagerPayloadComplianceSection; groupId: string }) => {
  const { orgId } = useAuth0Wrapper();
  const { subscribeSWR, publishMessage, connectionStatus, client } = useContext(ColdMQTTContext);
  const context = useContext(ColdComplianceManagerContext);
  const { status } = context;
  const { name } = context.data;

  // const data = Array<MQTTComplianceManagerPayloadComplianceQuestion>();
  // const error = null;

  const { data, error } = useSWRSubscription(`ui/${import.meta.env.VITE_DD_ENV}/${orgId}/cd/${name}/sc/${section.id}`, subscribeSWR) as {
    data: MQTTComplianceManagerPayloadComplianceQuestion[] | undefined;
    error: any;
  };

  useEffect(() => {
    if (client?.current && connectionStatus) {
      publishMessage(
        `platform/${import.meta.env.VITE_DD_ENV}/compliance/getComplianceQuestionList`,
        JSON.stringify({
          reply_to: `ui/${import.meta.env.VITE_DD_ENV}/${orgId}/cd/${name}/sc/${section.id}`,
          resource: 'complianceQuestionList',
          method: 'GET',
          compliance_set_name: name,
          compliance_section_group_id: groupId,
          compliance_section_id: section.id,
        }),
      );
    }
  }, [connectionStatus, name, publishMessage, client]);

  console.log({ type: 'compliance question list', data, error, groupId, section });

  const numberOfQuestions = section._count.compliance_questions;

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
          <div className={'w-[105px] h-full flex items-center text-body text-start text-tc-secondary'}>{numberOfQuestions} Questions</div>
          <ArrowRightIcon className={'w-[24px] h-[24px] text-tc-primary'} />
        </div>
      </div>
      <ComplianceManagerSectionProgressBar questions={data} />
    </div>
  );
};
