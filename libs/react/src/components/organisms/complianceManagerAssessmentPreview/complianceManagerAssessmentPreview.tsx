import { BaseButton, Card } from '@coldpbc/components';
import { ColdInfoIcon } from '../../atoms/icons/coldInfoIcon';
import { HexColors } from '@coldpbc/themes';
import { Tooltip } from 'flowbite-react';

export const ComplianceManagerAssessmentPreview = () => {
  return (
    <Card className={'w-fit flex flex-col justify-between overflow-visible'} glow={false}>
      <Tooltip
        className={'bg-gray-50 border-[1px] border-gray-60 p-[8px] text-tc-primary text-body transition-none'}
        content={'This shows the points you’ve accumulated from your answers out of the total points possible'}
        arrow={false}>
        <div className={'bg-gray-50 relative rounded-[16px] p-[24px] w-[155px] text-tc-primary flex flex-col border-[1px] border-gray-60'}>
          <div className={'w-full text-body text-center'}>Estimated Assessment</div>
          <div className={'w-full text-h1'}>44%</div>
          <div className={'absolute top-[8px] right-[8px]'}>
            <ColdInfoIcon color={HexColors.tc.disabled} />
          </div>
        </div>
      </Tooltip>
      <BaseButton className={'w-full'}>Submit</BaseButton>
    </Card>
  );
};
