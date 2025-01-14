import React from 'react';
import { ButtonTypes } from '@coldpbc/enums';
import { useColdContext } from '@coldpbc/hooks';
import { FallbackProps } from 'react-error-boundary';
import { useAuth0 } from '@auth0/auth0-react';
import { BaseButton } from '@coldpbc/components';

export const ProtectedRouteErrorFallback = (props: FallbackProps) => {
  const { logBrowser } = useColdContext();
  const { logout } = useAuth0();

  logBrowser(
    'Error rendering protected route',
    'error',
    {
      ...props
    },
    props.error,
  );

  const handleLogout = async () => {
    localStorage.clear();
    sessionStorage.clear();
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
        <BaseButton onClick={handleLogout} label={'Login Again '} variant={ButtonTypes.secondary}
                    className={'w-auto'}/>
        <div>If you're still having issues, please contact us at <a
          href="mailto: support@coldclimate.com">support@coldclimate.com</a>.
        </div>
      </div>
    </div>
  );
};
