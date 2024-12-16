import { ColdRoutes } from '../routes';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { SWRConfig } from 'swr';

export const Application = () => {
  const ldFlags = useFlags();

  return (
    <SWRConfig
      value={{
        keepPreviousData: ldFlags.swrKeepPreviousData,
      }}>
      <div className={'h-full w-full overflow-y-auto'}>
        <ColdRoutes />
      </div>
    </SWRConfig>
  );
};
