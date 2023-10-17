import React from 'react';
import { Assignee } from '@coldpbc/interfaces';
import { Avatar, ColdIcon } from '@coldpbc/components';
import { GlobalSizes, IconNames } from '@coldpbc/enums';
import { ColdPlusIcon } from '@coldpbc/components';
import { UserSelectDropdown } from '../userSelectDropdown';
import { useAuth0, User } from '@auth0/auth0-react';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR from 'swr';

export interface StepDetailAssigneeSelectorProps {
  assignee?: Assignee;
  handleAssigneeSelection: (assignee: Assignee | undefined) => void;
}

export const StepDetailAssigneeSelector = ({
  assignee,
  handleAssigneeSelection,
}: StepDetailAssigneeSelectorProps) => {
  const { user } = useAuth0();

  const getOrgURL = () => {
    if (user?.coldclimate_claims.org_id) {
      return [
        '/organizations/' + user.coldclimate_claims.org_id + '/members',
        'GET',
      ];
    } else {
      return null;
    }
  };

  const { data: members }: { data: any; error: any; isLoading: boolean } =
    useSWR(getOrgURL(), axiosFetcher, {
      revalidateOnFocus: false,
    });

  if (assignee) {
    return (
      <div
        className={
          'min-h-[40px] flex w-fit text-tc-primary rounded-lg border-[1px] border-bgc-accent p-[8px] space-x-[8px] cursor-pointer'
        }
        onClick={() => {
          handleAssigneeSelection(undefined);
        }}
      >
        <Avatar
          size={GlobalSizes.xSmall}
          user={{
            name: assignee.name,
            picture: assignee.picture,
            given_name: assignee.given_name,
            family_name: assignee.family_name,
          }}
        />
        <div className={'text-eyebrow flex items-center justify-center'}>
          {assignee.name}
        </div>
        <div className={'flex items-center justify-center w-[24px] h-[24px]'}>
          <ColdIcon name={IconNames.CloseModalIcon} />
        </div>
      </div>
    );
  } else {
    return (
      <UserSelectDropdown
        className="w-auto"
        onSelect={(assignee: User) => {
          handleAssigneeSelection({
            family_name: assignee.family_name,
            given_name: assignee.given_name,
            name: assignee.name,
            picture: assignee.picture,
          });
        }}
        label={
          <div
            className={
              'min-h-[40px] w-fit text-tc-primary rounded-lg p-[8px] border-[1px] border-bgc-accent cursor-pointer'
            }
          >
            <div className={'flex space-x-[8px]'}>
              <div className={'text-eyebrow flex items-center justify-center'}>
                Add Steward
              </div>
              <div
                className={'bg-primary p-[8px] w-[24px] h-[24px] rounded-lg'}
              >
                <ColdPlusIcon className={'w-[8px] h-[8px]'} />
              </div>
            </div>
          </div>
        }
      />
    );
  }
};
