import { ColdRoutes } from '../routes';
import { matchRoutes, useLocation } from 'react-router-dom';
import { GuidanceButton } from '../../molecules';

export const Application = () => {
  const location = useLocation();
  const shouldRenderGuidanceButton = matchRoutes([{ path: '/' }, { path: '/home' }, { path: '/footprint' }, { path: '/journey' }, { path: '/actions/*' }], location);

  return (
    <div className="max-w-[1440px] m-auto overflow-x-clip">
      <ColdRoutes />
      {shouldRenderGuidanceButton && <GuidanceButton />}
    </div>
  );
};
