import React from 'react';
import { Assignee, Step } from '@coldpbc/interfaces';
import { Disclosure } from '@headlessui/react';
import { IconNames, StepDetailsVariants } from '@coldpbc/enums';
import { ColdIcon } from '../../atoms';
import { AssigneeSelector } from '../assigneeSelector';
import { StepDetailsCheckbox } from '../stepDetailsCheckbox';
import { cloneDeep, snakeCase } from 'lodash';
import { StepDetail } from '../stepDetail/stepDetail';

export interface StepDetailsProps {
  steps: Step[];
  assignees: Assignee[];
  handleStepsUpdate: (steps: Step[]) => void;
  variant?: StepDetailsVariants;
}

export const StepDetails = ({
  steps,
  assignees,
  handleStepsUpdate,
  variant,
}: StepDetailsProps) => {
  if (variant === StepDetailsVariants.SubcategoryActionDetailsCard) {
    steps = steps.slice(0, 2);
  }
  const handleStepUpdate = (newStep: Step) => {
    const index = steps.findIndex((s) => s.overview === newStep.overview);
    const updatedSteps = [...steps];
    updatedSteps[index] = newStep;

    handleStepsUpdate(updatedSteps);
  };

  const getClassName = () => {
    switch (variant) {
      case StepDetailsVariants.SubcategoryActionDetailsCard:
        return 'w-[636px] space-y-[16px] bg-bgc-elevated text-tc-primary';
      default:
        return 'w-[869px] space-y-[16px] bg-bgc-elevated p-[16px] text-tc-primary';
    }
  };

  return (
    <div className={getClassName()}>
      {steps.map((step, index) => {
        return (
          <StepDetail
            step={step}
            handleStepUpdate={handleStepUpdate}
            assignees={assignees}
            key={`step_detail_${index}_${snakeCase(step.overview)}`}
          />
        );
      })}
    </div>
  );
};
