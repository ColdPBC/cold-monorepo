import { useAuth0 } from '@auth0/auth0-react';
import useSWR, { Fetcher, Key, SWRConfiguration, SWRResponse } from 'swr';
import { FullConfiguration } from 'swr/_internal';

export const useOrgSWR = <Data = any, Error = any>(
  key: string[] | null,
  fetcher: ((arg: string[]) => unknown) | null,
  config?: SWRConfiguration,
) => {
  const getKey = () => {
    if (authUser && key != null) {
      const orgKey =
        '/organizations/' + authUser.coldclimate_claims.org_id + key[0];
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
