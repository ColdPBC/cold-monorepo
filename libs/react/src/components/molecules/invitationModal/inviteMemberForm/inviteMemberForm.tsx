import React, { useState } from 'react';
import { BaseButton } from '../../../atoms/button/button';
import { ColorNames } from '../../../../enums/colors';
import { InputTypes } from '../../../../enums/inputs';
import { GlobalSizes } from '../../../../enums/sizes';
import { Input } from '../../../atoms/input/input';
import useSWR from 'swr';
import { axiosFetcher } from '../../../../fetchers/axiosFetcher';
import { Spinner } from '../../../atoms/spinner/spinner';
import capitalize from 'lodash/capitalize';
import includes from 'lodash/includes';
import { Role } from 'auth0';
import { isArray } from 'lodash';

export interface InviteMemberFormProps {
  inviteMembers: (emails: string, roleId: string) => void;
}

export const InviteMemberForm = (props: InviteMemberFormProps) => {
  const { inviteMembers } = props;
  const [memberForm, setMemberForm] = useState<any>({
    emails: '',
    role: '',
  });
  const {
    data,
    error,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useSWR(
    ['/roles', 'GET'],
    axiosFetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const handleChange = (name: string, value: any) => {
    setMemberForm({ ...memberForm, [name]: value });
  };

  const handleSubmit = () => {
    inviteMembers(memberForm.emails, memberForm.role);
  };

  // Filter out special case roles
  const filterRoles = (role: any) => {
    const filteredRoles = ['company:owner', 'cold:', 'default:'];

    let match = false;
    filteredRoles.map((roleFilter) => {
      if (match) return;
      match = includes(role.name, roleFilter);
    });

    if (match) return;
    return role;
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (isArray(data)) {
    return (
      <>
        <div className="w-64">
          <Input
            input_props={{
              placeholder: 'Emails, comma separated',
              name: 'emails',
              value: memberForm.emails,
              onChange: (e) => handleChange('emails', e.target.value),
              onValueChange: (value) => {
                handleChange('emails', value);
              },
              required: true,
            }}
            idx={0}
            type={InputTypes.Text}
          />
        </div>
        <div className="w-40">
          <Input
            input_props={{
              name: 'role',
              value: memberForm.role,
              onValueChange: (value) => {
                handleChange('role', value);
              },
              options: (data as Role[])
                .filter(filterRoles)
                .map((role: Role, index) => {
                  return {
                    id: index,
                    name: capitalize(role.name?.replace('company:', '')),
                  };
                }),
            }}
            idx={1}
            type={InputTypes.Select}
          />
        </div>
        <div className="pl-6 mt-2">
          <BaseButton
            type={'submit'}
            textSize={GlobalSizes.xSmall}
            color={ColorNames.primary}
            label={'Send Invite'}
            onClick={() => {
              handleSubmit();
            }}
          />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
