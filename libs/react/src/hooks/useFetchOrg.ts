import { useAuth0 } from '@auth0/auth0-react';

export const useFetchOrg = () => {
  // todo here to add code to fetch orgId during impersonation
  let orgId: string | undefined = undefined;
  const auth0 = useAuth0();

  if (auth0.user) {
    orgId = auth0.user?.coldclimate_claims.org_id;
  }

  const getApiUrl = (url: string) => {
    return '/organizations/' + orgId + url;
  };

  return {
    orgId,
    getApiUrl,
    ...auth0,
  };
};
