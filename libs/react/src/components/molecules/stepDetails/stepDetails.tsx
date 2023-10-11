import React from 'react';
import { Assignee, Step } from '@coldpbc/interfaces';
import { Disclosure } from '@headlessui/react';
import { IconNames, StepDetailsVariants } from '@coldpbc/enums';
import { ColdIcon } from '../../atoms';
import { AssigneeSelector } from '../assigneeSelector';
import { StepDetailsCheckbox } from '../stepDetailsCheckbox';
import { cloneDeep, snakeCase } from 'lodash';

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

  const handleAssigneeSelection = (
    step: Step,
    assignee: Assignee | undefined,
  ) => {
    const index = steps.findIndex((s) => s.overview === step.overview);
    const updatedStep = {
      ...step,
      assignee: assignee,
    };
    const updatedSteps = steps;
    updatedSteps[index] = updatedStep;
    handleStepsUpdate(updatedSteps);
  };

  const updateStepsWithStep = (newStep: Step) => {
    const index = steps.findIndex((s) => s.overview === newStep.overview);
    const updatedSteps = steps.map((step, i) => {
      if (i === index) {
        return newStep;
      } else {
        return step;
      }
    });
    handleStepsUpdate(updatedSteps);
  };

  return (
    <div className={'text-tc-primary space-y-[16px] w-[835px]'}>
      {steps.map((step, index) => {
        return (
          <div key={`step_detail_${index}_${snakeCase(step.overview)}`}>
            <Disclosure as="div">
              {({ open }) => (
                <div className={'border-[1px] border-bgc-accent rounded-lg'}>
                  <div
                    className={
                      'flex w-full text-tc-primary p-[16px] space-x-[16px] justify-between bg-transparent items-center'
                    }
                  >
                    <div className={'flex space-x-[16px] items-center'}>
                      <StepDetailsCheckbox
                        complete={step.complete}
                        setComplete={(complete) => {
                          updateStepsWithStep({
                            ...step,
                            complete: complete,
                          });
                        }}
                      />
                      <div className={'text-body font-bold'}>
                        {step.overview}
                      </div>
                    </div>
                    <div className={'flex space-x-[16px]'}>
                      <AssigneeSelector
                        assigneeList={assignees}
                        assignee={step.assignee}
                        handleAssigneeSelection={(assignee) => {
                          handleAssigneeSelection(step, assignee);
                        }}
                      />
                      <Disclosure.Button>
                        <span className="flex h-6 w-6 items-center justify-center">
                          {open ? (
                            <ColdIcon
                              name={IconNames.ColdChevronUpIcon}
                              className={'w-[8px] h-[8px]'}
                            />
                          ) : (
                            <ColdIcon
                              name={IconNames.ColdChevronDownIcon}
                              className={'w-[8px] h-[8px]'}
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </div>
                  </div>
                  <Disclosure.Panel as="dd" className="px-[16px] pb-[16px]">
                    <p className="text-caption">{step.description}</p>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </div>
        );
      })}
    </div>
  );
};
