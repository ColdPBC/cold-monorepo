import React from 'react';
import { Assignee } from '@coldpbc/interfaces';
import { Avatar, BaseButton, ColdIcon } from '@coldpbc/components';
import { GlobalSizes, IconNames } from '@coldpbc/enums';
import { ColdPlusIcon } from '@coldpbc/components';

export interface AssigneeSelectorProps {
  assignee?: Assignee;
  handleAssigneeSelection: (assignee: Assignee | undefined) => void;
  assigneeList: Assignee[];
}

export const AssigneeSelector = ({
  assignee,
  handleAssigneeSelection,
  assigneeList,
}: AssigneeSelectorProps) => {
  const [stepAssignee, setStepAssignee] = React.useState<Assignee | undefined>(
    assignee,
  );
  // todo: add code to handle assignee dropdown and selection

  const getStepAssignee = () => {
    if (stepAssignee) {
      return (
        <div
          className={
            'min-h-[40px] flex w-fit text-tc-primary rounded-lg border-[1px] border-bgc-accent p-[8px] space-x-[8px]'
          }
        >
          <Avatar
            size={GlobalSizes.xSmall}
            user={{
              name: stepAssignee.name,
              picture: stepAssignee.picture,
              given_name: stepAssignee.given_name,
              family_name: stepAssignee.family_name,
            }}
          />
          <div className={'text-eyebrow flex items-center justify-center'}>
            {stepAssignee.name}
          </div>
          <div>
            <BaseButton
              className={'p-[8px] w-[24px] h-[24px]'}
              onClick={() => {
                setStepAssignee(undefined);
                handleAssigneeSelection(undefined);
              }}
            >
              <ColdIcon name={IconNames.CloseModalIcon} />
            </BaseButton>
          </div>
        </div>
      );
    } else {
      return (
        <BaseButton
          className={
            'min-h-[40px] w-fit text-tc-primary rounded-lg p-[8px] border-[1px] border-bgc-accent'
          }
        >
          <div className={'flex space-x-[8px]'}>
            <div className={'text-eyebrow flex items-center justify-center'}>
              Add Steward
            </div>
            <div className={'bg-primary p-[8px] w-[24px] h-[24px] rounded-lg'}>
              <ColdPlusIcon className={'w-[8px] h-[8px]'} />
            </div>
          </div>
        </BaseButton>
      );
    }
  };

  return <div>{getStepAssignee()}</div>;
};
