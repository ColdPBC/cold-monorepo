import { ColdRoutes } from '../routes';
import { matchRoutes, useLocation } from 'react-router-dom';
import { GuidanceButton } from '../../molecules';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { SWRConfig } from 'swr';
import { twMerge } from 'tailwind-merge';

export const Application = () => {
  const location = useLocation();
  const ldFlags = useFlags();
  const shouldRenderGuidanceButton = () => {
    let routes = [];
    if (ldFlags.showReiComplianceMvpSidebarCold506) {
      routes = [{ path: '/' }, { path: '/home' }, { path: '/compliance/*' }, { path: '/assessments/*' }, { path: '/actions/*' }, { path: '/reports/*' }, { path: '/documents' }];
    } else {
      routes = [{ path: '/' }, { path: '/home' }, { path: '/footprint' }, { path: '/journey' }, { path: '/actions/*' }, { path: '/compliance/*' }, { path: '/documents' }];
    }
    return matchRoutes(routes, location.pathname);
  };

  return (
    <SWRConfig
      value={{
        keepPreviousData: ldFlags.swrKeepPreviousData,
      }}>
      <div className={twMerge('max-w-[1440px] overflow-x-clip', ldFlags.showNewNavigationCold698 ? '' : 'm-auto')}>
        <ColdRoutes />
        {shouldRenderGuidanceButton() && <GuidanceButton />}
      </div>
    </SWRConfig>
  );
};
