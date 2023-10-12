import { ActionPayload } from '@coldpbc/interfaces';
import { BaseButton, ColdIcon } from '@coldpbc/components';
import { ButtonTypes, IconNames } from '@coldpbc/enums';
import { useNavigate } from 'react-router-dom';
import { ActionItemVariants } from '@coldpbc/enums';
import { motion } from 'framer-motion';

export interface ActionItemProps {
  actionPayload: ActionPayload;
  variant: ActionItemVariants;
}
export const ActionItem = ({ actionPayload, variant }: ActionItemProps) => {
  const navigate = useNavigate();
  const { action } = actionPayload;
  const onCTAClick = () => {
    navigate('?actionId=' + actionPayload.id);
  };

  const getCTAButton = () => {
    if (variant === ActionItemVariants.narrow) {
      return (
        <BaseButton className={'bg-transparent w-6 h-6 p-0'} onClick={onCTAClick}>
          <ColdIcon name={IconNames.ColdRightArrowIcon} />
        </BaseButton>
      );
    } else {
      return (
        <BaseButton className={'bg-transparent'} onClick={onCTAClick} variant={ButtonTypes.hyperlink}>
          <span className={'text-tc-primary text-button'}>View All Steps</span>
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
      <div className={'w-full h-[4px] bg-bgc-accent rounded-lg'}>
        <motion.div
          className={'h-full bg-primary rounded-lg'}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent * 100}%` }}
        />
      </div>
    );
  };

  const getActionItemClass = () => {
    if (variant === ActionItemVariants.narrow) {
      return 'w-full max-w-[405px] text-tc-primary flex space-x-4 rounded-2xl bg-transparent border-[1px] border-bgc-accent p-[16px]';
    } else {
      return 'w-[634px] text-tc-primary flex space-x-4 rounded-2xl bg-transparent border-[1px] border-bgc-accent p-[16px]';
    }
  };

  const getImageClass = () => {
    return 'rounded-lg w-[64px]';
  };

  const getContentClass = () => {
    if (variant === ActionItemVariants.narrow) {
      return 'space-y-4 w-[293px]';
    } else {
      return 'space-y-4 w-[522px]';
    }
  };

  const getTitleClass = () => {
    if (variant === ActionItemVariants.narrow) {
      return 'text-body font-bold';
    } else {
      return 'text-h4';
    }
  };

  return (
    <div className={getActionItemClass()}>
      <div
        className={getImageClass()}
        style={{
          background: `url(${action.image_url})`,
        }}
      ></div>
      <div className={getContentClass()}>
        <div className={'flex justify-between'}>
          <div className={getTitleClass()}>{action.title}</div>
          <div>{getCTAButton()}</div>
        </div>
        <div className={'text-body line-clamp-2'}>{action.overview}</div>
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
