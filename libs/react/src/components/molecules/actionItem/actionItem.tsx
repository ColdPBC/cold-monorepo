import React from 'react';
import { ActionType } from '../../../interfaces/actions/actions';
import { BaseButton, ColdIcon } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';
import { useNavigate } from 'react-router-dom';
import { ActionItemVariants } from '../../../enums/actions';
import { useAuth0 } from '@auth0/auth0-react';

export interface ActionItemProps {
  action: ActionType;
  variant: ActionItemVariants;
}
export const ActionItem = ({ action, variant }: ActionItemProps) => {
  const navigate = useNavigate();
  const onCTAClick = () => {
    navigate('?actionId=' + action.id);
  };

  const getCTAButton = () => {
    if (variant === ActionItemVariants.narrow) {
      // return arrow button
      return (
        <BaseButton className={'bg-transparent w-6 h-6'} onClick={onCTAClick}>
          <ColdIcon name={IconNames.ColdRightArrowIcon} />
        </BaseButton>
      );
    } else {
      return (
        <BaseButton className={'bg-transparent'} onClick={onCTAClick}>
          <span className={'text-tc-primary'}>View All Steps</span>
        </BaseButton>
      );
    }
  };

  const getProgressText = () => {
    const steps = action.steps;
    const completedSteps = steps.filter((step) => step.complete);
    const totalSteps = steps.length;
    return `${completedSteps.length}/${totalSteps}`;
  };

  const getProgessBar = () => {
    let progressPercent = 0;
    const steps = action.steps;
    const completedSteps = steps.filter((step) => step.complete);
    const totalSteps = steps.length;
    if (completedSteps.length > 0) {
      progressPercent = completedSteps.length / totalSteps;
    } else {
      progressPercent = 0;
    }
    return (
      <div className={'w-full h-2 bg-bgc-accent rounded-lg'}>
        <div
          className={'h-full bg-primary rounded-lg'}
          style={{ width: `${progressPercent * 100}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div
      className={
        'w-[405px] text-tc-primary flex space-x-4 rounded-2xl bg-transparent border-[1px] border-bgc-accent p-[16px]'
      }
    >
      <div
        className={'rounded w-[64px]'}
        style={{
          background: `url(${action.image_url})`,
        }}
      ></div>
      <div className={'space-y-4'}>
        <div className={'flex justify-between'}>
          <div className={'text-h4'}>{action.title}</div>
          <div>{getCTAButton()}</div>
        </div>
        <div>{action.overview}</div>
        <div className={'space-y-2'}>
          <div className={'text-eyebrow flex justify-between'}>
            <div>Action Progress</div>
            <div>{getProgressText()}</div>
          </div>
          <div>{getProgessBar()}</div>
        </div>
      </div>
    </div>
  );
};
