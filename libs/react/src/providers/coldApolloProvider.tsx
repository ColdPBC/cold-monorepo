import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import { resolveGraphQLUrl } from '@coldpbc/fetchers';

export interface ColdApolloContextType {
  client: ApolloClient<any> | null;
}

export const ColdApolloContext = createContext<ColdApolloContextType>({
  client: null,
});

export const ColdApolloProvider = ({ children }: PropsWithChildren) => {
  const { getAccessTokenSilently } = useAuth0();
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    const client = new ApolloClient({
      link: setContext(async (_, { headers }) => {
        const audience = import.meta.env.VITE_COLD_API_AUDIENCE as string;
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: audience,
            scope: 'offline_access email profile openid',
          },
        });
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        };
      }).concat(
        createHttpLink({
          uri: resolveGraphQLUrl(),
        }),
      ),
      cache: new InMemoryCache(),
    });
    setClient(client);
  }, []);

  return (
    <ColdApolloContext.Provider
      value={{
        client: client,
      }}>
      {children}
    </ColdApolloContext.Provider>
  );
};
