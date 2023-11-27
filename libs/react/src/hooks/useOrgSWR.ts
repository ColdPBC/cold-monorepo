import { useAuth0 } from '@auth0/auth0-react';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { useColdContext } from './useColdContext';

export const useOrgSWR = <Data = any, Error = any>(
  key: string[] | null,
  fetcher: ((arg: string[]) => unknown) | null,
  config?: SWRConfiguration,
) => {
  const { impersonatingOrg } = useColdContext();

  const getKey = () => {
    if (authUser && key != null) {
      const orgId = impersonatingOrg
        ? impersonatingOrg.id
        : authUser.coldclimate_claims.org_id;
      const orgKey = '/organizations/' + orgId + key[0];
      return [orgKey, ...key.slice(1)];
    } else {
      return null;
    }
  };

  const {
    user: authUser,
    isLoading: authIsLoading,
    isAuthenticated: authisAuthenticated,
    error: authError,
  } = useAuth0();

  return useSWR(getKey(), fetcher, config) as SWRResponse<Data, Error, any>;
};
