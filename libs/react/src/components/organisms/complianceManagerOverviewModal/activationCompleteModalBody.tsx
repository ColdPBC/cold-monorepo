import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { ColdIcon, ColdSparkleIcon } from '@coldpbc/components';
import { ComplianceManagerStatus, IconNames } from '@coldpbc/enums';
import { ReactNode, useContext, useEffect } from 'react';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { isAxiosError } from 'axios';

export const ActivationCompleteModalBody = ({ setButtonDisabled }: { setButtonDisabled: (loading: boolean) => void }) => {
  const { data, status, setStatus } = useContext(ColdComplianceManagerContext);
  const { name } = data;
  const { orgId } = useAuth0Wrapper();
  const { logBrowser } = useColdContext();

  const getActivationGuide = (step: string) => {
    let text = '';
    let icon: ReactNode;
    switch (step) {
      case 'upload':
        text = 'You’ll upload relevant documents so our AI can help you fill this in faster.';
        icon = <ArrowUpIcon />;
        break;
      case 'ai':
        text = 'Cold AI uses your documents to answer as many questions as it can.';
        icon = <ColdSparkleIcon />;
        break;
      case 'review':
        text = 'You review and answer the remaining questions.';
        icon = <ColdIcon name={IconNames.ColdCheckIcon} className={'w-[40px] h-[40px]'} />;
        break;
    }

    return (
      <div className={'flex flex-col p-[24px] gap-[10px] w-[244px] rounded-[16px] bg-gray-05 bg-opacity-50'}>
        <div className={'w-full flex justify-center h-[40px]'}>{icon}</div>
        <div className={'text-left text-h5 whitespace-normal'}>{text}</div>
      </div>
    );
  };

  useEffect(() => {
    const activateCompliance = async () => {
      if (orgId && name) {
        setButtonDisabled(true);
        const response = await axiosFetcher([`/compliance/${name}/organizations/${orgId}`, 'POST']);
        if (!isAxiosError(response)) {
          logBrowser(`${name} compliance activated`, 'info', { orgId, name });
          setStatus(ComplianceManagerStatus.activated);
        } else {
          logBrowser(`${name} compliance activation failed`, 'error', { orgId, name, response });
        }
        setButtonDisabled(false);
      }
    };
    activateCompliance();
  }, [orgId]);

  return (
    <div className={'w-full h-full flex justify-center items-center'}>
      <div className={'p-[24px] gap-[31px] flex flex-col'}>
        <div className={'w-full text-h1 flex justify-center'}>How It Works</div>
        <div className={'flex flex-row gap-[16px] w-full'}>
          {getActivationGuide('upload')}
          {getActivationGuide('ai')}
          {getActivationGuide('review')}
        </div>
      </div>
    </div>
  );
};
