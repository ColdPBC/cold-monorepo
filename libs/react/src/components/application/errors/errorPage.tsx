import React from 'react';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { ButtonTypes } from '@coldpbc/enums';
import { BaseButton } from '@coldpbc/components';

export type ErrorPageProps = {
  error?: string;
};

export const ErrorPage = ({ error }: ErrorPageProps) => {
  const { logout } = useAuth0Wrapper();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={'fixed inset-0 h-screen w-screen bg-bgc-main flex flex-col items-center justify-center'}>
      <div className={'text-tc-primary text-h2 w-1/2 flex flex-col items-center justify-center space-y-10'}>
        <div>{error}</div>
        <div>
          An error occurred accessing your account. Please contact us at <a href="mailto: support@coldclimate.com">support@coldclimate.com</a>.
        </div>
        <BaseButton onClick={handleLogout} label={'Re Login'} variant={ButtonTypes.secondary} className={'w-auto'} />
      </div>
    </div>
  );
};
