import { useAuth0, User } from '@auth0/auth0-react';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';

export const useAuth0Wrapper = () => {
  // wrap auth0 hook here
  // fetch the latest user data from the /users endpoint
  // update the user data in the context
  // return the user data
  const auth0Context = useAuth0();

  const [cookies] = useCookies(['coldpbc']);

  const { coldpbc } = cookies;

  const userData = useSWR<User, any, any>(
    auth0Context.user && coldpbc
      ? [`/members/${auth0Context.user.email}`, 'GET']
      : null,
    axiosFetcher,
  );

  if (userData.data && auth0Context.user) {
    if (auth0Context.user.family_name === 'null') {
      auth0Context.user.family_name = userData.data.family_name;
    }
    if (auth0Context.user.given_name === 'null') {
      auth0Context.user.given_name = userData.data.given_name;
    }
  }

  return {
    ...auth0Context,
    isLoading: auth0Context.isLoading || userData.isLoading,
    error: auth0Context.error || userData.error,
  };
};
