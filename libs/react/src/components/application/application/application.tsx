import { useContext, useEffect, useState } from 'react';
import cookies from 'js-cookie';
import { useAuth0 } from '@auth0/auth0-react';
import { ColdRoutes } from '../routes';
import { useCookies } from '@coldpbc/hooks';
import { Spinner } from '../../atoms';
import { GlobalSizes } from '@coldpbc/enums';
import ColdContext from '../../../context/coldContext';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { matchRoutes, useLocation } from 'react-router-dom';
import { GuidanceButton } from '../../molecules/guidanceButton/guidanceButton';

export const Application = () => {
  const location = useLocation();
  const shouldRenderGuidanceButton = matchRoutes(
    [
      { path: '/home' },
      { path: '/footprint' },
      { path: '/journey' },
      { path: '/actions' },
    ],
    location,
  );

  return (
    <div className="max-w-[1440px] m-auto overflow-x-clip">
      <ColdRoutes />
      {shouldRenderGuidanceButton && <GuidanceButton />}
    </div>
  );
};
