import { useAuth0, User } from '@auth0/auth0-react';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';

export const useAuth0Wrapper = () => {
  const auth0Context = useAuth0();
  let orgId: string | undefined = undefined;

  const userData = useSWR<User, any, any>(
    auth0Context.user && auth0Context.isAuthenticated
      ? [`/members/${auth0Context.user.email}`, 'GET']
      : null,
    axiosFetcher,
  );

  if (userData.data && auth0Context.user) {
    if (!auth0Context.user.family_name) {
      auth0Context.user.family_name = userData.data.family_name;
    }
    if (!auth0Context.user.given_name) {
      auth0Context.user.given_name = userData.data.given_name;
    }
  }

  if (auth0Context.user) {
    orgId = auth0Context.user?.coldclimate_claims.org_id;
  }

  const getOrgSpecificUrl = (url: string) => {
    return '/organizations/' + orgId + url;
  };

  return {
    ...auth0Context,
    isLoading: auth0Context.isLoading || userData.isLoading,
    error: auth0Context.error || userData.error,
    getOrgSpecificUrl,
    orgId,
  };
};
