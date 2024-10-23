import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { Modal } from '../modal/modal';
import { useAddToastMessage } from '../../../hooks/useToastMessage';
import { InviteMemberForm } from './inviteMemberForm/inviteMemberForm';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { BaseButton, Spinner } from '../../atoms';
import { ToastMessage } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';
import { useSWRConfig } from 'swr';
import { cloneDeep } from 'lodash';
import { getFormattedUserName } from '@coldpbc/lib';

export interface InvitationModalProps {
	shown: boolean;
	setShown: (shown: boolean) => void;
	companyName: string;
}

const _InvitationModal = (props: InvitationModalProps) => {
	const { shown, setShown } = props;
	const { logError } = useColdContext();
	const { addToastMessage } = useAddToastMessage();
	const { mutate } = useSWRConfig();
	const auth0 = useAuth0Wrapper();
	const [isSuccess, setIsSuccess] = useState(false);
	const [email, setEmail] = useState('');

	const inviteMembers = async (email: string, roleId: string) => {
		try {
			const response: any = await axiosFetcher([
				auth0.getOrgSpecificUrl(`/invitation`),
				'POST',
				JSON.stringify({
					user_email: email,
					inviter_name: getFormattedUserName(auth0.user),
					roleId: [roleId],
				}),
			]);

			// check if the response array contains any AxiosError objects
			// reject the promise if there are any errors
			const isError = isAxiosError(response);
			if (isError) {
				throw new Error('Invitation failed');
			}
			setIsSuccess(true);
			setEmail(email);
			await mutate([auth0.getOrgSpecificUrl('/members'), 'GET']);
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
			<InviteMemberForm inviteMembers={inviteMembers} onCancel={() => setShown(false)} />
		);
	};

	if (auth0.isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	if (auth0.error) {
		logError(auth0.error, ErrorType.Auth0Error);
		return <div></div>;
	}

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
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in InvitationModal: ', error);
	},
});
