import React from 'react';
import { User } from '@auth0/auth0-spa-js/src/global';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { Modal } from '../modal/modal';
import { useAddToastMessage } from '../../../hooks/useToastMessage';
import { InviteMemberForm } from './inviteMemberForm/inviteMemberForm';
import { isAxiosError } from 'axios';

export interface InvitationModalProps {
  shown: boolean;
  setShown: (shown: boolean) => void;
  companyName: string;
  user: User;
}

export const InvitationModal = (props: InvitationModalProps) => {
  const { shown, setShown, companyName, user } = props;
  const { addToastMessage } = useAddToastMessage();

  const inviteMembers = (emails: string, roleId: string) => {
    return Promise.all(
      emails.split(',').map((email: string) => {
        return axiosFetcher([
          '/organizations/invitation',
          'POST',
          JSON.stringify({
            user_email: email,
            org_id: user.coldclimate_claims.org_id,
            inviter_name: user.name,
            roleId: roleId,
          }),
        ]);
      }),
    )
      .then((response) => {
        // check if the response array contains any AxiosError objects
        // reject the promise if there are any errors
        const errors = response.filter((r) => isAxiosError(r));
        if (errors.length > 0) {
          throw new Error('Invitation failed');
        }
        addToastMessage({
          message: 'Invitation sent successfully',
          type: 'success',
        });
        setShown(false);
      })
      .catch((error) => {
        addToastMessage({
          message: 'Invitation failed',
          type: 'failure',
        });
        setShown(false);
      });
  };

  const body = () => {
    return (
      <div className={'flex w-full h-full space-x-2 justify-center'}>
        <InviteMemberForm inviteMembers={inviteMembers} />
      </div>
    );
  };

  return (
    <Modal
      setShowModal={setShown}
      show={shown}
      header={{
        title: `Invite a new member to ${companyName}`,
      }}
      body={body()}
    />
  );
};
