import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { ColdIcon, ColdSparkleIcon } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';

export const ActivationCompleteModalBody = () => {
  const getActivationGuide = (step: string) => {
    let text = '';
    let icon = null;
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
      <div className={'flex flex-col p-[24px] gap-[10px] w-[244px] rounded-[16px]'}>
        <div className={'w-full flex justify-center'}>{icon}</div>
        <div className={'text-left text-h5 whitespace-normal'}>{text}</div>
      </div>
    );
  };

  return (
    <div className={'p-[24px] gap-[31px] flex flex-col'}>
      <div className={'w-full text-h1 flex justify-center'}>How It Works</div>
      <div className={'flex flex-row gap-[16px] w-full'}>
        {getActivationGuide('upload')}
        {getActivationGuide('ai')}
        {getActivationGuide('review')}
      </div>
    </div>
  );
};
