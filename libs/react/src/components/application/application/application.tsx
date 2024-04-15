import { ColdRoutes } from '../routes';
import { matchRoutes, useLocation } from 'react-router-dom';
import { GuidanceButton } from '../../molecules';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { SWRConfig } from 'swr';

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
      <div className="max-w-[1440px] m-auto overflow-x-clip">
        <ColdRoutes />
        {shouldRenderGuidanceButton() && <GuidanceButton />}
      </div>
    </SWRConfig>
  );
};
