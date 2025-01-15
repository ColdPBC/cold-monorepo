import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import { resolveGraphQLUrl } from '@coldpbc/fetchers';
import { useColdContext } from '@coldpbc/hooks';

export interface ColdApolloContextType {
	client: ApolloClient<any> | null;
}

export const ColdApolloContext = createContext<ColdApolloContextType>({
	client: null,
});

export const ColdApolloProvider = ({ children }: PropsWithChildren) => {
	const { getAccessTokenSilently } = useAuth0();
  const { logBrowser } = useColdContext();
	const [client, setClient] = useState<ApolloClient<any> | null>(null);

	useEffect(() => {
		const client = new ApolloClient({
			link: setContext(async (_, { headers }) => {
				const audience = import.meta.env.VITE_COLD_API_AUDIENCE as string;
        let token = '';
        try {
          token = await getAccessTokenSilently({
            authorizationParams: {
              audience: audience,
              scope: 'offline_access email profile openid',
            },
          });
        } catch (error) {
          logBrowser('Error getting token for Apollo', 'error', { error, audience }, error);
        }
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
			defaultOptions: {
				watchQuery: {
					fetchPolicy: 'no-cache',
					errorPolicy: 'ignore',
				},
				query: {
					fetchPolicy: 'no-cache',
					errorPolicy: 'all',
				},
			},
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
