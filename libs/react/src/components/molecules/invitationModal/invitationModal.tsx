import { User } from '@auth0/auth0-spa-js/src/global';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { Modal } from '../modal/modal';
import { useAddToastMessage } from '../../../hooks/useToastMessage';
import { InviteMemberForm } from './inviteMemberForm/inviteMemberForm';
import { isAxiosError } from 'axios';
import useSWR from 'swr';
import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { BaseButton } from '../../atoms';
import { ToastMessage } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';

export interface InvitationModalProps {
  shown: boolean;
  setShown: (shown: boolean) => void;
  companyName: string;
  user: User;
}

const _InvitationModal = (props: InvitationModalProps) => {
  const { shown, setShown, user } = props;
  const { addToastMessage } = useAddToastMessage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const { mutate: sendInvitation } = useSWR<any>(
    ['/organizations/invitation', 'POST'],
    axiosFetcher,
  );

  const inviteMembers = async (email: string, roleId: string) => {
    try {
      const response: any = await sendInvitation(
        JSON.stringify({
          user_email: email,
          org_id: user.coldclimate_claims.org_id,
          inviter_name: user.name,
          roleId: roleId,
        }),
      );

      // check if the response array contains any AxiosError objects
      // reject the promise if there are any errors
      const isError = isAxiosError(response);
      if (isError) {
        throw new Error('Invitation failed');
      }
      setIsSuccess(true);
      setEmail(email);
    } catch (error) {
      addToastMessage({
        message: 'Invitation failed',
        type: ToastMessage.FAILURE,
      });
    }
  };

  const body = () => {
    return isSuccess ? (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-primary-300 mr-4">
            <CheckIcon className="w-[22px] h-[22px]" />
          </div>
          <span className="text-sm font-medium">
            An invite was sent to <span className="underline">{email}</span>
          </span>
        </div>
        <BaseButton
          type={'submit'}
          label={'Invite Another user'}
          onClick={() => {
            setIsSuccess(false);
            setEmail('');
          }}
        />
      </div>
    ) : (
      <InviteMemberForm
        inviteMembers={inviteMembers}
        onCancel={() => setShown(false)}
      />
    );
  };

  return (
    <Modal
      setShowModal={setShown}
      show={shown}
      header={{
        title: 'Invite new Users',
      }}
      body={body()}
    />
  );
};

export const InvitationModal = withErrorBoundary(_InvitationModal, {
  FallbackComponent: (props) => <ErrorFallback />,
  onError: (error, info) => {
    console.error('Error occurred in InvitationModal: ', error);
  },
});
