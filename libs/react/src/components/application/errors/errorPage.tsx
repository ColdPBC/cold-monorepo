import React from 'react';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { ButtonTypes } from '@coldpbc/enums';
import { BaseButton } from '@coldpbc/components';
import { FallbackProps } from 'react-error-boundary';

export type ErrorPageProps = {
  error?: string;
  showLogout?: boolean;
  fallbackProps?: FallbackProps;
};

export const ErrorPage = ({ error, showLogout=true, fallbackProps }: ErrorPageProps) => {
  const { logout } = useAuth0Wrapper();
  const { logBrowser } = useColdContext();

  logBrowser(
    'Error page',
    'error',
    {
      error,
      fallbackProps,
      showLogout
    },
    error,
  )

  const handleLogout = async () => {
    await logout(
      {
        logoutParams: { returnTo: window.location.origin },
      }
    );
  };

  return (
    <div className={'fixed inset-0 h-screen w-screen bg-bgc-main flex flex-col items-center justify-center'}>
      <div className={'text-tc-primary w-1/2 max-w-96 flex flex-col items-center justify-center space-y-10'}>
        <div className={'text-h2'}>
          An Error Occurred
        </div>
        {error ? <div>{error}</div> : ''}
        {
          showLogout && (
            <BaseButton onClick={handleLogout} label={'Login Again '} variant={ButtonTypes.secondary}
                        className={'w-auto'}/>
          )
        }
        <div>If you're still having issues, please contact us at <a
          href="mailto: support@coldclimate.com">support@coldclimate.com</a>.
        </div>
      </div>
    </div>
  );
};
